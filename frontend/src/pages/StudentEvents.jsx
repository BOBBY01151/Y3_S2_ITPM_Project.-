import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, addDays, subDays, isSameDay, setHours, setMinutes, startOfDay } from 'date-fns';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, RotateCw, Plus, LayoutGrid, Users, Briefcase, ShoppingBag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import 'react-day-picker/dist/style.css';

const StudentEvents = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Mock Users/Resources for columns
    const resources = [
        { id: 1, name: 'Boss Bosss', avatar: 'BB', color: 'bg-emerald-500' },
        { id: 2, name: 'Vimukthi Buddika', avatar: 'VB', color: 'bg-orange-500' }
    ];

    // Generate time slots from 8:00 AM to 10:00 PM (28 slots)
    const generateTimeSlots = () => {
        const slots = [];
        let startTime = 8 * 60; // 8:00 AM
        const endTime = 22 * 60; // 10:00 PM

        while (startTime <= endTime) {
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
        <div className="flex h-[calc(100vh-theme(spacing.16))] gap-6 p-6 bg-gray-50/50">
            {/* Left Sidebar */}
            <div className="w-80 flex flex-col gap-6 shrink-0">
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold px-1">Select Date</h2>
                    <Card className="border-none shadow-sm">
                        <CardContent className="p-0">
                            <DayPicker
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => date && setSelectedDate(date)}
                                className="bg-white rounded-lg p-3 w-full"
                                classNames={{
                                    day_selected: "bg-green-600 text-white hover:bg-green-600",
                                    day_today: "font-bold text-green-600",
                                }}
                            />
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-none shadow-sm">
                    <CardContent className="p-4 space-y-2">
                        <h3 className="text-sm text-muted-foreground mb-3 font-medium">Quick Actions</h3>
                        <Button variant="ghost" className="w-full justify-start gap-2 font-normal" onClick={handleToday}>
                            <CalendarIcon className="w-4 h-4" /> Today
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-2 font-normal" onClick={handleTomorrow}>
                            <CalendarIcon className="w-4 h-4" /> Tomorrow
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-2 font-normal" onClick={handlePrevDay}>
                            <ChevronLeft className="w-4 h-4" /> Previous Day
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-2 font-normal" onClick={handleNextDay}>
                            <ChevronRight className="w-4 h-4" /> Next Day
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 bg-white rounded-xl shadow-sm border">
                {/* Header */}
                <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold">Calendar</h1>
                        <Select defaultValue="sdfsdf">
                            <SelectTrigger className="w-[180px] bg-gray-50 border-none">
                                <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sdfsdf">sdfsdf</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                            <RotateCw className="w-4 h-4 text-muted-foreground" />
                        </Button>
                        <div className="flex items-center bg-white border rounded-lg p-1">
                            <Button variant="ghost" size="sm" onClick={handlePrevDay} className="h-7 w-7 p-0">
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <div className="px-3 text-sm font-medium min-w-[140px] text-center">
                                <span className="mr-2">📅</span>
                                {format(selectedDate, 'MMMM d, yyyy')}
                            </div>
                            <Button variant="ghost" size="sm" onClick={handleNextDay} className="h-7 w-7 p-0">
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Timeline Grid */}
                <div className="flex flex-1 overflow-hidden flex-col">
                    {/* Resource Headers */}
                    <div className="flex border-b">
                        <div className="w-20 shrink-0 border-r bg-gray-50/50"></div> {/* Time column header stub */}
                        {resources.map((resource) => (
                            <div key={resource.id} className="flex-1 p-4 border-r last:border-r-0 flex flex-col items-center gap-2 min-w-[200px]">
                                <div className="relative">
                                    <Avatar className={`h-12 w-12 ${resource.color.replace('bg-', 'bg-opacity-20 ')}`}>
                                        <AvatarFallback className={resource.color}>{resource.avatar}</AvatarFallback>
                                    </Avatar>
                                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${resource.color}`}></div>
                                </div>
                                <span className="font-semibold text-sm">{resource.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* Scrollable Time Slots */}
                    <ScrollArea className="flex-1">
                        <div className="flex">
                            {/* Time Column */}
                            <div className="w-20 shrink-0 border-r bg-gray-50/30 flex flex-col text-xs text-muted-foreground font-medium text-center">
                                {timeSlots.map((slot) => (
                                    <div key={slot.timeString} className="h-20 border-b flex items-start justify-center pt-2 relative group">
                                        {/* Only show label for full hours or special styling */}
                                        <span className={slot.timeString.endsWith('00') ? 'text-black font-bold' : 'opacity-50'}>
                                            {slot.timeString}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Resource Columns */}
                            {resources.map((resource) => (
                                <div key={resource.id} className="flex-1 border-r last:border-r-0 min-w-[200px]">
                                    {timeSlots.map((slot) => (
                                        <div key={slot.timeString} className="h-20 border-b relative group transition-colors hover:bg-gray-50/50">
                                            {/* Example Event Logic: Render distinct event for demo */}
                                            {resource.id === 2 && slot.timeString === '12:30' ? (
                                                <div className="absolute inset-x-1 top-1 bottom-1 bg-pink-100 rounded-md border border-pink-200 flex flex-col items-center justify-center p-2 z-10 cursor-pointer hover:bg-pink-200 transition-colors">
                                                    <Plus className="w-4 h-4 text-pink-500 mb-1" />
                                                    <span className="text-xs text-pink-600 font-medium">{resource.name}</span>
                                                </div>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
                                                        <Plus className="w-4 h-4 text-muted-foreground" />
                                                    </Button>
                                                </div>
                                            )}

                                            {/* Demo 09:00 slot - nothing */}
                                            {/* Demo 12:30 slot - "Boss Bosss" ghost Add button (as per screenshot which has one at bottom) */}
                                            {resource.id === 1 && slot.timeString === '12:30' && (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                                    <Plus className="w-4 h-4 text-gray-400 mb-1" />
                                                    <span className="text-xs text-gray-400 font-medium">Boss Bosss</span>
                                                </div>
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
