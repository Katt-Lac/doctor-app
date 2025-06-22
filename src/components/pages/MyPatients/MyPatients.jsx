import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import './MyPatients.css';
import {getPatients} from "../../../services/api";
import {PatientDialog} from "../../dialog/Dialog";
import {useState, useEffect} from "react";

function MyPatients() {
    // const patients = [
    //     { id: 1, name: "Tim Moore", age: 23, diagnosis: "Asthma", appointmentTime: "9:00" },
    //     { id: 2, name: "Zoe Miller", age: 38, diagnosis: "Allergy", appointmentTime: "9:30" },
    //     { id: 3, name: "Sergio Pliego", age: 33, diagnosis: "Flu", appointmentTime: "10:30" },
    //     { id: 4, name: "Sophia Graham", age: 18, diagnosis: "Allergy", appointmentTime: "13:30" },
    //     { id: 5, name: "John Smith", age: 45, diagnosis: "Asthma", appointmentTime: "14:00" },
    //     { id: 6, name: "Jane Smith", age: 44, diagnosis: "Flu", appointmentTime: "14:30" },
    //     { id: 7, name: "Liam Novak", age: 29, diagnosis: "Back Pain", appointmentTime: "15:00" },
    //     { id: 8, name: "Emily Chen", age: 35, diagnosis: "Migraine", appointmentTime: "15:30" },
    //     { id: 9, name: "Carlos Ortega", age: 50, diagnosis: "Diabetes", appointmentTime: "16:00" },
    //     { id: 10, name: "Nina Kowalski", age: 41, diagnosis: "Hypertension", appointmentTime: "16:30" },
    //     { id: 11, name: "Oliver Jensen", age: 22, diagnosis: "Sprained Ankle", appointmentTime: "17:00" }
    // ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPatients() {
            const storedPatients = localStorage.getItem('myPatients');
            if (storedPatients) {
                setPatients(JSON.parse(storedPatients));
                setLoading(false);
            } else {
                const fetchedPatients = await getPatients(30);
                const mappedPatients = fetchedPatients.map(p => ({
                    ...p,
                    birthDateFormatted: formatDate(p.birthDate),
                }));
                setPatients(mappedPatients);
                localStorage.setItem('myPatients', JSON.stringify(mappedPatients));
                setLoading(false);
            }
        }
        loadPatients();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleNameClick = (patient) => {
        setSelectedPatient(patient);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedPatient(null);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        alert(search);
    };

    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    if (patients.length === 0) {
        return (
            <>
                <h2>MY PATIENTS</h2>
                <p>No patients</p>
            </>
        );
    }

    if (loading) return <p>Loading patients...</p>;

    return (
        <>
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
            <h2>MY PATIENTS</h2>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="patients table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="patients-table-header">Name</TableCell>
                                <TableCell className="patients-table-header">Date of Birth</TableCell>
                                <TableCell className="patients-table-header">Address</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                    ? patients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : patients
                            ).map((patient) => (
                                <TableRow className="patients-table-row" key={patient.id} hover>
                                    <TableCell style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                               onClick={() => handleNameClick(patient)}>{patient.name}</TableCell>
                                    <TableCell>{formatDate(patient.birthDate)}</TableCell>
                                    <TableCell>{patient.address || "Unknown"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    component="div"
                    count={patients.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <PatientDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                patient={selectedPatient}
            />
        </>
    );
}

export default MyPatients;
