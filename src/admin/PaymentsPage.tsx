import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Check, X, AlertCircle, Calendar, User, CreditCard } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { paymentAPI } from '../api/paymentApi';
import { Payment } from '../api/paymentTypes';

const PaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [applicationTypeFilter, setApplicationTypeFilter] = useState<string>('all');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Payments' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Submitted', label: 'Submitted' },
    { value: 'Confirmed', label: 'Confirmed' },
    { value: 'Skipped', label: 'Skipped' }
  ];

  const applicationTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'Disability', label: 'Disability Cards' },
    { value: 'Carers', label: 'Carers Cards' },
    { value: 'CustomerSupport', label: 'Customer Support' }
  ];

  useEffect(() => {
    fetchPayments();
  }, [currentPage, statusFilter, applicationTypeFilter]);

  const fetchPayments = async () => {
    setLoading(true);
    console.log('🔄 Fetching payments...');
    try {
      const filterStatus = statusFilter === 'all' ? undefined : statusFilter;
      const response = await paymentAPI.getAllPayments(currentPage, 10, filterStatus);
      
      console.log('✅ Payments fetched successfully:', response);
      
      // Check if the response has the expected structure
      if (!response || !response.payments) {
        console.error('❌ Unexpected API response structure:', response);
        setPayments([]);
        setTotalPages(1);
        return;
      }
      
      // Filter by application type if selected
      let filteredPayments = response.payments;
      if (applicationTypeFilter !== 'all') {
        filteredPayments = response.payments.filter(p => p.applicationType === applicationTypeFilter);
      }
      
      console.log('📋 Final filtered payments:', filteredPayments);
      setPayments(filteredPayments);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      console.error('❌ Error fetching payments:', error);
      toast.error('Failed to load payments');
      setPayments([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (paymentId: number, newStatus: string, adminNotes?: string) => {
    setIsUpdating(true);
    try {
      await paymentAPI.updatePaymentStatus(paymentId, {
        paymentStatus: newStatus,
        adminNotes
      });
      
      if (newStatus === 'Confirmed') {
        toast.success('Payment confirmed successfully! Email notification sent to the customer.');
      } else {
        toast.success(`Payment status updated to ${newStatus} successfully`);
      }
      
      fetchPayments();
      setSelectedPayment(null);
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast.error('Failed to update payment status');
    } finally {
      setIsUpdating(false);
    }
  };

  const getFilteredPayments = () => {
    if (!payments || payments.length === 0) return [];
    
    return payments.filter(payment => {
      const matchesSearch = 
        (payment.firstName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (payment.lastName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (payment.phoneNumber || '').includes(searchTerm) ||
        payment.id.toString().includes(searchTerm) ||
        (payment.transactionReference && payment.transactionReference.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesSearch;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Submitted': return 'bg-blue-100 text-blue-800';
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Skipped': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getApplicationTypeLabel = (type: string) => {
    switch (type) {
      case 'Disability': return 'Disability Card';
      case 'Carers': return 'Carers Card';
      case 'CustomerSupport': return 'Customer Support';
      default: return type;
    }
  };

  const filteredPayments = getFilteredPayments();

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Management</h1>
        <p className="text-gray-600">Manage and track application payments</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={applicationTypeFilter}
              onChange={(e) => setApplicationTypeFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              {applicationTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm text-gray-600 flex items-center">
            Total: {filteredPayments ? filteredPayments.length : 0} payments
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          {filteredPayments && filteredPayments.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            #{payment.id}
                          </div>
                          <div className="text-xs text-gray-500">
                            {payment.paymentMethod === 'bank-transfer' ? 'Bank Transfer' : payment.paymentMethod}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(payment.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {payment.firstName} {payment.lastName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {payment.phoneNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {getApplicationTypeLabel(payment.applicationType)}
                      </div>
                      <div className="text-xs text-gray-500">
                        App ID: {payment.applicationId}
                      </div>
                      {payment.applicationStatus && (
                        <div className="text-xs text-gray-500">
                          Status: {payment.applicationStatus}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        AED {payment.totalAmount}
                      </div>
                      {payment.includeLanyard && (
                        <div className="text-xs text-gray-500 mt-1">
                          Includes Lanyard (+AED {payment.lanyardAmount})
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.paymentStatus)}`}>
                        {payment.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        onClick={() => setSelectedPayment(payment)}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Payments Found</h3>
              <p className="text-gray-600">
                There are no payments matching your search criteria. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage <= 1}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              currentPage <= 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>
          
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => prev < totalPages ? prev + 1 : prev)}
            disabled={currentPage >= totalPages}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              currentPage >= totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Payment Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl mx-4 shadow-2xl max-h-[90vh] overflow-y-auto w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
              <button
                onClick={() => setSelectedPayment(null)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Payment Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-gray-500" />
                  Payment Information
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment ID:</span>
                    <span className="font-medium text-gray-900">#{selectedPayment.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(selectedPayment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium ${getStatusColor(selectedPayment.paymentStatus)}`}>
                      {selectedPayment.paymentStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Method:</span>
                    <span className="font-medium text-gray-900">
                      {selectedPayment.paymentMethod === 'bank-transfer' ? 'Bank Transfer' : selectedPayment.paymentMethod}
                    </span>
                  </div>
                  
                  {selectedPayment.transactionReference && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction Reference:</span>
                      <span className="font-medium text-gray-900">{selectedPayment.transactionReference}</span>
                    </div>
                  )}
                  
                  {selectedPayment.bankName && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank:</span>
                      <span className="font-medium text-gray-900">{selectedPayment.bankName}</span>
                    </div>
                  )}
                  
                  {selectedPayment.transferDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transfer Date:</span>
                      <span className="font-medium text-gray-900">{selectedPayment.transferDate}</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                  Application Details
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application Type:</span>
                    <span className="font-medium text-gray-900">
                      {getApplicationTypeLabel(selectedPayment.applicationType)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application ID:</span>
                    <span className="font-medium text-gray-900">{selectedPayment.applicationId}</span>
                  </div>
                  
                  {selectedPayment.applicationStatus && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Application Status:</span>
                      <span className="font-medium text-gray-900">{selectedPayment.applicationStatus}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-gray-500" />
                  Customer Information
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium text-gray-900">
                      {selectedPayment.firstName} {selectedPayment.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium text-gray-900">{selectedPayment.phoneNumber}</span>
                  </div>
                  
                  {selectedPayment.applicantEmail && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-gray-900">{selectedPayment.applicantEmail}</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">
                  Amount Details
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Amount:</span>
                    <span className="font-medium text-gray-900">AED {selectedPayment.baseAmount}</span>
                  </div>
                  
                  {selectedPayment.includeLanyard && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lanyard:</span>
                      <span className="font-medium text-gray-900">AED {selectedPayment.lanyardAmount}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span className="text-gray-800 font-medium">Total Amount:</span>
                    <span className="font-bold text-gray-900">AED {selectedPayment.totalAmount}</span>
                  </div>
                </div>
                
                {selectedPayment.adminNotes && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Admin Notes</h3>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <p className="text-gray-800">{selectedPayment.adminNotes}</p>
                    </div>
                  </div>
                )}
                
                {/* Payment Actions */}
                {selectedPayment.paymentStatus === 'Pending' && (
                  <div className="mt-6 space-y-3">
                    <button
                      onClick={() => handleStatusUpdate(selectedPayment.id, 'Confirmed')}
                      disabled={isUpdating}
                      className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Confirm Payment
                    </button>
                    
                    <button
                      onClick={() => handleStatusUpdate(selectedPayment.id, 'Skipped')}
                      disabled={isUpdating}
                      className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Mark as Skipped
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;
