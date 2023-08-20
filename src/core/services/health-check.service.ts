import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UrlDocument } from '../../api/urls/url.model';
import UrlReportModel from '../../api/url-reports/url-report.model';
import {
  UrlAttributes,
  UrlCheckHistoryItem,
  UrlStatus,
} from '@app/types/app-types';
import { StatusEnum } from '../utils/app.enums';

class HealthCheckService {
  /**
   * Perform a health check on a URL.
   *
   * @param urlData The URL document to be checked.
   * @returns An object containing the status, response time, and the updated report.
   */
  async performUrlCheck(urlData: UrlDocument) {
    const startTime = Date.now();

    // Get the report history
    const urlReport = await UrlReportModel.findOne({ urlId: urlData._id });
    const history = urlReport?.history || [];

    try {
      const response = await this.makeRequest(urlData);

      if (urlData.assert && urlData.assert.statusCode) {
        if (response.status !== urlData.assert.statusCode) {
          throw new Error('Response status assertion failed');
        }
      }

      const status: UrlStatus = StatusEnum.Up;
      const responseTime = Date.now() - startTime;

      history.push({ timestamp: new Date(), status, responseTime });
      const attributes = await this.calculateReportAttributes(history);

      const urlReport = await this.storeReportData(
        urlData,
        status,
        responseTime,
        attributes
      );

      return { status, responseTime, urlReport };
    } catch (error) {
      const status: UrlStatus = StatusEnum.Down;
      const responseTime = urlData.timeout || 0;

      history.push({ timestamp: new Date(), status, responseTime });
      const attributes = await this.calculateReportAttributes(history);

      const urlReport = await this.storeReportData(
        urlData,
        status,
        responseTime,
        attributes
      );

      return { status, responseTime, urlReport };
    }
  }

  /**
   * Make an HTTP request to the URL.
   *
   * @param urlData The URL document to be checked.
   * @returns The response from the HTTP request.
   */
  private async makeRequest(urlData: UrlDocument): Promise<AxiosResponse> {
    const requestConfig = this.generateRequestConfig(urlData);
    const response = await axios.get(urlData.fullUrl, requestConfig);
    return response;
  }

  /**
   * Calculate report attributes based on URL history.
   *
   * @param history Array of URL check history items.
   * @returns An object containing calculated attributes.
   */
  private async calculateReportAttributes(
    history: Array<UrlCheckHistoryItem>
  ): Promise<UrlAttributes | null> {
    if (!history.length) {
      return null;
    }

    const totalPolls = history.length;
    const upPolls = history.filter((item) => item.status === StatusEnum.Up);
    const upPollsCount = upPolls.length;
    const totalResponseTime = upPolls.reduce(
      (total, historyItem) => (total += historyItem.responseTime),
      0
    );

    const availability = (upPollsCount / totalPolls) * 100;
    const outages = totalPolls - upPollsCount;
    const { downtime, uptime } = this.calculateStatistics(history);
    const averageResponseTime = totalResponseTime / history.length;

    return {
      availability,
      outages,
      downtime,
      uptime,
      averageResponseTime,
    };
  }

  /**
   * Calculate downtime and uptime based on the history of URL checks.
   *
   * @param history Array of URL check history items.
   * @returns An object containing the total downtime and uptime in seconds.
   */
  private calculateStatistics(history: Array<UrlCheckHistoryItem>) {
    let downtime = 0;
    let uptime = 0;

    for (let i = 1; i < history.length; i++) {
      const currentItem = history[i];
      const prevItem = history[i - 1];

      // Calculate time difference in seconds
      const timeDifferenceSeconds =
        (currentItem.timestamp.getTime() - prevItem.timestamp.getTime()) / 1000;

      if (prevItem.status === StatusEnum.Up) {
        uptime += timeDifferenceSeconds;
      } else {
        downtime += timeDifferenceSeconds;
      }
    }

    return { downtime, uptime };
  }

  /**
   * Store report data in the database.
   *
   * @param urlData The URL document being checked.
   * @param status The status of the URL check.
   * @param responseTime The response time of the check.
   * @param attributes Calculated attributes for the report.
   */
  private async storeReportData(
    urlData: UrlDocument,
    status: UrlStatus,
    responseTime: number,
    attributes: UrlAttributes | null
  ) {
    const urlReport = await UrlReportModel.findOne({ urlId: urlData._id });

    const currentTime = new Date();
    const updatedData = {
      urlId: urlData._id,
      status,
      timestamp: currentTime,
      responseTime: attributes?.averageResponseTime || 0,
      availability: attributes?.availability || 0,
      outages: attributes?.outages || 0,
      downtime: attributes?.downtime || 0,
      uptime: attributes?.uptime || 0,
    };

    if (urlReport) {
      const updatedUrlReport = {
        ...updatedData,
        history: [
          ...urlReport.history,
          {
            status,
            responseTime,
            timestamp: currentTime,
          },
        ],
      };

      return UrlReportModel.findByIdAndUpdate(urlReport._id, updatedUrlReport, {
        new: true,
      });
    } else {
      return UrlReportModel.create({
        ...updatedData,
        history: [{ status, responseTime, timestamp: new Date() }],
      });
    }
  }

  /**
   * Generate Axios request config based on URL properties.
   *
   * @param urlData The URL document being checked.
   */
  private generateRequestConfig(urlData: UrlDocument) {
    const config: AxiosRequestConfig = {
      timeout: urlData.timeout,
    };

    if (urlData.authentication) {
      config.auth = {
        username: urlData.authentication.username,
        password: urlData.authentication.password,
      };
    }

    if (urlData.httpHeaders) {
      config.headers = urlData.httpHeaders;
    }

    return config;
  }
}

export default new HealthCheckService();
