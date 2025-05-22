export interface Task {
  id: string;
  title: string;
  description: string;
  status: boolean;
  category: string | null;
  live: number | null;
}

export type NewTaskState = Omit<Task, 'id'>;

export interface Category {
  id: string;
  name: string;
  color: string;
}

export type NewCategoryState = Omit<Category, 'id'>;
