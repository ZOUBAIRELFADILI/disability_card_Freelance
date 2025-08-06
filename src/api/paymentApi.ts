import { ConfirmBankTransferDto, CreatePaymentDto, Payment, UpdatePaymentStatusDto } from './paymentTypes';

const API_BASE_URL = 'https://api.ndaid.help/api';

class PaymentAPI {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Request failed');
    }

    return response.json();
  }

  // Create a new payment
  async createPayment(paymentData: CreatePaymentDto): Promise<Payment> {
    return this.makeRequest<Payment>('/Payment', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  // Get payment by application
  async getPaymentByApplication(applicationType: string, applicationId: number): Promise<Payment | null> {
    try {
      return await this.makeRequest<Payment>(`/Payment/application/${applicationType}/${applicationId}`);
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        return null;
      }
      throw error;
    }
  }

  // Confirm bank transfer
  async confirmBankTransfer(paymentId: number, transferData: ConfirmBankTransferDto): Promise<Payment> {
    return this.makeRequest<Payment>(`/Payment/${paymentId}/confirm-transfer`, {
      method: 'POST',
      body: JSON.stringify(transferData),
    });
  }

  // Skip payment
  async skipPayment(paymentId: number): Promise<Payment> {
    return this.makeRequest<Payment>(`/Payment/${paymentId}/skip`, {
      method: 'POST',
    });
  }

  // Admin: Get all payments with pagination
  async getAllPayments(page: number = 1, pageSize: number = 10, status?: string): Promise<{
    payments: Payment[];
    pagination: {
      currentPage: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  }> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });
      
      if (status) {
        params.append('status', status);
      }

      const response = await this.makeRequest<any>(`/Payment?${params.toString()}`);
      
      // If the backend returns unexpected data, provide fallbacks
      if (!response) {
        return {
          payments: [],
          pagination: {
            currentPage: page,
            pageSize: pageSize,
            totalItems: 0,
            totalPages: 1,
            hasNextPage: false,
            hasPreviousPage: false
          }
        };
      }
      
      // Handle case where payments might not be in the expected format
      return {
        payments: Array.isArray(response.payments) ? response.payments : [],
        pagination: response.pagination || {
          currentPage: page,
          pageSize: pageSize,
          totalItems: 0,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false
        }
      };
    } catch (error) {
      console.error('Error in getAllPayments:', error);
      // Return empty data on error
      return {
        payments: [],
        pagination: {
          currentPage: page,
          pageSize: pageSize,
          totalItems: 0,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false
        }
      };
    }
  }

  // Admin: Update payment status
  async updatePaymentStatus(paymentId: number, statusData: UpdatePaymentStatusDto): Promise<Payment> {
    return this.makeRequest<Payment>(`/Payment/${paymentId}/status`, {
      method: 'PUT',
      body: JSON.stringify(statusData),
    });
  }

  // Admin: Get payment by ID
  async getPaymentById(paymentId: number): Promise<Payment> {
    return this.makeRequest<Payment>(`/Payment/${paymentId}`);
  }

  // Get payment by application for user
  async getUserPayment(applicationType: string, applicationId: number): Promise<Payment | null> {
    try {
      return await this.makeRequest<Payment>(`/Payment/user/${applicationType}/${applicationId}`);
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        return null;
      }
      throw error;
    }
  }
}

export const paymentAPI = new PaymentAPI();
export default PaymentAPI;
