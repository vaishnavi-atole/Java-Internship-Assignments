import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard').then((component) => component.Dashboard)
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./components/task-list/task-list').then((component) => component.TaskList)
  },
  {
    path: 'tasks/add',
    loadComponent: () =>
      import('./components/task-form/task-form').then((component) => component.TaskForm)
  },
  {
    path: 'tasks/edit/:id',
    loadComponent: () =>
      import('./components/task-form/task-form').then((component) => component.TaskForm)
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./components/not-found/not-found').then((component) => component.NotFound)
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];
