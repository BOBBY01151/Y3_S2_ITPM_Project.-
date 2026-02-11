import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './store/actions/authActions';
import { logout } from './store/slices/authSlice';
import { Layout } from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import SuperAdminLogin from './pages/SuperAdminLogin';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import StudentEvents from './pages/StudentEvents';
import './i18n/i18n';

function App() {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(loadUser());

        const handleStorageChange = (e) => {
            if (e.key === 'token') {
                if (e.newValue) {
                    dispatch(loadUser());
                } else {
                    dispatch(logout());
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [dispatch]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <Router>
            <div className="min-h-screen bg-background text-foreground">
                <Routes>
                    {/* Auth Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/superadmin" element={<SuperAdminLogin />} />

                    {/* Role Protected Routes */}
                    <Route path="/student" element={<Layout />} >
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="events" element={<StudentEvents />} />
                        <Route path="settings" element={<Profile />} />
                    </Route>

                    <Route path="/lecturer" element={<Layout />} >
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="approvals" element={<div className="p-6">Department Approvals coming soon...</div>} />
                    </Route>

                    <Route path="/council" element={<Layout />} >
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="manage" element={<div className="p-6">Event Management tools coming soon...</div>} />
                    </Route>

                    <Route path="/community" element={<Layout />} >
                        <Route path="dashboard" element={<Dashboard />} />
                    </Route>

                    <Route path="/admin" element={<Layout initialPage="registrations" />} >
                        <Route path="registrations" element={<Layout initialPage="registrations" />} />
                        <Route path="dashboard" element={<Dashboard />} />
                    </Route>

                    {/* Generic fallbacks */}
                    <Route path="/Registrations" element={<Layout initialPage="registrations" />} />
                    <Route path="/" element={<Layout />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
