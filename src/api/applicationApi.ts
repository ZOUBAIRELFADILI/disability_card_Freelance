const API_BASE_URL = 'https://api.ndaid.help/api';

export interface DisabilityApplicationRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  emiratesId: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  emirate: string;
  disabilityType: string;
  disabilityDescription: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  includeLanyard: boolean;
  medicalDocuments?: File[];
  profilePicture?: File;
}

export interface CarersApplicationRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  emiratesId: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  emirate: string;
  careRecipientName: string;
  relationshipToRecipient: string;
  caregivingExperience: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  includeLanyard: boolean;
  supportingDocuments?: File[];
  profilePicture?: File;
}

export interface CustomerSupportApplicationRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  emiratesId: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  emirate: string;
  supportType: string;
  supportDescription: string;
  specialRequirements: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  includeLanyard: boolean;
  profilePicture?: File;
}

export interface ApplicationResponse {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  emiratesId: string;
  disabilityType: string;
  disabilityDescription?: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  emirate: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  applicationStatus: string;
  createdAt: string;
  updatedAt?: string;
}

class ApplicationAPI {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
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

  async submitDisabilityApplication(application: DisabilityApplicationRequest): Promise<ApplicationResponse> {
    // First, submit the application data as JSON (without files)
    const applicationData = {
      firstName: application.firstName,
      lastName: application.lastName,
      dateOfBirth: application.dateOfBirth,
      gender: application.gender,
      nationality: application.nationality,
      emiratesId: application.emiratesId,
      phoneNumber: application.phoneNumber,
      email: application.email,
      address: application.address,
      city: application.city,
      emirate: application.emirate,
      disabilityType: application.disabilityType,
      disabilityDescription: application.disabilityDescription,
      emergencyContactName: application.emergencyContactName,
      emergencyContactPhone: application.emergencyContactPhone,
      includeLanyard: application.includeLanyard,
    };

    const response = await this.makeRequest<ApplicationResponse>('/DisabilityApplication', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });

    // If files are provided, upload them separately
    if (application.medicalDocuments && application.medicalDocuments.length > 0) {
      for (const file of application.medicalDocuments) {
        await this.uploadMedicalDocument(response.id, file);
      }
    }

    // If profile picture is provided, upload it separately
    if (application.profilePicture) {
      await this.uploadProfilePicture(response.id, application.profilePicture);
    }

    return response;
  }

  async uploadMedicalDocument(applicationId: number, file: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/DisabilityApplication/${applicationId}/medical-documents`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'File upload failed');
    }
  }

  async uploadProfilePicture(applicationId: number, file: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/DisabilityApplication/${applicationId}/profile-picture`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Profile picture upload failed');
    }
  }

  async uploadCarersProfilePicture(applicationId: number, file: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/CarersApplication/${applicationId}/profile-picture`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Profile picture upload failed');
    }
  }

  async uploadCustomerSupportProfilePicture(applicationId: number, file: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/CustomerSupportApplication/${applicationId}/profile-picture`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Profile picture upload failed');
    }
  }

  async submitCarersApplication(application: CarersApplicationRequest): Promise<ApplicationResponse> {
    let supportingDocumentNames: string[] = [];

    // First, upload supporting documents if any
    if (application.supportingDocuments && application.supportingDocuments.length > 0) {
      supportingDocumentNames = await this.uploadCarersSupportingDocuments(application.supportingDocuments);
    }

    // Submit the application data as JSON with supporting document names
    const applicationData = {
      firstName: application.firstName,
      lastName: application.lastName,
      dateOfBirth: application.dateOfBirth,
      gender: application.gender,
      nationality: application.nationality,
      emiratesId: application.emiratesId,
      phoneNumber: application.phoneNumber,
      email: application.email,
      address: application.address,
      city: application.city,
      emirate: application.emirate,
      careRecipientName: application.careRecipientName,
      relationshipToRecipient: application.relationshipToRecipient,
      caregivingExperience: application.caregivingExperience,
      emergencyContactName: application.emergencyContactName,
      emergencyContactPhone: application.emergencyContactPhone,
      supportingDocuments: supportingDocumentNames,
      includeLanyard: application.includeLanyard,
    };

    const response = await this.makeRequest<ApplicationResponse>('/CarersApplication', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });

    // Upload profile picture if provided
    if (application.profilePicture) {
      try {
        await this.uploadCarersProfilePicture(response.id, application.profilePicture);
      } catch (error) {
        console.warn('Failed to upload profile picture:', error);
        // Application was created successfully, profile picture upload is optional
      }
    }

    return response;
  }

  async uploadCarersSupportingDocuments(files: File[]): Promise<string[]> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    const response = await fetch(`${API_BASE_URL}/CarersApplication/upload-documents`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'File upload failed');
    }

    return response.json();
  }

  async submitCustomerSupportApplication(application: CustomerSupportApplicationRequest): Promise<ApplicationResponse> {
    // Submit the application data as JSON
    const applicationData = {
      firstName: application.firstName,
      lastName: application.lastName,
      dateOfBirth: application.dateOfBirth,
      gender: application.gender,
      nationality: application.nationality,
      emiratesId: application.emiratesId,
      phoneNumber: application.phoneNumber,
      email: application.email,
      address: application.address,
      city: application.city,
      emirate: application.emirate,
      supportType: application.supportType,
      supportDescription: application.supportDescription,
      specialRequirements: application.specialRequirements,
      emergencyContactName: application.emergencyContactName,
      emergencyContactPhone: application.emergencyContactPhone,
      includeLanyard: application.includeLanyard,
    };

    const response = await this.makeRequest<ApplicationResponse>('/CustomerSupportApplication', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });

    // Upload profile picture if provided
    if (application.profilePicture) {
      try {
        await this.uploadCustomerSupportProfilePicture(response.id, application.profilePicture);
      } catch (error) {
        console.warn('Failed to upload profile picture:', error);
        // Application was created successfully, profile picture upload is optional
      }
    }

    return response;
  }
}

export const applicationAPI = new ApplicationAPI();
