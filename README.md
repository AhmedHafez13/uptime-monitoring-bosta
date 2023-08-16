# Uptime Monitoring RESTful API

Welcome to the Uptime Monitoring RESTful API project! This repository contains the backend implementation of an uptime monitoring system that allows authenticated users to monitor URLs and receive detailed uptime reports. This project is developed as part of an assessment for a Backend Engineer position.

## About the Project

The Uptime Monitoring RESTful API project aims to create a comprehensive system that empowers users to monitor the availability of URLs and receive real-time reports about their uptime and downtime. Users can sign up, create URL checks, and receive notifications whenever a monitored URL goes down or up again. Additionally, the system provides detailed uptime reports, including availability percentage, average response time, and more.

## Features

- User Authentication: Sign up and authenticate users to access the monitoring features.
- URL Checks: Create, update, and delete URL checks to monitor their availability.
- Notifications: Receive notifications (email and potentially other methods) when a monitored URL experiences downtime or uptime.
- Uptime Reports: View detailed reports about the availability, response time, downtime, and uptime of monitored URLs.
- Tagging: Group URL checks by tags and generate reports based on tags.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the Repository:** Clone this repository to your local development environment using the command:
   ```
   git clone https://github.com/AhmedHafez13/uptime-monitoring-bosta
   ```

2. **Install Dependencies:** Navigate to the project directory and install the required dependencies using npm:
   ```
   cd uptime-monitoring-bosta
   npm install
   ```

3. **Run the Application:** Start the backend server using Node.js:
   ```
   npm start
   ```

4. **Access the API:** Access the API endpoints by sending requests to `http://localhost:3000` (or as configured).

## API Documentation

The detailed API documentation can be found in the [API Docs.md](Development/API Docs.md) file. This documentation provides information about available endpoints, request/response formats, and authentication.

## Credits

This project was developed as part of an assessment for a Backend Engineer position. Special thanks to the team for their guidance and support.
