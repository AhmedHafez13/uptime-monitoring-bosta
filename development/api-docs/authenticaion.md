## Authentication

To access the API endpoints, you need to be authenticated. You can obtain an access token by signing up for an account and using the provided credentials in your requests.

### Signup

Endpoint: `/signup`

Method: `POST`

Headers: None

Request Body:

```json
{
  "username": "exampleuser",
  "email": "user@example.com",
  "password": "secretpassword"
}
```

**Success Response:**
Status Code: 201 Created

```json
{
  "message": "User registered successfully"
}
```

**Failure Responses:**

1. Invalid Request Body
   Status Code: 400 Bad Request

   ```json
   {
     "error": "Invalid request body"
   }
   ```

2. Email Already in Use
   Status Code: 400 Bad Request

   ```json
   {
     "error": "Email is already in use"
   }
   ```

3. Internal Server Error
   Status Code: 500 Internal Server Error
   ```json
   {
     "error": "An error occurred during signup"
   }
   ```

### Login

Endpoint: `/login`

Method: `POST`

Headers: None

Request Body:

```json
{
  "email": "user@example.com",
  "password": "secretpassword"
}
```

**Success Response:**
Status Code: 200 OK

```json
{
  "user": {
    "username": "exampleuser",
    "email": "user@example.com"
    // Other user data
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1N2Y4ZmFhYmIwMDRiMzI4ZjEwYmEwZTEiLCJpYXQiOjE2MzA4NTczNzAsImV4cCI6MTYzMDg1NzY3MH0.D6rN9Z_ZYXl4sZCRP9dEMnCmuwVUnKehN-MuCBm85_E"
}
```

**Failure Responses:**

1. Invalid Request Body
   Status Code: 400 Bad Request

   ```json
   {
     "error": "Invalid request body"
   }
   ```

2. Invalid Email or Password
   Status Code: 401 Unauthorized

   ```json
   {
     "error": "Invalid email or password"
   }
   ```

3. Email Not Verified
   Status Code: 403 Forbidden

   ```json
   {
     "error": "Email is not verified"
   }
   ```

4. Internal Server Error
   Status Code: 500 Internal Server Error
   ```json
   {
     "error": "An error occurred during login"
   }
   ```

### Verify Email

Endpoint: `/verify-email`

Method: `POST`

Headers: None

Query Parameters:

- `token`: Verification token received in the email

**Success Response:**
Status Code: 200 OK

```json
{
  "message": "Email verification successful"
}
```

**Failure Responses:**

1. Missing Verification Token
   Status Code: 400 Bad Request

   ```json
   {
     "error": "Verification token is required"
   }
   ```

2. Invalid Verification Token Format
   Status Code: 400 Bad Request

   ```json
   {
     "error": "Invalid verification token format"
   }
   ```

3. User Not Found
   Status Code: 404 Not Found

   ```json
   {
     "error": "User not found"
   }
   ```

4. Invalid Verification Token
   Status Code: 400 Bad Request

   ```json
   {
     "error": "Invalid verification token"
   }
   ```

5. Internal Server Error
   Status Code: 500 Internal Server Error
   ```json
   {
     "error": "An error occurred during email verification"
   }
   ```
