import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Appointments from "./components/pages/Appointments/Appointments";
import MyPatients from "./components/pages/MyPatients/MyPatients";
import Chats from "./components/pages/Chats/Chats";
import Calls from "./components/pages/Calls/Calls";
import Settings from "./components/pages/Settings/Settings";
import Login from "./components/pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { useAuth } from './context/auth.context';

function App() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    return (
        <div className={`app-layout ${isLoginPage ? 'login-layout' : ''}`}>
            {!isLoginPage && user && (
                    <Navbar doctor={user} />
            )}
            <main className={`main-content ${isLoginPage ? 'login-content' : ''}`}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<PrivateRoute><Appointments /></PrivateRoute>} />
                    <Route path="/my-patients" element={<PrivateRoute><MyPatients /></PrivateRoute>} />
                    <Route path="/chats" element={<PrivateRoute><Chats /></PrivateRoute>} />
                    <Route path="/calls" element={<PrivateRoute><Calls /></PrivateRoute>} />
                    <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
