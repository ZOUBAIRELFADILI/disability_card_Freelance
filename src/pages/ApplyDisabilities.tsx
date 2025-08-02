import { ArrowRight, CheckCircle, Clock, CreditCard, Edit, FileText, Shield, Upload, X } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { applicationAPI } from '../api/applicationApi';
import PaymentStep from '../components/PaymentStep';

const ApplyDisabilities = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showPaymentStep, setShowPaymentStep] = useState(false);
  const [applicationId, setApplicationId] = useState<number>(0);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    emiratesId: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    emirate: '',
    disabilityType: '',
    disabilityDescription: '',
    medicalDocuments: [] as File[],
    emergencyContactName: '',
    emergencyContactPhone: '',
    includeLanyard: false
  });

  const [paymentData, setPaymentData] = useState({
    paymentType: 'bank-transfer',
    firstName: '',
    lastName: '',
    phoneNumber: ''
  });

  const steps = [
    { number: 1, title: 'Personal Information', description: 'Basic details about yourself' },
    { number: 2, title: 'Medical Information', description: 'Disability details and documentation' },
    { number: 3, title: 'Contact & Address', description: 'Where we can reach you' },
    { number: 4, title: 'Profile Picture', description: 'Upload your photo' },
    { number: 5, title: 'Review & Submit', description: 'Confirm your application' },
    { number: 6, title: 'Payment', description: 'Complete your payment' }
  ];

  // Calculate total amount based on lanyard inclusion
  const baseAmount = 100;
  const lanyardAmount = 20;
  const totalAmount = baseAmount + (formData.includeLanyard ? lanyardAmount : 0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type } = e.target;
    const value =
      type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : (e.target as HTMLInputElement).value;
  
    setFormData({
      ...formData,
      [name]: value
    });
  };
  

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData({
        ...formData,
        medicalDocuments: [...formData.medicalDocuments, ...newFiles]
      });
    }
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicturePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePicture = () => {
    setProfilePicture(null);
    setProfilePicturePreview(null);
  };

  const removeFile = (index: number) => {
    const updatedFiles = formData.medicalDocuments.filter((_: File, i: number) => i !== index);
    setFormData({
      ...formData,
      medicalDocuments: updatedFiles
    });
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.dateOfBirth && 
                 formData.gender && formData.nationality && formData.emiratesId);
      case 2:
        return !!(formData.disabilityType && formData.medicalDocuments.length > 0);
      case 3:
        return !!(formData.phoneNumber && formData.email && formData.address && 
                 formData.city && formData.emirate && formData.emergencyContactName && 
                 formData.emergencyContactPhone);
      case 4:
        return true; // Profile picture is optional for now since backend doesn't handle it
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < 5) {
      if (validateStep(currentStep)) {
        setCurrentStep(currentStep + 1);
      } else {
        alert('Please fill in all required fields before proceeding to the next step.');
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required steps before submission
    for (let step = 1; step <= 3; step++) {
      if (!validateStep(step)) {
        alert(`Please complete all required fields in step ${step} before submitting.`);
        setCurrentStep(step);
        return;
      }
    }
    
    // Show confirmation modal instead of submitting directly
    setShowConfirmationModal(true);
  };

  const confirmSubmission = async () => {
    try {
      // Submit the basic application data (files will be handled separately later)
      const response = await applicationAPI.submitDisabilityApplication(formData);
      
      // If medical documents are provided, upload them separately
      if (formData.medicalDocuments.length > 0) {
        for (const file of formData.medicalDocuments) {
          try {
            await applicationAPI.uploadMedicalDocument(response.id, file);
          } catch (fileUploadError) {
            console.warn('Failed to upload medical document:', fileUploadError);
            // Continue with application success even if file upload fails
          }
        }
      }
      
      // Close confirmation modal and show success notification
      setShowConfirmationModal(false);
      setApplicationId(response.id);
      
      // Pre-fill payment form with application data
      setPaymentData((prev: any) => ({
        ...prev,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber
      }));
      
      // Show payment step instead of success notification
      setShowPaymentStep(true);
    } catch (error) {
      console.error('Application submission failed:', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate payment form
    if (paymentData.paymentType === 'bank-transfer') {
      if (!paymentData.firstName || !paymentData.lastName || !paymentData.phoneNumber) {
        toast.error('Please fill in all required fields');
        return;
      }
    }
    
    // For now, just show success message
    toast.success('Payment confirmation submitted successfully!');
    setShowPaymentStep(false);
    setShowSuccessNotification(true);
  };

  const handleModify = () => {
    setShowConfirmationModal(false);
    setCurrentStep(1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-green focus:border-uae-green"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-green focus:border-uae-green"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  required
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-green focus:border-uae-green"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                <select
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-green focus:border-uae-green"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nationality *</label>
                <input
                  type="text"
                  name="nationality"
                  required
                  value={formData.nationality}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-green focus:border-uae-green"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emirates ID *</label>
                <input
                  type="text"
                  name="emiratesId"
                  required
                  value={formData.emiratesId}
                  onChange={handleInputChange}
                  placeholder="784-XXXX-XXXXXXX-X"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-green focus:border-uae-green"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Medical Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type of Disability *</label>
              <select
                name="disabilityType"
                required
                value={formData.disabilityType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-green focus:border-uae-green"
              >
                <option value="">Select Disability Type</option>
                <option value="physical">Physical Disability</option>
                <option value="intellectual">Intellectual Disability</option>
                <option value="sensory">Sensory Disability</option>
                <option value="neurological">Neurological Disability</option>
                <option value="psychiatric">Psychiatric Disability</option>
                <option value="multiple">Multiple Disabilities</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Medical Documents *</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-uae-green transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Upload medical reports and documentation</p>
                <p className="text-sm text-gray-500">PDF, JPG, PNG files up to 10MB</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  id="medical-docs"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="medical-docs"
                  className="mt-4 inline-block bg-uae-green text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition-colors"
                >
                  Choose Files
                </label>
              </div>
              
              {/* Display uploaded files */}
              {formData.medicalDocuments.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Uploaded Files:</h4>
                  {formData.medicalDocuments.map((file: File, index: number) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <span className="text-xs text-gray-500 ml-2">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Lanyard Option */}
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Services</h4>
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="includeLanyard"
                  id="includeLanyard"
                  checked={formData.includeLanyard}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                />
                <div className="flex-1">
                  <label htmlFor="includeLanyard" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Include Verified Global Disability Lanyard (+AED 20)
                  </label>
                  <p className="text-sm text-gray-600 mt-1">
                    Add a discreet, internationally recognized lanyard for non-visible disabilities. 
                    Perfect for travel and situations where you need subtle identification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact & Address Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  required
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+971 XX XXX XXXX"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-green focus:border-uae-green"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-green focus:border-uae-green"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-green focus:border-uae-green"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-green focus:border-uae-green"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emirate *</label>
                <select
                  name="emirate"
                  required
                  value={formData.emirate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-green focus:border-uae-green"
                >
                  <option value="">Select Emirate</option>
                  <option value="dubai">Dubai</option>
                  <option value="abu-dhabi">Abu Dhabi</option>
                  <option value="sharjah">Sharjah</option>
                  <option value="ajman">Ajman</option>
                  <option value="fujairah">Fujairah</option>
                  <option value="ras-al-khaimah">Ras Al Khaimah</option>
                  <option value="umm-al-quwain">Umm Al Quwain</option>
                </select>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name *</label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    required
                    value={formData.emergencyContactName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-green focus:border-uae-green"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone *</label>
                  <input
                    type="tel"
                    name="emergencyContactPhone"
                    required
                    value={formData.emergencyContactPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uae-green focus:border-uae-green"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Profile Picture</h3>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Upload Your Profile Picture *</h4>
              <p className="text-gray-600 mb-6">Please upload a clear photo of yourself for your Disability Card.</p>
              
              <div className="flex flex-col items-center space-y-6">
                {profilePicturePreview ? (
                  <div className="relative">
                    <img
                      src={profilePicturePreview}
                      alt="Profile Preview"
                      className="w-48 h-48 object-cover rounded-lg border-4 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeProfilePicture}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Click to upload photo</p>
                    </div>
                  </div>
                )}
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                  id="profile-picture-upload"
                />
                <label
                  htmlFor="profile-picture-upload"
                  className="px-6 py-3 bg-uae-green text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-300 cursor-pointer"
                >
                  {profilePicturePreview ? 'Change Picture' : 'Upload Picture'}
                </label>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Review & Submit</h3>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Application Summary</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phoneNumber}</p>
                  <p><strong>Emirate:</strong> {formData.emirate}</p>
                </div>
                <div>
                  <p><strong>Disability Type:</strong> {formData.disabilityType}</p>
                  <p><strong>Emirates ID:</strong> {formData.emiratesId}</p>
                  <p><strong>Emergency Contact:</strong> {formData.emergencyContactName}</p>
                  <p><strong>Emergency Phone:</strong> {formData.emergencyContactPhone}</p>
                </div>
                <div>
                  <p><strong>Include Lanyard:</strong> {formData.includeLanyard ? 'Yes (+AED 20)' : 'No'}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-blue-900 mb-4">What Happens Next?</h4>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>We'll review your application within 48 hours</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Medical verification will be conducted</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Your card will be produced and delivered</span>
                </li>
                {formData.includeLanyard && (
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Your verified lanyard will be included with your card</span>
                  </li>
                )}
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>You'll receive activation instructions</span>
                </li>
              </ul>
              
              {/* Payment Summary */}
              <div className="mt-6 pt-4 border-t border-blue-200">
                <h5 className="font-semibold text-blue-900 mb-2">Payment Summary:</h5>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Disability Card Application:</span>
                    <span>AED {baseAmount}</span>
                  </div>
                  {formData.includeLanyard && (
                    <div className="flex justify-between">
                      <span>Verified Lanyard:</span>
                      <span>AED {lanyardAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold border-t border-blue-200 pt-1">
                    <span>Total:</span>
                    <span>AED {totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <PaymentStep
            amount={totalAmount}
            cardType="Disability Card"
            paymentData={paymentData}
            onPaymentDataChange={handlePaymentInputChange}
            onSubmit={handlePaymentSubmit}
            isSubmitting={isSubmitting}
            includeLanyard={formData.includeLanyard}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section>
        {/* Hero Section with new background image */}
      <div className="relative text-white py-20">
        <img
          src="/disability_applay.png"
          alt="Abu Dhabi skyline with UAE flag"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay for readability and brand colours */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 opacity-70 via-black/40 to-green-700 opacity-70"></div>
        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CreditCard className="w-16 h-16 mx-auto mb-6 text-white" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Apply for Disabilities Card
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
          Get your official UAE National Disability Card and access comprehensive 
          benefits and support services across the Emirates.
          </p>
        </div>
      </div>

      </section>
      {/* Application Process Info */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-uae-green/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-uae-green" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Application</h3>
              <p className="text-gray-600">Fill out our comprehensive form with your details</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-uae-green/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-uae-green" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Review</h3>
              <p className="text-gray-600">We review applications within 48 hours</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-uae-green/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-uae-green" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Confidential</h3>
              <p className="text-gray-600">Your information is protected and kept confidential</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 ${
                    currentStep >= step.number 
                      ? 'bg-uae-green text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-uae-green' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-400 hidden md:block">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`hidden md:block absolute h-0.5 w-full top-5 left-1/2 ${
                      currentStep > step.number ? 'bg-uae-green' : 'bg-gray-200'
                    }`} style={{ zIndex: -1 }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit}>
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Previous
                </button>

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-uae-green text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center"
                  >
                    Next
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3 bg-uae-green text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center"
                  >
                    Review Application
                    <CheckCircle className="ml-2 w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Review Your Application</h3>
              <p className="text-gray-600">Please review all your information before submitting</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Profile Picture */}
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h4>
                {profilePicturePreview && (
                  <img
                    src={profilePicturePreview}
                    alt="Profile Preview"
                    className="w-32 h-32 object-cover rounded-lg border-4 border-gray-200 mx-auto"
                  />
                )}
              </div>
              
              {/* Application Details */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                    <p><strong>Date of Birth:</strong> {formData.dateOfBirth}</p>
                    <p><strong>Gender:</strong> {formData.gender}</p>
                    <p><strong>Nationality:</strong> {formData.nationality}</p>
                    <p><strong>Emirates ID:</strong> {formData.emiratesId}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Phone:</strong> {formData.phoneNumber}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Address:</strong> {formData.address}</p>
                    <p><strong>City:</strong> {formData.city}</p>
                    <p><strong>Emirate:</strong> {formData.emirate}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Disability Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Disability Type:</strong> {formData.disabilityType}</p>
                    {formData.disabilityDescription && (
                      <p><strong>Description:</strong> {formData.disabilityDescription}</p>
                    )}
                    <p><strong>Medical Documents:</strong> {formData.medicalDocuments.length} file(s) uploaded</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Emergency Contact</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {formData.emergencyContactName}</p>
                    <p><strong>Phone:</strong> {formData.emergencyContactPhone}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4 mt-8">
              <button
                type="button"
                onClick={handleModify}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-all duration-300 flex items-center"
              >
                <Edit className="mr-2 w-4 h-4" />
                Modify Information
              </button>
              <button
                type="button"
                onClick={confirmSubmission}
                className="px-8 py-3 bg-uae-green text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                Confirm & Submit
                <CheckCircle className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {showSuccessNotification && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center shadow-2xl">
            <div className="mb-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Confirmed!</h3>
            <p className="text-gray-600 mb-4">
              Your disability card application and payment have been submitted successfully. 
              We will process your application within 48 hours.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700">
                <strong>Application ID:</strong> #{applicationId}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Payment Method:</strong> {paymentData.paymentType === 'bank-transfer' ? 'Bank Transfer' : paymentData.paymentType}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Total Amount:</strong> AED {totalAmount}
              </p>
              {formData.includeLanyard && (
                <p className="text-sm text-gray-700">
                  <strong>Includes:</strong> Verified Global Disability Lanyard
                </p>
              )}
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-uae-green text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-300"
            >
              Go to Home
            </button>
          </div>
        </div>
      )}

      {/* Payment Step Modal */}
      {showPaymentStep && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Payment</h3>
              <p className="text-gray-600">Application submitted successfully! Now complete your payment to finalize the process.</p>
            </div>
            
            <form onSubmit={handlePaymentSubmit}>
              <PaymentStep
                amount={totalAmount}
                cardType="Disability Card"
                paymentData={paymentData}
                onPaymentDataChange={handlePaymentInputChange}
                onSubmit={handlePaymentSubmit}
                isSubmitting={isSubmitting}
                includeLanyard={formData.includeLanyard}
              />
              
              <div className="flex justify-center space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowPaymentStep(false);
                    setShowSuccessNotification(true);
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-all duration-300"
                >
                  Skip Payment (Pay Later)
                </button>
                <button
                  type="submit"
                  disabled={paymentData.paymentType !== 'bank-transfer'}
                  className={`px-8 py-3 font-medium rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center ${
                    paymentData.paymentType === 'bank-transfer'
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Confirm Payment
                  <CheckCircle className="ml-2 w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyDisabilities;