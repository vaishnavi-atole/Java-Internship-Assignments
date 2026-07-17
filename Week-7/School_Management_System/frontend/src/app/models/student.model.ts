export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export interface Student {
  id: number;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: Gender;
  dateOfBirth: string | null;
  department: string;
  course: string;
  semester: string;
  section: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: Gender;
  dateOfBirth: string | null;
  department: string;
  course: string;
  semester: string;
  section: string;
  address: string;
  loginPassword?: string;
}
