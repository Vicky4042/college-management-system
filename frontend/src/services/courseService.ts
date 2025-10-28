import axios from 'axios';

export interface Course {
  id: string;
  courseCode: string;        // added
  courseName: string;        // added
  description: string;       // added
  department: string;
  credits: number;
  instructor: string;        // added
  schedule: string;          // added
  classroom: string;         // added
  duration: string;          // added
  semester: string;          // added
  enrolledStudents: number;  // added
  maxCapacity: number;       // added
  prerequisites: string;     // added
}

// Update the backend port here
const API_URL = 'http://localhost:9090/api/courses';

export const courseService = {
  getAll: async (): Promise<Course[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getById: async (id: string): Promise<Course> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  create: async (data: Partial<Course>): Promise<Course> => {
    const response = await axios.post(API_URL, data);
    return response.data;
  },

  update: async (id: string, data: Partial<Course>): Promise<Course> => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },

  getByDepartment: async (department: string): Promise<Course[]> => {
    const response = await axios.get(`${API_URL}?department=${department}`);
    return response.data;
  },
};
