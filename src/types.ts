export type Role = 'student' | 'parent' | 'teacher' | 'principal';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  relatedStudentIds?: string[]; // For parents and teachers
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent';
}

export interface StudentAttendanceSummary {
  studentId: string;
  studentName: string;
  attendancePercentage: number;
  presentDays: number;
  absentDays: number;
  recent: AttendanceRecord[];
}

export interface SchoolAttendanceOverview {
  overallPercentage: number;
  totalStudents: number;
  presentToday: number;
  absentToday: number;
  classBreakdown: {
    className: string;
    percentage: number;
  }[];
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  userId: string;
  messages: Message[];
  updatedAt: string;
}
