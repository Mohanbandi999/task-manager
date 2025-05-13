import { Component, OnInit } from '@angular/core';
import { Task, TaskStatus } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  taskId: number | null = null;
  isEditMode: boolean = false;
  TaskStatus = TaskStatus;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.taskId = params['id'] ? +params['id'] : null;
      this.isEditMode = !!this.taskId;
    });

    // Create the form
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: [TaskStatus.ToDo],
      dueDate: ['', Validators.required]
    });

    if (this.isEditMode && this.taskId) {
      // If editing, load the task data
      this.loadTask(this.taskId);
    }
  }

  loadTask(id: number): void {
    this.taskService.getTask(id).subscribe((task) => {
      this.taskForm.patchValue(task); // Populate form with task data
    });
  }

  saveTask(): void {
    if (this.taskForm.invalid) {
      return;
    }

    const taskData = this.taskForm.value;
    if (this.isEditMode && this.taskId) {
      taskData.id = this.taskId; // Ensure taskId is sent when updating
      this.taskService.updateTask(taskData).subscribe(() => {
        this.router.navigate(['/tasks']); // Navigate after successful update
      });
    } else {
      this.taskService.addTask(taskData).subscribe(() => {
        this.router.navigate(['/tasks']); // Navigate after task creation
      });
    }
  }
}
