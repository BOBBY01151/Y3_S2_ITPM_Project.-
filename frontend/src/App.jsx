import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import './i18n/i18n';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-background">
                <Routes>
                    <Route path="/" element={<Layout />} />
                    {/* Add more routes here, for example:
          <Route path="/login" element={<Login />} />
          */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
