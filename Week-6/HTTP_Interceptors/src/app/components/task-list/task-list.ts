import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { Task, TaskSortOption, TaskStatus } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskCard } from '../task-card/task-card';

@Component({
  selector: 'app-task-list',
  imports: [AsyncPipe, FormsModule, RouterLink, TaskCard],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  private readonly taskService = inject(TaskService);

  readonly statusOptions: Array<TaskStatus | 'All'> = [
    'All',
    'Pending',
    'In Progress',
    'Completed'
  ];
  readonly sortOptions: TaskSortOption[] = ['Newest', 'Oldest', 'Due Date', 'Priority'];

  searchTerm = '';
  selectedStatus: TaskStatus | 'All' = 'All';
  selectedSort: TaskSortOption = 'Newest';

  readonly tasks$: Observable<Task[]> = this.taskService.tasks$;

  getVisibleTasks(tasks: Task[]): Task[] {
    const searchedTasks = this.taskService.searchTasks(tasks, this.searchTerm);
    const filteredTasks = this.taskService.filterTasks(searchedTasks, this.selectedStatus);

    return this.taskService.sortTasks(filteredTasks, this.selectedSort);
  }

  deleteTask(taskId: string): void {
    const shouldDelete = confirm('Are you sure you want to delete this task?');

    if (shouldDelete) {
      this.taskService.deleteTask(taskId);
    }
  }

  markTaskCompleted(taskId: string): void {
    this.taskService.markTaskCompleted(taskId);
  }

  trackByTaskId(_index: number, task: Task): string {
    return task.id;
  }
}
