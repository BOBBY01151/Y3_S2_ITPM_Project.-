import React from 'react';
import { Calendar, Star, Clock, MapPin } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const StudentDashboard = () => {
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
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Student Dashboard</h1>
                <p className="text-muted-foreground mt-1">Discover and manage your campus activities.</p>
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

                <div className="space-y-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Star className="w-5 h-5 text-primary" />
                        Discover New Events
                    </h2>
                    <Card className="p-12 border-dashed border-2 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                            <Calendar className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <div>
                            <h3 className="font-bold">Explore Campus</h3>
                            <p className="text-sm text-muted-foreground max-w-[200px]">Check the events page to find more activities matching your interests.</p>
                        </div>
                        <button className="text-primary font-bold text-sm hover:underline">Browse Events →</button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
