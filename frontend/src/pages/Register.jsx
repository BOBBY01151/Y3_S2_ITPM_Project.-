import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import sliitLogo from "../assets/39bee516b4e52b07096c8df6493b386743d2a70d.png";

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student',
        department: '',
        campus: ''
    });

    const roles = [
        { id: 'student', label: 'Student' },
        { id: 'lecturer', label: 'Lecturer' },
        { id: 'council', label: 'Council member' },
        { id: 'community', label: 'Community member' }
    ];

    const departments = [
        "Faculty of Computing",
        "Faculty of Business",
        "Faculty of Engineering",
        "Faculty of Humanities & Sciences",
        "Graduate Studies",
        "Sports Council",
        "Student Council",
        "External Community"
    ];

    const campuses = [
        "Metro Campus",
        "Malabe Campus",
        "Kandy Campus",
        "Northern Campus"
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            return toast.error("Passwords do not match");
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:5001/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role,
                    department: formData.department,
                    campus: formData.campus
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            toast.success("Registration successful! Your account is pending approval.");
            navigate('/login');
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-background to-primary/5 flex items-center justify-center p-4">
            <div className="max-w-xl w-full bg-card rounded-3xl shadow-2xl border border-border/50 p-8 space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg p-3 mx-auto mb-6">
                        <img src={sliitLogo} alt="SLIIT Logo" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">Create Account</h1>
                    <p className="text-muted-foreground mt-2 text-sm">Fill in your details to join the SLIIT EMS platform</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Name */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-foreground/80 ml-1">User Name</label>
                            <input
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-foreground/80 ml-1">Campus Email</label>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                placeholder="example@my.sliit.lk"
                                required
                            />
                        </div>

                        {/* Role selection dropdown */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-foreground/80 ml-1">Register for</label>
                            <div className="relative">
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none cursor-pointer"
                                    required
                                >
                                    {roles.map((r) => (
                                        <option key={r.id} value={r.id}>{r.label}</option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Campus selection dropdown */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-foreground/80 ml-1">Campus</label>
                            <div className="relative">
                                <select
                                    name="campus"
                                    value={formData.campus}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none cursor-pointer"
                                    required
                                >
                                    <option value="" disabled>Select your campus</option>
                                    {campuses.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Password */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-foreground/80 ml-1">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-foreground/80 ml-1">Confirm Password</label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="group w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                        ) : "Create Account"}
                    </button>
                </form>

                <div className="text-center pt-2">
                    <p className="text-sm text-muted-foreground">
                        Already have an account? <Link to="/login" className="text-primary font-bold hover:underline transition-all">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
