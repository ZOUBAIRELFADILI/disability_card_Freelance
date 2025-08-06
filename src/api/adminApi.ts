const API_BASE_URL = 'https://api.ndaid.help/api';
// https://api.ndaid.help/api
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  expiresAt: string;
}

export interface AdminProfile {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  profilePicture?: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface Partner {
  id: number;
  name: string;
  logo: string | null;
  category: string;
  discount: string;
  location: string | null;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreatePartnerRequest {
  name: string;
  category: string;
  discount: string;
  location?: string;
  description?: string;
  logo?: File;
}

export interface UpdatePartnerRequest {
  name?: string;
  category?: string;
  discount?: string;
  location?: string;
  description?: string;
  logo?: File;
}

export interface PartnersResponse {
  data: Partner[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

export interface DashboardStats {
  totalApplications: number;
  totalContactSubmissions: number;
  newContactSubmissions: number;
  donations: {
    total: number;
    totalAmount: number;
    pending: number;
    completed: number;
  };
  disabilityApplications: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  carersApplications: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  customerSupportApplications: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  recentApplications: Array<{
    id: number;
    name: string;
    type: string;
    status: string;
    createdAt: string;
  }>;
}

export interface DisabilityApplication {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  emiratesId: string;
  address: string;
  city: string;
  emirate: string;
  disabilityType: string;
  disabilityDescription: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  applicationStatus: string;
  includeLanyard: boolean;
  createdAt: string;
  profilePicture?: string;
  medicalDocuments: Array<{
    id: number;
    fileName: string;
    filePath: string;
    fileSize: number;
    fileType: string;
    uploadedAt: string;
  }>;
}

export interface CarersApplication {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  emiratesId: string;
  address: string;
  city: string;
  emirate: string;
  careRecipientName: string;
  relationshipToRecipient: string;
  caregivingExperience: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  applicationStatus: string;
  includeLanyard: boolean;
  createdAt: string;
  profilePicture?: string;
}

export interface CustomerSupportApplication {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  emiratesId: string;
  address: string;
  city: string;
  emirate: string;
  supportType: string;
  supportDescription: string;
  specialRequirements: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  applicationStatus: string;
  includeLanyard: boolean;
  createdAt: string;
  profilePicture?: string;
}

export interface ContactSubmission {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  cardTypeOfInterest?: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
}

class AdminAPI {
  private getAuthHeaders() {
    const token = localStorage.getItem('adminToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }

  private getAuthHeadersForUpload() {
    const token = localStorage.getItem('adminToken');
    return {
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('adminToken', data.token);
    return data;
  }

  async getProfile(): Promise<AdminProfile> {
    const response = await fetch(`${API_BASE_URL}/admin/profile`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    return response.json();
  }

  async updateProfile(profileData: FormData): Promise<AdminProfile> {
    const response = await fetch(`${API_BASE_URL}/admin/profile`, {
      method: 'PUT',
      headers: this.getAuthHeadersForUpload(),
      body: profileData,
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    const result = await response.json();
    return result.admin || result;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({
        currentPassword,
        newPassword
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to change password');
    }
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const response = await fetch(`${API_BASE_URL}/admin/dashboard/stats`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard stats');
    }

    return response.json();
  }

  // Disability Applications
  async getDisabilityApplications(page = 1, pageSize = 10, status?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });
    
    if (status) {
      params.append('status', status);
    }

    const response = await fetch(`${API_BASE_URL}/admin/applications/disability?${params}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch disability applications');
    }

    return response.json();
  }

  async getDisabilityApplicationById(id: number): Promise<DisabilityApplication> {
    const response = await fetch(`${API_BASE_URL}/admin/applications/disability/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch disability application');
    }

    return response.json();
  }

  // Carers Applications
  async getCarersApplications(page = 1, pageSize = 10, status?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });
    
    if (status) {
      params.append('status', status);
    }

    const response = await fetch(`${API_BASE_URL}/admin/applications/carers?${params}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch carers applications');
    }

    return response.json();
  }

  async getCarersApplicationById(id: number): Promise<CarersApplication> {
    const response = await fetch(`${API_BASE_URL}/admin/applications/carers/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch carers application');
    }

    return response.json();
  }

  // Customer Support Applications
  async getCustomerSupportApplications(page = 1, pageSize = 10, status?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });
    
    if (status) {
      params.append('status', status);
    }

    const response = await fetch(`${API_BASE_URL}/admin/applications/customer-support?${params}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch customer support applications');
    }

    return response.json();
  }

  async getCustomerSupportApplicationById(id: number): Promise<CustomerSupportApplication> {
    const response = await fetch(`${API_BASE_URL}/admin/applications/customer-support/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch customer support application');
    }

    return response.json();
  }

  // Common application operations
  async updateApplicationStatus(type: 'disability' | 'carers' | 'customer-support', id: number, status: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/applications/${type}/${id}/status`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update application status');
    }
  }

  async deleteApplication(type: 'disability' | 'carers' | 'customer-support', id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/applications/${type}/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete application');
    }
  }

  // Medical document viewing
  async getDocumentUrl(documentId: number): Promise<string> {
    return `${API_BASE_URL}/admin/documents/${documentId}`;
  }

  logout() {
    localStorage.removeItem('adminToken');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('adminToken');
    return !!token;
  }

  // Partner Management Methods
  async getPartners(page: number = 1, pageSize: number = 10, category?: string): Promise<PartnersResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });
    
    if (category) {
      params.append('category', category);
    }

    const response = await fetch(`${API_BASE_URL}/admin/partners?${params}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch partners');
    }

    return response.json();
  }

  async getPartner(id: number): Promise<Partner> {
    const response = await fetch(`${API_BASE_URL}/admin/partners/${id}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch partner');
    }

    return response.json();
  }

  async createPartner(partnerData: CreatePartnerRequest): Promise<Partner> {
    const formData = new FormData();
    formData.append('name', partnerData.name);
    formData.append('category', partnerData.category);
    formData.append('discount', partnerData.discount);
    
    if (partnerData.location) {
      formData.append('location', partnerData.location);
    }
    
    if (partnerData.description) {
      formData.append('description', partnerData.description);
    }
    
    if (partnerData.logo) {
      formData.append('logo', partnerData.logo);
    }

    const response = await fetch(`${API_BASE_URL}/admin/partners`, {
      method: 'POST',
      headers: this.getAuthHeadersForUpload(),
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to create partner');
    }

    const result = await response.json();
    return result.partner;
  }

  async updatePartner(id: number, partnerData: UpdatePartnerRequest): Promise<Partner> {
    const formData = new FormData();
    
    if (partnerData.name) {
      formData.append('name', partnerData.name);
    }
    
    if (partnerData.category) {
      formData.append('category', partnerData.category);
    }
    
    if (partnerData.discount) {
      formData.append('discount', partnerData.discount);
    }
    
    if (partnerData.location) {
      formData.append('location', partnerData.location);
    }
    
    if (partnerData.description) {
      formData.append('description', partnerData.description);
    }
    
    if (partnerData.logo) {
      formData.append('logo', partnerData.logo);
    }

    const response = await fetch(`${API_BASE_URL}/admin/partners/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeadersForUpload(),
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update partner');
    }

    const result = await response.json();
    return result.partner;
  }

  async deletePartner(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/partners/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete partner');
    }
  }

  async getPartnerCategories(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/admin/partner-categories`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch partner categories');
    }

    return response.json();
  }

  // Contact Submissions
  async getContactSubmissions(page = 1, pageSize = 10, status?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });
    
    if (status) {
      params.append('status', status);
    }

    const response = await fetch(`${API_BASE_URL}/admin/contact-submissions?${params}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch contact submissions');
    }

    return response.json();
  }

  async getContactSubmissionById(id: number): Promise<ContactSubmission> {
    const response = await fetch(`${API_BASE_URL}/admin/contact-submissions/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch contact submission');
    }

    return response.json();
  }

  async updateContactSubmissionStatus(id: number, status: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/contact-submissions/${id}/status`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update contact submission status');
    }
  }

  async deleteContactSubmission(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/contact-submissions/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete contact submission');
    }
  }
}

export const adminAPI = new AdminAPI();
