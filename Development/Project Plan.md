# Project Plan

## Tools

1. **Programming Language**: TypeScript
2. **Backend Framework**: Node.js with Express.js
3. **Database Engine**: MongoDB
4. **Authentication**: Passport.js
5. **Testing Framework**: Jest
6. **Email Verification**: Nodemailer
7. **Notification Channels**: Modular and extensible architecture

-----

### 1. Programming Language: `TypeScript`

**Choosing TypeScript over JavaScript:**

Using TypeScript over JavaScript can provide several advantages, especially as the project grows:
- **Type Safety:** TypeScript introduces static typing, helping catch errors during development.
- **Intellisense:** IDEs provide better code suggestions and auto-completion with TypeScript.
- **Code Documentation:** Type annotations serve as documentation, making code more understandable.
- **Refactoring:** TypeScript assists in safely refactoring code.
- **Maintainability:** TypeScript's features contribute to writing more robust and maintainable code.

-----

### 2. **Backend Framework**: Node.js with Express.js

**Express.js**

1. **Minimalistic:** Express.js is giving you flexibility to structure your application according to your needs.

2. **Middleware:** Built around middleware, Express simplifies handling requests, enabling modular and reusable code.

3. **Routing:** Express provides robust routing capabilities for managing different endpoints and HTTP methods.

4. **Large Ecosystem:** A vast ecosystem of third-party middleware and extensions allows easy integration of additional features.

5. **Scalability:** Its lightweight nature allows for efficient handling of requests, making it suitable for both small and large projects.

-----

### 3. **Database Engine**: MongoDB

**Why to use MongoDB?**

1. **URL Checks:** The project involves storing data about URL checks, which might vary in structure, aligning with MongoDB's flexibility.

2. **Schema Flexibility:** MongoDB's schema-less nature allows for storing varied data structures within the same collection, fitting well with evolving data needs.

3. **Complex Data Handling:** MongoDB excels at managing unstructured or semi-structured data, suitable for projects with diverse data formats.

4. **Development Speed:** Changes to data structure can be made on-the-fly without altering the database schema, enabling faster development and iteration.

5. **Horizontal Scalability:** MongoDB's ability to scale horizontally makes it well-suited for projects with potential high data volume and traffic.

-----

### 4. **Authentication**: Passport.js

reasons to choose Passport.js for authentication over other solutions:

1. **Easy Implementation:** Passport.js is known for its straightforward integration, making authentication implementation easier.

2. **Middleware Integration:** Integrates seamlessly into Express.js middleware, enhancing compatibility and simplifying code organization.

3. **Community Support:** A well-established library with a large community, providing resources, documentation, and potential troubleshooting help.

4. **Modularity:** Modular design allows you to select only the strategies the project requires, keeping the codebase clean and efficient.

5. **Wide Strategy Support:** Offers a wide range of authentication strategies (Local, OAuth, OpenID, etc.), accommodating different authentication needs.

Overall, Passport.js offers ease of implementation, various strategies, and community support, making it a solid choice for authentication in the project.

-----

### 5. **Testing Framework**: Jest

**Jest:**

1. **Zero Configuration:** Jest requires minimal configuration out of the box, reducing setup time.

2. **Simple Syntax:** Its syntax is easy to understand and write, encouraging testing adoption across the team.

3. **Mocking:** Jest simplifies mocking complex dependencies, enhancing isolated unit testing.

5. **Parallel Execution:** Jest's parallel test execution speeds up test runs, improving development efficiency.

-----

### 6. **Email Verification**: Nodemailer

**Nodemailer:**

1. **Backend Integration:** Nodemailer is designed for server-side email sending, making it suitable for email verification within the backend.

2. **Customization:** Provides fine-grained control over email content and appearance, ensuring a tailored verification experience.

3. **SMTP Support:** Works with various SMTP providers, allowing you to choose the best option for sending emails.

4. **Error Handling:** Nodemailer offers comprehensive error handling, enabling you to manage various email-related scenarios.

5. **Async Capabilities:** Supports asynchronous operations, fitting seamlessly into Node.js's event-driven, non-blocking architecture.

Nodemailer's backend-focused features and flexibility make it a reliable choice for implementing email verification in the project.

-----

### 7. **Notification Channels**: Modular and extensible architecture

Modular architecture is an approach to designing software systems by breaking them down into smaller, self-contained modules or components. Each module handles a specific functionality or set of related functionalities. These modules are designed to be independent, allowing them to be developed, tested, and maintained separately.

Benefits of Modular Architecture:
- **Reusability:** Modules can be reused across different parts of an application or even in different projects.
- **Maintainability:** Isolating modules makes it easier to update and maintain individual components without affecting the entire system.
- **Scalability:** New features or components can be added without disrupting existing functionality.
- **Collaboration:** Different teams can work on different modules simultaneously, enhancing parallel development.
- **Testing:** Smaller modules are easier to test in isolation, improving the overall quality of the system.

Implementation:
- **Single Responsibility Principle:** Each module should have a clear and single responsibility.
- **Encapsulation:** Modules should expose only the necessary interfaces to interact with them.
- **Dependency Management:** Modules can communicate through well-defined interfaces and avoid tight coupling.
- **Abstraction and Interfaces:** Clearly define interfaces between modules to ensure flexibility and ease of replacement.

-----



## Environment

### Tools and Software

- **Operating System:** Ubuntu 22 (Running on VMware Workstation 17)
- **Node.js:** Version 16.20.0
- **npm:** Version 8.19.4
- **Docker:** Version 24.0.5
- **Docker Compose:** Version 2.20.2
