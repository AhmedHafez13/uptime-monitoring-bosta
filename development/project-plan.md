# Project Plan

## Tools

1. **Programming Language**: TypeScript
2. **Backend Framework**: Node.js with Express.js
3. **Database Engine**: MongoDB
4. **Authentication**: Passport.js
5. **Testing Framework**: Jest
6. **Email Verification**: Nodemailer
7. **Notification Channels**: Modular and extensible architecture

---

### 1. Programming Language: `TypeScript`

**Choosing `TypeScript` over `JavaScript`:**

Using `TypeScript` over `JavaScript` can provide several advantages, especially as the project grows:

- **Type Safety:** `TypeScript` introduces static typing, helping catch errors during development.
- **Intellisense:** IDEs provide better code suggestions and auto-completion with `TypeScript`.
- **Code Documentation:** Type annotations serve as documentation, making code more understandable.
- **Refactoring:** `TypeScript` assists in safely refactoring code.
- **Maintainability:** `TypeScript`'s features contribute to writing more robust and maintainable code.

---

### 2. **Backend Framework**: `Node.js` with `Express.js`

**Express.js**

1. **Minimalistic:** `Express.js` is giving you flexibility to structure your application according to your needs.

2. **Middleware:** Built around middleware, Express simplifies handling requests, enabling modular and reusable code.

3. **Routing:** Express provides robust routing capabilities for managing different endpoints and HTTP methods.

4. **Large Ecosystem:** A vast ecosystem of third-party middleware and extensions allows easy integration of additional features.

5. **Scalability:** Its lightweight nature allows for efficient handling of requests, making it suitable for both small and large projects.

---

### 3. **Database Engine**: `MongoDB`

**Why to use MongoDB?**

1. **URL Checks:** The project involves storing data about URL checks, which might vary in structure, aligning with MongoDB's flexibility.

2. **Schema Flexibility:** MongoDB's schema-less nature allows for storing varied data structures within the same collection, fitting well with evolving data needs.

3. **Complex Data Handling:** MongoDB excels at managing unstructured or semi-structured data, suitable for projects with diverse data formats.

4. **Development Speed:** Changes to data structure can be made on-the-fly without altering the database schema, enabling faster development and iteration.

5. **Horizontal Scalability:** MongoDB's ability to scale horizontally makes it well-suited for projects with potential high data volume and traffic.

---

### 4. **Authentication**: `Passport.js`

**Reasons to choose `Passport.js` for authentication over other solutions:**

1. **Easy Implementation:** `Passport.js` is known for its straightforward integration, making authentication implementation easier.

2. **Middleware Integration:** Integrates seamlessly into Express.js middleware, enhancing compatibility and simplifying code organization.

3. **Community Support:** A well-established library with a large community, providing resources, documentation, and potential troubleshooting help.

4. **Modularity:** Modular design allows you to select only the strategies the project requires, keeping the codebase clean and efficient.

5. **Wide Strategy Support:** Offers a wide range of authentication strategies (Local, OAuth, OpenID, etc.), accommodating different authentication needs.

Overall, `Passport.js` offers ease of implementation, various strategies, and community support, making it a solid choice for authentication in the project.

---

### 5. **Testing Framework**: `Jest`

**Jest:**

1. **Zero Configuration:** `Jest` requires minimal configuration out of the box, reducing setup time.

2. **Simple Syntax:** Its syntax is easy to understand and write, encouraging testing adoption across the team.

3. **Mocking:** `Jest` simplifies mocking complex dependencies, enhancing isolated unit testing.

4. **Parallel Execution:** `Jest`'s parallel test execution speeds up test runs, improving development efficiency.

---

### 6. **Email Verification**: `Nodemailer`

**Nodemailer:**

1. **Backend Integration:** `Nodemailer` is designed for server-side email sending, making it suitable for email verification within the backend.

2. **Customization:** Provides fine-grained control over email content and appearance, ensuring a tailored verification experience.

3. **SMTP Support:** Works with various SMTP providers, allowing you to choose the best option for sending emails.

4. **Error Handling:** `Nodemailer` offers comprehensive error handling, enabling you to manage various email-related scenarios.

5. **Async Capabilities:** Supports asynchronous operations, fitting seamlessly into Node.js's event-driven, non-blocking architecture.

`Nodemailer`'s backend-focused features and flexibility make it a reliable choice for implementing email verification in the project.

---

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

---

## Development Environment

### Tools and Software

- **Operating System:** Ubuntu 22 (Running on VMware Workstation 17)
- **Node.js:** Version 16.20.0
- **npm:** Version 8.19.4
- **Docker:** Version 24.0.5
- **Docker Compose:** Version 2.20.2

