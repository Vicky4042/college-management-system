// Updated fee service using backend API
import { apiService } from './apiService';

export interface FeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  course: string;
  semester: string;
  totalFees: number;
  feePaid: number;
  balanceDue: number;
  lastPaymentDate: string;
  lastPaymentAmount: number;
  paymentStatus: 'Paid' | 'Partial' | 'Pending';
  dueDate: string;
}

export interface FeesSummary {
  totalFeesCollected: number;
  totalOutstanding: number;
  totalStudents: number;
  studentsWithOutstanding: number;
  collectionRate: number;
}

export const feeService = {
  async getAllFeeRecords(): Promise<FeeRecord[]> {
    try {
      return await apiService.fees.getAll();
    } catch (error) {
      console.error('Failed to fetch fee records:', error);
      throw new Error('Failed to load fee records');
    }
  },

  async getFeeRecordByStudentId(studentId: string): Promise<FeeRecord> {
    try {
      return await apiService.fees.getByStudentId(studentId);
    } catch (error) {
      console.error('Failed to fetch fee record:', error);
      throw new Error('Fee record not found');
    }
  },

  async getFeesSummary(): Promise<FeesSummary> {
    try {
      return await apiService.fees.getSummary();
    } catch (error) {
      console.error('Failed to fetch fees summary:', error);
      throw new Error('Failed to load fees summary');
    }
  },

  async searchFeeRecords(query: string): Promise<FeeRecord[]> {
    try {
      if (!query.trim()) {
        return await this.getAllFeeRecords();
      }
      return await apiService.fees.search(query);
    } catch (error) {
      console.error('Failed to search fee records:', error);
      throw new Error('Failed to search fee records');
    }
  },

  async createFeeRecord(fee: Omit<FeeRecord, 'id'>): Promise<FeeRecord> {
    try {
      return await apiService.fees.create(fee);
    } catch (error) {
      console.error('Failed to create fee record:', error);
      throw new Error('Failed to create fee record');
    }
  },

  async updatePayment(id: string, payment: { amount: number; date: string }): Promise<FeeRecord> {
    try {
      return await apiService.fees.updatePayment(id, payment);
    } catch (error) {
      console.error('Failed to update payment:', error);
      throw new Error('Failed to update payment');
    }
  },
};