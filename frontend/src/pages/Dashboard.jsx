import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Badge } from "../components/ui/badge.jsx";
import { DashboardStats, UpcomingEventsList } from "../components/DashboardStats";
import { SuperAdminStats } from "../components/SuperAdminStats";
import { logout } from "../store/slices/authSlice";

export default function Dashboard() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isSuperAdmin = user?.role === "superadmin";

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    // Mock data for upcoming events
    const upcomingEvents = [
        {
            id: "1",
            title: "Annual Tech Conference 2026",
            date: "Feb 15, 2026",
            time: "9:00 AM",
            attendees: 450,
            status: "upcoming",
        },
        {
            id: "2",
            title: "Student Orientation Week",
            date: "Feb 12, 2026",
            time: "8:30 AM",
            attendees: 320,
            status: "upcoming",
        },
        {
            id: "3",
            title: "Career Fair 2026",
            date: "Feb 20, 2026",
            time: "10:00 AM",
            attendees: 680,
            status: "upcoming",
        },
        {
            id: "4",
            title: "Workshop: AI & Machine Learning",
            date: "Feb 18, 2026",
            time: "2:00 PM",
            attendees: 150,
            status: "upcoming",
        },
    ];

    return (
        <div className="bg-background">
            <div className="p-6 pb-24 md:pb-6 space-y-8">
                {/* Header Section */}
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">
                                Hello, {isSuperAdmin ? "Super Admin" : user?.name || "User"}! 👋
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                {isSuperAdmin
                                    ? "Platform-wide monitoring and management system"
                                    : "Welcome to SLIIT Event Management System"}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge className="bg-secondary/10 text-secondary border-secondary/20 px-3 py-1.5 backdrop-blur-sm">
                                <div className="w-2 h-2 bg-secondary rounded-full mr-2 animate-pulse"></div>
                                {isSuperAdmin ? "System Monitor Active" : "Real-time monitoring active"}
                            </Badge>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm font-medium text-sm"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Super Admin Specific Stats */}
                {isSuperAdmin && <SuperAdminStats />}

                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                        {isSuperAdmin ? "Event Overview" : "Your Statistics"}
                    </h2>
                    {/* Dashboard Statistics */}
                    <DashboardStats />
                </div>

                {/* Upcoming Events List */}
                <UpcomingEventsList events={upcomingEvents} />
            </div>
        </div>
    );
}
