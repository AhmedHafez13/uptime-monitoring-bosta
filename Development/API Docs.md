# Uptime Monitoring RESTful API Documentation

Welcome to the API documentation for the Uptime Monitoring RESTful API. This document provides an overview of the available endpoints, request/response formats, and authentication methods.

## Authentication

To access the API endpoints, you need to be authenticated. You can obtain an access token by signing up for an account and using the provided credentials in your requests.

### Sign Up

- **Endpoint:** `/api/signup`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "your_password"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully"
  }
  ```

### Sign In

- **Endpoint:** `/api/signin`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "your_password"
  }
  ```
- **Response:**
  ```json
  {
    "accessToken": "your_access_token"
  }
  ```

## URL Checks

Manage URL checks for monitoring availability.

### Create URL Check

- **Endpoint:** `/api/url-checks`
- **Method:** POST
- **Headers:** `Authorization: Bearer your_access_token`
- **Request Body:**
  ```json
  {
    "name": "Website Check",
    "url": "https://example.com",
    "protocol": "HTTP",
    "interval": 600
  }
  ```
- **Response:**
  ```json
  {
    "id": "check_id",
    "name": "Website Check",
    "url": "https://example.com",
    "protocol": "HTTP",
    "interval": 600
  }
  ```

### Get URL Check

- **Endpoint:** `/api/url-checks/:id`
- **Method:** GET
- **Headers:** `Authorization: Bearer your_access_token`
- **Response:**
  ```json
  {
    "id": "check_id",
    "name": "Website Check",
    "url": "https://example.com",
    "protocol": "HTTP",
    "interval": 600
    // ...other details [TODO]
  }
  ```

### Update URL Check

- **Endpoint:** `/api/url-checks/:id`
- **Method:** PUT
- **Headers:** `Authorization: Bearer your_access_token`
- **Request Body:**
  ```json
  {
    "name": "Updated Check Name",
    "interval": 900
    // ...other updates [TODO]
  }
  ```
- **Response:**
  ```json
  {
    "message": "URL check updated successfully"
  }
  ```

### Delete URL Check

- **Endpoint:** `/api/url-checks/:id`
- **Method:** DELETE
- **Headers:** `Authorization: Bearer your_access_token`
- **Response:**
  ```json
  {
    "message": "URL check deleted successfully"
  }
  ```

## More Endpoints...

### [TODO]