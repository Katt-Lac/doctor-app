import { MdCalendarToday, MdPeople, MdChat, MdCall, MdSettings, MdLogout } from 'react-icons/md';
import { NavLink, useNavigate } from "react-router-dom";
import './Navbar.css';
import doctorPhoto from '../../assets/profile-photo.jpg';
import { useAuth } from '../../context/auth.context';

function Navbar({ doctor }) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    return (
        <div className="navbar">
            <div className="doctor-profile">
                <div className="doctor-photo">
                    <img src={doctorPhoto} alt={doctor.name} />
                </div>
                <div className="doctor-info">
                    <h3>Dr. {doctor.name}</h3>
                    <h4>{doctor.specialization}</h4>
                </div>
            </div>

            <div className="navbar-pages">
                <NavLink to="/" className="nav-item">
                    <span className="icon"><MdCalendarToday /></span> APPOINTMENTS
                </NavLink>
                <NavLink to="/my-patients" className="nav-item">
                    <span className="icon"><MdPeople /></span> MY PATIENTS
                </NavLink>
                <NavLink to="/chats" className="nav-item">
                    <span className="icon"><MdChat /></span> CHATS
                </NavLink>
                <NavLink to="/calls" className="nav-item">
                    <span className="icon"><MdCall /></span> CALLS
                </NavLink>
                <NavLink to="/settings" className="nav-item">
                    <span className="icon"><MdSettings /></span> SETTINGS
                </NavLink>
                <div className="logout-button" onClick={handleLogout}>
                    <span className="icon"><MdLogout /></span> LOGOUT
                </div>
            </div>
        </div>
    );
}

export default Navbar;
