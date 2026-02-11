import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, addDays, subDays } from 'date-fns';
import {
    Calendar as CalendarIcon,
    Clock,
    ChevronLeft,
    ChevronRight,
    RotateCw,
    Plus,
    LayoutGrid,
    Users
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import 'react-day-picker/dist/style.css';

const StudentEvents = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Mock Users/Resources for columns
    const resources = [
        { id: 1, name: 'Boss Bosss', avatar: 'BB', color: 'bg-emerald-500' },
        { id: 2, name: 'Vimukthi Buddika', avatar: 'VB', color: 'bg-orange-500' }
    ];

    // Generate exactly 31 time slots starting from 8:00 AM to 11:00 PM (15 hours total points)
    const generateTimeSlots = () => {
        const slots = [];
        let startTime = 8 * 60; // 8:00 AM
        const totalSlots = 31; // 15 hours * 2 slots per hour + 1 for 23:00

        for (let i = 0; i < totalSlots; i++) {
            const hours = Math.floor(startTime / 60);
            const minutes = startTime % 60;
            const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            slots.push({ timeString, minutes: startTime });
            startTime += 30;
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    // Navigation handlers
    const handleNextDay = () => setSelectedDate(addDays(selectedDate, 1));
    const handlePrevDay = () => setSelectedDate(subDays(selectedDate, 1));
    const handleToday = () => setSelectedDate(new Date());
    const handleTomorrow = () => setSelectedDate(addDays(new Date(), 1));

    return (
        <div className="flex h-[calc(100vh-theme(spacing.16))] gap-6 p-6 bg-slate-50/50">
            {/* Left Sidebar */}
            <div className="w-80 flex flex-col gap-6 shrink-0">
                <div className="space-y-4">
                    <h2 className="text-xl font-bold tracking-tight px-1 text-slate-900">Select Date</h2>
                    <Card className="border shadow-sm overflow-hidden rounded-2xl">
                        <CardContent className="p-0">
                            <DayPicker
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => date && setSelectedDate(date)}
                                className="bg-white p-3 w-full"
                                classNames={{
                                    day_selected: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-md",
                                    day_today: "font-bold text-primary border border-primary/20 bg-primary/5 rounded-md",
                                    day: "h-9 w-9 text-center p-0 font-normal aria-selected:opacity-100 hover:bg-muted rounded-md transition-colors",
                                }}
                            />
                        </CardContent>
                    </Card>
                </div>

                <Card className="border shadow-sm rounded-2xl overflow-hidden">
                    <CardContent className="p-4 space-y-1.5">
                        <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.1em] mb-2 ml-1">Quick Actions</h3>
                        <Button variant="ghost" className="w-full justify-start gap-3 h-11 px-3 hover:bg-slate-100 rounded-xl group transition-all" onClick={handleToday}>
                            <CalendarIcon className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                            <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900">Today</span>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-3 h-11 px-3 hover:bg-slate-100 rounded-xl group transition-all" onClick={handleTomorrow}>
                            <CalendarIcon className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                            <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900">Tomorrow</span>
                        </Button>
                        <Separator className="my-2 bg-slate-100" />
                        <Button variant="ghost" className="w-full justify-start gap-3 h-11 px-3 hover:bg-slate-100 rounded-xl group transition-all" onClick={handlePrevDay}>
                            <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                            <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900">Previous Day</span>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-3 h-11 px-3 hover:bg-slate-100 rounded-xl group transition-all" onClick={handleNextDay}>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                            <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900">Next Day</span>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content (The Table Section) */}
            <div className="flex-1 flex flex-col min-w-0 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                {/* Header */}
                <div className="px-8 py-5 bg-white border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="bg-primary/10 p-3 rounded-2xl">
                            <LayoutGrid className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Timeline Calendar</h1>
                            <p className="text-[13px] text-slate-500 font-bold">31 Time Slots • 08:00 - 23:00</p>
                        </div>
                        <Separator orientation="vertical" className="h-12 mx-2 bg-slate-200" />
                        <Select defaultValue="main-campus">
                            <SelectTrigger className="w-[200px] bg-slate-50 border-slate-200 h-11 rounded-xl font-bold text-slate-700 shadow-sm">
                                <SelectValue placeholder="Location" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-slate-200">
                                <SelectItem value="main-campus">Main Campus</SelectItem>
                                <SelectItem value="metro-hub">Metro Hub</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" className="h-11 w-11 border-slate-200 rounded-2xl hover:bg-slate-50 shadow-sm transition-all hover:rotate-45">
                            <RotateCw className="w-4 h-4 text-slate-500" />
                        </Button>
                        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl p-1 shadow-sm">
                            <Button variant="ghost" size="icon" onClick={handlePrevDay} className="h-9 w-9 rounded-xl hover:bg-white hover:shadow-sm">
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <div className="px-6 text-sm font-black text-slate-800 flex items-center gap-2.5 min-w-[180px] justify-center">
                                <CalendarIcon className="w-4 h-4 text-primary" />
                                {format(selectedDate, 'MMMM d, yyyy')}
                            </div>
                            <Button variant="ghost" size="icon" onClick={handleNextDay} className="h-9 w-9 rounded-xl hover:bg-white hover:shadow-sm">
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Timeline Grid Table */}
                <div className="flex flex-1 overflow-hidden flex-col min-h-0">
                    {/* Resource Headers (Horizontal Columns) */}
                    <div className="flex border-b border-slate-200 bg-slate-50/50 sticky top-0 z-20">
                        <div className="w-24 shrink-0 border-r border-slate-200 bg-slate-100/30 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-slate-400" />
                        </div>
                        {resources.map((resource) => (
                            <div key={resource.id} className="flex-1 p-6 border-r border-slate-200 last:border-r-0 flex items-center justify-center gap-5 min-w-[280px]">
                                <div className="relative group">
                                    <div className={`h-14 w-14 rounded-2xl border-2 border-white shadow-xl flex items-center justify-center ${resource.color} text-white font-black text-lg transition-transform group-hover:scale-110 rotate-3 group-hover:rotate-0`}>
                                        {resource.avatar}
                                    </div>
                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${resource.color} shadow-lg animate-pulse`}></div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-black text-slate-900 text-lg leading-tight tracking-tight">{resource.name}</span>
                                    <div className="flex items-center gap-1.5 mt-1.5">
                                        <Badge className="bg-slate-900/10 text-slate-600 hover:bg-slate-900/20 border-none text-[10px] font-black uppercase tracking-wider px-2 py-0.5">
                                            Resource
                                        </Badge>
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase">Online</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Scrollable Time Slots Table Body */}
                    <ScrollArea className="flex-1 h-full">
                        <div className="flex min-h-max bg-white relative w-max min-w-full">
                            {/* Vertical Grid Lines (Background) */}
                            <div className="absolute inset-0 flex pointer-events-none">
                                <div className="w-24 shrink-0 border-r border-slate-200 bg-slate-50/20"></div>
                                {resources.map((r, i) => (
                                    <div key={i} className="flex-1 border-r border-slate-100 last:border-0"></div>
                                ))}
                            </div>

                            {/* Time Column (Vertical Axis) */}
                            <div className="w-24 shrink-0 flex flex-col items-center z-10 bg-white/80 backdrop-blur-sm border-r border-slate-200">
                                {timeSlots.map((slot) => (
                                    <div key={slot.timeString} className="h-20 w-full border-b border-slate-100 flex items-center justify-center relative group select-none">
                                        <div className={`
                                            px-2.5 py-1.5 rounded-lg transition-all duration-300
                                            ${slot.timeString.endsWith('00')
                                                ? 'bg-slate-900 shadow-lg shadow-slate-200 text-white font-black text-[11px] scale-100'
                                                : 'text-slate-400 font-extrabold text-[10px] opacity-60 group-hover:opacity-100 group-hover:text-slate-600'
                                            }
                                        `}>
                                            {slot.timeString}
                                        </div>
                                        {/* Hour Marker Line */}
                                        {slot.timeString.endsWith('00') && (
                                            <div className="absolute top-0 right-0 w-2 h-[2px] bg-slate-900 rounded-full"></div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Resource Columns Data Area */}
                            {resources.map((resource) => (
                                <div key={resource.id} className="flex-1 min-w-[280px] z-10">
                                    {timeSlots.map((slot) => (
                                        <div
                                            key={slot.timeString}
                                            className={`
                                                h-20 border-b border-slate-100 relative group transition-all duration-200
                                                hover:bg-slate-50/80
                                            `}
                                        >
                                            {/* Logic for Mock Events */}
                                            {resource.id === 2 && slot.timeString === '12:30' ? (
                                                <div className="absolute inset-2 bg-white rounded-2xl border-2 border-indigo-100 flex flex-col items-center justify-center p-3 z-10 cursor-pointer shadow-sm hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all group/event">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-50 rounded-2xl"></div>
                                                    <div className="bg-indigo-500 p-1.5 rounded-xl shadow-lg shadow-indigo-200 mb-2 group-hover/event:rotate-12 transition-transform">
                                                        <Plus className="w-4 h-4 text-white" />
                                                    </div>
                                                    <span className="text-[11px] text-indigo-900 font-black tracking-tight uppercase relative">{resource.name}</span>
                                                </div>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
                                                    <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-xl border-slate-200 text-slate-400 hover:text-primary hover:border-primary hover:bg-white shadow-sm">
                                                        <Plus className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            )}

                                            {/* Bottom Slot Ghost Button (Boss Bosss example at 12:30) */}
                                            {resource.id === 1 && slot.timeString === '12:30' && (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20 filter grayscale group-hover:translate-y-1 group-hover:opacity-100 transition-all">
                                                    <Plus className="w-4 h-4 text-slate-400 mb-1" />
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{resource.name}</span>
                                                </div>
                                            )}

                                            {/* Custom Cell Highlight for whole hours */}
                                            {slot.timeString.endsWith('00') && (
                                                <div className="absolute top-0 inset-x-0 h-px bg-slate-900/5"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
};

export default StudentEvents;
