import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import Dashboard from "../pages/Dashboard";
import Registrations from "../pages/Registrations";
// import Analytics from "../pages/Analytics"; // Can be added later if needed

const Configuration = () => (
    <div className="p-6 pb-24 md:pb-6">
        <h1 className="text-3xl mb-4 font-bold text-primary">Configuration</h1>
        <p className="text-muted-foreground">System configuration and device management coming soon...</p>
    </div>
);

const Events = () => (
    <div className="p-6 pb-24 md:pb-6">
        <h1 className="text-3xl mb-4 font-bold text-primary">Campus Events</h1>
        <p className="text-muted-foreground">Manage and view all campus events...</p>
    </div>
);

const Reports = () => (
    <div className="p-6 pb-24 md:pb-6">
        <h1 className="text-3xl mb-4 font-bold text-primary">Reports</h1>
        <p className="text-muted-foreground">Generate and export event reports coming soon...</p>
    </div>
);

const Settings = () => (
    <div className="p-6 pb-24 md:pb-6">
        <h1 className="text-3xl mb-4 font-bold text-primary">Settings & Profile</h1>
        <p className="text-muted-foreground">User preferences and profile settings coming soon...</p>
    </div>
);

const AnalyticsPlaceholder = () => (
    <div className="p-6 pb-24 md:pb-6">
        <h1 className="text-3xl mb-4 font-bold text-primary">Analytics</h1>
        <p className="text-muted-foreground">Event analytics and visualization coming soon...</p>
    </div>
);

export function Layout() {
    const [currentPage, setCurrentPage] = useState("dashboard");

    const renderContent = () => {
        switch (currentPage) {
            case "dashboard":
                return <Dashboard />;
            case "registrations":
                return <Registrations />;
            case "analytics":
                return <AnalyticsPlaceholder />;
            case "events":
                return <Events />;
            case "reports":
                return <Reports />;
            case "settings":
                return <Settings />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            {/* Desktop Sidebar */}
            <div className="hidden md:block flex-shrink-0">
                <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pb-20 md:pb-0 h-full">
                {renderContent()}
            </main>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden">
                <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
}
