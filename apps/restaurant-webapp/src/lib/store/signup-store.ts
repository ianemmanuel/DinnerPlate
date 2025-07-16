import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BusinessType = 'restaurant' | 'commercial_kitchen';
export type SignupStatus = 'pending' | 'approved' | 'rejected' | 'needs_revision';

export interface DocumentFile {
  id: string;
  file: File | null;
  name: string;
  url: string; // For preview
  type: string;
  size: number;
}

export interface SignupState {
  currentStep: number;
  businessType: BusinessType | null;
  businessName: string;
  businessEmail: string;
  ownerFirstName: string;
  ownerLastName: string;
  password: string;
  agreedToTerms: boolean;
  emailVerified: boolean;
  emailOtp: string;
  legalBusinessName: string;
  businessPhone: string;
  country: string;
  city: string;
  street: string;
  postalCode: string;
  latitude: number | null;
  longitude: number | null;
  documents: {
    businessLicense: DocumentFile | null;
    healthCertificate: DocumentFile | null;
    nationalId: DocumentFile | null;
  };
  phoneVerified: boolean;
  phoneOtp: string;
  confirmSubmission: boolean;
  status: SignupStatus;
  rejectionReason: string;
  // Methods
  setCurrentStep: (step: number) => void;
  updateField: <K extends keyof SignupState>(key: K, value: SignupState[K]) => void;
  updateDocument: (
    type: 'businessLicense' | 'healthCertificate' | 'nationalId',
    document: DocumentFile | null
  ) => void;
  resetForm: () => void;
}

const initialState = {
  currentStep: 1,
  businessType: null,
  businessName: '',
  businessEmail: '',
  ownerFirstName: '',
  ownerLastName: '',
  password: '',
  agreedToTerms: false,
  emailVerified: false,
  emailOtp: '',
  legalBusinessName: '',
  businessPhone: '',
  country: '',
  city: '',
  street: '',
  postalCode: '',
  latitude: null,
  longitude: null,
  documents: {
    businessLicense: null,
    healthCertificate: null,
    nationalId: null,
  },
  phoneVerified: false,
  phoneOtp: '',
  confirmSubmission: false,
  status: 'pending' as SignupStatus,
  rejectionReason: '',
};

export const useSignupStore = create<SignupState>()(
  persist(
    (set) => ({
      ...initialState,
      setCurrentStep: (step) => set({ currentStep: step }),
      updateField: (key, value) => set((state) => ({ ...state, [key]: value })),
      updateDocument: (type, document) =>
        set((state) => ({
          ...state,
          documents: { ...state.documents, [type]: document },
        })),
      resetForm: () => set(initialState),
    }),
    {
      name: 'kitchen-signup-storage',
    }
  )
);