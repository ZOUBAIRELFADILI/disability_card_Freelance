import { useEffect, useState } from 'react';

export interface NotificationCounts {
  disabilities: number;
  carers: number;
  support: number;
  lanyards: number;
  donations: number;
  'renewal-disabilities': number;
  'renewal-carers': number;
  'renewal-support': number;
  contact: number;
}

// Track viewed applications locally
interface ViewedApplications {
  disabilities: Set<number>;
  carers: Set<number>;
  support: Set<number>;
  lanyards: Set<number>;
  donations: Set<number>;
  'renewal-disabilities': Set<number>;
  'renewal-carers': Set<number>;
  'renewal-support': Set<number>;
  contact: Set<number>;
}

const getStoredViewedApplications = (): ViewedApplications => {
  try {
    const stored = localStorage.getItem('viewedApplications');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert arrays back to Sets
      return {
        disabilities: new Set(parsed.disabilities || []),
        carers: new Set(parsed.carers || []),
        support: new Set(parsed.support || []),
        lanyards: new Set(parsed.lanyards || []),
        donations: new Set(parsed.donations || []),
        'renewal-disabilities': new Set(parsed['renewal-disabilities'] || []),
        'renewal-carers': new Set(parsed['renewal-carers'] || []),
        'renewal-support': new Set(parsed['renewal-support'] || []),
        contact: new Set(parsed.contact || []),
      };
    }
  } catch (error) {
    console.error('Error loading viewed applications from localStorage:', error);
  }
  
  return {
    disabilities: new Set(),
    carers: new Set(),
    support: new Set(),
    lanyards: new Set(),
    donations: new Set(),
    'renewal-disabilities': new Set(),
    'renewal-carers': new Set(),
    'renewal-support': new Set(),
    contact: new Set(),
  };
};

const saveViewedApplications = (viewedApps: ViewedApplications) => {
  try {
    // Convert Sets to arrays for JSON serialization
    const toSave = {
      disabilities: Array.from(viewedApps.disabilities),
      carers: Array.from(viewedApps.carers),
      support: Array.from(viewedApps.support),
      lanyards: Array.from(viewedApps.lanyards),
      donations: Array.from(viewedApps.donations),
      'renewal-disabilities': Array.from(viewedApps['renewal-disabilities']),
      'renewal-carers': Array.from(viewedApps['renewal-carers']),
      'renewal-support': Array.from(viewedApps['renewal-support']),
      contact: Array.from(viewedApps.contact),
    };
    localStorage.setItem('viewedApplications', JSON.stringify(toSave));
  } catch (error) {
    console.error('Error saving viewed applications to localStorage:', error);
  }
};

const setPermanentReduction = (type: keyof NotificationCounts, amount: number) => {
  const reductions = JSON.parse(localStorage.getItem('permanentReductions') || '{}');
  reductions[type] = (reductions[type] || 0) + amount;
  localStorage.setItem('permanentReductions', JSON.stringify(reductions));
};

export const useNotificationCounts = () => {
  const [counts, setCounts] = useState<NotificationCounts>({
    disabilities: 0,
    carers: 0,
    support: 0,
    lanyards: 0,
    donations: 0,
    'renewal-disabilities': 0,
    'renewal-carers': 0,
    'renewal-support': 0,
    contact: 0,
  });

  const [viewedApplications, setViewedApplications] = useState<ViewedApplications>(getStoredViewedApplications);
  const [loading, setLoading] = useState(true);

  const fetchCounts = async () => {
    try {
      setLoading(true);
      
      // Fetch counts from dashboard stats endpoint
      const response = await fetch('https://jolly-shadow-d2bf.elfadili-zoubair.workers.dev/api/Admin/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }

      const data = await response.json();

      // Calculate actual counts by considering viewed applications and permanent reductions
      const rawCounts = {
        disabilities: data.disabilityApplications?.pending || 0,
        carers: data.carersApplications?.pending || 0,
        support: data.customerSupportApplications?.pending || 0,
        lanyards: data.verifiedLanyardApplications?.pending || 0,
        donations: data.donations?.pending || 0,
        'renewal-disabilities': data.renewals?.disabilities?.pending || 0,
        'renewal-carers': data.renewals?.carers?.pending || 0,
        'renewal-support': data.renewals?.customerSupport?.pending || 0,
        contact: data.newContactSubmissions || 0,
      };

      // Apply permanent reductions from localStorage
      const permanentReductions = JSON.parse(localStorage.getItem('permanentReductions') || '{}');
      
      // Apply viewed applications count reduction
      const adjustedCounts = { ...rawCounts };
      Object.keys(adjustedCounts).forEach(key => {
        const typedKey = key as keyof NotificationCounts;
        // Apply permanent reductions
        if (permanentReductions[typedKey]) {
          adjustedCounts[typedKey] = Math.max(0, adjustedCounts[typedKey] - permanentReductions[typedKey]);
        }
      });

      setCounts(adjustedCounts);
    } catch (error) {
      console.error('Error fetching notification counts:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsViewed = (type: keyof NotificationCounts, applicationId: number) => {
    // Handle special cases where we want to clear all counts for that type
    if (['donations', 'contact'].includes(type) && applicationId === 0) {
      // Clear all counts for this type by setting permanent reduction
      setPermanentReduction(type, counts[type]);
      setCounts(prev => ({
        ...prev,
        [type]: 0
      }));
      return;
    }
    
    const newViewedApplications = { ...viewedApplications };
    newViewedApplications[type].add(applicationId);
    setViewedApplications(newViewedApplications);
    saveViewedApplications(newViewedApplications);
    
    // Add to permanent reductions for individual items
    setPermanentReduction(type, 1);
    setCounts(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] - 1)
    }));
  };

  const decrementCount = (key: keyof NotificationCounts) => {
    setCounts(prev => ({
      ...prev,
      [key]: Math.max(0, prev[key] - 1)
    }));
  };

  const incrementCount = (key: keyof NotificationCounts) => {
    setCounts(prev => ({
      ...prev,
      [key]: prev[key] + 1
    }));
  };

  useEffect(() => {
    fetchCounts();
    
    // Refresh counts every 30 seconds
    const interval = setInterval(fetchCounts, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    counts,
    loading,
    decrementCount,
    incrementCount,
    markAsViewed,
    refreshCounts: fetchCounts
  };
};
