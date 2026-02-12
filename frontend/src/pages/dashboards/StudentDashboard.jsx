import React from 'react';
import { Calendar, Star, Clock, MapPin, QrCode } from 'lucide-react';
import { Button } from '../../components/ui/button';
import AttendanceScanner from '../../components/AttendanceScanner';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import StorageUsageCard from '../../components/StorageUsageCard';

const StudentDashboard = () => {
    const [isScannerOpen, setIsScannerOpen] = React.useState(false);

    const handleScan = (code) => {
        console.log('Scanned:', code);
        // TODO: Send to backend
    };

    const stats = [
        { label: 'Registered Events', value: '12', icon: Calendar, color: 'text-blue-500' },
        { label: 'Participation Rate', value: '85%', icon: Star, color: 'text-yellow-500' },
        { label: 'Upcoming Today', value: '2', icon: Clock, color: 'text-green-500' },
    ];

    const myEvents = [
        { id: 1, title: 'Web Development Workshop', date: 'Tomorrow, 10:00 AM', location: 'Lab 04', status: 'Registered' },
        { id: 2, title: 'IEEE Networking Night', date: 'Feb 15, 6:00 PM', location: 'Main Auditorium', status: 'Confirmed' },
    ];

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Student Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Discover and manage your campus activities.</p>
                </div>
                <Button onClick={() => setIsScannerOpen(true)} className="gap-2">
                    <QrCode className="w-4 h-4" />
                    Scan Attendance
                </Button>
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

            {/* Content Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        My Registered Events
                    </h2>
                    <div className="space-y-4">
                        {myEvents.map(event => (
                            <Card key={event.id} className="p-4 hover:shadow-md transition-all border-l-4 border-l-primary">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-foreground">{event.title}</h3>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {event.date}</span>
                                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</span>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                                        {event.status}
                                    </Badge>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

            </div>

            {/* Storage Usage Card */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    Storage Usage
                </h2>
                <StorageUsageCard />
            </div>
            {/* Scanner Modal */}
            <AttendanceScanner
                isOpen={isScannerOpen}
                onClose={() => setIsScannerOpen(false)}
                onScan={handleScan}
            />
        </div>
    );
};

export default StudentDashboard;