## Project Structure

```plaintext
uptime-monitoring-bosta/
├── development/
│   ├── api-docs.md
│   ├── requirements.md
│   ├── project-plan.md
│   ├── todos.md
│   └── screenshots/
├── src/
│   ├── app.ts
│   ├── core/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── notifications/
│   │   ├── plugins/
│   │   ├── services/
│   │   └── ...
│   ├── api/
│   │   ├── first-module/
│   │   │   ├── first-module.controllers.ts
│   │   │   ├── first-module.models.ts
│   │   │   ├── first-module.routes.ts
│   │   │   ├── tests/
│   │   │   └── ...
│   │   ├── second-module/
│   │   │   ├── second-module.controllers.ts
│   │   │   ├── second-module.models.ts
│   │   │   ├── second-module.routes.ts
│   │   │   ├── tests/
│   │   └── └── ...
├── types/
│   ├── ...
│   └── ...
├── .git
├── .gitignore
├── backend.Dockerfile
├── mongo.Dockerfile
├── docker-compose.yml
└── README.md
```

**Explanation of Structure:**

- `development/`: Contains documentation and planning files related to the project's development process.

  - `api-docs.md`: Document that outlines the API specifications and usage.
  - `requirements.md`: Document detailing the project's requirements and specifications.
  - `project-plan.md`: High-level project plan, architecture, and milestones.
  - `todos.md`: List of tasks and features to complete in the project.
  - `screenshots/`: Directory for storing visual aids or screenshots related to the project.

- `src/`: Contains the actual source code of your application.

  - `app.ts`: Entry point of the application.
  - `core/`: Core components and configuration.

    - `config/`: Directory for configuration files.

      - `dbConfig.ts`: Configuration settings for the database.
      - `routesConfig.ts`: Configuration of routes and middleware.

    - `middleware/`: Middleware logic for request handling.
    - `notifications/`: Modules for various notification channels (email, webhook, etc.).
    - `plugins/`: Modules that can be dynamically loaded into the application.
    - `services/`: Core functionalities and business logic of the application.

  - `api/`: API modules organized by functionality.

    - `first-module/`: First module of the API.

      - `first-module.controllers.ts`: Controllers for route handling.
      - `first-module.models.ts`: Data models specific to this module.
      - `first-module.routes.ts`: Route definitions.
      - `tests/`: Unit and integration tests for this module.

    - `second-module/`: Second module of the API.
      - `second-module.controllers.ts`: Controllers for route handling.
      - `second-module.models.ts`: Data models specific to this module.
      - `second-module.routes.ts`: Route definitions.
      - `tests/`: Unit and integration tests for this module.

  - `models/`: Contains data models shared across multiple modules.
  - `routes/`: Contains route definitions for the application.
  - `tests/`: Unit and integration tests for the entire application.

- `types/`: Contains TypeScript type definitions for the application's modules, functions, and variables.

- `.git/`: Hidden folder for Git version control.
- `.gitignore`: Specifies files and directories to ignore in version control.

- `backend.Dockerfile`: Dockerfile for building the backend application.
- `mongo.Dockerfile`: Dockerfile for setting up MongoDB.

- `docker-compose.yml`: Docker Compose file for orchestrating containers.

- `README.md`: Main README file providing an overview of the project, setup instructions, and important information.

## Model Structure (using Mongoose)

Models is divided into components like schema, document interface, model interface, and attributes interface to match the common practice in object-relational mapping (ORM) libraries.

1. **Schema**:

   - The schema defines the structure of the data model.
   - It specifies the fields, their types, validation rules, default values, and more.
   - Schemas provide a blueprint for how the data should be stored in the database.

2. **Document Interface**:

   - A document is an instance of a data model that represents a record in the database.
   - Extends the schema definition and provides additional methods and properties that are specific to individual document instances.
   - Used for interacting with data in a more object-oriented way, enabling to work with documents as JavaScript objects.

3. **Model Interface**:

   - The model interface is an abstraction over the database collection that corresponds to the data model.
   - Provides methods for performing CRUD (Create, Read, Update, Delete) operations on the database.
   - Allows to query the database, create new documents, update existing ones, and more. They encapsulate database interactions and provide a cleaner and more organized way to manage data.

4. **Attributes Interface**:
   - An interface defines the structure of the attributes that can be assigned to a new document before it's created.
   - It's used mainly in the application code when creating new documents or updating existing ones.
   - Helps ensure that you're providing valid data when creating or updating documents.
