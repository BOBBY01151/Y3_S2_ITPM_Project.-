import { X, Download, ExternalLink, Loader2 } from "lucide-react";
import { useState } from "react";

export default function MaterialPreviewModal({ isOpen, onClose, material }) {
    const [loading, setLoading] = useState(true);

    if (!isOpen || !material) return null;

    const isPDF = material.fileUrl?.toLowerCase().endsWith('.pdf');
    const isImage = /\.(jpg|jpeg|png|webp|gif)$/i.test(material.fileUrl);

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-background w-full max-w-5xl h-[90vh] rounded-3xl shadow-2xl overflow-hidden border border-white/10 flex flex-col animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="px-6 py-4 border-b flex items-center justify-between bg-secondary/20">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                            <ExternalLink className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-lg font-bold truncate">{material.title}</h2>
                            <p className="text-xs text-muted-foreground truncate">{material.subject} • {material.faculty}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <a
                            href={material.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-secondary rounded-xl transition-colors text-muted-foreground hover:text-foreground"
                            title="Open in new tab"
                        >
                            <ExternalLink className="w-5 h-5" />
                        </a>
                        <a
                            href={material.fileUrl}
                            download
                            className="p-2 hover:bg-secondary rounded-xl transition-colors text-muted-foreground hover:text-foreground"
                            title="Download"
                        >
                            <Download className="w-5 h-5" />
                        </a>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-destructive/20 hover:text-destructive rounded-xl transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 relative bg-secondary/10 flex items-center justify-center overflow-hidden">
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
                            <Loader2 className="w-10 h-10 animate-spin text-primary" />
                        </div>
                    )}

                    {isPDF ? (
                        <iframe
                            src={`${material.fileUrl}#toolbar=0`}
                            className="w-full h-full border-none"
                            onLoad={() => setLoading(false)}
                            title={material.title}
                        />
                    ) : isImage ? (
                        <div className="w-full h-full p-4 flex items-center justify-center overflow-auto custom-scrollbar">
                            <img
                                src={material.fileUrl}
                                alt={material.title}
                                className="max-w-full max-h-full object-contain rounded-lg shadow-xl"
                                onLoad={() => setLoading(false)}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4 text-center p-8">
                            <div className="w-20 h-20 bg-secondary rounded-3xl flex items-center justify-center text-muted-foreground">
                                <ExternalLink className="w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground">Preview not available</h3>
                                <p className="text-muted-foreground mt-2">This file type cannot be previewed directly.</p>
                            </div>
                            <a
                                href={material.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/20"
                                onClick={() => setLoading(false)}
                            >
                                Open Original File
                            </a>
                        </div>
                    )}
                </div>

                {/* Footer/Info */}
                <div className="px-6 py-4 bg-secondary/5 border-t text-xs text-muted-foreground flex justify-between items-center">
                    <span>Uploaded by {material.uploader?.name || "Student"} • {new Date(material.createdAt).toLocaleDateString()}</span>
                    <span>{material.degreeProgram}</span>
                </div>
            </div>
        </div>
    );
}
