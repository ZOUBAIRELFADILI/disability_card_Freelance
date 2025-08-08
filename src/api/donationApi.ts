const API_BASE_URL = import.meta.env.VITE_API_URL;

export interface CreateDonationRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  donationType: string; // "one-time" or "monthly"
  amount: number;
  isAnonymous: boolean;
  paymentMethod: string;
  needsTaxReceipt: boolean;
  notes?: string;
}

export interface DonationResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  donationType: string;
  amount: number;
  currency: string;
  isAnonymous: boolean;
  paymentMethod: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
  notes?: string;
  needsTaxReceipt: boolean;
  transactionId?: string;
}

export interface UpdateDonationStatusRequest {
  status: string; // "Processing", "Completed", "Failed"
  transactionId?: string;
  notes?: string;
}

export interface DonationStats {
  totalAmount: number;
  totalDonations: number;
  monthlyAmount: number;
  monthlyDonations: number;
  oneTimeAmount: number;
  oneTimeDonations: number;
}

export interface DonationsResponse {
  donations: DonationResponse[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
}

class DonationAPI {
  private getAuthHeaders() {
    const token = localStorage.getItem('adminToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }

  async createDonation(donationData: CreateDonationRequest): Promise<{ message: string; donation: DonationResponse }> {
    const response = await fetch(`${API_BASE_URL}/Donation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donationData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create donation');
    }

    return response.json();
  }

  async getDonations(
    page: number = 1,
    pageSize: number = 10,
    status?: string,
    donationType?: string,
    fromDate?: string,
    toDate?: string
  ): Promise<DonationsResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    if (status) params.append('status', status);
    if (donationType) params.append('donationType', donationType);
    if (fromDate) params.append('fromDate', fromDate);
    if (toDate) params.append('toDate', toDate);

    const response = await fetch(`${API_BASE_URL}/Donation?${params}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch donations');
    }

    return response.json();
  }

  async getDonation(id: number): Promise<DonationResponse> {
    const response = await fetch(`${API_BASE_URL}/Donation/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch donation');
    }

    return response.json();
  }

  async updateDonationStatus(id: number, statusData: UpdateDonationStatusRequest): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/Donation/${id}/status`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(statusData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update donation status');
    }

    return response.json();
  }

  async getDonationStats(): Promise<DonationStats> {
    const response = await fetch(`${API_BASE_URL}/Donation/stats`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch donation statistics');
    }

    return response.json();
  }

  async deleteDonation(id: number): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/Donation/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete donation');
    }

    return response.json();
  }
}

export const donationAPI = new DonationAPI();
