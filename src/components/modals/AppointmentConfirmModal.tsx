import { SetStateAction } from "react"
import { Dispatch } from "react"
import { useAppointment } from "../../contexts/AppointMentContext";

interface Props {
    showConfirmedModal: number
    setShowConfirmedModal: Dispatch<SetStateAction<number | null>>;
}

const AppointmentConfirmModal: React.FC<Props> = ({showConfirmedModal, setShowConfirmedModal}) => {

    const {confirmedAppointment, setAppointments} = useAppointment();

    const handleAppointmentConfirmation = () => {
        confirmedAppointment(showConfirmedModal)
        .then(response => {
            if(response){
                setAppointments(prev =>
                    prev.map(appointment =>
                        appointment.id === showConfirmedModal
                        ? { ...appointment, status: 'confirmed' as const }
                        : appointment
                    )
                );

                setShowConfirmedModal(null)
            }
        })
        .catch(error => {
            alert(`${error.status}: ${error.message}`)
        })
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Appointment</h3>
                <p className="text-gray-600 mb-6">
                Are you sure you want to confirm this appointment?
                </p>
                <div className="flex space-x-4">
                <button
                    onClick={() => setShowConfirmedModal(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    No, Cancel it.
                </button>
                <button
                    onClick={handleAppointmentConfirmation}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                    Confirm Appointment
                </button>
                </div>
            </div>
        </div>
    );
}

export default AppointmentConfirmModal;