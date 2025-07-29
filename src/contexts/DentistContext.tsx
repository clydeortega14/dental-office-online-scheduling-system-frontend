import { createContext, ReactNode, useContext, useState } from "react";
import { Dentist } from "../types";
import axios from "../config/axiosConfig";

const DentistContext = createContext<Dentist | undefined>(undefined);

interface IDentist {
    dentists: Dentist[];
    getAllDentists: () => void;
}

export const DentistProvider = ({children}:{children:ReactNode}) => {

    const [dentists, setDentists] = useState<Dentist[]>([]);

    const getAllDentists = async () => {
        const response = await axios.get(`dentists`);
        if(response.status === 201 || response.status === 200)
        {
            setDentists(response.data)
        }
    }


    return (
        <DentistContext.Provider value={{dentists, getAllDentists}}>
            {children}
        </DentistContext.Provider>
    );

}

export const useDentist = ():IDentist => {

    const context = useContext(DentistContext);

    if(context === undefined)
    {
        throw new Error('useDentist must be within the DentistProvider');
    }

    return context;
}