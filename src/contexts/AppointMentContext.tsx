import axios from "../config/axiosConfig";
import { createContext, useContext, useState } from "react";
import { Appointment } from '../types';
import { Dispatch } from "react";
import { SetStateAction } from "react";

interface IAppointment {
    appointments: Appointment[];
    setAppointments: Dispatch<SetStateAction<Appointment[]>>;
    getAppointments: () => void;
    storeAppointment: (
        date: string, 
        time: string, 
        service: string, 
        dentistId: string
    ) => void;
    cancelAppointment: (appointmentId: number) => void;
    rescheduleAppointment: (appointmentId: number) => void;
}

const AppointmentContext = createContext<IAppointment | undefined>(undefined);

export const AppointmentProvider = ({children}: {children: ReactNode}) => {

    const [appointments, setAppointments] = useState<Appointment[]>([]); 

    const getAppointments = async () => {

        try {

            const result = await axios.get(`appointments`);
            if(result.status === 200)
            {
                setAppointments(result.data)
            }
            
        } catch (error) {
            console.log(error);
        }
        
    }

    const storeAppointment = async (
        date: string, 
        time: string, 
        service: string, 
        dentistId: number
    ) => {

        try {
            
            const response = await axios.post(`appointments`, {
                date,time,service,dentistId
            });
            console.log(response);
            
        } catch (error) {
            
        }
        console.log('store appointment');
    }

    const cancelAppointment = (appointmentId: number) => {
        console.log(appointmentId);
    }

    const rescheduleAppointment = (appointmentId: number) => {
        console.log(appointmentId);
    }

    return (
        <AppointmentContext.Provider value={{ getAppointments, appointments, setAppointments, storeAppointment }}>
            {children}
        </AppointmentContext.Provider>
    )
}


export const useAppointment = ():IAppointment => {
    const context = useContext(AppointmentContext);

    if(context === undefined){
        throw new Error('useAppointment must be within a Appointment Provider');

    }

    return context;
}