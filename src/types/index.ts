export type UserRole = 'admin' | 'manager' | 'executor' | 'viewer';

export type RequestStatus = 'new' | 'in_progress' | 'pending' | 'completed' | 'cancelled';
export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';
export type Priority = 'low' | 'medium' | 'high' | 'critical';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  phone?: string;
  createdAt: string;
}

export interface Request {
  id: string;
  title: string;
  description: string;
  status: RequestStatus;
  priority: Priority;
  createdBy: string;
  assignedTo?: string;
  objectId?: string;
  createdAt: string;
  updatedAt: string;
  deadline?: string;
  tags?: string[];
  comments?: Comment[];
}

export interface ServiceObject {
  id: string;
  name: string;
  type: string;
  address: string;
  description?: string;
  status: 'active' | 'inactive' | 'maintenance';
  responsible?: string;
  createdAt: string;
  requestsCount: number;
  tasksCount: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  assignedTo: string;
  requestId?: string;
  objectId?: string;
  createdAt: string;
  updatedAt: string;
  deadline?: string;
  progress: number;
  tags?: string[];
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: string;
  attachments?: string[];
}

export interface DashboardStats {
  totalRequests: number;
  activeRequests: number;
  completedRequests: number;
  totalTasks: number;
  completedTasks: number;
  totalObjects: number;
  activeUsers: number;
}
