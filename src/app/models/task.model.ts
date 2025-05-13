export enum TaskStatus {
    ToDo = 'ToDo',
    InProgress = 'InProgress',
    Done = 'Done'
  }
  
export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    createdDate: Date;
    dueDate: Date;
  }
  