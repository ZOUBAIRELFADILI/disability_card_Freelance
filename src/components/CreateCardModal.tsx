import { Calendar, CreditCard, FileText, User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Card, checkCardNumberExists, createCard, CreateCardDto, getCardByApplication, updateCard } from '../api/cardApi';

interface CreateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCardCreated: () => void;
  applicationData: {
    id: number;
    firstName: string;
    lastName: string;
    cardType: 'disability' | 'carer' | 'customer_support';
    applicationType: string;
  };
  manualCardNumberPrefix?: string;
}

const CreateCardModal: React.FC<CreateCardModalProps> = ({
  isOpen,
  onClose,
  onCardCreated,
  applicationData,
  manualCardNumberPrefix
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
  const [manualNumberPart, setManualNumberPart] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingCardNumber, setCheckingCardNumber] = useState(false);
  const [existingCard, setExistingCard] = useState<Card | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialized, setInitialized] = useState(false);

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
    // Always use NDAid- prefix for all card types
    return 'NDAid-';
  };
  useEffect(() => {
    if (!isOpen) {
      setInitialized(false);
      return;
    }
    if (!initialized && isOpen && applicationData) {
      const checkExistingCard = async () => {
        try {
          // Check if a card already exists for this application
          const existingCardResult = await getCardByApplication(applicationData.id, applicationData.cardType);
          if (existingCardResult) {
            setExistingCard(existingCardResult);
            setIsEditMode(true);
            setFormData({
              cardNumber: existingCardResult.cardNumber,
              cardholderName: existingCardResult.cardholderName,
              cardType: existingCardResult.cardType,
              issuedDate: existingCardResult.issuedDate.split('T')[0],
              expiryDate: existingCardResult.expiryDate.split('T')[0],
              status: existingCardResult.status,
              notes: existingCardResult.notes || ''
            });
          } else {
            setExistingCard(null);
            setIsEditMode(false);
            const cardType = getCardTypeDisplayName(applicationData.cardType);
            let prefix = manualCardNumberPrefix || getCardNumberPrefix(applicationData.cardType);
            setManualNumberPart('');
            setFormData({
              cardNumber: `${prefix}`,
              cardholderName: `${applicationData.firstName} ${applicationData.lastName}`,
              cardType: cardType,
              issuedDate: new Date().toISOString().split('T')[0],
              expiryDate: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              status: 'Active',
              notes: ''
            });
          }
          setInitialized(true);
        } catch (error) {
          console.error('Error checking existing card:', error);
          setExistingCard(null);
          setIsEditMode(false);
          setInitialized(true);
        }
      };
      checkExistingCard();
    }
  }, [isOpen, applicationData, manualCardNumberPrefix, initialized]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleManualNumberChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Only allow numbers
    setManualNumberPart(value);
    const fullCardNumber = `${manualCardNumberPrefix || getCardNumberPrefix(applicationData.cardType)}${value}`;
    setFormData(prev => ({ ...prev, cardNumber: fullCardNumber }));
    if (value.length > 0) {
      setCheckingCardNumber(true);
      try {
        const exists = await checkCardNumberExists(fullCardNumber);
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
    setLoading(true);

    try {
      if (isEditMode && existingCard) {
        // Update existing card
        const updateData = {
          status: formData.status,
          expiryDate: formData.expiryDate,
          notes: formData.notes
        };
        await updateCard(existingCard.id, updateData);
        toast.success('Card updated successfully!');
      } else {
        // Create new card
        // Check card number one more time before creating
        const exists = await checkCardNumberExists(formData.cardNumber);
        if (exists) {
          toast.error('This card number already exists. Please use a different one.');
          setLoading(false);
          return;
        }

        const cardData: CreateCardDto = {
          ...formData,
          originalApplicationId: applicationData.id,
          originalApplicationType: applicationData.cardType
        };

        await createCard(cardData);
        toast.success('Card created successfully!');
      }
      
      onCardCreated();
      onClose();
    } catch (error: any) {
      console.error('Error with card operation:', error);
      toast.error(error.message || `Failed to ${isEditMode ? 'update' : 'create'} card`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <CreditCard className="w-6 h-6 mr-2 text-green-600" />
            {isEditMode ? 'Edit Card' : 'Create New Card'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Application Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Application Information</h3>
            <p className="text-sm text-gray-600">
              Creating card for: <strong>{applicationData.firstName} {applicationData.lastName}</strong>
            </p>
            <p className="text-sm text-gray-600">
              Application ID: <strong>#{applicationData.id}</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CreditCard className="w-4 h-4 inline mr-1" />
                Card Number
              </label>
              {isEditMode ? (
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50`}
                  readOnly
                  required
                />
              ) : (
                <div className="flex">
                  <span className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-lg text-gray-700 font-semibold select-none">{manualCardNumberPrefix || getCardNumberPrefix(applicationData.cardType)}</span>
                  <input
                    type="text"
                    name="manualNumberPart"
                    value={manualNumberPart}
                    onChange={handleManualNumberChange}
                    className="w-full px-3 py-2 border-t border-b border-r border-gray-300 rounded-r-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter card number digits"
                    required
                  />
                </div>
              )}
              {checkingCardNumber && (
                <p className="text-xs text-blue-600 mt-1">Checking availability...</p>
              )}
              {isEditMode && (
                <p className="text-xs text-gray-500 mt-1">Card number cannot be changed</p>
              )}
            </div>

            {/* Cardholder Name */}
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
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${isEditMode ? 'bg-gray-50' : ''}`}
                placeholder="Enter cardholder name"
                readOnly={isEditMode}
                required
              />
              {isEditMode && (
                <p className="text-xs text-gray-500 mt-1">Cardholder name cannot be changed</p>
              )}
            </div>

            {/* Card Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Type
              </label>
              <input
                type="text"
                name="cardType"
                value={formData.cardType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                readOnly
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Issued Date */}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            {/* Expiry Date */}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Notes */}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Add any additional notes..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={loading || checkingCardNumber}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (isEditMode ? 'Updating Card...' : 'Creating Card...') : (isEditMode ? 'Update Card' : 'Create Card')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCardModal;
