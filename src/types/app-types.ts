export type UrlStatus = "up" | "down";

export type UrlAttributes = {
  availability: number;
  outages: number;
  downtime: number;
  uptime: number;
  averageResponseTime: number;
};

export type UrlCheckHistoryItem = {
  timestamp: Date;
  status: "up" | "down";
  responseTime: number;
};
