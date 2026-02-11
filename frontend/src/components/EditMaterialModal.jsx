import { useState, useEffect } from "react";
import { X, Save, FileText, CheckCircle2, Loader2 } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function EditMaterialModal({ isOpen, onClose, material, onUpdateSuccess }) {
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        subject: "",
        faculty: "",
        graduateYear: "",
        degreeProgram: "",
        language: "en"
    });

    useEffect(() => {
        if (material) {
            setFormData({
                title: material.title || "",
                description: material.description || "",
                subject: material.subject || "",
                faculty: material.faculty || "",
                graduateYear: material.graduateYear || "",
                degreeProgram: material.degreeProgram || "",
                language: material.language || "en"
            });
        }
    }, [material]);

    const faculties = [
        "Computing",
        "Business",
        "Engineering",
        "Humanities & Sciences",
        "Graduate Studies",
        "Architecture",
        "Hospitality & Culinary",
        "Law"
    ];

    const years = ["2024", "2025", "2026", "2027", "2028"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.put(
                `http://localhost:5001/api/materials/${material._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Study material updated successfully!");
            onUpdateSuccess(response.data);
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update material");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !material) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-background w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 animate-in zoom-in-95 duration-300">
                <div className="px-8 py-6 border-b flex items-center justify-between bg-secondary/20">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Edit Study Material</h2>
                            <p className="text-sm text-muted-foreground">Update resource details</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Title</label>
                            <input
                                required
                                type="text"
                                className="w-full px-4 py-2.5 bg-secondary/30 border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g. Data Structures Notes"
                            />
                        </div>

                        {/* Subject */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Subject</label>
                            <input
                                required
                                type="text"
                                className="w-full px-4 py-2.5 bg-secondary/30 border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                placeholder="e.g. IT2030"
                            />
                        </div>

                        {/* Faculty */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Faculty</label>
                            <select
                                required
                                className="w-full px-4 py-2.5 bg-secondary/30 border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                                value={formData.faculty}
                                onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                            >
                                <option value="">Select Faculty</option>
                                {faculties.map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                        </div>

                        {/* Year */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Graduate Year</label>
                            <select
                                required
                                className="w-full px-4 py-2.5 bg-secondary/30 border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                                value={formData.graduateYear}
                                onChange={(e) => setFormData({ ...formData, graduateYear: e.target.value })}
                            >
                                <option value="">Select Year</option>
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>

                        {/* Degree Program */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold ml-1">Degree Program</label>
                            <input
                                required
                                type="text"
                                className="w-full px-4 py-2.5 bg-secondary/30 border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                                value={formData.degreeProgram}
                                onChange={(e) => setFormData({ ...formData, degreeProgram: e.target.value })}
                                placeholder="e.g. BSc (Hons) in Information Technology"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold ml-1">Description</label>
                            <textarea
                                className="w-full px-4 py-2.5 bg-secondary/30 border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all min-h-[100px]"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="What's included in this material?"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 px-4 rounded-xl border font-semibold hover:bg-secondary transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={loading}
                            type="submit"
                            className="flex-[2] py-3 px-4 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
