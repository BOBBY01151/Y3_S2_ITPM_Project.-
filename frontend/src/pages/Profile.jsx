import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
    User,
    Mail,
    Phone,
    School,
    GraduationCap,
    Calendar,
    Camera,
    Save,
    Loader2,
    Award,
    Code,
    Lock,
    Settings
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

export default function Profile() {
    const { user, token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [savingAccount, setSavingAccount] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);

    const [formData, setFormData] = useState({
        faculty: "",
        year: "",
        gender: "",
        profilePhoto: "",
        degreeProgramme: "",
        phoneNumber: "",
        semester: "",
        skills: ""
    });

    const [accountData, setAccountData] = useState({
        name: "",
        email: ""
    });

    const [passwordData, setPasswordData] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    useEffect(() => {
        fetchProfile();
        // Initialize account data from user
        if (user) {
            setAccountData({
                name: user.name || "",
                email: user.email || ""
            });
        }
    }, [user]);

    const fetchProfile = async () => {
        try {
            const response = await fetch("http://localhost:5001/api/profile/me", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setFormData({
                    ...data,
                    skills: data.skills.join(", "),
                    semester: data.semester || ""
                });
            }
        } catch (err) {
            console.error("Error fetching profile:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await fetch("http://localhost:5001/api/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to update profile");
            }

            toast.success("Profile updated successfully!");
            // Redirect to dashboard after successful save
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000); // Give user time to see the success message
        } catch (err) {
            toast.error(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleAccountChange = (e) => {
        setAccountData({ ...accountData, [e.target.id]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.id]: e.target.value });
    };

    const handleAccountUpdate = async (e) => {
        e.preventDefault();
        setSavingAccount(true);

        try {
            const response = await fetch("http://localhost:5001/api/users/me", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(accountData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to update account details");
            }

            toast.success("Account details updated successfully!");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setSavingAccount(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        // Validation
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }

        if (passwordData.newPassword.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        setSavingPassword(true);

        try {
            const response = await fetch("http://localhost:5001/api/users/me/password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    newPassword: passwordData.newPassword
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to change password");
            }

            toast.success("Password changed successfully!");
            // Clear password fields
            setPasswordData({
                newPassword: "",
                confirmPassword: ""
            });
        } catch (err) {
            toast.error(err.message);
        } finally {
            setSavingPassword(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                    <User className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Student Profile</h1>
                    <p className="text-muted-foreground mt-1">Manage your academic and personal information</p>
                </div>
            </div>

            {/* Account Settings - Editable Name and Email */}
            <Card className="md:col-span-2 border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
                <CardHeader className="border-b border-primary/5 pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Settings className="w-5 h-5 text-primary" />
                        Account Settings
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleAccountUpdate} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    value={accountData.name}
                                    onChange={handleAccountChange}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={accountData.email}
                                    onChange={handleAccountChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={savingAccount}
                                className="px-6 shadow-lg hover:shadow-primary/20 transition-all rounded-full"
                            >
                                {savingAccount ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
                                ) : (
                                    <><Save className="w-4 h-4 mr-2" /> Save Account Details</>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Change Password */}
            <Card className="md:col-span-2 border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
                <CardHeader className="border-b border-primary/5 pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Lock className="w-5 h-5 text-primary" />
                        Change Password
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handlePasswordUpdate} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter new password"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Confirm new password"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={savingPassword}
                                className="px-6 shadow-lg hover:shadow-primary/20 transition-all rounded-full"
                            >
                                {savingPassword ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Changing...</>
                                ) : (
                                    <><Lock className="w-4 h-4 mr-2" /> Change Password</>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Academic Information */}
                <Card className="border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
                    <CardHeader className="border-b border-primary/5 pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <School className="w-5 h-5 text-primary" />
                            Academic Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="faculty font-medium">Faculty</Label>
                            <Input
                                id="faculty"
                                value={formData.faculty}
                                onChange={handleChange}
                                placeholder="e.g. Computing"
                                required
                                className="focus-visible:ring-primary/30"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="degreeProgramme">Degree Programme</Label>
                            <Input
                                id="degreeProgramme"
                                value={formData.degreeProgramme}
                                onChange={handleChange}
                                placeholder="e.g. Software Engineering"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="year">Academic Year</Label>
                                <Select
                                    onValueChange={(val) => setFormData({ ...formData, year: val })}
                                    value={formData.year}
                                >
                                    <SelectTrigger id="year">
                                        <SelectValue placeholder="Select year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Year 1">Year 1</SelectItem>
                                        <SelectItem value="Year 2">Year 2</SelectItem>
                                        <SelectItem value="Year 3">Year 3</SelectItem>
                                        <SelectItem value="Year 4">Year 4</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="semester">Current Semester</Label>
                                <Select
                                    onValueChange={(val) => setFormData({ ...formData, semester: val })}
                                    value={formData.semester}
                                >
                                    <SelectTrigger id="semester">
                                        <SelectValue placeholder="Select semester" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Semester 1">Semester 1</SelectItem>
                                        <SelectItem value="Semester 2">Semester 2</SelectItem>
                                        <SelectItem value="Semester 3">Semester 3</SelectItem>
                                        <SelectItem value="Semester 4">Semester 4</SelectItem>
                                        <SelectItem value="Semester 5">Semester 5</SelectItem>
                                        <SelectItem value="Semester 6">Semester 6</SelectItem>
                                        <SelectItem value="Semester 7">Semester 7</SelectItem>
                                        <SelectItem value="Semester 8">Semester 8</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Personal Information */}
                <Card className="border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
                    <CardHeader className="border-b border-primary/5 pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Phone className="w-5 h-5 text-primary" />
                            Personal Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber font-medium">Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="+94 7X XXX XXXX"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Select
                                onValueChange={(val) => setFormData({ ...formData, gender: val })}
                                value={formData.gender}
                            >
                                <SelectTrigger id="gender">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="profilePhoto">Profile Photo URL</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="profilePhoto"
                                    value={formData.profilePhoto}
                                    onChange={handleChange}
                                    placeholder="https://example.com/photo.jpg"
                                />
                                <div className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center shrink-0">
                                    <Camera className="w-5 h-5 text-muted-foreground" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Skills & Interests */}
                <Card className="md:col-span-2 border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
                    <CardHeader className="border-b border-primary/5 pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Code className="w-5 h-5 text-primary" />
                            Expertise & Skills
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-2">
                            <Label htmlFor="skills">Technical Skills (Comma separated)</Label>
                            <Input
                                id="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                placeholder="React, Python, Public Speaking, UI Design..."
                            />
                            <p className="text-[10px] text-muted-foreground italic mt-1">
                                These skills will help societies find you for events and collaborations.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="md:col-span-2 flex justify-end pt-4">
                    <Button
                        type="submit"
                        size="lg"
                        disabled={saving}
                        className="px-8 shadow-lg hover:shadow-primary/20 transition-all rounded-full"
                    >
                        {saving ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving Changes...</>
                        ) : (
                            <><Save className="w-4 h-4 mr-2" /> Save Profile</>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
