export interface Payment {
  id: number;
  applicationType: string;
  applicationId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  baseAmount: number;
  lanyardAmount: number;
  totalAmount: number;
  includeLanyard: boolean;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt?: string;
  confirmedAt?: string;
  transactionReference?: string;
  bankName?: string;
  transferDate?: string;
  adminNotes?: string;
  applicantName?: string;
  applicantEmail?: string;
  applicationStatus?: string;
}

export interface CreatePaymentDto {
  applicationType: string;
  applicationId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  baseAmount: number;
  lanyardAmount: number;
  totalAmount: number;
  includeLanyard: boolean;
  paymentMethod: string;
}

export interface ConfirmBankTransferDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  transactionReference?: string;
  bankName?: string;
  transferDate?: string;
}

export interface UpdatePaymentStatusDto {
  paymentStatus: string;
  transactionReference?: string;
  bankName?: string;
  transferDate?: string;
  adminNotes?: string;
}
