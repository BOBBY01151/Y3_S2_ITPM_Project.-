import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

const AttendanceScanner = ({ isOpen, onClose, onScan }) => {
    const [scanning, setScanning] = useState(true);
    const [result, setResult] = useState(null);

    const handleScan = (detectedCodes) => {
        if (detectedCodes && detectedCodes.length > 0) {
            const code = detectedCodes[0].rawValue;
            setResult(code);
            setScanning(false);

            // In a real app, you would send this to the backend
            console.log('Scanned QR Code:', code);
            toast.success('Attendance marked successfully!');

            if (onScan) {
                onScan(code);
            }

            // Close after a brief delay to show success
            setTimeout(() => {
                onClose();
                setResult(null);
                setScanning(true);
            }, 1500);
        }
    };

    const handleError = (error) => {
        console.error(error);
        toast.error('Failed to access camera');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Scan Attendance QR</DialogTitle>
                    <DialogDescription>
                        Point your camera at the lecturer's QR code to mark your attendance.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center justify-center p-4 min-h-[300px]">
                    {scanning ? (
                        <div className="w-full aspect-square relative overflow-hidden rounded-lg border-2 border-primary/20">
                            <Scanner
                                onScan={handleScan}
                                onError={handleError}
                                components={{
                                    audio: false,
                                    torch: false,
                                    finder: true
                                }}
                                styles={{
                                    container: { width: '100%', height: '100%' }
                                }}
                            />
                            <div className="absolute inset-0 pointer-events-none border-2 border-primary/50 animate-pulse rounded-lg"></div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4 animate-in zoom-in-50 duration-300">
                            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircle2 className="w-10 h-10 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-green-700">Success!</h3>
                            <p className="text-muted-foreground text-center">
                                Attendance marked for session.
                            </p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AttendanceScanner;
