import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login as loginService } from '../../../services/login.service';
import { useAuth } from '../../../context/auth.context';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userData = await loginService(username, password);
            login(userData);
            navigate('/', { replace: true });
        } catch {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <Paper elevation={3} className="login-box">
                <Typography variant="h5" className="login-title">
                    Login
                </Typography>

                {error && <Alert severity="error">{error}</Alert>}

                <form onSubmit={handleLogin} className="login-form">
                    <TextField
                        label="Username"
                        type="text"
                        fullWidth
                        required
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        required
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" className="login-button">
                        Login
                    </Button>
                </form>
            </Paper>
        </div>
    );
}

export default Login;
