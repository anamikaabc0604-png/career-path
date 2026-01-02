import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <span className="text-2xl font-bold text-white tracking-tight">Career Path</span>
                        <p className="mt-4 text-slate-400 max-w-xs">
                            Navigate your career with confidence. Smart tools for students and professionals.
                        </p>
                        <div className="mt-4 text-sm text-slate-500">
                            Tech stack: React | Spring Boot | MySQL
                        </div>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-4">Platform</h3>
                        <ul className="space-y-2">
                            <li><a href="#about" className="hover:text-blue-400 transition-colors">About</a></li>
                            <li><a href="#features" className="hover:text-blue-400 transition-colors">Features</a></li>
                            <li><a href="#how-it-works" className="hover:text-blue-400 transition-colors">How It Works</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-4">Account</h3>
                        <ul className="space-y-2">
                            <li><Link to="/login" className="hover:text-blue-400 transition-colors">Login</Link></li>
                            <li><Link to="/register" className="hover:text-blue-400 transition-colors">Register</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} Career Path Navigator. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
