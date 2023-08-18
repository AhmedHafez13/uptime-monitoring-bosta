# ToDo List

## Mandatory ToDos:

### Backend Development:

1. Create an Express.js project structure.
2. Implement user authentication using Passport.js (local strategy).
3. Set up routes and controllers for user signup and signin.
4. Implement URL checks CRUD operations as described in the task description.
5. Design and implement uptime reports generation based on checked URLs.

### Testing:

6. Write unit tests using Jest for the implemented routes and controllers.
7. Ensure routes return expected responses and handle errors appropriately.

### Documentation:

8. Write API documentation in the README.md file.
9. Describe endpoints, request/response formats, and authentication methods.

### Authentication and Authorization:

10. Secure routes using authentication middleware.
11. Implement authorization to ensure users can only access their own URL checks.

### Validation:

12. Implement input validation and error handling for API requests.

---

## Optional and Extra ToDos (Time Permitting):

### Dockerization:

13. Create Dockerfiles for the backend application and MongoDB.
14. Define a docker-compose.yml file to orchestrate the containers.

### CI/CD Pipeline with GitHub Actions:

15. Set up a GitHub Actions workflow for Continuous Integration (CI) and Continuous Deployment (CD).
16. Configure the workflow to run tests using Jest.
17. Build Docker images and push them to a container registry (e.g., Docker Hub).
18. Deploy the application to a test environment (e.g., your Ubuntu machine).

### Integration Testing:

19. Implement integration tests to ensure the API works as expected in a Dockerized environment.

### Bonus Features (Time Permitting):

20. Implement optional bonus features from the task description, such as API documentation, Pushover integration, and more.

### Final Testing and Debugging:

21. Perform thorough testing of the application in different scenarios.
22. Debug and fix any issues that arise during testing.

### Final Documentation:

23. Update the README.md file with any changes made during development.
24. Document any additional configurations required for deploying in a production environment.


## Enhancements:

- Add translation files to separate text from code. Search from (TODO: TRANS).
- Add better validations while signing up a new user.
