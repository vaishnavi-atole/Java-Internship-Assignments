import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Task, TaskFormData, TaskSortOption, TaskStatus } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly storageKey = 'task-manager-tasks';
  private readonly tasksSubject = new BehaviorSubject<Task[]>(this.loadTasks());

  readonly tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  getTasks(): Task[] {
    return this.tasksSubject.value;
  }

  getTaskById(id: string): Task | undefined {
    return this.getTasks().find((task) => task.id === id);
  }

  addTask(taskData: TaskFormData): void {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };

    this.updateTasks([newTask, ...this.getTasks()]);
  }

  updateTask(id: string, taskData: TaskFormData): void {
    const updatedTasks = this.getTasks().map((task) =>
      task.id === id ? { ...task, ...taskData } : task
    );

    this.updateTasks(updatedTasks);
  }

  deleteTask(id: string): void {
    const remainingTasks = this.getTasks().filter((task) => task.id !== id);
    this.updateTasks(remainingTasks);
  }

  markTaskCompleted(id: string): void {
    const updatedTasks = this.getTasks().map((task) =>
      task.id === id ? { ...task, status: 'Completed' as const } : task
    );

    this.updateTasks(updatedTasks);
  }

  searchTasks(tasks: Task[], searchTerm: string): Task[] {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return tasks;
    }

    return tasks.filter((task) => {
      const title = task.title.toLowerCase();
      const description = task.description.toLowerCase();

      return title.includes(normalizedSearch) || description.includes(normalizedSearch);
    });
  }

  filterTasks(tasks: Task[], status: TaskStatus | 'All'): Task[] {
    if (status === 'All') {
      return tasks;
    }

    return tasks.filter((task) => task.status === status);
  }

  sortTasks(tasks: Task[], sortOption: TaskSortOption): Task[] {
    const priorityRank = {
      High: 1,
      Medium: 2,
      Low: 3
    };

    return [...tasks].sort((firstTask, secondTask) => {
      switch (sortOption) {
        case 'Oldest':
          return new Date(firstTask.createdAt).getTime() - new Date(secondTask.createdAt).getTime();
        case 'Due Date':
          return new Date(firstTask.dueDate).getTime() - new Date(secondTask.dueDate).getTime();
        case 'Priority':
          return priorityRank[firstTask.priority] - priorityRank[secondTask.priority];
        case 'Newest':
        default:
          return new Date(secondTask.createdAt).getTime() - new Date(firstTask.createdAt).getTime();
      }
    });
  }

  private updateTasks(tasks: Task[]): void {
    this.tasksSubject.next(tasks);
    this.saveTasks(tasks);
  }

  private loadTasks(): Task[] {
    const storedTasks = localStorage.getItem(this.storageKey);

    if (!storedTasks) {
      return [];
    }

    try {
      return JSON.parse(storedTasks) as Task[];
    } catch {
      localStorage.removeItem(this.storageKey);
      return [];
    }
  }

  private saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }
}
