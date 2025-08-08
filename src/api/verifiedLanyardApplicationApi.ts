const BASE_URL = import.meta.env.VITE_API_URL;

export interface CreateVerifiedLanyardApplicationRequest {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postCode: string;
  hasExistingCard: boolean;
  cardImage?: File;
}

export interface VerifiedLanyardApplicationResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postCode: string;
  hasExistingCard: boolean;
  cardImagePath?: string;
  applicationStatus: string;
  createdAt: string;
  updatedAt?: string;
  adminNotes?: string;
  rejectionReason?: string;
  trackingNumber?: string;
  shippedAt?: string;
  deliveredAt?: string;
}

export interface UpdateVerifiedLanyardApplicationStatusRequest {
  status: string; // "Under Review", "Approved", "Rejected", "Shipped", "Delivered"
  adminNotes?: string;
  rejectionReason?: string;
  trackingNumber?: string;
}

export interface VerifiedLanyardApplicationsResponse {
  applications: VerifiedLanyardApplicationResponse[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

export interface VerifiedLanyardApplicationStats {
  total: number;
  pending: number;
  underReview: number;
  approved: number;
  rejected: number;
  shipped: number;
  delivered: number;
}

class VerifiedLanyardApplicationAPI {
  private getAuthHeaders() {
    const token = localStorage.getItem('adminToken');
    return {
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }

  async createApplication(applicationData: CreateVerifiedLanyardApplicationRequest): Promise<{ message: string; application: VerifiedLanyardApplicationResponse; applicationId: number }> {
    const formData = new FormData();
    formData.append('firstName', applicationData.firstName);
    formData.append('lastName', applicationData.lastName);
    formData.append('email', applicationData.email);
    formData.append('address', applicationData.address);
    formData.append('city', applicationData.city);
    formData.append('postCode', applicationData.postCode);
    formData.append('hasExistingCard', applicationData.hasExistingCard.toString());
    
    if (applicationData.cardImage) {
      formData.append('cardImage', applicationData.cardImage);
    }

    const response = await fetch(`${API_BASE_URL}/VerifiedLanyardApplication`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create application');
    }

    return response.json();
  }

  async getApplications(
    page: number = 1,
    pageSize: number = 10,
    status?: string,
    fromDate?: string,
    toDate?: string,
    search?: string
  ): Promise<VerifiedLanyardApplicationsResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    if (status) params.append('status', status);
    if (fromDate) params.append('fromDate', fromDate);
    if (toDate) params.append('toDate', toDate);
    if (search) params.append('search', search);

    const response = await fetch(`${API_BASE_URL}/VerifiedLanyardApplication?${params}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch applications');
    }

    return response.json();
  }

  async getApplication(id: number): Promise<VerifiedLanyardApplicationResponse> {
    const response = await fetch(`${API_BASE_URL}/VerifiedLanyardApplication/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch application');
    }

    return response.json();
  }

  async updateApplicationStatus(id: number, statusData: UpdateVerifiedLanyardApplicationStatusRequest): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/VerifiedLanyardApplication/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(statusData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update application status');
    }

    return response.json();
  }

  async getApplicationStats(): Promise<VerifiedLanyardApplicationStats> {
    const response = await fetch(`${API_BASE_URL}/VerifiedLanyardApplication/stats`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch application statistics');
    }

    return response.json();
  }

  async deleteApplication(id: number): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/VerifiedLanyardApplication/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete application');
    }

    return response.json();
  }
}

export const verifiedLanyardApplicationAPI = new VerifiedLanyardApplicationAPI();
