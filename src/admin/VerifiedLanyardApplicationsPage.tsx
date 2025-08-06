import { Badge, CheckCircle, Clock, Download, Edit, Eye, Filter, Package, Trash2, Truck, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { verifiedLanyardApplicationAPI, VerifiedLanyardApplicationResponse, VerifiedLanyardApplicationStats } from '../api/verifiedLanyardApplicationApi';

const VerifiedLanyardApplicationsPage = () => {
  const [applications, setApplications] = useState<VerifiedLanyardApplicationResponse[]>([]);
  const [stats, setStats] = useState<VerifiedLanyardApplicationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filters, setFilters] = useState({
    status: '',
    fromDate: '',
    toDate: '',
    search: ''
  });
  const [selectedApplication, setSelectedApplication] = useState<VerifiedLanyardApplicationResponse | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState({ status: '', adminNotes: '', rejectionReason: '', trackingNumber: '' });

  const pageSize = 10;

  useEffect(() => {
    fetchApplications();
    fetchStats();
  }, [currentPage, filters]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await verifiedLanyardApplicationAPI.getApplications(
        currentPage,
        pageSize,
        filters.status || undefined,
        filters.fromDate || undefined,
        filters.toDate || undefined,
        filters.search || undefined
      );
      setApplications(response.applications);
      setTotalPages(response.totalPages);
      setTotalItems(response.totalCount);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const statsData = await verifiedLanyardApplicationAPI.getApplicationStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      fromDate: '',
      toDate: '',
      search: ''
    });
    setCurrentPage(1);
  };

  const handleStatusUpdate = async () => {
    if (!selectedApplication) return;

    try {
      await verifiedLanyardApplicationAPI.updateApplicationStatus(selectedApplication.id, {
        status: statusUpdate.status,
        adminNotes: statusUpdate.adminNotes,
        rejectionReason: statusUpdate.rejectionReason,
        trackingNumber: statusUpdate.trackingNumber
      });
      setShowModal(false);
      setSelectedApplication(null);
      setStatusUpdate({ status: '', adminNotes: '', rejectionReason: '', trackingNumber: '' });
      fetchApplications();
      fetchStats();
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const handleDeleteApplication = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;

    try {
      await verifiedLanyardApplicationAPI.deleteApplication(id);
      fetchApplications();
      fetchStats();
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under review':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return Clock;
      case 'under review':
        return Eye;
      case 'approved':
        return CheckCircle;
      case 'rejected':
        return XCircle;
      case 'shipped':
        return Truck;
      case 'delivered':
        return Package;
      default:
        return Clock;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Verified Lanyard Applications</h1>
        <p className="text-gray-600">Manage and track all verified lanyard applications submitted through the platform</p>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-sm text-gray-500">All time</p>
              </div>
              <Badge className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending + stats.underReview}</p>
                <p className="text-sm text-gray-500">Needs attention</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
                <p className="text-sm text-gray-500">Ready for processing</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Shipped/Delivered</p>
                <p className="text-2xl font-bold text-gray-900">{stats.shipped + stats.delivered}</p>
                <p className="text-sm text-gray-500">Completed orders</p>
              </div>
              <Package className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Name, email, city..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <input
              type="date"
              name="fromDate"
              value={filters.fromDate}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
            <input
              type="date"
              name="toDate"
              value={filters.toDate}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Applications ({totalItems})
            </h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading applications...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="p-8 text-center">
            <Badge className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No applications found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Existing Card
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((application) => {
                  const StatusIcon = getStatusIcon(application.applicationStatus);
                  return (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {application.firstName} {application.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{application.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{application.city}</div>
                        <div className="text-sm text-gray-500">{application.postCode}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          application.hasExistingCard 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {application.hasExistingCard ? 'Yes' : 'No'}
                        </span>
                        {application.cardImagePath && (
                          <div className="text-xs text-blue-600 mt-1">Card uploaded</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <StatusIcon className="w-4 h-4 mr-2" />
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.applicationStatus)}`}>
                            {application.applicationStatus}
                          </span>
                        </div>
                        {application.trackingNumber && (
                          <div className="text-xs text-gray-500 mt-1">#{application.trackingNumber}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(application.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedApplication(application);
                              setStatusUpdate({ 
                                status: application.applicationStatus, 
                                adminNotes: application.adminNotes || '', 
                                rejectionReason: application.rejectionReason || '',
                                trackingNumber: application.trackingNumber || ''
                              });
                              setShowModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit Status"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          {application.cardImagePath && (
                            <a
                              href={`https://api.ndaid.help/${application.cardImagePath}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-900"
                              title="View Card Image"
                            >
                              <Eye className="w-4 h-4" />
                            </a>
                          )}
                          <button
                            onClick={() => handleDeleteApplication(application.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalItems)} of {totalItems} results
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1 bg-blue-600 text-white rounded-md">
                  {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Update Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 max-h-96 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Update Application Status
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={statusUpdate.status}
                  onChange={(e) => setStatusUpdate(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              {(statusUpdate.status === 'Shipped' || statusUpdate.status === 'Delivered') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Number</label>
                  <input
                    type="text"
                    value={statusUpdate.trackingNumber}
                    onChange={(e) => setStatusUpdate(prev => ({ ...prev, trackingNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter tracking number"
                  />
                </div>
              )}

              {statusUpdate.status === 'Rejected' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rejection Reason</label>
                  <textarea
                    value={statusUpdate.rejectionReason}
                    onChange={(e) => setStatusUpdate(prev => ({ ...prev, rejectionReason: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="Explain why the application was rejected..."
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Admin Notes</label>
                <textarea
                  value={statusUpdate.adminNotes}
                  onChange={(e) => setStatusUpdate(prev => ({ ...prev, adminNotes: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Add internal notes..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedApplication(null);
                  setStatusUpdate({ status: '', adminNotes: '', rejectionReason: '', trackingNumber: '' });
                }}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifiedLanyardApplicationsPage;
