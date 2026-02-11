import { Search, Filter, X } from "lucide-react";

export default function StudySupportSidebar({ filters, setFilters, isOpen, onClose }) {
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

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: prev[key] === value ? "" : value
        }));
    };

    return (
        <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="h-full flex flex-col p-6 space-y-8 overflow-y-auto">
                <div className="flex items-center justify-between lg:hidden">
                    <h2 className="text-xl font-bold">Filters</h2>
                    <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Search */}
                <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                        <Search className="w-4 h-4" /> Search
                    </h3>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search materials..."
                            className="w-full px-4 py-2 bg-secondary/50 border rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm"
                            value={filters.search}
                            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                        />
                    </div>
                </div>

                {/* Faculty */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                        <Filter className="w-4 h-4" /> Faculty
                    </h3>
                    <div className="space-y-1">
                        {faculties.map((faculty) => (
                            <button
                                key={faculty}
                                onClick={() => handleFilterChange('faculty', faculty)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${filters.faculty === faculty
                                        ? "bg-primary text-primary-foreground shadow-md"
                                        : "hover:bg-secondary text-foreground/80"
                                    }`}
                            >
                                {faculty}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Graduate Year */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Graduate Year
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {years.map((year) => (
                            <button
                                key={year}
                                onClick={() => handleFilterChange('graduateYear', year)}
                                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${filters.graduateYear === year
                                        ? "bg-primary border-primary text-primary-foreground shadow-sm scale-105"
                                        : "hover:border-primary/50 text-foreground/70"
                                    }`}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Degree Program (Placeholder text input if not many predefined) */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Degree Program
                    </h3>
                    <input
                        type="text"
                        placeholder="Filter by degree..."
                        className="w-full px-4 py-2 bg-secondary/50 border rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm"
                        value={filters.degreeProgram}
                        onChange={(e) => setFilters(prev => ({ ...prev, degreeProgram: e.target.value }))}
                    />
                </div>

                {/* Reset Filters */}
                <button
                    onClick={() => setFilters({ search: "", faculty: "", graduateYear: "", degreeProgram: "" })}
                    className="w-full py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-xl transition-colors border border-destructive/20"
                >
                    Clear All Filters
                </button>
            </div>
        </div>
    );
}
