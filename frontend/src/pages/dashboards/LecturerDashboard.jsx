import React from 'react';
import { ShieldCheck, Users, FileText, CheckCircle } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const LecturerDashboard = () => {
    const stats = [
        { label: 'Pending Approvals', value: '5', icon: ShieldCheck, color: 'text-blue-500' },
        { label: 'Department Events', value: '8', icon: Users, color: 'text-purple-500' },
        { label: 'Reports Reviewed', value: '24', icon: FileText, color: 'text-green-500' },
    ];

    const pendingApprovals = [
        { id: 1, event: 'Computing Society Hackathon', group: 'SE Student Community', date: 'Requested 2h ago' },
        { id: 2, event: 'AI Ethics Seminar', group: 'CS Department', date: 'Requested 5h ago' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Lecturer Dashboard</h1>
                <p className="text-muted-foreground mt-1">Review event proposals and monitor department activities.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="p-6 flex items-center gap-4 bg-gradient-to-br from-card to-muted/20">
                        <div className={`p-3 rounded-2xl bg-white/50 ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Approvals Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                        Pending Approvals
                    </h2>
                    <div className="space-y-4">
                        {pendingApprovals.map(app => (
                            <Card key={app.id} className="p-5 hover:shadow-md transition-all">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-foreground">{app.event}</h3>
                                            <p className="text-sm text-muted-foreground">{app.group}</p>
                                        </div>
                                        <Badge className="bg-blue-500/10 text-blue-500 border-none text-[10px]">Urgent</Badge>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                                        <span className="text-[10px] text-muted-foreground italic">{app.date}</span>
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-lg hover:opacity-90 transition-all">Approve</button>
                                            <button className="px-3 py-1 bg-muted text-foreground text-xs font-bold rounded-lg hover:bg-muted/80 transition-all">Review</button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Tracking Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        Departmental Sync
                    </h2>
                    <Card className="p-8 flex flex-col items-center justify-center text-center space-y-4 bg-card shadow-sm">
                        <FileText className="w-12 h-12 text-primary opacity-20" />
                        <p className="text-sm text-muted-foreground">Monthly event audit reports for Computing Faculty are ready for your review.</p>
                        <button className="w-full bg-muted/50 py-3 rounded-xl font-bold text-sm hover:bg-muted transition-all">View All Reports</button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LecturerDashboard;
