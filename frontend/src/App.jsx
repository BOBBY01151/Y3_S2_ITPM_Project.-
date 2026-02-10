import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Login from './pages/Login';
import './i18n/i18n';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-background">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Layout />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
