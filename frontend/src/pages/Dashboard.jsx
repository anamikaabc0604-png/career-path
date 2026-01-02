import React, { useEffect, useState } from 'react';
//import { motion } from 'framer-motion';
import {
    ArrowRight,
    CheckCircle,
    Clock,
    Target,
    TrendingUp,
    Award,
    BookOpen,
    AlertCircle,
    Plus,
    ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { fetchUserInfo, fetchUserSkills, fetchUserRoadmap } from '../services/api';

const Widget = ({ title, children, className = "" }) => (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-100 ${className}`}>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            {title}
        </h3>
        {children}
    </div>
);

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [skills, setSkills] = useState([]);
    const [roadmap, setRoadmap] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (!storedUser || !storedUser.email) {
                setLoading(false);
                return;
            }

            const userData = await fetchUserInfo(storedUser.email);

            if (userData) {
                setUser(userData);
                const [skillsData, roadmapData] = await Promise.all([
                    fetchUserSkills(userData.id),
                    fetchUserRoadmap(userData.id)
                ]);
                setSkills(skillsData);
                setRoadmap(roadmapData);
            }
            setLoading(false);
        };

        loadData();
    }, []);

    const progress = roadmap.length > 0
        ? Math.round((roadmap.filter(s => s.status === 'completed').length / roadmap.length) * 100)
        : 0;

    const currentFocus = roadmap.find(s => s.status === 'in-progress') || roadmap.find(s => s.status === 'pending');

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                    Welcome back, {user ? user.name.split(' ')[0] : 'Student'}! 👋
                </h1>
                <p className="text-slate-500 mt-2">Personalized tracking for your <span className="text-primary font-bold">{user?.careerGoal}</span> journey.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* 1. Career Roadmap Progress */}
                <Widget title={<><Target size={20} className="text-primary" /> Roadmap Progress</>} className="md:col-span-2">
                    <div className="relative py-4">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm font-medium text-slate-500">Tasks Completed</span>
                            <span className="text-sm font-bold text-primary">{progress}% Overall</span>
                        </div>

                        {roadmap.length > 0 ? (
                            <div className="space-y-6">
                                <div className="flex items-center w-full gap-2">
                                    {roadmap.slice(0, 5).map((step, idx) => (
                                        <div key={idx} className="flex-1 h-2 rounded-full overflow-hidden bg-slate-100">
                                            <div className={`h-full transition-all duration-500 ${step.status === 'completed' ? 'bg-green-500' :
                                                    step.status === 'in-progress' ? 'bg-primary animate-pulse' :
                                                        'bg-slate-200'
                                                }`} />
                                        </div>
                                    ))}
                                </div>

                                {currentFocus ? (
                                    <div className="bg-blue-50 p-5 rounded-2xl flex items-start gap-4 border border-blue-100">
                                        <div className="p-3 bg-white rounded-xl shadow-sm text-primary">
                                            <BookOpen size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-slate-900">Active: {currentFocus.title}</h4>
                                            <p className="text-sm text-slate-600 mt-1 line-clamp-2">{currentFocus.description}</p>
                                            <Link to="/dashboard/roadmap" className="inline-flex items-center gap-1 text-sm text-primary font-bold mt-3 hover:underline">
                                                Go to Roadmap <ChevronRight size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-slate-50 p-5 rounded-2xl text-center border border-dashed border-slate-200">
                                        <p className="text-slate-500 text-sm">All set! No active roadmap tasks.</p>
                                        <Link to="/dashboard/roadmap" className="text-primary text-sm font-bold mt-2 inline-block">+ Add Next Step</Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                <p className="text-slate-500 mb-4">You haven't built your roadmap yet.</p>
                                <Link to="/dashboard/roadmap" className="px-6 py-2 bg-primary text-white rounded-xl font-bold shadow-lg shadow-blue-500/20">
                                    Start Building
                                </Link>
                            </div>
                        )}
                    </div>
                </Widget>

                {/* 2. Achievements */}
                <Widget title={<><Award size={20} className="text-yellow-500" /> Milestones</>}>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-3 bg-yellow-50/50 rounded-2xl border border-yellow-100">
                            <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center text-xl">🏆</div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm">Getting Started</h4>
                                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Profile Created</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 opacity-60">
                            <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-xl grayscale">🎯</div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm">Fast Learner</h4>
                                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Finish 3 Steps</p>
                            </div>
                        </div>
                    </div>
                </Widget>

                {/* 3. Skill Tracker */}
                <Widget title={<><TrendingUp size={20} className="text-green-500" /> My Skills</>} className="md:col-span-1 lg:col-span-2">
                    {skills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, i) => (
                                <Link to="/dashboard/skills" key={i} className="px-3 py-1.5 rounded-full text-xs font-semibold border bg-blue-50 text-primary border-blue-100 hover:bg-primary hover:text-white transition-all">
                                    {skill.name} • {skill.level}
                                </Link>
                            ))}
                            <Link to="/dashboard/skills" className="px-3 py-1.5 rounded-full text-xs font-medium border border-dashed border-slate-300 text-slate-400 hover:text-primary hover:border-primary transition-colors">
                                + Add More
                            </Link>
                        </div>
                    ) : (
                        <div className="text-center py-6 text-slate-500">
                            <p className="text-sm">No skills added yet.</p>
                            <Link to="/dashboard/skills" className="mt-2 text-primary text-sm font-bold hover:underline">Add your first skill</Link>
                        </div>
                    )}
                </Widget>

                {/* 4. Quick Actions */}
                <Widget title={<><Clock size={20} className="text-orange-500" /> Quick Stats</>}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-2xl text-center">
                            <p className="text-2xl font-black text-slate-900">{skills.length}</p>
                            <p className="text-[10px] text-slate-500 uppercase font-bold">Skills</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl text-center">
                            <p className="text-2xl font-black text-slate-900">{roadmap.length}</p>
                            <p className="text-[10px] text-slate-500 uppercase font-bold">Steps</p>
                        </div>
                    </div>
                </Widget>

            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
