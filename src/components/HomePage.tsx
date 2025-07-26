import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Sparkles, 
  Sun, 
  PlusCircle, 
  HeartPulse, 
  AlignCenter, 
  Zap,
  Star,
  Users,
  Award,
  CheckCircle
} from 'lucide-react';
import { officeInfo, services, dentists } from '../data/mockData';

const HomePage: React.FC = () => {
  const getServiceIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      sparkles: Sparkles,
      sun: Sun,
      'plus-circle': PlusCircle,
      'heart-pulse': HeartPulse,
      'align-center': AlignCenter,
      zap: Zap
    };
    return icons[iconName] || Sparkles;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-500 via-sky-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your Smile is Our Priority
            </h1>
            <p className="text-xl text-sky-100 mb-8 max-w-3xl mx-auto">
              Experience exceptional dental care with our team of experienced professionals. 
              From routine cleanings to advanced procedures, we're here for your oral health journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="bg-white text-sky-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Schedule Appointment
              </Link>
              <Link
                to="/dashboard"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-sky-600 transition-all duration-200"
              >
                View My Appointments
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Office Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Practice</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conveniently located in the heart of the medical district with modern facilities and caring staff.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-sky-100 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600">{officeInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-sky-100 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">{officeInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-sky-100 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">{officeInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-sky-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Office Hours</h3>
                  <div className="space-y-1">
                    {Object.entries(officeInfo.hours).map(([days, hours]) => (
                      <div key={days} className="flex justify-between text-sm">
                        <span className="text-gray-600">{days}:</span>
                        <span className="text-gray-900 font-medium">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Why Choose SmileCare?</h3>
              <div className="space-y-4">
                {[
                  { icon: Users, text: "Experienced team of dental professionals" },
                  { icon: Award, text: "State-of-the-art equipment and technology" },
                  { icon: CheckCircle, text: "Comprehensive dental services" },
                  { icon: Star, text: "Personalized treatment plans" }
                ].map(({ icon: Icon, text }, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-sky-600" />
                    <span className="text-gray-700">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From preventive care to advanced treatments, we offer comprehensive dental services 
              to keep your smile healthy and beautiful.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = getServiceIcon(service.icon);
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="bg-sky-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-sky-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Duration: {service.duration}</span>
                    <span className="text-lg font-bold text-sky-600">{service.price}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our experienced dentists are committed to providing exceptional care with the latest techniques and technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {dentists.map((dentist) => (
              <div
                key={dentist.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={dentist.image}
                    alt={dentist.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{dentist.name}</h3>
                  <p className="text-sky-600 font-medium mb-3">{dentist.specialty}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{dentist.experience} experience</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{dentist.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-sky-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Schedule Your Visit?</h2>
          <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
            Take the first step towards a healthier, brighter smile. Book your appointment today!
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center space-x-2 bg-white text-sky-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Calendar className="h-5 w-5" />
            <span>Schedule Appointment</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;