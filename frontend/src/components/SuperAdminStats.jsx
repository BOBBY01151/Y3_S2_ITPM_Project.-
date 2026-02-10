import React from 'react';
import { Users, Shield, LayoutGrid, Activity, TrendingUp } from "lucide-react";
import { Card } from "./ui/card.jsx";

function MonitorCard({ title, value, detail, icon: Icon, color = "primary" }) {
    const bgColor = color === "primary"
        ? "bg-primary text-primary-foreground"
        : "bg-secondary text-secondary-foreground";

    return (
        <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 bg-gradient-to-br from-card to-muted/30">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">{title}</p>
                    <h3 className="text-4xl font-bold text-foreground mb-2">{value}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Activity className="w-3 h-3 text-green-500" />
                        {detail}
                    </p>
                </div>
                <div className={`w-14 h-14 rounded-2xl ${bgColor} flex items-center justify-center shadow-xl transform group-hover:rotate-6 transition-transform`}>
                    <Icon className="w-8 h-8" />
                </div>
            </div>
        </Card>
    );
}

export function SuperAdminStats() {
    const stats = [
        {
            title: "Total Platform Users",
            value: "1,284",
            detail: "12 new signups today",
            icon: Users,
            color: "primary",
        },
        {
            title: "Active Councils",
            value: "8",
            detail: "2 Sports, 6 Academic",
            icon: Shield,
            color: "secondary",
        },
        {
            title: "Faculties & Communities",
            value: "15",
            detail: "Across 4 main faculties",
            icon: LayoutGrid,
            color: "primary",
        },
        {
            title: "System Load",
            value: "24%",
            detail: "Response time: 45ms",
            icon: Activity,
            color: "secondary",
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-4">
                <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20">
                    System-wide Monitoring
                </span>
                <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <MonitorCard key={index} {...stat} />
                ))}
            </div>
        </div>
    );
}
