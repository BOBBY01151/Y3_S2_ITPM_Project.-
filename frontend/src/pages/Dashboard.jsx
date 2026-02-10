import React, { useState } from "react";

import { Badge } from "../components/ui/badge.jsx";
import { DashboardStats, UpcomingEventsList } from "../components/DashboardStats";

export default function Dashboard() {
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
        <div className="min-h-screen bg-background">
            <div className="p-6 pb-24 md:pb-6 space-y-6">
                {/* Header Section */}
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-foreground">Hello, Admin! 👋</h1>
                            <p className="text-muted-foreground mt-1">
                                Welcome to SLIIT Event Management System
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge className="bg-secondary/10 text-secondary border-secondary/20 px-3 py-1.5">
                                <div className="w-2 h-2 bg-secondary rounded-full mr-2 animate-pulse"></div>
                                Real-time monitoring active
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Dashboard Statistics */}
                <DashboardStats />

                {/* Upcoming Events List */}
                <UpcomingEventsList events={upcomingEvents} />
            </div>
        </div>
    );
}
