import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Map,
    BarChart2,
    Briefcase,
    Settings,
    LogOut,
    Menu,
    Bell,
    Search,
    User,
    X
} from 'lucide-react';
import { motion } from 'framer-motion';

const SidebarItem = ({ icon: Icon, label, to, active }) => {
    return (
        <Link
            to={to}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${active
                ? 'bg-primary text-white shadow-lg shadow-blue-500/30'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
        >
            <Icon size={20} className={active ? 'text-white' : 'text-slate-400 group-hover:text-primary'} />
            <span className="font-medium">{label}</span>
        </Link>
    );
};

const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const sidebarLinks = [
        { icon: LayoutDashboard, label: 'Overview', to: '/dashboard' },
        { icon: Map, label: 'Career Roadmap', to: '/dashboard/roadmap' },
        { icon: BarChart2, label: 'My Skills', to: '/dashboard/skills' },
        { icon: Briefcase, label: 'Job Alerts', to: '/dashboard/jobs' },
        { icon: Settings, label: 'Settings', to: '/dashboard/settings' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 shadow-xl lg:shadow-none transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="h-full flex flex-col p-6">
                    <div className="flex items-center justify-between mb-10">
                        <Link to="/" className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                            Career<span className="text-primary">Path</span>
                        </Link>
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-600">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="space-y-2 flex-1">
                        {sidebarLinks.map((link) => (
                            <SidebarItem
                                key={link.to}
                                {...link}
                                active={location.pathname === link.to}
                            />
                        ))}
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all w-full"
                        >
                            <LogOut size={20} />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Navigation */}
                <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
                    <div className="px-6 py-4 flex items-center justify-between gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden text-slate-500 hover:text-slate-700"
                        >
                            <Menu size={24} />
                        </button>

                        <div className="hidden md:flex items-center gap-4 flex-1 max-w-lg bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                            <Search size={20} className="text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search for skills, paths, or jobs..."
                                className="bg-transparent border-none outline-none w-full text-sm placeholder:text-slate-400"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="relative p-2 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-all">
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>

                            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                                <div className="hidden md:block text-right">
                                    <p className="text-sm font-semibold text-slate-900">{user?.name || 'User'}</p>
                                    <p className="text-xs text-slate-500">{user?.careerGoal || 'Student'}</p>
                                </div>
                                <div className="h-10 w-10 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white cursor-pointer transform hover:scale-105 transition-transform">
                                    {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-10">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
