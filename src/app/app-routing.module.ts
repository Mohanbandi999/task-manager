// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },  // Default route
  { path: 'tasks', component: TaskListComponent },
  { path: 'create', component: TaskFormComponent },
  { path: '**', redirectTo: '/tasks' }  // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
