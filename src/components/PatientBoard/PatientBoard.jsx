import PatientCard from "../PatientCard/PatientCard";

function PatientBoard({patient}) {


    return (
        <div className="patient-board">
            <h2>APPOINTMENTS</h2>
            <p>You have following appointments today:</p>
            <PatientCard patient={{name: "Tim Moore", age: "23", diagnosis: "Asthma", appointmentTime: "9:30" }}/>
            <PatientCard patient={{name: "Zoe Miller", age: "38", diagnosis: "Allergy", appointmentTime: "9:00" }}/>
            <PatientCard patient={{name: "Sergio Pliego", age: "33", diagnosis: "Flu", appointmentTime: "10:30" }}/>
            <PatientCard patient={{name: "Sophia Graham", age: "18", diagnosis: "Allergy", appointmentTime: "13:30" }}/>
            <PatientCard patient={{name: "John Smith", age: "45", diagnosis: "Asthma", appointmentTime: "14:00" }}/>
            <PatientCard patient={{name: "Jane Smith", age: "44", diagnosis: "Flu", appointmentTime: "14:30" }}/>
        </div>
    )
}

export default PatientBoard