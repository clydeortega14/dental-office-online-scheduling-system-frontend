import { Dentist, Service, OfficeInfo, Appointment } from '../types';

export const officeInfo: OfficeInfo = {
  name: "SmileCare Dental Practice",
  address: "123 Health Avenue, Medical District, NY 10001",
  phone: "(555) 123-SMILE",
  email: "info@smilecare.com",
  hours: {
    "Monday - Friday": "8:00 AM - 6:00 PM",
    "Saturday": "9:00 AM - 4:00 PM",
    "Sunday": "Closed"
  }
};

export const dentists: Dentist[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "General Dentistry",
    image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    experience: "12 years",
    rating: 4.9
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Orthodontics",
    image: "https://images.pexels.com/photos/6627374/pexels-photo-6627374.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    experience: "8 years",
    rating: 4.8
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Cosmetic Dentistry",
    image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    experience: "10 years",
    rating: 4.9
  }
];

export const services: Service[] = [
  {
    id: "1",
    name: "Regular Cleaning",
    description: "Professional teeth cleaning and oral health checkup",
    duration: "45 min",
    price: "$120",
    icon: "sparkles"
  },
  {
    id: "2",
    name: "Teeth Whitening",
    description: "Professional whitening treatment for brighter smile",
    duration: "60 min",
    price: "$350",
    icon: "sun"
  },
  {
    id: "3",
    name: "Dental Implant",
    description: "Permanent tooth replacement solution",
    duration: "90 min",
    price: "$2,500",
    icon: "plus-circle"
  },
  {
    id: "4",
    name: "Root Canal",
    description: "Treatment to repair and save infected tooth",
    duration: "75 min",
    price: "$800",
    icon: "heart-pulse"
  },
  {
    id: "5",
    name: "Orthodontic Consultation",
    description: "Assessment for braces or alignment treatment",
    duration: "30 min",
    price: "$150",
    icon: "align-center"
  },
  {
    id: "6",
    name: "Emergency Care",
    description: "Urgent dental care for pain or injury",
    duration: "30 min",
    price: "$200",
    icon: "zap"
  }
];

export const timeSlots = [
  { id: "1", time: "09:00:00", available: true },
  { id: "2", time: "09:00:00", available: false },
  { id: "3", time: "10:00:00", available: true },
  { id: "4", time: "10:30:00", available: true },
  { id: "5", time: "11:00:00", available: false },
  { id: "6", time: "11:30:00", available: true },
  { id: "7", time: "13:00:00", available: true },
  { id: "8", time: "13:30:00", available: true },
  { id: "9", time: "14:00:00", available: false },
  { id: "10", time: "14:30:00", available: true },
  { id: "11", time: "15:00:00", available: true },
  { id: "12", time: "15:30:00", available: true },
  { id: "13", time: "16:00:00", available: true },
  { id: "14", time: "16:30:00", available: false },
  { id: "15", time: "17:00:00", available: true }
];

export const mockAppointments: Appointment[] = [
  {
    id: 1,
    dentistId: "1",
    dentistName: "Dr. Sarah Johnson",
    service: "Regular Cleaning",
    date: "2025-01-25",
    time: "10:00 AM",
    status: "confirmed",
    patientName: "John Doe",
    patientEmail: "john@example.com"
  },
  {
    id: 2,
    dentistId: "3",
    dentistName: "Dr. Emily Rodriguez",
    service: "Teeth Whitening",
    date: "2025-01-28",
    time: "2:00 PM",
    status: "confirmed",
    patientName: "John Doe",
    patientEmail: "john@example.com"
  },
  {
    id: 2,
    dentistId: "2",
    dentistName: "Dr. Michael Chen",
    service: "Orthodontic Consultation",
    date: "2025-02-05",
    time: "11:30 AM",
    status: "pending",
    patientName: "John Doe",
    patientEmail: "john@example.com"
  }
];