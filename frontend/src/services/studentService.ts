import axios from 'axios';

export interface Student {
  id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  department: string;
}

export interface StudentMark {
  id: string;
  studentId: string;
  studentName: string;
  course: string;
  marks: number;
  semester: string;
  totalMarks: number;   // total marks of the exam/course
  percentage: number;   // marks / totalMarks * 100
  gpa: number;   
}

// Backend base URLs
const API_BASE_URL = (import.meta as any).env.VITE_API_BASE_URL  || 'http://localhost:8080/api';
const STUDENT_API = `${API_BASE_URL}/students`;
const MARKS_API = `${API_BASE_URL}/marks`;
export const studentService = {
  getAllStudents: async (): Promise<Student[]> => {
    const response = await axios.get(STUDENT_API);
    return response.data;
  },

  getStudentById: async (id: string): Promise<Student> => {
    const response = await axios.get(`${STUDENT_API}/${id}`);
    return response.data;
  },

  createStudent: async (data: Partial<Student>): Promise<Student> => {
    const response = await axios.post(STUDENT_API, data);
    return response.data;
  },

  updateStudent: async (id: string, data: Partial<Student>): Promise<Student> => {
    const response = await axios.put(`${STUDENT_API}/${id}`, data);
    return response.data;
  },

  deleteStudent: async (id: string): Promise<void> => {
    await axios.delete(`${STUDENT_API}/${id}`);
  },

  searchStudentMarks: async (query: string): Promise<StudentMark[]> => {
    try {
      if (!query.trim()) return [];
      const response = await axios.get(`${MARKS_API}/search?query=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Failed to search student marks:', error);
      throw new Error('Failed to search student marks');
    }
  },
};
