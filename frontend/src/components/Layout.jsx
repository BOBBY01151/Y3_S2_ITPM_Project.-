import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import Registrations from "../pages/Registrations";

export function Layout({ initialPage }) {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Redirect to role-specific dashboard if at root
    if (location.pathname === "/") {
        const rolePath = user?.role === 'superadmin' ? '/admin' : `/${user?.role || 'student'}`;
        return <Navigate to={`${rolePath}/dashboard`} replace />;
    }

    // Special case for the legacy Registrations route or if initialPage is passed
    const isRegistrations = initialPage === "registrations" || location.pathname.toLowerCase().includes("registrations");

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            {/* Sidebar */}
            <div className="flex-shrink-0">
                <Sidebar />
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pb-20 md:pb-0 h-full">
                {isRegistrations ? <Registrations /> : <Outlet />}
            </main>
        </div>
    );
}

