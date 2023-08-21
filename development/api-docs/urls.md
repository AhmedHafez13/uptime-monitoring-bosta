## URLs

### Create URL

Endpoint: `/urls`

Method: `POST`

Headers:

- `Authorization`: Bearer Token (JWT)

Request Body:

```json
{
  "name": "Example URL",
  "url": "https://example.com",
  "protocol": "https",
  "path": "/path/to/resource",
  "port": 443,
  "webhook": "https://webhook.example.com",
  "timeout": 5000,
  "interval": 300000,
  "threshold": 5,
  "authentication": true,
  "httpHeaders": {
    "Authorization": "Bearer secret_token"
  },
  "assert": "Response contains expected content",
  "tags": ["tag1", "tag2"],
  "ignoreSSL": false
}
```

**Success Response:**
Status Code: 201 Created

```json
{
  "message": "Operation completed successfully",
  "url": {
    "_id": "url_id",
    "name": "Example URL",
    "url": "https://example.com"
    // Other URL data
  }
}
```

**Failure Responses:**

1. Unauthorized
   Status Code: 401 Unauthorized

   ```json
   {
     "error": "Unauthorized"
   }
   ```

2. Invalid Request Body
   Status Code: 400 Bad Request

   ```json
   {
     "error": "URL, protocol, and name are required fields"
   }
   ```

3. Internal Server Error
   Status Code: 500 Internal Server Error
   ```json
   {
     "error": "An error occurred during the operation, Internal Server Error"
   }
   ```

### Update URL

Endpoint: `/urls/:urlId`

Method: `PUT`

Headers:

- `Authorization`: Bearer Token (JWT)

Request Body: Same as Create URL

**Success Response:**
Status Code: 201 Created

```json
{
  "message": "Operation completed successfully",
  "url": {
    "_id": "url_id",
    "name": "Updated URL",
    "url": "https://example.com"
    // Other updated URL data
  }
}
```

**Failure Responses:**
Same as Create URL failure responses.

### Get URL Details

Endpoint: `/urls/:urlId`

Method: `GET`

Headers:

- `Authorization`: Bearer Token (JWT)

**Success Response:**
Status Code: 200 OK

```json
{
  "urlDetails": {
    "_id": "url_id",
    "name": "Example URL",
    "url": "https://example.com"
    // Other URL details
  }
}
```

**Failure Responses:**

1. Unauthorized
   Status Code: 401 Unauthorized

   ```json
   {
     "error": "Unauthorized"
   }
   ```

2. URL Details Not Found
   Status Code: 404 Not Found

   ```json
   {
     "error": "URL details not found"
   }
   ```

3. Forbidden
   Status Code: 403 Forbidden
   ```json
   {
     "error": "Forbidden"
   }
   ```

### Delete URL

Endpoint: `/urls/:urlId`

Method: `DELETE`

Headers:

- `Authorization`: Bearer Token (JWT)

**Success Response:**
Status Code: 200 OK

```json
{
  "message": "URL deleted successfully"
}
```

**Failure Responses:**
Same as Get URL Details failure responses.

### Get All URLs

Endpoint: `/urls`

Method: `GET`

Headers:

- `Authorization`: Bearer Token (JWT)

**Success Response:**
Status Code: 200 OK

```json
{
  "urls": [
    {
      "_id": "url_id1",
      "name": "Example URL 1",
      "url": "https://example1.com"
    },
    {
      "_id": "url_id2",
      "name": "Example URL 2",
      "url": "https://example2.com"
    }
  ]
}
```

**Failure Responses:**
Same as Get URL Details failure responses.
