import './PatientCard.css';
import {MdCall, MdChat} from "react-icons/md";

function PatientCard({patient}) {

    function onChatClick() {
        alert("Clicked");
    }

    function onCallClick() {
        alert("Clicked");
    }

    return (
        <div className="patient-card">
            <div className="patient-info">
                <div className="patient-photo">
                    <img src={patient.picture} alt={patient.name} />
                </div>
                <div className="patient-details">
                    <h3>{patient.name}</h3>
                    <p>{patient.diagnosis}</p>
                    <p>{patient.appointmentTime}</p>
                </div>
            </div>
            <div className="action-btns">
                <button className="chat-btn" onClick={onChatClick}>
                    <MdChat style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    Chat
                </button>
                <button className="call-btn" onClick={onCallClick}>
                    <MdCall style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    Call
                </button>
            </div>
        </div>
    );
}

export default PatientCard