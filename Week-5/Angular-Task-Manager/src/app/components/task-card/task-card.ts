import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  imports: [DatePipe, RouterLink],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css'
})
export class TaskCard {
  @Input({ required: true }) task!: Task;
  @Input() searchTerm = '';

  @Output() deleteTask = new EventEmitter<string>();
  @Output() completeTask = new EventEmitter<string>();

  get isSearchMatch(): boolean {
    const normalizedSearch = this.searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return false;
    }

    return (
      this.task.title.toLowerCase().includes(normalizedSearch) ||
      this.task.description.toLowerCase().includes(normalizedSearch)
    );
  }

  onDelete(): void {
    this.deleteTask.emit(this.task.id);
  }

  onComplete(): void {
    this.completeTask.emit(this.task.id);
  }
}
