import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { updateUser } from "../store/slices/authSlice";
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
    const dispatch = useDispatch();
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
        campus: "",
        skills: ""
    });

    const [accountData, setAccountData] = useState({
        name: "",
        email: "",
        campus: ""
    });

    const [passwordData, setPasswordData] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    const [profileImageFile, setProfileImageFile] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, [token]);

    useEffect(() => {
        // Initialize account data from user
        if (user) {
            setAccountData({
                name: user.name || "",
                email: user.email || "",
                campus: user.campus || ""
            });

            // Also sync campus and faculty if coming from user model and profile is not loaded yet
            setFormData(prev => ({
                ...prev,
                campus: prev.campus || user.campus || "",
                faculty: prev.faculty || user.department || ""
            }));
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
                    faculty: data.faculty || user?.department || "",
                    year: data.year || "",
                    gender: data.gender || "",
                    profilePhoto: data.profilePhoto || user?.profilePhoto || "",
                    degreeProgramme: data.degreeProgramme || "",
                    phoneNumber: data.phoneNumber || "",
                    semester: data.semester || "",
                    campus: data.campus || user?.campus || "",
                    skills: data.skills ? (Array.isArray(data.skills) ? data.skills.join(", ") : data.skills) : ""
                });
                // Sync profile photo with global auth state
                if (data.profilePhoto) {
                    dispatch(updateUser({ profilePhoto: data.profilePhoto }));
                }
            } else if (response.status === 404 && user) {
                // If profile doesn't exist, pre-populate with what we have from user model
                setFormData(prev => ({
                    ...prev,
                    campus: user.campus || "",
                    faculty: user.department || "",
                }));
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
            const formDataToSend = new FormData();

            // Append all text fields
            Object.keys(formData).forEach(key => {
                if (key !== 'profilePhoto') {
                    formDataToSend.append(key, formData[key]);
                }
            });

            // If there's a file, append it. If not, append the existing URL string
            if (profileImageFile) {
                formDataToSend.append('profilePhoto', profileImageFile);
            } else {
                formDataToSend.append('profilePhoto', formData.profilePhoto);
            }

            const response = await fetch("http://localhost:5001/api/profile", {
                method: "POST",
                headers: {
                    // "Content-Type": "multipart/form-data", // Browser sets this automatically with boundary
                    "Authorization": `Bearer ${token}`
                },
                body: formDataToSend
            });

            console.log('[DEBUG] Profile Update Status:', response.status);
            const data = await response.json();
            console.log('[DEBUG] Profile Update Data:', data);

            if (!response.ok) {
                throw new Error(data.message || "Failed to update profile");
            }

            // Update global state with return data
            if (data.user) {
                dispatch(updateUser(data.user));
            } else if (data.profilePhoto) {
                // Fallback for older API versions or if user not returned
                dispatch(updateUser({ profilePhoto: data.profilePhoto }));
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImageFile(file);
            // Create a preview URL
            const previewUrl = URL.createObjectURL(file);
            setFormData({ ...formData, profilePhoto: previewUrl });
        }
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

            console.log('[DEBUG] Account Update Status:', response.status);
            const data = await response.json();
            console.log('[DEBUG] Account Update Data:', data);

            if (!response.ok) {
                throw new Error(data.message || "Failed to update account details");
            }

            // Update global state
            dispatch(updateUser(data.user));

            // Sync campus in profile form if it was updated in account settings
            if (data.user.campus) {
                setFormData(prev => ({ ...prev, campus: data.user.campus }));
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
                            <div className="space-y-2">
                                <Label htmlFor="campus">Campus</Label>
                                <Select
                                    onValueChange={(val) => setAccountData({ ...accountData, campus: val })}
                                    value={accountData.campus}
                                >
                                    <SelectTrigger id="campus-account">
                                        <SelectValue placeholder="Select campus" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Metro Campus">Metro Campus</SelectItem>
                                        <SelectItem value="Malabe Campus">Malabe Campus</SelectItem>
                                        <SelectItem value="Kandy Campus">Kandy Campus</SelectItem>
                                        <SelectItem value="Northern Campus">Northern Campus</SelectItem>
                                    </SelectContent>
                                </Select>
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
                            <Label htmlFor="faculty">Faculty</Label>
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
                        <div className="space-y-2">
                            <Label htmlFor="campus">Campus</Label>
                            <Select
                                onValueChange={(val) => setFormData({ ...formData, campus: val })}
                                value={formData.campus}
                            >
                                <SelectTrigger id="campus">
                                    <SelectValue placeholder="Select campus" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Metro Campus">Metro Campus</SelectItem>
                                    <SelectItem value="Malabe Campus">Malabe Campus</SelectItem>
                                    <SelectItem value="Kandy Campus">Kandy Campus</SelectItem>
                                    <SelectItem value="Northern Campus">Northern Campus</SelectItem>
                                </SelectContent>
                            </Select>
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
                            <Label htmlFor="phoneNumber">Phone Number</Label>
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
                            <Label htmlFor="profilePhoto">Profile Photo</Label>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    {formData.profilePhoto ? (
                                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 shadow-md">
                                            <img
                                                src={formData.profilePhoto}
                                                alt="Profile Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
                                            <Camera className="w-8 h-8 text-muted-foreground/50" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <Input
                                            id="profilePhoto"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                        />
                                        <p className="text-xs text-muted-foreground mt-1 ml-1">
                                            Max size 5MB. Formats: JPG, PNG, GIF
                                        </p>
                                    </div>
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
