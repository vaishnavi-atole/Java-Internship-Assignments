export type AttendanceStatus = 'PRESENT' | 'ABSENT';

export interface Attendance {
  id: number;
  studentId: number;
  studentName: string;
  date: string;
  status: AttendanceStatus;
  remarks: string | null;
  markedBy: string;
  updatedAt: string;
}

export interface AttendanceRequest {
  date: string;
  status: AttendanceStatus;
  remarks: string;
}
