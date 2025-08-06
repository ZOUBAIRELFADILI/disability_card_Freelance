const API_BASE_URL = 'https://api.ndaid.help/api';

export interface Partner {
  id: number;
  name: string;
  logo: string | null;
  category: string;
  discount: string;
  location: string | null;
  description: string | null;
}

export const partnersApi = {
  // Get all partners
  async getPartners(category?: string): Promise<Partner[]> {
    try {
      const url = new URL(`${API_BASE_URL}/partners`);
      if (category && category !== 'All') {
        url.searchParams.append('category', category);
      }
      
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching partners:', error);
      throw error;
    }
  },

  // Get partner categories
  async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/partners/categories`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return ['All', ...data]; // Add 'All' as first option
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
};
