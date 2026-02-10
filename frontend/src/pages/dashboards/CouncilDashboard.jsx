import React from 'react';
import { Plus, Users, Layout, TrendingUp, Settings } from 'lucide-react';
import { Card } from '../../components/ui/card';

const CouncilDashboard = () => {
    const stats = [
        { label: 'Active Events', value: '4', icon: Layout, color: 'text-orange-500' },
        { label: 'Volunteers', value: '124', icon: Users, color: 'text-indigo-500' },
        { label: 'Engagement', value: '+12%', icon: TrendingUp, color: 'text-emerald-500' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Council Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Manage event logistics and student engagement.</p>
                </div>
                <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Create Event
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="p-6 flex items-center gap-4 bg-gradient-to-br from-card to-muted/20 border-none shadow-md">
                        <div className={`p-4 rounded-2xl bg-white shadow-sm ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 p-6 space-y-4">
                    <h2 className="text-lg font-bold">Recent Organizer Activity</h2>
                    <div className="space-y-6 pt-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex gap-4 items-start pb-6 border-b border-border last:border-0 last:pb-0">
                                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Updated volunteer list for <span className="text-primary font-bold">Tech Expo 2026</span></p>
                                    <p className="text-xs text-muted-foreground">Managed by Saman Perera • 45 mins ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <div className="space-y-6">
                    <Card className="p-6 bg-primary text-primary-foreground">
                        <div className="space-y-4">
                            <Settings className="w-8 h-8 opacity-20" />
                            <h3 className="text-xl font-bold leading-tight">Organizer Tools</h3>
                            <p className="text-sm opacity-80">Access exclusive tools for logistics management and budgeting.</p>
                            <button className="w-full bg-white text-primary py-2.5 rounded-xl font-bold text-sm">Open Toolkit</button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CouncilDashboard;
