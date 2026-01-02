import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle2,
    Circle,
    ChevronRight,
    Star,
    BookOpen,
    Trophy,
    Clock,
    Target,
    Plus,
    X,
    Trash2
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { fetchUserInfo, fetchUserRoadmap, addRoadmapStep, updateRoadmapStepStatus, deleteRoadmapStep } from '../services/api';

const RoadmapStep = ({ step, isLast, index, onUpdateStatus, onDelete }) => {
    const statusColors = {
        completed: 'bg-green-500 border-green-200 text-white',
        'in-progress': 'bg-blue-500 border-blue-200 text-white shadow-lg shadow-blue-500/30',
        pending: 'bg-white border-slate-200 text-slate-400'
    };

    const topicsList = step.topics ? step.topics.split(',').map(t => t.trim()) : [];

    return (
        <div className="relative flex gap-6 pb-12 group">
            {/* Line connecting steps */}
            {!isLast && (
                <div className="absolute left-6 top-10 w-0.5 h-full bg-slate-200 group-hover:bg-primary/30 transition-colors" />
            )}

            {/* Icon/Indicator */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-4 ${statusColors[step.status] || statusColors.pending}`}
            >
                {step.status === 'completed' ? (
                    <CheckCircle2 size={24} />
                ) : step.status === 'in-progress' ? (
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                ) : (
                    <Circle size={24} />
                )}
            </motion.div>

            {/* Content */}
            <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.1 }}
                className="flex-grow bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group/card overflow-hidden"
            >
                <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
                    <div>
                        <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-md mb-2 inline-block ${step.status === 'completed' ? 'bg-green-50 text-green-600' :
                            step.status === 'in-progress' ? 'bg-blue-50 text-blue-600' :
                                'bg-slate-50 text-slate-500'
                            }`}>
                            Step {index + 1}: {step.status?.replace('-', ' ') || 'pending'}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                            <Clock size={16} />
                            <span>{step.duration || 'Flexible'}</span>
                        </div>
                        <button
                            onClick={() => onDelete(step.id)}
                            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover/card:opacity-100"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>

                <p className="text-slate-600 leading-relaxed mb-6">
                    {step.description}
                </p>

                <div className="flex flex-wrap gap-3">
                    {topicsList.map((topic, i) => (
                        <span key={i} className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-xs font-medium text-slate-600">
                            <Star size={12} className="text-yellow-500" />
                            {topic}
                        </span>
                    ))}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center">
                    <button className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                        <BookOpen size={18} />
                        View Resources
                    </button>
                    <div className="flex gap-3">
                        {step.status !== 'completed' && (
                            <button
                                onClick={() => onUpdateStatus(step.id, 'completed')}
                                className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-green-500/20 hover:bg-green-600 transition-all"
                            >
                                Mark as Done
                            </button>
                        )}
                        {step.status === 'pending' && (
                            <button
                                onClick={() => onUpdateStatus(step.id, 'in-progress')}
                                className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all"
                            >
                                Start Step
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const Roadmap = () => {
    const [user, setUser] = useState(null);
    const [steps, setSteps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [newStep, setNewStep] = useState({
        title: '',
        description: '',
        status: 'pending',
        duration: '',
        topics: ''
    });

    useEffect(() => {
        const loadUserAndRoadmap = async () => {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser && storedUser.email) {
                const userData = await fetchUserInfo(storedUser.email);
                if (userData) {
                    setUser(userData);
                    const roadmapData = await fetchUserRoadmap(userData.id);
                    setSteps(roadmapData);
                }
            }
            setLoading(false);
        };
        loadUserAndRoadmap();
    }, []);

    const handleAddStep = async (e) => {
        e.preventDefault();
        if (!newStep.title.trim()) return;

        setSubmitting(true);
        const addedStep = await addRoadmapStep(user.id, newStep);
        if (addedStep) {
            setSteps([...steps, addedStep]);
            setNewStep({
                title: '',
                description: '',
                status: 'pending',
                duration: '',
                topics: ''
            });
            setIsModalOpen(false);
        }
        setSubmitting(false);
    };

    const handleUpdateStatus = async (stepId, newStatus) => {
        const updated = await updateRoadmapStepStatus(stepId, newStatus);
        if (updated) {
            setSteps(steps.map(s => s.id === stepId ? { ...s, status: newStatus } : s));
        }
    };

    const handleDeleteStep = async (stepId) => {
        if (window.confirm("Are you sure you want to delete this step?")) {
            const success = await deleteRoadmapStep(stepId);
            if (success) {
                setSteps(steps.filter(s => s.id !== stepId));
            }
        }
    };

    const progress = steps.length > 0
        ? Math.round((steps.filter(s => s.status === 'completed').length / steps.length) * 100)
        : 0;

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Your Career Roadmap</h1>
                    <p className="text-slate-500 mt-2">Track your progress towards your career goal of <span className="font-bold text-primary">{user?.careerGoal || 'Full Stack Developer'}</span></p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all transform hover:scale-105"
                    >
                        <Plus size={20} />
                        Add Roadmap Step
                    </button>
                    <div className="hidden sm:flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="p-3 bg-blue-50 text-primary rounded-xl">
                            <Trophy size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Progress</p>
                            <p className="text-xl font-black text-slate-900">{progress}% <small className="text-slate-400 font-medium whitespace-nowrap">Done</small></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                {/* Roadmap Timeline */}
                <div className="xl:col-span-3">
                    <AnimatePresence>
                        {steps.map((step, index) => (
                            <RoadmapStep
                                key={step.id || index}
                                step={step}
                                index={index}
                                isLast={index === steps.length - 1}
                                onUpdateStatus={handleUpdateStatus}
                                onDelete={handleDeleteStep}
                            />
                        ))}
                    </AnimatePresence>

                    {steps.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                            <Target size={48} className="mx-auto text-slate-200 mb-4" />
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Build Your Future</h3>
                            <p className="text-slate-500 mb-8">Click the button above to start planning your career path step-by-step.</p>
                        </div>
                    )}
                </div>

                {/* Sidebar Info */}
                <div className="xl:col-span-1 space-y-6">
                    <div className="bg-gradient-to-br from-primary to-purple-600 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <Target size={32} className="mb-4 text-blue-200" />
                            <h3 className="text-lg font-bold mb-2">Goal: {user?.careerGoal || 'Success'}</h3>
                            <p className="text-blue-100 text-sm leading-relaxed mb-4">
                                You have completed {steps.filter(s => s.status === 'completed').length} out of {steps.length} steps.
                            </p>
                            <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="h-full bg-white rounded-full shadow-sm"
                                />
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Star size={18} className="text-primary" /> Roadmap Summary
                        </h3>
                        <div className="space-y-4 text-sm font-medium">
                            <div className="flex justify-between items-center text-green-600">
                                <span>Completed</span>
                                <span>{steps.filter(s => s.status === 'completed').length}</span>
                            </div>
                            <div className="flex justify-between items-center text-blue-500">
                                <span>In Progress</span>
                                <span>{steps.filter(s => s.status === 'in-progress').length}</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-400">
                                <span>To Do</span>
                                <span>{steps.filter(s => s.status === 'pending').length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Step Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <h3 className="text-xl font-bold text-slate-900">New Roadmap Step</h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                                >
                                    <X size={20} className="text-slate-500" />
                                </button>
                            </div>
                            <form onSubmit={handleAddStep} className="p-8 space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={newStep.title}
                                        onChange={(e) => setNewStep({ ...newStep, title: e.target.value })}
                                        placeholder="e.g. Master React Hooks"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Duration</label>
                                        <input
                                            type="text"
                                            value={newStep.duration}
                                            onChange={(e) => setNewStep({ ...newStep, duration: e.target.value })}
                                            placeholder="e.g. 2 weeks"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Initial Status</label>
                                        <select
                                            value={newStep.status}
                                            onChange={(e) => setNewStep({ ...newStep, status: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none bg-white font-medium"
                                        >
                                            <option value="pending">To Do</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Topics (comma separated)</label>
                                    <input
                                        type="text"
                                        value={newStep.topics}
                                        onChange={(e) => setNewStep({ ...newStep, topics: e.target.value })}
                                        placeholder="e.g. useEffect, useState, custom hooks"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                                    <textarea
                                        value={newStep.description}
                                        onChange={(e) => setNewStep({ ...newStep, description: e.target.value })}
                                        placeholder="Describe what you want to achieve..."
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none h-24"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
                                >
                                    {submitting ? 'Adding...' : 'Create Step'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
};

export default Roadmap;
