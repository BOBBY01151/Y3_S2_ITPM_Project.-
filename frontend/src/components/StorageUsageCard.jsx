import { useState, useEffect } from "react";
import { HardDrive, AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function StorageUsageCard() {
    const { token } = useSelector((state) => state.auth);
    const [storageData, setStorageData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStorageUsage();
    }, []);

    const fetchStorageUsage = async () => {
        try {
            const response = await axios.get("http://localhost:5001/api/storage/usage", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStorageData(response.data);
        } catch (error) {
            console.error("Failed to fetch storage usage:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-secondary/20 border border-white/5 rounded-3xl p-6 animate-pulse">
                <div className="h-40 bg-secondary/30 rounded-2xl"></div>
            </div>
        );
    }

    if (!storageData) return null;

    const { percentage, status, usedFormatted, quotaFormatted, availableFormatted, fileCount } = storageData;

    // Color based on status
    const getStatusColor = () => {
        switch (status) {
            case 'critical': return 'text-red-500';
            case 'warning': return 'text-yellow-500';
            default: return 'text-green-500';
        }
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'critical': return <AlertCircle className="w-5 h-5" />;
            case 'warning': return <AlertTriangle className="w-5 h-5" />;
            default: return <CheckCircle2 className="w-5 h-5" />;
        }
    };

    const getStatusBgColor = () => {
        switch (status) {
            case 'critical': return 'from-red-500/20 to-red-600/10';
            case 'warning': return 'from-yellow-500/20 to-yellow-600/10';
            default: return 'from-green-500/20 to-green-600/10';
        }
    };

    const getStrokeColor = () => {
        switch (status) {
            case 'critical': return '#ef4444'; // red-500
            case 'warning': return '#eab308'; // yellow-500
            default: return '#22c55e'; // green-500
        }
    };

    // SVG circle parameters
    const size = 160;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="bg-gradient-to-br from-secondary/30 to-secondary/10 border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all">
            <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${getStatusBgColor()} rounded-xl flex items-center justify-center ${getStatusColor()}`}>
                    <HardDrive className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-bold">Storage Usage</h3>
                    <p className="text-sm text-muted-foreground">{fileCount} files uploaded</p>
                </div>
            </div>

            <div className="flex flex-col items-center gap-6">
                {/* Circular Progress Chart */}
                <div className="relative">
                    <svg width={size} height={size} className="transform -rotate-90">
                        {/* Background circle */}
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={strokeWidth}
                            className="text-secondary/30"
                        />
                        {/* Progress circle */}
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke={getStrokeColor()}
                            strokeWidth={strokeWidth}
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                        />
                    </svg>
                    {/* Center text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-4xl font-bold ${getStatusColor()}`}>{percentage}%</span>
                        <span className="text-xs text-muted-foreground mt-1">Used</span>
                    </div>
                </div>

                {/* Storage Details */}
                <div className="w-full space-y-3">
                    <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-xl">
                        <span className="text-sm text-muted-foreground">Used</span>
                        <span className="font-semibold">{usedFormatted}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-xl">
                        <span className="text-sm text-muted-foreground">Available</span>
                        <span className="font-semibold">{availableFormatted}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-xl">
                        <span className="text-sm text-muted-foreground">Total Quota</span>
                        <span className="font-semibold">{quotaFormatted}</span>
                    </div>
                </div>

                {/* Status Message */}
                {status !== 'safe' && (
                    <div className={`w-full p-3 rounded-xl flex items-center gap-2 ${status === 'critical' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                        {getStatusIcon()}
                        <span className="text-sm font-medium">
                            {status === 'critical'
                                ? 'Storage almost full! Consider using Google Drive links.'
                                : 'Storage usage is high. Monitor your uploads.'}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
