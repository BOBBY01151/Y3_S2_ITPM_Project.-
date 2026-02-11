import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
    Plus,
    FileText,
    Download,
    Calendar,
    GraduationCap,
    Search,
    Filter,
    ArrowUpRight,
    Loader2,
    BookOpen,
    Pencil,
    Trash2
} from "lucide-react";
import StudySupportSidebar from "../components/StudySupportSidebar";
import UploadMaterialModal from "../components/UploadMaterialModal";
import EditMaterialModal from "../components/EditMaterialModal";
import MaterialPreviewModal from "../components/MaterialPreviewModal";
import { toast } from "sonner";

export default function StudySupport() {
    const { token, user } = useSelector((state) => state.auth);
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [materialToUpdate, setMaterialToUpdate] = useState(null);
    const [filters, setFilters] = useState({
        search: "",
        faculty: "",
        graduateYear: "",
        degreeProgram: ""
    });

    const fetchMaterials = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams();
            if (filters.faculty) queryParams.append('faculty', filters.faculty);
            if (filters.graduateYear) queryParams.append('graduateYear', filters.graduateYear);
            if (filters.degreeProgram) queryParams.append('degreeProgram', filters.degreeProgram);
            if (filters.search) queryParams.append('search', filters.search);

            const response = await axios.get(`http://localhost:5001/api/materials?${queryParams}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMaterials(response.data);
        } catch (error) {
            toast.error("Failed to fetch study materials");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchMaterials();
        }, 300);
        return () => clearTimeout(timer);
    }, [filters]);

    const handleUploadSuccess = (newMaterial) => {
        setMaterials([newMaterial, ...materials]);
    };

    const handleUpdateSuccess = (updatedMaterial) => {
        setMaterials(materials.map(m => m._id === updatedMaterial._id ? updatedMaterial : m));
    };

    const handleEdit = (material) => {
        setMaterialToUpdate(material);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this material?")) {
            try {
                await axios.delete(`http://localhost:5001/api/materials/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMaterials(materials.filter(m => m._id !== id));
                toast.success("Material deleted successfully");
            } catch (error) {
                toast.error("Failed to delete material");
            }
        }
    };

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Sidebar for filtering */}
            <StudySupportSidebar
                filters={filters}
                setFilters={setFilters}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="p-8 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Study Support
                        </h1>
                        <p className="text-muted-foreground mt-1">Discover and share study resources</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden flex items-center justify-center p-2.5 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors"
                        >
                            <Filter className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setIsUploadModalOpen(true)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Upload Material</span>
                        </button>
                    </div>
                </header>

                {/* Main Grid */}
                <main className="flex-1 p-8 pt-4 overflow-y-auto">
                    {loading ? (
                        <div className="h-64 flex items-center justify-center">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : materials.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {materials.map((material) => (
                                <div
                                    key={material._id}
                                    className="group relative bg-secondary/20 border border-white/5 rounded-3xl p-6 hover:bg-secondary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setSelectedMaterial(material)}
                                                className="p-2 opacity-0 group-hover:opacity-100 bg-white/10 hover:bg-primary hover:text-white rounded-xl transition-all duration-300"
                                                title="Preview Material"
                                            >
                                                <Search className="w-5 h-5" />
                                            </button>
                                            <a
                                                href={material.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 opacity-0 group-hover:opacity-100 bg-white/10 hover:bg-primary hover:text-white rounded-xl transition-all duration-300"
                                                title="Open Original"
                                            >
                                                <Download className="w-5 h-5" />
                                            </a>
                                            {user && material.uploader && (user._id === material.uploader._id || user.id === material.uploader._id || user.role === 'admin') && (
                                                <>
                                                    <button
                                                        onClick={() => handleEdit(material)}
                                                        className="p-2 opacity-0 group-hover:opacity-100 bg-white/10 hover:bg-amber-500 hover:text-white rounded-xl transition-all duration-300"
                                                        title="Edit Material"
                                                    >
                                                        <Pencil className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(material._id)}
                                                        className="p-2 opacity-0 group-hover:opacity-100 bg-white/10 hover:bg-destructive hover:text-white rounded-xl transition-all duration-300"
                                                        title="Delete Material"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold mb-2 line-clamp-1">{material.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[40px]">
                                        {material.description || "No description provided."}
                                    </p>

                                    <div className="space-y-2 mt-auto">
                                        <div className="flex items-center gap-2 text-xs font-medium px-3 py-1 bg-primary/5 text-primary rounded-full w-fit">
                                            <BookOpen className="w-3 h-3" />
                                            {material.faculty}
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                                                <Calendar className="w-3 h-3" />
                                                {material.graduateYear}
                                            </div>
                                            <div className="flex items-center gap-2 text-[11px] text-muted-foreground truncate">
                                                <GraduationCap className="w-3 h-3" />
                                                {material.degreeProgram}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                                                {material.uploader?.name?.charAt(0) || "S"}
                                            </div>
                                            <span className="text-xs font-medium">{material.uploader?.name || "Student"}</span>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground">
                                            {new Date(material.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-4 rounded-3xl bg-secondary/10 border-2 border-dashed border-white/5">
                            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-muted-foreground">
                                <Search className="w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">No materials found</h3>
                                <p className="text-muted-foreground">Try adjusting your filters or upload the first resource!</p>
                            </div>
                            <button
                                onClick={() => setIsUploadModalOpen(true)}
                                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold mt-2"
                            >
                                Upload Material
                            </button>
                        </div>
                    )}
                </main>
            </div>

            {/* Upload Modal */}
            <UploadMaterialModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onUploadSuccess={handleUploadSuccess}
            />

            {/* Edit Modal */}
            <EditMaterialModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setMaterialToUpdate(null);
                }}
                material={materialToUpdate}
                onUpdateSuccess={handleUpdateSuccess}
            />

            {/* Preview Modal */}
            <MaterialPreviewModal
                isOpen={!!selectedMaterial}
                onClose={() => setSelectedMaterial(null)}
                material={selectedMaterial}
            />
        </div>
    );
}
