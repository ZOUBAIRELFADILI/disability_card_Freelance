import { Calendar, CreditCard, FileText, User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { checkCardNumberExists, createCard, CreateCardDto, getCardByApplication } from '../api/cardApi';

interface CreateOnlyCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCardCreated: () => void;
  applicationData: {
    id: number;
    firstName: string;
    lastName: string;
    cardType: 'disability' | 'carer' | 'customer_support';
    applicationType: string;
    profilePicture?: string;
  };
  manualCardNumberPrefix?: string;
}

const CreateOnlyCardModal: React.FC<CreateOnlyCardModalProps> = ({
  isOpen,
  onClose,
  onCardCreated,
  applicationData
}) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    cardType: '',
    issuedDate: '',
    expiryDate: '',
    status: 'Active',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [checkingCardNumber, setCheckingCardNumber] = useState(false);
  const [cardAlreadyExists, setCardAlreadyExists] = useState(false);

  // Generate card type display name
  const getCardTypeDisplayName = (type: string) => {
    switch (type) {
      case 'disability':
        return 'National Disability Card';
      case 'carer':
        return 'National Carers Card';
      case 'customer_support':
        return 'National Support Card';
      default:
        return 'National Card';
    }
  };

  // Generate card number prefix
  const getCardNumberPrefix = (type: string) => {
    switch (type) {
      case 'disability':
        return 'ND-';
      case 'carer':
        return 'NC-';
      case 'customer_support':
        return 'NS-';
      default:
        return 'N-';
    }
  };

  useEffect(() => {
    const checkExistingCardAndPrepareForm = async () => {
      if (isOpen && applicationData) {
        try {
          // Check if a card already exists for this application
          const existingCardResult = await getCardByApplication(applicationData.id, applicationData.cardType);
          if (existingCardResult) {
            setCardAlreadyExists(true);
            return;
          } else {
            setCardAlreadyExists(false);
            const cardType = getCardTypeDisplayName(applicationData.cardType);
            // Always use NDAid- prefix for all card types
            setFormData({
              cardNumber: 'NDAid-',
              cardholderName: `${applicationData.firstName} ${applicationData.lastName}`,
              cardType: cardType,
              issuedDate: new Date().toISOString().split('T')[0],
              expiryDate: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              status: 'Active',
              notes: ''
            });
          }
        } catch (error) {
          console.error('Error checking existing card:', error);
          setCardAlreadyExists(false);
        }
      }
    };
    checkExistingCardAndPrepareForm();
  }, [isOpen, applicationData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardNumberChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, cardNumber: value }));

    if (value.length > 5) {
      setCheckingCardNumber(true);
      try {
        const exists = await checkCardNumberExists(value);
        if (exists) {
          toast.error('This card number already exists. Please use a different one.');
        }
      } catch (error) {
        console.error('Error checking card number:', error);
      } finally {
        setCheckingCardNumber(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cardAlreadyExists) {
      toast.error('A card already exists for this application. Use Tracking Cards to edit it.');
      return;
    }

    setLoading(true);

    try {
      // Only creation is allowed in this modal
      const cardDto: CreateCardDto = {
        cardNumber: formData.cardNumber,
        cardholderName: formData.cardholderName,
        cardType: formData.cardType,
        issuedDate: new Date(formData.issuedDate).toISOString(),
        expiryDate: new Date(formData.expiryDate).toISOString(),
        status: formData.status,
        originalApplicationId: applicationData.id,
        originalApplicationType: applicationData.cardType,
        notes: formData.notes
      };

      await createCard(cardDto);
      toast.success('Card created successfully!');
      onCardCreated();
      onClose();
    } catch (error: any) {
      console.error('Error creating card:', error);
      if (error.message?.includes('already exists')) {
        toast.error('A card already exists for this application or this card number is taken.');
      } else {
        toast.error(error.message || 'Failed to create card');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Create New Card</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Application Preview */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {applicationData.profilePicture ? (
                <img
                  src={applicationData.profilePicture}
                  alt={`${applicationData.firstName} ${applicationData.lastName}`}
                  className="h-16 w-16 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-lg font-medium text-gray-600">
                    {applicationData.firstName[0]}{applicationData.lastName[0]}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {applicationData.firstName} {applicationData.lastName}
              </h3>
              <p className="text-sm text-gray-600">
                {getCardTypeDisplayName(applicationData.cardType)} Application
              </p>
            </div>
          </div>
        </div>

        {cardAlreadyExists ? (
          <div className="p-6">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Card Already Exists</h3>
              <p className="text-gray-600 mb-6">
                A card has already been created for this application. 
                To modify the card, please use the Tracking Cards section in the admin dashboard.
              </p>
              <button
                onClick={onClose}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Tracking Cards
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CreditCard className="w-4 h-4 inline mr-1" />
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  {checkingCardNumber && (
                    <p className="text-sm text-blue-600 mt-1">Checking availability...</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    name="cardholderName"
                    value={formData.cardholderName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Type
                  </label>
                  <input
                    type="text"
                    name="cardType"
                    value={formData.cardType}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Issued Date
                  </label>
                  <input
                    type="date"
                    name="issuedDate"
                    value={formData.issuedDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4 inline mr-1" />
                  Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add any additional notes about the card..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || checkingCardNumber}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Create Card</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateOnlyCardModal;