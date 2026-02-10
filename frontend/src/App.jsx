import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import SuperAdminLogin from './pages/SuperAdminLogin';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import './i18n/i18n';

function App() {
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
                        <Route path="events" element={<div className="p-6">Student Events List coming soon...</div>} />
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
