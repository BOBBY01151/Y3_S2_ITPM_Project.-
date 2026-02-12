import { useState } from "react";
import { X, Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function UploadMaterialModal({ isOpen, onClose, onUploadSuccess }) {
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        subject: "",
        faculty: "",
        graduateYear: "",
        degreeProgram: "",
        language: "en",
        externalLink: ""
    });
    const [file, setFile] = useState(null);

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

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Check file size (100MB limit)
            const maxSize = 100 * 1024 * 1024; // 100MB in bytes
            if (selectedFile.size > maxSize) {
                toast.error("File size exceeds 100MB limit. Please use Google Drive link for larger files.");
                e.target.value = null; // Reset file input
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate that either file or external link is provided
        if (!file && !formData.externalLink) {
            toast.error("Please upload a file or provide a Google Drive link");
            return;
        }

        setLoading(true);

        try {
            const data = new FormData();
            if (file) {
                data.append("file", file);
            }
            // Append other form fields
            Object.keys(formData).forEach(key => {
                data.append(key, formData[key]);
            });

            const response = await axios.post(
                "http://localhost:5001/api/materials",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            toast.success("Study material uploaded successfully!");
            onUploadSuccess(response.data);
            onClose();
            // Reset form
            setFormData({
                title: "",
                description: "",
                subject: "",
                faculty: "",
                graduateYear: "",
                degreeProgram: "",
                language: "en",
                externalLink: ""
            });
            setFile(null);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to upload material");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-background w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 animate-in zoom-in-95 duration-300">
                <div className="px-8 py-6 border-b flex items-center justify-between bg-secondary/20">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <Upload className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Upload Study Material</h2>
                            <p className="text-sm text-muted-foreground">Share your resources with others</p>
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

                        {/* Google Drive Link (Optional) */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold ml-1">Google Drive Link (Optional)</label>
                            <input
                                type="url"
                                className="w-full px-4 py-2.5 bg-secondary/30 border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                                value={formData.externalLink}
                                onChange={(e) => setFormData({ ...formData, externalLink: e.target.value })}
                                placeholder="https://drive.google.com/file/d/..."
                            />
                            <p className="text-xs text-muted-foreground ml-1">For files larger than 100MB, upload to Google Drive and paste the link here</p>
                        </div>

                        {/* File Upload Area */}
                        <div className="md:col-span-2">
                            <label className="text-sm font-semibold ml-1 block mb-2">Upload File (PDF, Image, etc.)</label>
                            <div className={`relative border-2 border-dashed rounded-2xl p-8 transition-all flex flex-col items-center justify-center gap-3 ${file ? 'border-primary/50 bg-primary/5' : 'border-secondary-foreground/20 hover:border-primary/30'}`}>
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleFileChange}
                                />
                                {file ? (
                                    <>
                                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-medium text-sm">{file.name}</p>
                                            <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-muted-foreground group-hover:scale-110 transition-transform">
                                            <Upload className="w-6 h-6" />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-medium text-sm">Click or drag to upload</p>
                                            <p className="text-xs text-muted-foreground">Any file up to 100MB</p>
                                        </div>
                                    </>
                                )}
                            </div>
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
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="w-5 h-5" />
                                    Publish Material
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
