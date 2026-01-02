import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Settings as SettingsIcon, User, Lock, Bell, Shield } from 'lucide-react';

const Settings = () => {
    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-2">
                    {[
                        { icon: User, label: 'Profile' },
                        { icon: Lock, label: 'Security' },
                        { icon: Bell, label: 'Notifications' },
                        { icon: Shield, label: 'Privacy' },
                    ].map((item, i) => (
                        <button key={i} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium transition-all ${i === 0 ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
                            <item.icon size={20} />
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className="md:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Profile Information</h2>
                    <div className="space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="h-20 w-20 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold">AS</div>
                            <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">Change Avatar</button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                                <input type="text" defaultValue="Anamika Singh" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                <input type="email" defaultValue="anamika@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Bio</label>
                            <textarea defaultValue="Passionate developer looking to build the next big thing." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none h-32"></textarea>
                        </div>

                        <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
