import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    return (
        <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold text-primary tracking-tight">Career Path</Link>
                    </div>
                    <div className="hidden md:flex space-x-8 items-center">
                        <a href="#about" className="text-slate-600 hover:text-primary transition-colors font-medium">About</a>
                        <a href="#how-it-works" className="text-slate-600 hover:text-primary transition-colors font-medium">How It Works</a>
                        <a href="#features" className="text-slate-600 hover:text-primary transition-colors font-medium">Features</a>
                    </div>
                    <div className="hidden md:flex space-x-4 items-center">
                        {user ? (
                            <>
                                <Link to="/dashboard" className="flex items-center gap-1.5 px-4 py-2 text-primary font-semibold hover:bg-blue-50 rounded-lg transition-colors">
                                    <LayoutDashboard size={18} />
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-1.5 px-4 py-2 text-slate-600 font-medium hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="px-4 py-2 text-primary font-medium hover:bg-blue-50 rounded-lg transition-colors">Login</Link>
                                <Link to="/register" className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">Get Started</Link>
                            </>
                        )}
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-slate-900 focus:outline-none">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 absolute w-full">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg">
                        <a href="#about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-slate-600 hover:text-primary hover:bg-blue-50 rounded-md">About</a>
                        <a href="#how-it-works" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-slate-600 hover:text-primary hover:bg-blue-50 rounded-md">How It Works</a>
                        <a href="#features" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-slate-600 hover:text-primary hover:bg-blue-50 rounded-md">Features</a>
                        {user ? (
                            <>
                                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-primary font-medium hover:bg-blue-50 rounded-md">Dashboard</Link>
                                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-slate-600 hover:text-primary hover:bg-blue-50 rounded-md">Login</Link>
                                <Link to="/register" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-primary font-medium hover:bg-blue-50 rounded-md">Get Started</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
