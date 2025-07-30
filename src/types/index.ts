export interface Dentist {
  id: number;
  name: string;
  specialty: string;
  image: string;
  experience: string;
  rating: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  icon: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface Appointment {
  id: number;
  dentistId: string;
  dentistName: string;
  service: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'rescheduled' | 'compeleted';
  patientName: string;
  patientEmail: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: {
    allergies: string[];
    medications: string[];
    conditions: string[];
  };
  insurance: {
    provider: string;
    policyNumber: string;
  };
  createdAt: string;
  lastLogin: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface OfficeInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: {
    [key: string]: string;
  };
}