import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';
import axios from 'axios';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUser: User = {
  id: '1',
  email: 'john.doe@example.com',
  name: 'John Doe',
  firstName: 'John',
  lastName: 'Doe',
  phone: '(555) 123-4567',
  dateOfBirth: '1990-05-15',
  address: '123 Main St, Anytown, NY 12345',
  emergencyContact: {
    name: 'Jane Doe',
    phone: '(555) 987-6543',
    relationship: 'Spouse'
  },
  medicalHistory: {
    allergies: ['Penicillin'],
    medications: ['Lisinopril'],
    conditions: ['Hypertension']
  },
  insurance: {
    provider: 'Blue Cross Blue Shield',
    policyNumber: 'BC123456789'
  },
  createdAt: '2024-01-15T10:00:00Z',
  lastLogin: new Date().toISOString()
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('dental_user');
    if (savedUser) {
      setAuthState({
        user: JSON.parse(savedUser),
        isAuthenticated: true,
        isLoading: false
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, validate against backend
    if (email === 'john.doe@example.com' && password === 'password123') {
      const user = { ...mockUser, lastLogin: new Date().toISOString() };
      localStorage.setItem('dental_user', JSON.stringify(user));
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
      return true;
    }
    
    setAuthState(prev => ({ ...prev, isLoading: false }));
    return false;
  };

  const register = (data: RegisterData): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    return new Promise((resolve, reject) => {
      setTimeout( () => {
      
        const base_url = import.meta.env.VITE_API_URL;

        // request API Call to nodejs backend
        axios.post(`${base_url}/auth/register`, {
          withCredentials: true,
          name: `${data.name}`,
          email: data.email,
          password: data.password
        }).
        then(response => {
          if(response.status === 201 || response.status === 200)
          {
              resolve(true);

              const newUser: User = {
                id: Date.now().toString(),
                email: data.email,
                name: data.name,
                firstName: data.name,
                lastName: data.name,
                phone: '',
                dateOfBirth: '',
                address: '',
                emergencyContact: {
                  name: '',
                  phone: '',
                  relationship: ''
                },
                medicalHistory: {
                  allergies: [],
                  medications: [],
                  conditions: []
                },
                insurance: {
                  provider: '',
                  policyNumber: ''
                },
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
              };

              localStorage.setItem('dental_user', JSON.stringify(newUser));
              setAuthState({
                user: newUser,
                isAuthenticated: true,
                isLoading: false
              });
          }
        })
        .catch(error => console.log(error));

      }, 1000);
    })
    
    // Simulate API call
    // await new Promise(resolve => {

      
    //   .then(response => {
    //     if(response.status === 200 || response.status === 201){

    //       setTimeout(() => {
    //         resolve
    //         
            
    //         

    //         
    //         return true;

    //       }, 1000);

    //       // Mock registration - in real app, send to backend
          
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })


      
    // });
    // // await new Promise(resolve => console.log(resolve));

    
    
  };

  const logout = () => {
    localStorage.removeItem('dental_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!authState.user) return false;
    
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedUser = { ...authState.user, ...userData };
    localStorage.setItem('dental_user', JSON.stringify(updatedUser));
    
    setAuthState({
      user: updatedUser,
      isAuthenticated: true,
      isLoading: false
    });
    
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};