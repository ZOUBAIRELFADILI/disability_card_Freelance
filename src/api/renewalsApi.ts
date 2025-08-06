// API functions for renewal applications
const BASE_URL = 'https://api.ndaid.help/api';

export interface RenewalApplication {
  id: number;
  cardNumber?: string;
  firstName: string;
  lastName: string;
  emiratesId?: string;
  phoneNumber: string;
  email: string;
  renewalReason: string;
  hasChanges: boolean;
  changesDescription?: string;
  cardType: 'disability' | 'carer' | 'customer_support';
  renewalStatus: string; // Changed from 'status' to 'renewalStatus' to match backend
  createdAt: string;
  updatedAt?: string;
  adminNotes?: string;
  originalApplicationId?: number; // Added from backend
  // Additional fields for carers
  careRecipientName?: string;
  relationshipToCareRecipient?: string;
  // Additional fields for customer support
  supportType?: string;
  supportDescription?: string;
}

export interface RenewalsResponse {
  applications: RenewalApplication[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

export interface UpdateRenewalStatusDto {
  status: string;
  adminNotes?: string;
}

// Get renewal applications by card type
export const getRenewalApplications = async (
  cardType: 'disability' | 'carer' | 'customer_support'
): Promise<RenewalApplication[]> => {
  // Map card types to the correct endpoint paths
  const endpointMap = {
    'disability': 'disabilities',
    'carer': 'carers',
    'customer_support': 'customer-support'
  };

  const endpoint = endpointMap[cardType];
  const response = await fetch(`${BASE_URL}/renewal/${endpoint}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch ${cardType} renewal applications`);
  }
  
  const data = await response.json();
  return data; // Backend returns array directly, not paginated response
};

// Get renewal applications for disabilities
export const getDisabilityRenewals = async (): Promise<RenewalApplication[]> => {
  return getRenewalApplications('disability');
};

// Get renewal applications for carers
export const getCarerRenewals = async (): Promise<RenewalApplication[]> => {
  return getRenewalApplications('carer');
};

// Get renewal applications for customer support
export const getCustomerSupportRenewals = async (): Promise<RenewalApplication[]> => {
  return getRenewalApplications('customer_support');
};

// Get single renewal application
export const getRenewalApplication = async (id: number, cardType: 'disability' | 'carer' | 'customer_support'): Promise<RenewalApplication> => {
  // Map card types to the correct endpoint paths
  const endpointMap = {
    'disability': 'disabilities',
    'carer': 'carers',
    'customer_support': 'customer-support'
  };

  const endpoint = endpointMap[cardType];
  const response = await fetch(`${BASE_URL}/renewal/${endpoint}/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch renewal application');
  }
  
  return response.json();
};

// Update renewal application status
export const updateRenewalStatus = async (
  id: number,
  cardType: 'disability' | 'carer' | 'customer_support',
  updateData: UpdateRenewalStatusDto
): Promise<void> => {
  // Map card types to the correct endpoint paths
  const endpointMap = {
    'disability': 'disabilities',
    'carer': 'carers',
    'customer_support': 'customer-support'
  };

  const endpoint = endpointMap[cardType];
  const response = await fetch(`${BASE_URL}/renewal/${endpoint}/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update renewal application status');
  }
};

// Delete renewal application
export const deleteRenewalApplication = async (id: number, cardType: 'disability' | 'carer' | 'customer_support'): Promise<void> => {
  // Map card types to the correct endpoint paths
  const endpointMap = {
    'disability': 'disabilities',
    'carer': 'carers',
    'customer_support': 'customer-support'
  };

  const endpoint = endpointMap[cardType];
  const response = await fetch(`${BASE_URL}/renewal/${endpoint}/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete renewal application');
  }
};

// Get renewal statistics - Note: Backend doesn't have stats endpoint, we'll calculate from data
export const getRenewalStats = async () => {
  // Since backend doesn't have a stats endpoint, we'll return a mock structure
  // and calculate stats from the applications data in the components
  return {
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  };
};
