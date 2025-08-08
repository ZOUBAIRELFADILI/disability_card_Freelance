import { CheckCircle, Clock, CreditCard, Download, Eye, Filter, Search, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { adminAPI, DisabilityApplication } from '../api/adminApi';
import CreateOnlyCardModal from '../components/CreateOnlyCardModal';
import { useNotifications } from '../contexts/NotificationContext';
import { smartDownload } from '../utils/downloadUtils';
import { convertToProductionUrl } from '../utils/urlUtils';

const handleDirectDownload = async (url: string, filename: string) => {
  try {
    await smartDownload(url, filename);
    // Optional: Show success notification
    console.log(`Download started: ${filename}`);
    // You could add a toast notification here if desired
  } catch (error) {
    console.error('Download failed:', error);
    // Show user-friendly error message
    alert('Download failed. The file will open in a new tab instead.');
    window.open(url, '_blank');
  }
};

const DisabilitiesPage: React.FC = () => {
  const [applications, setApplications] = useState<DisabilityApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const { markAsViewed } = useNotifications();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<DisabilityApplication | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const [selectedApplicationForCard, setSelectedApplicationForCard] = useState<DisabilityApplication | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await adminAPI.getDisabilityApplications();
      // Handle response structure from backend
      setApplications(response.applications || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setApplications([]); // Ensure it's always an array
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = (applications || []).filter(app => {
    const fullName = `${app.firstName} ${app.lastName}`;
    const matchesSearch = 
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phoneNumber.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || app.applicationStatus.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = async (id: number, status: 'approved' | 'rejected') => {
    try {
      await adminAPI.updateApplicationStatus('disability', id, status);
      await fetchApplications(); // Refresh the list
      setShowModal(false);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleCreateCard = (application: DisabilityApplication) => {
    setSelectedApplicationForCard(application);
    setShowCreateCardModal(true);
  };

  const handleCardCreated = () => {
    setShowCreateCardModal(false);
    setSelectedApplicationForCard(null);
    // Optionally refresh applications or show success message
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const ApplicationModal = ({ application }: { application: DisabilityApplication }) => (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
        <div className="sticky top-0 bg-gradient-to-r from-green-50 to-white border-b px-8 py-5 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold text-green-800 tracking-tight flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-green-600" /> Application Details
          </h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-400 hover:text-red-500 transition-colors text-2xl font-bold"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left: Profile & Medical Documents */}
            <div className="space-y-8">
              {/* Profile Image with Download */}
              <div className="flex flex-col items-center bg-gray-50 rounded-xl p-6 shadow-sm border">
                {application.profilePicture ? (
                  <img
                    src={convertToProductionUrl(application.profilePicture)}
                    alt={`${application.firstName} ${application.lastName}`}
                    className="h-32 w-32 rounded-full object-cover border-4 border-green-200 shadow mb-3"
                  />
                ) : (
                  <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                    <span className="text-2xl font-medium text-gray-600">
                      {application.firstName[0]}{application.lastName[0]}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-base text-gray-700 font-semibold">Profile Image</span>
                  {typeof application.profilePicture === 'string' && application.profilePicture && (
                    <button
                      type="button"
                      onClick={() => handleDirectDownload(
                        convertToProductionUrl(application.profilePicture || ''),
                        `Profile_${application.firstName}_${application.lastName}.jpg`
                      )}
                      className="hover:bg-green-100 p-2 rounded-full transition"
                      title="Download Profile Image"
                    >
                      <Download className="w-5 h-5 text-green-700" />
                    </button>
                  )}
                </div>
              </div>
              {/* Medical Documents */}
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-4 text-green-800 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-green-600" /> Medical Documents
                </h3>
                {application.medicalDocuments && application.medicalDocuments.length > 0 ? (
                  <div className="space-y-4">
                    {application.medicalDocuments.map((doc, index) => (
                      <div key={doc.id} className="border rounded-lg p-4 bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                          <p className="font-medium text-gray-900 flex items-center gap-2">
                            {doc.fileName}
                            <button
                              type="button"
                              onClick={() => handleDirectDownload(
                                convertToProductionUrl(doc.filePath),
                                doc.fileName
                              )}
                              className="hover:bg-green-100 p-2 rounded-full transition"
                              title="Download Document"
                            >
                              <Download className="w-5 h-5 text-green-700" />
                            </button>
                          </p>
                          <p className="text-xs text-gray-500">
                              {(doc.fileSize / 1024 / 1024).toFixed(2)} MB • {doc.fileType}
                            </p>
                        </div>
                        {doc.filePath && (doc.fileType.includes('image') || doc.fileType.includes('jpg') || doc.fileType.includes('png')) && (
                          <div className="mt-2 md:mt-0">
                            <img 
                              src={`https://api.ndaid.help/${doc.filePath}`} 
                              alt={`Document ${index + 1}`}
                              className="w-32 h-20 object-cover rounded border"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <p className="text-gray-500">No documents uploaded</p>
                  </div>
                )}
              </div>
            </div>
            {/* Right: Application Info */}
            <div className="space-y-8">
              {/* Personal Information */}
              <div className="bg-white rounded-xl p-6 shadow-sm border space-y-3">
                <h3 className="text-lg font-semibold mb-4 text-green-800">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Full Name</label>
                    <p className="text-gray-900 font-semibold">{`${application.firstName} ${application.lastName}`}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Date of Birth</label>
                    <p className="text-gray-900">{new Date(application.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Email</label>
                    <p className="text-gray-900">{application.email}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Phone Number</label>
                    <p className="text-gray-900">{application.phoneNumber}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-gray-500">Address</label>
                    <p className="text-gray-900">{application.address}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Emirates ID</label>
                    <p className="text-gray-900">{application.emiratesId}</p>
                  </div>
                </div>
              </div>
              {/* Disability Information */}
              <div className="bg-white rounded-xl p-6 shadow-sm border space-y-3">
                <h3 className="text-lg font-semibold mb-4 text-green-800">Disability Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Disability Type</label>
                    <p className="text-gray-900">{application.disabilityType}</p>
                  </div>
              <div>
                    <label className="block text-xs font-medium text-gray-500">Disability Description</label>
                    <p className="text-gray-900">{application.disabilityDescription}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Emergency Contact</label>
                    <p className="text-gray-900">{application.emergencyContactName}</p>
                    <p className="text-gray-600 text-xs">{application.emergencyContactPhone}</p>
                  </div>
                </div>
              </div>
              {/* Application Status */}
              <div className="bg-white rounded-xl p-6 shadow-sm border space-y-3">
                <h3 className="text-lg font-semibold mb-4 text-green-800">Application Status</h3>
                <div className="flex items-center space-x-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 ${getStatusColor(application.applicationStatus)}`}>
                    {getStatusIcon(application.applicationStatus)}
                    <span>{application.applicationStatus}</span>
                  </span>
                  <span className="text-xs text-gray-500">Applied: {new Date(application.createdAt).toLocaleDateString()}</span>
                </div>
                  {application.applicationStatus.toLowerCase() === 'pending' && (
                  <div className="space-y-3 pt-2 border-t">
                    <p className="text-xs font-medium text-gray-700">Update Status:</p>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleStatusUpdate(application.id, 'approved')}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                        >
                        <CheckCircle className="w-4 h-4 mr-2" /> Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(application.id, 'rejected')}
                        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                        >
                        <XCircle className="w-4 h-4 mr-2" /> Reject
                        </button>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Disability Card Applications</h1>
          <p className="text-gray-600">Manage and review disability card applications</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600">
            Total: {filteredApplications.length} applications
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {filteredApplications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Profile
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Disability Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lanyard Included
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        {app.profilePicture ? (
                          <img
                            src={convertToProductionUrl(app.profilePicture)}
                            alt={`${app.firstName} ${app.lastName}`}
                            className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {app.firstName[0]}{app.lastName[0]}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{`${app.firstName} ${app.lastName}`}</div>
                        <div className="text-sm text-gray-500">{app.email}</div>
                        <div className="text-sm text-gray-500">{app.phoneNumber}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{app.disabilityType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        app.includeLanyard 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {app.includeLanyard ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(app.applicationStatus)}`}>
                        {getStatusIcon(app.applicationStatus)}
                        <span className="ml-1">{app.applicationStatus}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={async () => {
                            setSelectedApplication(app);
                            setShowModal(true);
                            console.log('Marking as viewed:', { type: 'disabilities', id: app.id });
                            markAsViewed('disabilities', app.id);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {app.applicationStatus.toLowerCase() === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(app.id, 'approved')}
                              className="text-green-600 hover:text-green-900"
                              title="Approve"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(app.id, 'rejected')}
                              className="text-red-600 hover:text-red-900"
                              title="Reject"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {app.applicationStatus.toLowerCase() === 'approved' && (
                          <button
                            onClick={() => handleCreateCard(app)}
                            className="text-green-600 hover:text-green-900"
                            title="Create Card"
                          >
                            <CreditCard className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500">No applications found</div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedApplication && (
        <ApplicationModal application={selectedApplication} />
      )}

      {/* Create Card Modal */}
      {showCreateCardModal && selectedApplicationForCard && (
        <CreateOnlyCardModal
          isOpen={showCreateCardModal}
          onClose={() => {
            setShowCreateCardModal(false);
            setSelectedApplicationForCard(null);
          }}
          onCardCreated={handleCardCreated}
          applicationData={{
            id: selectedApplicationForCard.id,
            firstName: selectedApplicationForCard.firstName,
            lastName: selectedApplicationForCard.lastName,
            cardType: 'disability',
            applicationType: 'disability',
            profilePicture: selectedApplicationForCard.profilePicture
          }}
        />
      )}
    </div>
  );
};

export default DisabilitiesPage;
