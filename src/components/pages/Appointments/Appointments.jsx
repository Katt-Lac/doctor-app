import PatientCard from "../../PatientCard/PatientCard";
import { useState, useEffect } from "react";
import { getPatients } from "../../../services/api";
import './Appointmets.css';

function generateAppointmentTimes(count) {
    const times = [];
    let hour = 9;
    let minute = 0;

    for (let i = 0; i < count; i++) {
        const hh = hour.toString().padStart(2, '0');
        const mm = minute.toString().padStart(2, '0');
        times.push(`${hh}:${mm}`);
        minute += 30;
        if (minute === 60) {
            minute = 0;
            hour++;
        }
    }
    return times;
}

function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

function Appointments() {
    const [search, setSearch] = useState("");
    const [patients, setPatients] = useState([]);
    const appointmentTimes = generateAppointmentTimes(10);

    useEffect(() => {
        async function loadPatients() {
            const storedPatients = localStorage.getItem('patients');
            if (storedPatients) {
                setPatients(JSON.parse(storedPatients));
            } else {
                const fetchedPatients = await getPatients(10);
                const mappedPatients = fetchedPatients.map((p, i) => ({
                    ...p,
                    birthDate: formatDate(p.birthDate),
                    appointmentTime: appointmentTimes[i]
                }));
                setPatients(mappedPatients);
                localStorage.setItem('patients', JSON.stringify(mappedPatients));
            }
        }
        loadPatients();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        alert(search);
    };

    return (
        <div className="appontments">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search"
                    className="search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit" className="search-btn">Search</button>
            </form>

            <h2>APPOINTMENTS</h2>
            <p>You have following appointments today:</p>

            <div className="patient-grid">
                {patients
                    .filter(patient =>
                        patient.name.toLowerCase().includes(search.toLowerCase()) ||
                        patient.birthDate.startsWith(search) ||
                        patient.diagnosis.toLowerCase().includes(search.toLowerCase())
                    )
                    .map(patient => (
                        <PatientCard patient={patient} key={patient.id} />
                    ))}
            </div>
        </div>
    );
}

export default Appointments;
