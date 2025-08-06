import {
    CheckCircle,
    Clock,
    Eye,
    Headphones,
    Heart,
    RefreshCw,
    Search,
    Users,
    XCircle
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface RenewalApplication {
  id: number;
  type: 'disabilities' | 'carers' | 'customerSupport';
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  emiratesId: string;
  cardNumber: string;
  renewalReason: string;
  renewalStatus: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt?: string;
}

const RenewalsPage: React.FC = () => {
  const [renewals, setRenewals] = useState<RenewalApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRenewal, setSelectedRenewal] = useState<RenewalApplication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  useEffect(() => {
    fetchRenewals();
  }, []);

  const fetchRenewals = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      
      // Fetch all renewal types
      const [disabilitiesRes, carersRes, customerSupportRes] = await Promise.all([
        fetch('https://api.ndaid.help/api/renewal/disabilities', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('https://api.ndaid.help/api/renewal/carers', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('https://api.ndaid.help/api/renewal/customer-support', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      const [disabilitiesData, carersData, customerSupportData] = await Promise.all([
        disabilitiesRes.ok ? disabilitiesRes.json() : [],
        carersRes.ok ? carersRes.json() : [],
        customerSupportRes.ok ? customerSupportRes.json() : []
      ]);

      console.log('Raw backend data:', { disabilitiesData, carersData, customerSupportData });

      // Combine and format all renewals
      const allRenewals: RenewalApplication[] = [
        ...(disabilitiesData || []).map((item: any) => ({ 
          ...item, 
          type: 'disabilities' as const,
          renewalStatus: item.status || item.RenewalStatus || item.renewalStatus || 'Pending',
          createdAt: item.createdAt || item.CreatedAt,
          updatedAt: item.updatedAt || item.UpdatedAt,
          cardNumber: item.cardNumber || item.CardNumber || '',
          emiratesId: item.emiratesId || item.EmiratesId,
          firstName: item.firstName || item.FirstName,
          lastName: item.lastName || item.LastName,
          email: item.email || item.Email,
          phoneNumber: item.phoneNumber || item.PhoneNumber,
          renewalReason: item.renewalReason || item.RenewalReason,
          profilePicture: item.profilePicture || item.ProfilePicture
        })),
        ...(carersData || []).map((item: any) => ({ 
          ...item, 
          type: 'carers' as const,
          renewalStatus: item.status || item.RenewalStatus || item.renewalStatus || 'Pending',
          createdAt: item.createdAt || item.CreatedAt,
          updatedAt: item.updatedAt || item.UpdatedAt,
          cardNumber: item.cardNumber || item.CardNumber || '',
          emiratesId: item.emiratesId || item.EmiratesId,
          firstName: item.firstName || item.FirstName,
          lastName: item.lastName || item.LastName,
          email: item.email || item.Email,
          phoneNumber: item.phoneNumber || item.PhoneNumber,
          renewalReason: item.renewalReason || item.RenewalReason,
          profilePicture: item.profilePicture || item.ProfilePicture
        })),
        ...(customerSupportData || []).map((item: any) => ({ 
          ...item, 
          type: 'customerSupport' as const,
          renewalStatus: item.status || item.RenewalStatus || item.renewalStatus || 'Pending',
          createdAt: item.createdAt || item.CreatedAt,
          updatedAt: item.updatedAt || item.UpdatedAt,
          cardNumber: item.cardNumber || item.CardNumber || '',
          emiratesId: item.emiratesId || item.EmiratesId,
          firstName: item.firstName || item.FirstName,
          lastName: item.lastName || item.LastName,
          email: item.email || item.Email,
          phoneNumber: item.phoneNumber || item.PhoneNumber,
          renewalReason: item.renewalReason || item.RenewalReason,
          profilePicture: item.profilePicture || item.ProfilePicture
        }))
      ];

      // Sort by submission date (newest first)
      allRenewals.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      console.log('Processed renewals data:', allRenewals);

      setRenewals(allRenewals);

      // Calculate stats
      const total = allRenewals.length;
      const pending = allRenewals.filter(r => r.renewalStatus === 'Pending').length;
      const approved = allRenewals.filter(r => r.renewalStatus === 'Approved').length;
      const rejected = allRenewals.filter(r => r.renewalStatus === 'Rejected').length;

      setStats({ total, pending, approved, rejected });
    } catch (error) {
      console.error('Error fetching renewals:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateRenewalStatus = async (id: number, type: string, status: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      
      // Map frontend type names to backend URL patterns
      let urlType = type;
      if (type === 'customerSupport') {
        urlType = 'customer-support';
      }
      
      const response = await fetch(`https://api.ndaid.help/api/renewal/${urlType}/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ Status: status })
      });

      if (response.ok) {
        await fetchRenewals(); // Refresh the list
        console.log('Renewal status updated successfully');
      } else {
        const errorData = await response.text();
        console.error('Failed to update renewal status:', response.status, errorData);
      }
    } catch (error) {
      console.error('Error updating renewal status:', error);
    }
  };

  const viewRenewalDetails = (renewal: RenewalApplication) => {
    setSelectedRenewal(renewal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRenewal(null);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'disabilities': return <Users className="w-4 h-4" />;
      case 'carers': return <Heart className="w-4 h-4" />;
      case 'customerSupport': return <Headphones className="w-4 h-4" />;
      default: return <RefreshCw className="w-4 h-4" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'disabilities': return 'Disabilities';
      case 'carers': return 'Carers';
      case 'customerSupport': return 'Customer Support';
      default: return type;
    }
  };

  const formatFullName = (firstName: string, lastName: string) => {
    // If firstName already contains the full name, just return it
    if (firstName && lastName && firstName === lastName) {
      return firstName;
    }
    // If firstName contains multiple words and lastName is the same, return firstName
    if (firstName && firstName.includes(' ') && firstName === lastName) {
      return firstName;
    }
    // Normal case: combine firstName and lastName
    return `${firstName || ''} ${lastName || ''}`.trim();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRenewals = renewals.filter(renewal => {
    const matchesType = selectedType === 'all' || renewal.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || renewal.renewalStatus === selectedStatus;
    const matchesSearch = searchTerm === '' || 
      renewal.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      renewal.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      renewal.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      renewal.emiratesId.includes(searchTerm);
    
    return matchesType && matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Renewal Applications</h1>
        <p className="text-gray-600">Manage all card renewal applications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <RefreshCw className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or Emirates ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="disabilities">Disabilities</option>
              <option value="carers">Carers</option>
              <option value="customerSupport">Customer Support</option>
            </select>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            
            <button
              onClick={fetchRenewals}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Renewals Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Emirates ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRenewals.map((renewal) => (
                <tr key={`${renewal.type}-${renewal.id}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      {renewal.profilePicture ? (
                        <img
                          src={renewal.profilePicture}
                          alt={`${renewal.firstName} ${renewal.lastName}`}
                          className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {renewal.firstName[0]}{renewal.lastName[0]}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {formatFullName(renewal.firstName, renewal.lastName)}
                      </div>
                      <div className="text-sm text-gray-500">{renewal.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(renewal.type)}
                      <span className="text-sm text-gray-900">{getTypeName(renewal.type)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {renewal.emiratesId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(renewal.renewalStatus)}`}>
                      {renewal.renewalStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(renewal.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      {renewal.renewalStatus === 'Pending' && (
                        <>
                          <button
                            onClick={() => updateRenewalStatus(renewal.id, renewal.type, 'Approved')}
                            className="text-green-600 hover:text-green-900"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateRenewalStatus(renewal.id, renewal.type, 'Rejected')}
                            className="text-red-600 hover:text-red-900"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => viewRenewalDetails(renewal)}
                        className="text-blue-600 hover:text-blue-900" 
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredRenewals.length === 0 && (
          <div className="text-center py-12">
            <RefreshCw className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No renewal applications</h3>
            <p className="mt-1 text-sm text-gray-500">
              No renewal applications match your current filters.
            </p>
          </div>
        )}
      </div>

      {/* Renewal Details Modal */}
      {isModalOpen && selectedRenewal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {getTypeName(selectedRenewal.type)} Renewal Details
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Full Name:</span>
                    <p className="text-gray-900">{formatFullName(selectedRenewal.firstName, selectedRenewal.lastName)}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Emirates ID:</span>
                    <p className="text-gray-900">{selectedRenewal.emiratesId}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Email:</span>
                    <p className="text-gray-900">{selectedRenewal.email}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Phone:</span>
                    <p className="text-gray-900">{selectedRenewal.phoneNumber}</p>
                  </div>
                  {selectedRenewal.cardNumber && (
                    <div>
                      <span className="font-medium text-gray-600">Card Number:</span>
                      <p className="text-gray-900">{selectedRenewal.cardNumber}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Renewal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Renewal Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Renewal Reason:</span>
                    <p className="text-gray-900">{selectedRenewal.renewalReason}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Status:</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedRenewal.renewalStatus)}`}>
                      {selectedRenewal.renewalStatus}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Submitted At:</span>
                    <p className="text-gray-900">{new Date(selectedRenewal.createdAt).toLocaleString()}</p>
                  </div>
                  {selectedRenewal.updatedAt && (
                    <div>
                      <span className="font-medium text-gray-600">Last Updated:</span>
                      <p className="text-gray-900">{new Date(selectedRenewal.updatedAt).toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {selectedRenewal.renewalStatus === 'Pending' && (
                <div className="flex gap-4 pt-4 border-t">
                  <button
                    onClick={() => {
                      updateRenewalStatus(selectedRenewal.id, selectedRenewal.type, 'Approved');
                      closeModal();
                    }}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve Renewal
                  </button>
                  <button
                    onClick={() => {
                      updateRenewalStatus(selectedRenewal.id, selectedRenewal.type, 'Rejected');
                      closeModal();
                    }}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject Renewal
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RenewalsPage;
