import { useState, useEffect, memo, useMemo } from "react";
import { cn } from "../lib/utils";
import {
    LayoutDashboard,
    BarChart3,
    Settings,
    FileText,
    User,
    Calendar,
    X,
    UserPlus
} from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import sliitLogo from "../assets/39bee516b4e52b07096c8df6493b386743d2a70d.png";

export function Sidebar() {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();
    const isSuperAdmin = user?.role === "superadmin";
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const rolePath = user?.role === 'superadmin' ? '/admin' : `/${user?.role || 'student'}`;

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const navigationItems = [
        {
            id: "dashboard",
            name: "Dashboard",
            icon: LayoutDashboard,
            path: `${rolePath}/dashboard`,
            description: "Overview & monitoring"
        },
        ...(isSuperAdmin ? [{
            id: "registrations",
            name: "Registrations",
            icon: UserPlus,
            path: `/admin/registrations`,
            description: "Review requests"
        }] : []),
        {
            id: "events",
            name: "Events",
            icon: Calendar,
            path: `${rolePath}/events`,
            description: "Campus events"
        },
        {
            id: "reports",
            name: "Reports",
            icon: FileText,
            path: `${rolePath}/reports`,
            description: "Generate reports"
        },
        {
            id: "settings",
            name: "Profile",
            icon: User,
            path: `${rolePath}/settings`,
            description: "User preferences"
        }
    ];

    const NavItem = memo(({ item, isMobileView = false }) => {
        const Icon = item.icon;

        return (
            <NavLink
                to={item.path}
                className={({ isActive }) => cn(
                    "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center relative overflow-hidden group/item",
                    isMobileView ? "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl min-w-[60px]" : (
                        isExpanded
                            ? "w-full px-4 py-3 justify-start rounded-xl hover:bg-sidebar-accent/50"
                            : "w-12 h-12 justify-center mx-auto rounded-full hover:bg-sidebar-accent/50"
                    ),
                    isActive
                        ? "bg-gradient-to-br from-sidebar-primary to-sidebar-primary/80 shadow-lg text-white"
                        : "text-white/60 hover:text-white"
                )}
                style={{ willChange: 'transform, opacity, background-color' }}
            >
                {({ isActive }) => (
                    <>
                        <Icon className={cn("w-5 h-5 transition-all duration-300", isActive ? "text-white" : "text-inherit group-hover/item:scale-110")} />

                        {!isMobileView && (
                            <div
                                className={cn(
                                    "ml-3 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col",
                                    isExpanded ? "max-w-[200px] opacity-100 translate-x-0" : "max-w-0 opacity-0 -translate-x-4"
                                )}
                                style={{ willChange: 'max-width, opacity, transform' }}
                            >
                                <div className="font-medium text-sm whitespace-nowrap">{item.name}</div>
                                {isActive && (
                                    <div className="text-xs text-white/80 mt-0.5 whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-500">
                                        {item.description}
                                    </div>
                                )}
                            </div>
                        )}

                        {isMobileView && (
                            <span className="text-[10px] font-medium">{item.name}</span>
                        )}

                        {isActive && !isExpanded && !isMobileView && (
                            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-sidebar-primary rounded-l-full" />
                        )}
                    </>
                )}
            </NavLink>
        );
    });

    if (isMobile) {
        return (
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-sidebar border-t border-sidebar-border shadow-2xl">
                <nav className="flex items-center justify-around px-2 py-3">
                    {navigationItems.map((item) => <NavItem key={item.id} item={item} isMobileView={true} />)}
                </nav>
            </div>
        );
    }

    return (
        <div className="ml-6 my-6 h-[calc(100vh-3rem)]">
            <div
                onMouseEnter={() => !isMobile && setIsExpanded(true)}
                onMouseLeave={() => !isMobile && setIsExpanded(false)}
                className={cn(
                    "flex flex-col h-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-3xl",
                    "bg-gradient-to-b from-sidebar via-sidebar to-sidebar-accent shadow-2xl border border-sidebar-border/20 overflow-hidden",
                    isExpanded ? "w-64" : "w-20"
                )}
                style={{ willChange: 'width' }}
            >
                <div className="p-6 flex flex-col items-center relative">
                    <div className={cn(
                        "w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg p-2 transition-all duration-300",
                        isExpanded ? "scale-100" : "scale-90"
                    )}>
                        <img src={sliitLogo} alt="SLIIT" className="w-full h-full object-contain" />
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-4">
                    {navigationItems.map((item) => (
                        <div key={item.id} className="relative group">
                            <NavItem item={item} />
                            {!isExpanded && (
                                <div className="absolute left-full ml-4 px-3 py-2 bg-sidebar-primary text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50 shadow-lg translate-x-2 group-hover:translate-x-0">
                                    <div className="font-medium text-sm">{item.name}</div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="p-4 border-t border-sidebar-border/10 bg-sidebar-accent/20">
                    <div className={cn(
                        "flex items-center transition-all duration-300",
                        isExpanded ? "flex-row px-2" : "flex-col"
                    )}>
                        <div
                            className="w-10 h-10 bg-sidebar-primary rounded-full flex items-center justify-center shadow-lg shrink-0 border-2 border-white/10"
                        >
                            <span className="text-white font-bold text-sm">{user?.name?.charAt(0) || 'U'}</span>
                        </div>
                        <div
                            className={cn(
                                "overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                                isExpanded ? "ml-3 opacity-100 max-w-[150px]" : "ml-0 opacity-0 max-w-0 h-0"
                            )}
                            style={{ willChange: 'max-width, opacity' }}
                        >
                            <p className="text-white font-medium text-xs truncate">{user?.name || 'User'}</p>
                            <p className="text-white/50 text-[9px] uppercase tracking-wider truncate">{user?.role}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

