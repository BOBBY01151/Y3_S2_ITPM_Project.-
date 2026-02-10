import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../store/slices/authSlice';
import sliitLogo from "../assets/39bee516b4e52b07096c8df6493b386743d2a70d.png";

const Login = () => {
    const [email, setEmail] = useState('superadmin@sliit.lk');
    const [password, setPassword] = useState('superpassword123');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock login for now
        dispatch(loginSuccess({
            token: 'mock-token',
            user: {
                name: 'Super Admin',
                email: email,
                role: 'superadmin'
            }
        }));
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-card rounded-3xl shadow-2xl border border-border/50 p-8 space-y-8">
                <div className="text-center">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg p-3 mx-auto mb-6">
                        <img src={sliitLogo} alt="SLIIT Logo" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground">SLIIT EMS</h1>
                    <p className="text-muted-foreground mt-2">Sign in to your account</p>
                </div>

                <form className="space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground ml-1">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                            placeholder="name@sliit.lk"
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

                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Sign In
                    </button>
                </form>

                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        Forgot your password? <a href="#" className="text-primary font-medium hover:underline">Reset here</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
