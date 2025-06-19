export interface IJob {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary: string;
  type: 'full-time' | 'part-time' | 'contract';
  postedDate: Date;
}

export interface JobCreateInput extends Omit<IJob, 'id' | 'postedDate'> {}

export interface IUser {
  _id: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

export interface UserCreateInput extends Omit<IUser, '_id'> {}