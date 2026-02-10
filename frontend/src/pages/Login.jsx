import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginSuccess } from '../store/slices/authSlice';
import sliitLogo from "../assets/39bee516b4e52b07096c8df6493b386743d2a70d.png";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            dispatch(loginSuccess({
                token: data.token,
                user: data.user
            }));

            navigate(`/${data.user.role}/dashboard`);
        } catch (err) {
            console.error('Login error:', err);
            // In a real app, you'd show a toast or error message UI
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-background to-primary/5 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-card rounded-3xl shadow-2xl border border-border/50 p-8 space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg p-3 mx-auto mb-6">
                        <img src={sliitLogo} alt="SLIIT Logo" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground">SLIIT EMS</h1>
                    <p className="text-muted-foreground mt-2">Welcome back! Please sign in.</p>
                </div>

                <form className="space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">


                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground ml-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                placeholder="it21... @my.sliit.lk"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground ml-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                        ) : "Sign In"}
                    </button>
                </form>

                <div className="text-center space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline">Register now</Link>
                    </p>
                    <div className="pt-4 border-t border-border/50">
                        <a href="/superadmin" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                            Super Admin Portal
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
