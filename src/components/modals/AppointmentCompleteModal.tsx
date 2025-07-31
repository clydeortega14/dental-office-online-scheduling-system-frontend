import React from "react";
import { SetStateAction } from "react";
import { Dispatch } from "react";
import { useAppointment } from "../../contexts/AppointMentContext";


interface Props {
    showCompleteModal: number | null;
    setShowCompleteModal: Dispatch<SetStateAction<number|null>>;
}

const AppointmentCompleteModal: React.FC<Props> = ({showCompleteModal, setShowCompleteModal}) => {

    const { completeAppointment, setAppointments } = useAppointment();


    const handleCompleteAppointment = () => {

        completeAppointment(showCompleteModal)
            .then(response => {
                if(response.status === 200){
                    setAppointments(prev =>
                        prev.map(appointment =>
                            appointment.id === showCompleteModal
                            ? { ...appointment, status: 'completed' as const }
                            : appointment
                        )
                    );

                    setShowCompleteModal(null)
                }
            })
            .catch(error => {
                alert(`ERROR: ${error}`)
            })

    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Complete Appointment</h3>
                <p className="text-gray-600 mb-6">
                Are you sure you want to compelete this appointment?
                </p>
                <div className="flex space-x-4">
                <button
                    onClick={() => setShowCompleteModal(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                   Close
                </button>
                <button
                    onClick={handleCompleteAppointment}
                    className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                    Complete
                </button>
                </div>
            </div>
        </div>
    );
}


export default AppointmentCompleteModal;