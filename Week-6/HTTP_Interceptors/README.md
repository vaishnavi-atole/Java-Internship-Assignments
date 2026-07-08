# Task Manager

Task Manager is a beginner-friendly Angular 20 standalone application for creating, tracking, searching, filtering, sorting, and completing tasks. It uses Angular Reactive Forms, Angular Router, TypeScript, CSS, and browser LocalStorage only.

## Features

- View all saved tasks
- Add, edit, delete, and mark tasks as completed
- Search by task title or description
- Filter by All, Pending, In Progress, and Completed
- Sort by Newest, Oldest, Due Date, and Priority
- Dashboard with total, completed, pending, and completion percentage
- LocalStorage persistence across refreshes and browser reloads
- Responsive card-based UI without Bootstrap, Tailwind, or Material UI

## Angular Version

This project was generated with Angular CLI 20.3.30 and uses Angular 20 standalone components.

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
npm start
```

Open `http://localhost:4200/` in the browser.

## Build

```bash
npm run build
```

## Screenshots

Add screenshots here after running the project:

- Dashboard and task list
- Add task form
- Edit task form
- Empty state

## LocalStorage Behavior

Tasks are saved under the `task-manager-tasks` LocalStorage key. Tasks remain after refresh, page reload, and application restart. If browser storage is cleared, saved tasks disappear.

## Future Improvements

- Add due date reminders
- Add task categories or tags
- Add drag-and-drop status changes
- Add export and import JSON support
- Add unit tests for the service and form validations
