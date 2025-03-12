export interface Task {
    _id?: string;
    title: string;
    description: string;
    status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    dueDate: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface CreateTaskDto {
    title: string;
    description: string;
    status: Task['status'];
    priority: Task['priority'];
    dueDate: string;
  }
  
  export interface UpdateTaskDto extends Partial<CreateTaskDto> {
    id: string;
  }