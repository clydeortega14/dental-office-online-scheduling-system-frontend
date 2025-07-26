import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, Heart, Shield, Edit3, Save, X, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, updateProfile, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    address: user?.address || '',
    emergencyContact: {
      name: user?.emergencyContact.name || '',
      phone: user?.emergencyContact.phone || '',
      relationship: user?.emergencyContact.relationship || ''
    },
    medicalHistory: {
      allergies: user?.medicalHistory.allergies || [],
      medications: user?.medicalHistory.medications || [],
      conditions: user?.medicalHistory.conditions || []
    },
    insurance: {
      provider: user?.insurance.provider || '',
      policyNumber: user?.insurance.policyNumber || ''
    }
  });

  const [newAllergy, setNewAllergy] = useState('');
  const [newMedication, setNewMedication] = useState('');
  const [newCondition, setNewCondition] = useState('');

  const handleSave = async () => {
    setMessage(null);
    const success = await updateProfile(formData);
    if (success) {
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      dateOfBirth: user?.dateOfBirth || '',
      address: user?.address || '',
      emergencyContact: {
        name: user?.emergencyContact.name || '',
        phone: user?.emergencyContact.phone || '',
        relationship: user?.emergencyContact.relationship || ''
      },
      medicalHistory: {
        allergies: user?.medicalHistory.allergies || [],
        medications: user?.medicalHistory.medications || [],
        conditions: user?.medicalHistory.conditions || []
      },
      insurance: {
        provider: user?.insurance.provider || '',
        policyNumber: user?.insurance.policyNumber || ''
      }
    });
    setIsEditing(false);
    setMessage(null);
  };

  const addToMedicalHistory = (type: 'allergies' | 'medications' | 'conditions', value: string) => {
    if (!value.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      medicalHistory: {
        ...prev.medicalHistory,
        [type]: [...prev.medicalHistory[type], value.trim()]
      }
    }));
    
    if (type === 'allergies') setNewAllergy('');
    if (type === 'medications') setNewMedication('');
    if (type === 'conditions') setNewCondition('');
  };

  const removeFromMedicalHistory = (type: 'allergies' | 'medications' | 'conditions', index: number) => {
    setFormData(prev => ({
      ...prev,
      medicalHistory: {
        ...prev.medicalHistory,
        [type]: prev.medicalHistory[type].filter((_, i) => i !== index)
      }
    }));
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'emergency', label: 'Emergency Contact', icon: Phone },
    { id: 'medical', label: 'Medical History', icon: Heart },
    { id: 'insurance', label: 'Insurance', icon: Shield }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-sky-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    <span>Save Changes</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>

          {/* Success/Error Messages */}
          {message && (
            <div className={`mt-4 flex items-center space-x-2 p-3 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-600' 
                : 'bg-red-50 border border-red-200 text-red-600'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <span className="text-sm">{message.text}</span>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === id
                      ? 'border-sky-500 text-sky-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Personal Information Tab */}
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      />
                    ) : (
                      <p className="text-gray-900">{user.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      />
                    ) : (
                      <p className="text-gray-900">{user.lastName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      />
                    ) : (
                      <p className="text-gray-900">{user.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      />
                    ) : (
                      <p className="text-gray-900">{user.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      />
                    ) : (
                      <p className="text-gray-900">{new Date(user.dateOfBirth).toLocaleDateString()}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    {isEditing ? (
                      <textarea
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        placeholder="Enter your full address"
                      />
                    ) : (
                      <p className="text-gray-900">{user.address || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Emergency Contact Tab */}
            {activeTab === 'emergency' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Emergency Contact</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.emergencyContact.name}
                        onChange={(e) => setFormData({
                          ...formData,
                          emergencyContact: { ...formData.emergencyContact, name: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        placeholder="Emergency contact name"
                      />
                    ) : (
                      <p className="text-gray-900">{user.emergencyContact.name || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.emergencyContact.phone}
                        onChange={(e) => setFormData({
                          ...formData,
                          emergencyContact: { ...formData.emergencyContact, phone: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        placeholder="Emergency contact phone"
                      />
                    ) : (
                      <p className="text-gray-900">{user.emergencyContact.phone || 'Not provided'}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Relationship
                    </label>
                    {isEditing ? (
                      <select
                        value={formData.emergencyContact.relationship}
                        onChange={(e) => setFormData({
                          ...formData,
                          emergencyContact: { ...formData.emergencyContact, relationship: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      >
                        <option value="">Select relationship</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Parent">Parent</option>
                        <option value="Child">Child</option>
                        <option value="Sibling">Sibling</option>
                        <option value="Friend">Friend</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{user.emergencyContact.relationship || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Medical History Tab */}
            {activeTab === 'medical' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Medical History</h3>
                
                {/* Allergies */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Allergies
                  </label>
                  <div className="space-y-2">
                    {formData.medicalHistory.allergies.map((allergy, index) => (
                      <div key={index} className="flex items-center justify-between bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        <span className="text-red-800">{allergy}</span>
                        {isEditing && (
                          <button
                            onClick={() => removeFromMedicalHistory('allergies', index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newAllergy}
                          onChange={(e) => setNewAllergy(e.target.value)}
                          placeholder="Add new allergy"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          onKeyPress={(e) => e.key === 'Enter' && addToMedicalHistory('allergies', newAllergy)}
                        />
                        <button
                          onClick={() => addToMedicalHistory('allergies', newAllergy)}
                          className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                        >
                          Add
                        </button>
                      </div>
                    )}
                    {formData.medicalHistory.allergies.length === 0 && !isEditing && (
                      <p className="text-gray-500 italic">No allergies recorded</p>
                    )}
                  </div>
                </div>

                {/* Medications */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Medications
                  </label>
                  <div className="space-y-2">
                    {formData.medicalHistory.medications.map((medication, index) => (
                      <div key={index} className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                        <span className="text-blue-800">{medication}</span>
                        {isEditing && (
                          <button
                            onClick={() => removeFromMedicalHistory('medications', index)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newMedication}
                          onChange={(e) => setNewMedication(e.target.value)}
                          placeholder="Add new medication"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          onKeyPress={(e) => e.key === 'Enter' && addToMedicalHistory('medications', newMedication)}
                        />
                        <button
                          onClick={() => addToMedicalHistory('medications', newMedication)}
                          className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                        >
                          Add
                        </button>
                      </div>
                    )}
                    {formData.medicalHistory.medications.length === 0 && !isEditing && (
                      <p className="text-gray-500 italic">No medications recorded</p>
                    )}
                  </div>
                </div>

                {/* Medical Conditions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medical Conditions
                  </label>
                  <div className="space-y-2">
                    {formData.medicalHistory.conditions.map((condition, index) => (
                      <div key={index} className="flex items-center justify-between bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
                        <span className="text-yellow-800">{condition}</span>
                        {isEditing && (
                          <button
                            onClick={() => removeFromMedicalHistory('conditions', index)}
                            className="text-yellow-600 hover:text-yellow-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newCondition}
                          onChange={(e) => setNewCondition(e.target.value)}
                          placeholder="Add new condition"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          onKeyPress={(e) => e.key === 'Enter' && addToMedicalHistory('conditions', newCondition)}
                        />
                        <button
                          onClick={() => addToMedicalHistory('conditions', newCondition)}
                          className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                        >
                          Add
                        </button>
                      </div>
                    )}
                    {formData.medicalHistory.conditions.length === 0 && !isEditing && (
                      <p className="text-gray-500 italic">No conditions recorded</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Insurance Tab */}
            {activeTab === 'insurance' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Insurance Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Insurance Provider
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.insurance.provider}
                        onChange={(e) => setFormData({
                          ...formData,
                          insurance: { ...formData.insurance, provider: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        placeholder="Insurance provider name"
                      />
                    ) : (
                      <p className="text-gray-900">{user.insurance.provider || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Policy Number
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.insurance.policyNumber}
                        onChange={(e) => setFormData({
                          ...formData,
                          insurance: { ...formData.insurance, policyNumber: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        placeholder="Policy number"
                      />
                    ) : (
                      <p className="text-gray-900">{user.insurance.policyNumber || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;