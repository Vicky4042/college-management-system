import api from "./api";

export interface Course {
  id: string;
  courseCode: string;
  courseName: string;
  description: string;
  department: string;
  credits: number;
  instructor: string;
  schedule: string;
  classroom: string;
  duration: string;
  semester: string;
  enrolledStudents: number;
  maxCapacity: number;
  prerequisites: string;
}

export const courseService = {
  getAll: async (): Promise<Course[]> => {
    const response = await api.get("/courses");
    return response.data;
  },

  getById: async (id: string): Promise<Course> => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  create: async (data: Partial<Course>): Promise<Course> => {
    const response = await api.post("/courses", data);
    return response.data;
  },

  update: async (id: string, data: Partial<Course>): Promise<Course> => {
    const response = await api.put(`/courses/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/courses/${id}`);
  },

  getByDepartment: async (department: string): Promise<Course[]> => {
    const response = await api.get(`/courses?department=${department}`);
    return response.data;
  },
};
