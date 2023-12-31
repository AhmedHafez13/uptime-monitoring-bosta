# ToDo List

## Mandatory ToDos:

### Backend Development:

1. `[DONE]` Create an Express.js project structure.

2. `[DONE]` Implement user authentication using Passport.js (local strategy).

3. `[DONE]` Set up routes and controllers for user signup and signin.

   - `[DONE]` Signup and Signin functionality (token-based authentication)
   - `[DONE]` Email verification

4. `[DONE]` Implement URL checks CRUD operations as described in the task description.

   1. **Create URL Check (`createUrl`):**

      - Receive the URL to be checked in the request body.
      - Perform validation on the input data.
      - Create a new URL check record in the database.
      - Return a success response with the created URL check details.

   2. **Get URL Check Details (`getUrlDetails`):**

      - Receive the URL check ID as a route parameter.
      - Find the corresponding URL check in the database.
      - Return the URL check details in the response.

   3. **Update URL Check (`updateUrl`):**

      - Receive the URL check ID as a route parameter.
      - Receive updated URL check data in the request body.
      - Find the corresponding URL check in the database.
      - Update the URL check data with the new values.
      - Return a success response with the updated URL check details.

   4. **Delete URL Check (`deleteUrl`):**

      - Receive the URL check ID as a route parameter.
      - Find the corresponding URL check in the database.
      - Delete the URL check record.
      - Return a success response.

   5. **Get All URL Checks (`getAllUrls`):**
      - Retrieve all URL check records from the database.
      - Return a list of URL check details in the response.

5. `[DONE]` Design and implement uptime reports generation based on checked URLs.

   1. `[DONE]` Scheduling the URLs Checks

      - Schedule check jobs or all URLs once the server starts.
      - Schedule a URL check after creating a new URL.
      - Update the job after updating a URL.
      - Stop the job after deleting a URL.

   2. Perform Url Check Functionality

      - `[DONE]` **Make the Request and Get the Response**:

        - Construct the request configuration using the `generateRequestConfig` function.
        - Use `axios` to make a GET request to the URL.
        - Capture the response for further processing.

      - **Handle `ignoreSSL`**:

        - ?

      - `[DONE]` **Calculate the Response Time**:

        - Calculate the difference between the start time (when the request was made) and the current time to determine the response time.

      - `[DONE]` **Store the Report Data**:

        - Store the report data, including the status, response time, and any other relevant information, in the database or perform further processing.

   3. `[DONE]` Calculations of the attributes

      - `availability`: Calculate the percentage of successful polls (status = 'up') out of the total history length.
      - `outages`: Count the number of times the status changed from 'up' to 'down' in the history.
      - `downtime`: Summing the difference between consecutive 'down' statuses in the history.
      - `uptime`: Summing the difference between consecutive 'up' statuses in the history.
      - `responseTime`: Calculate the average responseTime for all polls in the history.

   4. Handle Notifications and Sockets
      - `[DONE]` Notifications
      - Sockets

### Testing:

6. `[DONE]` Write unit tests using Jest for the implemented routes and controllers.
7. `[DONE]` Ensure routes return expected responses and handle errors appropriately.

### Documentation:

8. `[DONE]` Write API documentation in the README.md file.
9. `[DONE]` Describe endpoints, request/response formats, and authentication methods.

### Authentication and Authorization:

10. `[DONE]` Secure routes using authentication middleware.
11. `[DONE]` Implement authorization to ensure users can only access their own URL checks.

### Validation:

12. `[PARTIALLY DONE]` Implement input validation and error handling for API requests.
    - Validate the `ObjectId`s, should be valid MongoDB ids.

---

## Optional and Extra ToDos (Time Permitting):

### Dockerization:

13. Create Dockerfiles for the backend application and MongoDB.

    - `[DONE]` Backend Dockerfile
    - MongoDB Dockerfile

14. Define a docker-compose.yml file to orchestrate the containers.

### CI/CD Pipeline with GitHub Actions:

15. Set up a GitHub Actions workflow for Continuous Integration (CI) and Continuous Deployment (CD).
16. Configure the workflow to run tests using Jest.
17. Build Docker images and push them to a container registry (e.g., Docker Hub).
18. Deploy the application to a test environment (e.g., Ubuntu machine).

### Integration Testing:

19. Implement integration tests to ensure the API works as expected in a Dockerized environment.

### Bonus Features (Time Permitting):

20. Implement optional bonus features from the task description, such as API documentation, Pushover integration.

### Final Testing and Debugging:

21. Perform thorough testing of the application in different scenarios.
22. Debug and fix any issues that arise during testing.

### Final Documentation:

23. Update the README.md file with any changes made during development.
24. Document any additional configurations required for deploying in a production environment.

    - Consider the `.env` file.
    - Database initial config.
    - Draw an ERD diagram to visualize the database structure.

## Enhancements:

- Handle error logging.
- Log requests to the console. Use an external package.
- Move types to a centralized type file
- Create a file for defaults (i.e. url check `interval`)
- Create a response-unifying class with functions to handle all the responses and enhance the error handling.
- Add translation files to separate text from code. Search from (TODO: TRANS).
- Add better validations while signing up a new user.
- Consider using external package for validations and translations.

### url.controller

- createUrl and updateUrl
  - Transform the `protocol` to uppercase to match the enum in the model.

### URL check cron jobs

- Consider the `interval` values range.
