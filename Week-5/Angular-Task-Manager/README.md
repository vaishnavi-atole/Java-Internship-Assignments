# Task Manager UI

Task Manager UI is a beginner-friendly Angular 20 standalone application that allows users to manage daily tasks efficiently. The application supports CRUD (Create, Read, Update, Delete) operations using Angular Reactive Forms, Angular Routing, TypeScript, CSS, and browser LocalStorage for data persistence.

## Features

- View all tasks
- Add new tasks
- Edit existing tasks
- Delete tasks
- Form validation using Angular Reactive Forms
- Angular Routing for navigation
- LocalStorage persistence across browser refreshes
- Responsive and user-friendly interface
- 404 Not Found page for invalid routes

## Technologies Used

- Angular 20
- TypeScript
- HTML5
- CSS3
- Angular Router
- Angular Reactive Forms
- LocalStorage

## Angular Version

This project was generated using Angular CLI 20 and uses Angular Standalone Components.

## Folder Structure

```text
src/app/
  components/
    dashboard/
    navbar/
    not-found/
    task-card/
    task-form/
    task-list/
  guards/
  interfaces/
  models/
    task.model.ts
  pipes/
  services/
    task.service.ts
  app.config.ts
  app.routes.ts
  app.ts
```

## Installation

```bash
npm install
```

## Run Project

```bash
ng serve
```

Open the following URL in your browser:

```text
http://localhost:4200/
```

## Build Project

```bash
ng build
```

## Screenshots

Add screenshots after running the application:

- Home Page (Task List)
- Add Task Page
- Edit Task Page
- Validation Messages
- 404 Not Found Page

## LocalStorage Behavior

Tasks are stored in browser LocalStorage. Data remains available after page refresh or browser restart. If LocalStorage is cleared, all saved tasks will be removed.

## Learning Outcomes

- Angular Standalone Components
- Angular Routing
- Reactive Forms and Validation
- CRUD Operations
- LocalStorage Data Management
- Component-Based Architecture
- Clean Code Practices

## Future Improvements

- Task priority management
- Task status tracking
- Search and filter functionality
- Due date reminders
- Export and import tasks
- Unit testing for components and services

## Author

**Vaishnavi Atole**
