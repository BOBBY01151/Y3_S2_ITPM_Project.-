import React, { useState, useEffect } from "react";
import { Check, X, UserCheck, UserX, Clock, Search } from "lucide-react";
import { Card } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { toast } from "sonner";

const Registrations = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/users/pending', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch registrations');
            }

            const data = await response.json();
            setPendingUsers(data);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id, status) => {
        try {
            const response = await fetch(`http://localhost:5001/api/users/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Action failed');
            }

            setPendingUsers(prev => prev.filter(user => user._id !== id));
            toast.success(`User request ${status === 'active' ? 'approved' : 'rejected'} successfully`);
        } catch (err) {
            toast.error(err.message);
        }
    };

    const filteredUsers = pendingUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 pb-24 md:pb-6 space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Registration Requests</h1>
                    <p className="text-muted-foreground mt-1">Review and manage new user registrations for the platform.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="px-3 py-1.5 border-primary/20 bg-primary/5 text-primary">
                        <Clock className="w-3.5 h-3.5 mr-2" />
                        {pendingUsers.length} Requests Pending
                    </Badge>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search by name, email, or role..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border/50 focus:border-primary outline-none transition-all shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Requests Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full py-20 text-center">
                        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Loading requests...</p>
                    </div>
                ) : filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <Card key={user._id} className="group relative overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-card to-muted/20">
                            <div className="p-6 space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-bold text-xl">
                                        {user.name.charAt(0)}
                                    </div>
                                    <Badge className="bg-secondary/10 text-secondary border-none uppercase text-[10px] tracking-widest px-2.5">
                                        {user.role}
                                    </Badge>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-foreground truncate">{user.name}</h3>
                                    <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                                </div>

                                <div className="pt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
                                    {user.department}
                                </div>

                                <div className="pt-4 flex items-center gap-3">
                                    <button
                                        onClick={() => handleAction(user._id, 'active')}
                                        className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-2.5 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    >
                                        <UserCheck className="w-4 h-4" />
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleAction(user._id, 'rejected')}
                                        className="w-12 h-12 flex items-center justify-center bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                                        title="Reject Account"
                                    >
                                        <UserX className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Decorative line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-30"></div>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-muted/20 rounded-3xl border-2 border-dashed border-border">
                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                            <Search className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">No pending requests</h3>
                        <p className="text-muted-foreground">All registration requests have been processed.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Registrations;
