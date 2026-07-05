import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';

import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private readonly taskService = inject(TaskService);

  private readonly tasks$ = this.taskService.tasks$;

  readonly totalTasks$: Observable<number> = this.tasks$.pipe(map((tasks) => tasks.length));
  readonly completedTasks$: Observable<number> = this.tasks$.pipe(
    map((tasks) => tasks.filter((task) => task.status === 'Completed').length)
  );
  readonly pendingTasks$: Observable<number> = this.tasks$.pipe(
    map((tasks) => tasks.filter((task) => task.status !== 'Completed').length)
  );
  readonly dashboardData$ = combineLatest([
    this.totalTasks$,
    this.completedTasks$,
    this.pendingTasks$
  ]).pipe(
    map(([totalTasks, completedTasks, pendingTasks]) => ({
      totalTasks,
      completedTasks,
      pendingTasks,
      completionPercentage: this.getCompletionPercentage(totalTasks, completedTasks)
    }))
  );

  getCompletionPercentage(totalTasks: number, completedTasks: number): number {
    if (totalTasks === 0) {
      return 0;
    }

    return Math.round((completedTasks / totalTasks) * 100);
  }
}
