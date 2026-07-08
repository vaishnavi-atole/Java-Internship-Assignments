import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { TaskFormData, TaskPriority, TaskStatus } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

function futureOrTodayDateValidator(control: AbstractControl<string>): ValidationErrors | null {
  const selectedDate = control.value;
  const today = new Date().toISOString().split('T')[0];

  if (!selectedDate || selectedDate >= today) {
    return null;
  }

  return { pastDate: true };
}

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly taskService = inject(TaskService);

  readonly priorities: TaskPriority[] = ['High', 'Medium', 'Low'];
  readonly statuses: TaskStatus[] = ['Pending', 'In Progress', 'Completed'];
  readonly today = new Date().toISOString().split('T')[0];

  taskId: string | null = null;
  isEditMode = false;

  readonly taskForm = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    priority: ['Medium' as TaskPriority, [Validators.required]],
    status: ['Pending' as TaskStatus, [Validators.required]],
    dueDate: ['', [Validators.required, futureOrTodayDateValidator]]
  });

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = Boolean(this.taskId);

    if (this.taskId) {
      const task = this.taskService.getTaskById(this.taskId);

      if (!task) {
        this.router.navigate(['/not-found']);
        return;
      }

      this.taskForm.patchValue({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate
      });
    }
  }

  onSubmit(): void {
    this.taskForm.markAllAsTouched();

    if (this.taskForm.invalid) {
      return;
    }

    const formValue = this.taskForm.getRawValue();
    const taskData: TaskFormData = {
      title: formValue.title.trim(),
      description: formValue.description.trim(),
      priority: formValue.priority,
      status: formValue.status,
      dueDate: formValue.dueDate
    };

    if (this.isEditMode && this.taskId) {
      this.taskService.updateTask(this.taskId, taskData);
    } else {
      this.taskService.addTask(taskData);
    }

    this.router.navigate(['/tasks']);
  }

  onReset(): void {
    this.taskForm.reset({
      title: '',
      description: '',
      priority: 'Medium',
      status: 'Pending',
      dueDate: ''
    });
  }

  isInvalid(controlName: keyof typeof this.taskForm.controls): boolean {
    const control = this.taskForm.controls[controlName];

    return control.invalid && (control.dirty || control.touched);
  }

  isPastDate(dateValue: string): boolean {
    return Boolean(dateValue) && dateValue < this.today;
  }
}
