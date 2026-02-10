import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard } from "lucide-react";
import { Badge } from "../components/ui/badge.jsx";
import { logout } from "../store/slices/authSlice";

// Role-specific imports
import StudentDashboard from "./dashboards/StudentDashboard";
import LecturerDashboard from "./dashboards/LecturerDashboard";
import CouncilDashboard from "./dashboards/CouncilDashboard";
import CommunityDashboard from "./dashboards/CommunityDashboard";
import { SuperAdminStats } from "../components/SuperAdminStats";
import { DashboardStats } from "../components/DashboardStats";

export default function Dashboard() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isSuperAdmin = user?.role === "superadmin";

    const handleLogout = () => {
        dispatch(logout());
        navigate(isSuperAdmin ? "/superadmin" : "/login");
    };

    const renderRoleDashboard = () => {
        switch (user?.role) {
            case 'student': return <StudentDashboard />;
            case 'lecturer': return <LecturerDashboard />;
            case 'council': return <CouncilDashboard />;
            case 'community': return <CommunityDashboard />;
            case 'superadmin':
                return (
                    <div className="space-y-8">
                        <SuperAdminStats />
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                                System Overview
                            </h2>
                            <DashboardStats />
                        </div>
                    </div>
                );
            default: return <StudentDashboard />;
        }
    };

    return (
        <div className="bg-background">
            <div className="p-6 pb-24 md:pb-6 space-y-8">
                {/* Header Section */}
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                <LayoutDashboard className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">
                                    Hello, {user?.name || "User"}! 👋
                                </h1>
                                <p className="text-muted-foreground mt-1 capitalize">
                                    {user?.role} Portal • Welcome back
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge className="bg-secondary/10 text-secondary border-secondary/20 px-3 py-1.5 backdrop-blur-sm hidden sm:flex">
                                <div className="w-2 h-2 bg-secondary rounded-full mr-2 animate-pulse"></div>
                                System Active
                            </Badge>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm font-medium text-sm"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Role Specific Content */}
                {renderRoleDashboard()}
            </div>
        </div>
    );
}

