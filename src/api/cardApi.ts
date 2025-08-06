// API functions for card management
const BASE_URL = 'https://api.ndaid.help/api';

export interface Card {
  id: number;
  cardNumber: string;
  cardholderName: string;
  cardType: string;
  issuedDate: string;
  expiryDate: string;
  status: string;
  originalApplicationId?: number;
  originalApplicationType?: string;
  createdAt: string;
  updatedAt?: string;
  notes?: string;
}

export interface CreateCardDto {
  cardNumber: string;
  cardholderName: string;
  cardType: string;
  issuedDate: string;
  expiryDate: string;
  status: string;
  originalApplicationId?: number;
  originalApplicationType?: string;
  notes?: string;
}

export interface TrackCardDto {
  cardNumber: string;
}

export interface UpdateCardDto {
  cardNumber?: string;
  cardholderName?: string;
  cardType?: string;
  issuedDate?: string;
  expiryDate?: string;
  status?: string;
  notes?: string;
}

export interface TrackCardResponse {
  message: string;
  found: boolean;
  card?: Card;
}

// Create a new card
export const createCard = async (cardData: CreateCardDto): Promise<Card> => {
  const response = await fetch(`${BASE_URL}/card`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cardData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create card');
  }

  const data = await response.json();
  return data.card;
};

// Get all cards
export const getAllCards = async (): Promise<Card[]> => {
  const response = await fetch(`${BASE_URL}/card`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch cards');
  }
  
  return response.json();
};

// Get card by ID
export const getCardById = async (id: number): Promise<Card> => {
  const response = await fetch(`${BASE_URL}/card/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch card');
  }
  
  return response.json();
};

// Track card by card number
export const trackCard = async (cardNumber: string): Promise<TrackCardResponse> => {
  const response = await fetch(`${BASE_URL}/card/track`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cardNumber }),
  });

  if (!response.ok) {
    const error = await response.json();
    if (response.status === 404) {
      return { message: error.message, found: false };
    }
    throw new Error(error.message || 'Failed to track card');
  }

  return response.json();
};

// Update card
export const updateCard = async (id: number, updateData: UpdateCardDto): Promise<Card> => {
  const response = await fetch(`${BASE_URL}/card/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update card');
  }

  const data = await response.json();
  return data.card;
};

// Delete card
export const deleteCard = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/card/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete card');
  }
};

// Get cards by type
export const getCardsByType = async (cardType: string): Promise<Card[]> => {
  const response = await fetch(`${BASE_URL}/card/type/${cardType}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch cards by type');
  }
  
  return response.json();
};

// Check if card number exists
export const checkCardNumberExists = async (cardNumber: string): Promise<boolean> => {
  const response = await fetch(`${BASE_URL}/card/check-number/${cardNumber}`);
  
  if (!response.ok) {
    throw new Error('Failed to check card number');
  }
  
  const data = await response.json();
  return data.exists;
};

// Get card by application ID and type
export const getCardByApplication = async (applicationId: number, cardType: string): Promise<Card | null> => {
  const response = await fetch(`${BASE_URL}/card/application/${applicationId}/${cardType}`);
  
  if (response.status === 404) {
    return null; // No card found for this application
  }
  
  if (!response.ok) {
    throw new Error('Failed to check existing card');
  }
  
  const data = await response.json();
  return data.card;
};

// Remove duplicate cards
export const removeDuplicateCards = async (): Promise<{ removedCount: number }> => {
  const response = await fetch(`${BASE_URL}/card/remove-duplicates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to remove duplicate cards');
  }

  return response.json();
};
