import React from 'react';
import { Calendar, Users, Clock, Award, TrendingUp } from "lucide-react";

import { Card } from "./ui/card.jsx";

function StatCard({ title, value, change, icon: Icon, trend, color = "primary" }) {
    const isPositive = trend === "up";
    const bgColor = color === "primary"
        ? "bg-primary text-primary-foreground"
        : "bg-secondary text-secondary-foreground";

    return (
        <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-2">{title}</p>
                    <h3 className="text-3xl font-semibold text-foreground mb-2">{value}</h3>
                    {change !== undefined && (
                        <div className="flex items-center gap-1">
                            <TrendingUp
                                className={`w-4 h-4 ${isPositive ? 'text-green-500' : 'text-red-500 rotate-180'
                                    }`}
                            />
                            <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {Math.abs(change)}% {isPositive ? 'increase' : 'decrease'}
                            </span>
                        </div>
                    )}
                </div>
                <div className={`w-14 h-14 rounded-xl ${bgColor} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7" />
                </div>
            </div>
        </Card>
    );
}

export function DashboardStats() {
    const stats = [
        {
            title: "Upcoming Events",
            value: 24,
            change: 12,
            icon: Calendar,
            trend: "up",
            color: "primary",
        },
        {
            title: "Total Attendees",
            value: "2,847",
            change: 8,
            icon: Users,
            trend: "up",
            color: "secondary",
        },
        {
            title: "Active Registrations",
            value: 156,
            change: 23,
            icon: Award, // Changed from UserCheck to Award as UserCheck might not be in standard lucide-react or just to match DashboardStats
            trend: "up",
            color: "primary",
        },
        {
            title: "Events This Month",
            value: 42,
            change: 5,
            icon: Award,
            trend: "up",
            color: "secondary",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
}

export function UpcomingEventsList({ events }) {
    const statusColors = {
        upcoming: "bg-blue-100 text-blue-800",
        ongoing: "bg-green-100 text-green-800",
        completed: "bg-gray-100 text-gray-800",
    };

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Upcoming Events</h3>
                <button className="text-sm text-primary hover:text-primary/80 font-medium">
                    View All
                </button>
            </div>
            <div className="space-y-4">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-medium text-foreground mb-1">{event.title}</h4>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        <span>{event.attendees} attendees</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[event.status]
                                }`}
                        >
                            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                    </div>
                ))}
            </div>
        </Card>
    );
}
