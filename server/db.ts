import { User, AttendanceRecord } from '../src/types.js';

export const mockUsers: User[] = [
  { id: 'u_student1', name: 'Rahul Sharma', email: 'student@xyzschool.com', role: 'student', avatar: 'https://i.pravatar.cc/150?u=student1' },
  { id: 'u_parent1', name: 'Mr. Sharma', email: 'parent@xyzschool.com', role: 'parent', relatedStudentIds: ['u_student1'], avatar: 'https://i.pravatar.cc/150?u=parent1' },
  { id: 'u_teacher1', name: 'Neha Sharma', email: 'teacher@xyzschool.com', role: 'teacher', relatedStudentIds: ['u_student1', 'u_student2', 'u_student3'], avatar: 'https://i.pravatar.cc/150?u=teacher1' },
  { id: 'u_principal1', name: 'Dr. Principal', email: 'principal@xyzschool.com', role: 'principal', avatar: 'https://i.pravatar.cc/150?u=principal1' },
  // Extra students for teacher
  { id: 'u_student2', name: 'Aarav Singh', email: 'aarav@xyzschool.com', role: 'student' },
  { id: 'u_student3', name: 'Priya Verma', email: 'priya@xyzschool.com', role: 'student' },
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  { id: 'a1', studentId: 'u_student1', date: '2026-08-16', status: 'present' },
  { id: 'a2', studentId: 'u_student1', date: '2026-08-17', status: 'present' },
  { id: 'a3', studentId: 'u_student1', date: '2026-08-18', status: 'present' },
  { id: 'a4', studentId: 'u_student2', date: '2026-08-18', status: 'absent' },
  { id: 'a5', studentId: 'u_student3', date: '2026-08-18', status: 'present' },
];

export const mockNotifications = [
  { id: 'n1', title: 'Science Fair Tomorrow', message: 'Remember to bring your projects to the main hall by 9 AM.', roles: ['student', 'parent', 'teacher', 'principal'], timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { id: 'n2', title: 'Staff Meeting', message: 'Mandatory staff meeting at 3:30 PM in the staff room.', roles: ['teacher', 'principal'], timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
  { id: 'n3', title: 'Fee Reminder', message: 'Last date for Q3 fee submission is 25th August.', roles: ['parent'], timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  { id: 'n4', title: 'Board Exam Schedule', message: 'The tentative schedule for Class 10 board exams has been released.', roles: ['student', 'parent', 'teacher', 'principal'], timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() },
];

export function getUser(email: string): User | undefined {
  return mockUsers.find(u => u.email === email);
}

export function getNotificationsForUser(userId: string) {
  const user = getUserById(userId);
  if (!user) return [];
  return mockNotifications.filter(n => n.roles.includes(user.role)).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function getUserById(id: string): User | undefined {
  return mockUsers.find(u => u.id === id);
}

export function getStudentAttendanceSummary(studentId: string) {
  const student = getUserById(studentId);
  if (!student || student.role !== 'student') return null;

  const records = mockAttendanceRecords.filter(a => a.studentId === studentId);
  const presentDays = 114; // Mock base values
  const absentDays = 11;
  const total = presentDays + absentDays;
  const percentage = (presentDays / total) * 100;

  return {
    studentId: student.id,
    studentName: student.name,
    attendancePercentage: Number(percentage.toFixed(1)),
    presentDays,
    absentDays,
    recent: records.slice(-5)
  };
}

export function markAttendance(studentId: string, status: 'present' | 'absent', date: string) {
  const id = `a${Date.now()}`;
  mockAttendanceRecords.push({ id, studentId, date, status });
  return { success: true, message: `Marked ${status} for ${date}` };
}
