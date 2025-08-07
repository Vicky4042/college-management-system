// Updated course service using backend API
import { apiService } from './apiService';

export interface Course {
  id: string;
  courseCode: string;
  courseName: string;
  department: string;
  credits: number;
  duration: string;
  instructor: string;
  schedule: string;
  classroom: string;
  description: string;
  prerequisites: string;
  enrolledStudents: number;
  maxCapacity: number;
  semester: string;
}

export const courseService = {
  async getAllCourses(): Promise<Course[]> {
    try {
      return await apiService.courses.getAll();
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      throw new Error('Failed to load courses');
    }
  },

  async getCourseById(id: string): Promise<Course> {
    try {
      return await apiService.courses.getById(id);
    } catch (error) {
      console.error('Failed to fetch course:', error);
      throw new Error('Course not found');
    }
  },

  async getCoursesByDepartment(department: string): Promise<Course[]> {
    try {
      return await apiService.courses.getByDepartment(department);
    } catch (error) {
      console.error('Failed to fetch courses by department:', error);
      throw new Error('Failed to load courses');
    }
  },

  async createCourse(course: Omit<Course, 'id'>): Promise<Course> {
    try {
      return await apiService.courses.create(course);
    } catch (error) {
      console.error('Failed to create course:', error);
      throw new Error('Failed to create course');
    }
  },

  async updateCourse(id: string, course: Partial<Course>): Promise<Course> {
    try {
      return await apiService.courses.update(id, course);
    } catch (error) {
      console.error('Failed to update course:', error);
      throw new Error('Failed to update course');
    }
  },

  async deleteCourse(id: string): Promise<void> {
    try {
      await apiService.courses.delete(id);
    } catch (error) {
      console.error('Failed to delete course:', error);
      throw new Error('Failed to delete course');
    }
  },
};