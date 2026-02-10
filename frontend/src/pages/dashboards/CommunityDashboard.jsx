import React from 'react';
import { Globe, Heart, MessageSquare, Share2 } from 'lucide-react';
import { Card } from '../../components/ui/card';

const CommunityDashboard = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Community Portal</h1>
                <p className="text-muted-foreground mt-1">Connect with the SLIIT community and public events.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-8 space-y-6 bg-gradient-to-br from-indigo-500 to-primary text-white border-none shadow-xl">
                    <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center p-4">
                        <Globe className="w-full h-full" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold">Public Outreach</h2>
                        <p className="text-white/80">Explore open events, public seminars, and community initiatives hosted by SLIIT.</p>
                    </div>
                    <button className="bg-white text-primary w-full py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all">Explore Events</button>
                </Card>

                <div className="space-y-6">
                    <h2 className="text-xl font-bold">Quick Engagement</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'Join Discussions', icon: MessageSquare, color: 'bg-blue-500' },
                            { label: 'Partner with Us', icon: Heart, color: 'bg-rose-500' },
                            { label: 'Share Events', icon: Share2, color: 'bg-emerald-500' },
                            { label: 'Global News', icon: Globe, color: 'bg-amber-500' },
                        ].map((item, i) => (
                            <Card key={i} className="p-6 flex flex-col items-center justify-center gap-3 hover:scale-105 transition-all cursor-pointer border-border/50">
                                <div className={`p-3 rounded-2xl text-white ${item.color}`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <span className="text-sm font-bold text-center">{item.label}</span>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            <Card className="p-6 border-none bg-muted/30">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex -space-x-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-muted flex items-center justify-center font-bold text-xs">U{i}</div>
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground text-center md:text-left">
                        Join **2,450+** other community members attending events this month.
                        Stay connected with SLIIT!
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default CommunityDashboard;
