import axios from 'axios';

export interface FeesSummary {
  totalFeesCollected: number;
  totalOutstanding: number;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  totalFees: number;
  paidAmount: number;
  balanceDue: number;
  dueDate: string;
}

// Update backend API URL
const API_URL = 'http://localhost:9090/api/fees';

export const feeService = {
  getAll: async (): Promise<FeeRecord[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getByStudentId: async (studentId: string): Promise<FeeRecord> => {
    const response = await axios.get(`${API_URL}/student/${studentId}`);
    return response.data;
  },

  create: async (data: Partial<FeeRecord>): Promise<FeeRecord> => {
    const response = await axios.post(API_URL, data);
    return response.data;
  },

  updatePayment: async (id: string, payment: Partial<FeeRecord>): Promise<FeeRecord> => {
    const response = await axios.put(`${API_URL}/${id}`, payment);
    return response.data;
  },

  // Add getSummary method
  getSummary: async (): Promise<FeesSummary> => {
    const response = await axios.get(`${API_URL}/summary`);
    return response.data;
  },

  // Add search method
  search: async (query: string): Promise<FeeRecord[]> => {
    const response = await axios.get(`${API_URL}/search?q=${query}`);
    return response.data;
  },
};
