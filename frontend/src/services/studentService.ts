// Updated student service using backend API
import { apiService } from './apiService';

export interface Student {
  id: string;
  studentId: string;
  studentName: string;
  course: string;
  semester: string;
  email: string;
  phone?: string;
  department: string;
}

export interface StudentMark {
  id: string;
  studentId: string;
  studentName: string;
  course: string;
  semester: string;
  subjects: {
    name: string;
    marks: number;
    totalMarks: number;
    grade: string;
  }[];
  totalMarks: number;
  maxTotalMarks: number;
  percentage: number;
  gpa: number;
}

export const studentService = {
  async getAllStudents(): Promise<Student[]> {
    try {
      return await apiService.students.getAll();
    } catch (error) {
      console.error('Failed to fetch students:', error);
      throw new Error('Failed to load students');
    }
  },

  async getStudentById(id: string): Promise<Student> {
    try {
      return await apiService.students.getById(id);
    } catch (error) {
      console.error('Failed to fetch student:', error);
      throw new Error('Student not found');
    }
  },

  async searchStudentMarks(query: string): Promise<StudentMark[]> {
    try {
      if (!query.trim()) {
        return [];
      }
      return await apiService.marks.search(query);
    } catch (error) {
      console.error('Failed to search student marks:', error);
      throw new Error('Failed to search student marks');
    }
  },

  async getStudentMarks(studentId: string): Promise<StudentMark> {
    try {
      return await apiService.marks.getByStudentId(studentId);
    } catch (error) {
      console.error('Failed to fetch student marks:', error);
      throw new Error('Student marks not found');
    }
  },

  async createStudent(student: Omit<Student, 'id'>): Promise<Student> {
    try {
      return await apiService.students.create(student);
    } catch (error) {
      console.error('Failed to create student:', error);
      throw new Error('Failed to create student');
    }
  },

  async updateStudent(id: string, student: Partial<Student>): Promise<Student> {
    try {
      return await apiService.students.update(id, student);
    } catch (error) {
      console.error('Failed to update student:', error);
      throw new Error('Failed to update student');
    }
  },

  async deleteStudent(id: string): Promise<void> {
    try {
      await apiService.students.delete(id);
    } catch (error) {
      console.error('Failed to delete student:', error);
      throw new Error('Failed to delete student');
    }
  },
};