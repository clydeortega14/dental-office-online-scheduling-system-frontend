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
    ) => Promise;
    cancelAppointment: (appointmentId: number) => Promise;
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

    const storeAppointment = (
        date: string, 
        time: string, 
        service: string, 
        dentistId: number
    ) => {

        return new Promise((resolve, reject) => {
            setTimeout( () => {
                axios.post(`appointments`, {
                date,
                time,
                service,
                dentistId
            })
            .then(response => {
                resolve(true);
            })
            .catch(error => {
                reject(true);
            });
            }, 1000);
        });
        
    }

    const cancelAppointment = (appointmentId: number) => {

        return new Promise((resolve, reject) => {
            setTimeout( () => {
                axios.patch(`cancel/appointment`, {
                    appointmentid: appointmentId
                })
                .then(response => console.log(response))
                .catch(error => console.log(error))
            }, 1000)
        });
    }

    const rescheduleAppointment = (appointmentId: number) => {
        console.log(appointmentId);
    }

    return (
        <AppointmentContext.Provider value={{ getAppointments, appointments, setAppointments, storeAppointment, cancelAppointment }}>
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