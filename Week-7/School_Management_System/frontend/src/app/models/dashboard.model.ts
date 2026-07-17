import { Student } from './student.model';

export interface DepartmentCount {
  department: string;
  total: number;
}

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  maleStudents: number;
  femaleStudents: number;
  departmentCounts: DepartmentCount[];
  recentStudents: Student[];
}
