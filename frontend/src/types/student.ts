export interface Student {
  id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  department: string;
}

export interface SubjectMark {
  name: string;
  marks: number;
  maxMarks: number;
}

export interface StudentMark {
  id: string;
  studentId: string;
  studentName: string;
  course: string;
  semester: string;
  marks: number;
  totalMarks: number;
  maxTotalMarks: number;
  percentage: number;
  gpa: number;
  subjects: SubjectMark[];
}
