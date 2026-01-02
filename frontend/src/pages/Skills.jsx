import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Award, BookOpen, TrendingUp, Save, X } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { fetchUserInfo, fetchUserSkills, addSkill, updateSkillLevel } from '../services/api';

const Skills = () => {
    const [user, setUser] = useState(null);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newSkill, setNewSkill] = useState({ name: '', level: '', category: '' });
    const [submitting, setSubmitting] = useState(false);

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
                const skillsData = await fetchUserSkills(userData.id);
                setSkills(skillsData);
            }
            setLoading(false);
        };
        loadData();
    }, []);

    const handleUpdateLevel = async (skillId, newLevel) => {
        try {
            const updatedSkill = await updateSkillLevel(skillId, newLevel);
            if (updatedSkill) {
                setSkills(skills.map(s => s.id === skillId ? updatedSkill : s));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Update failed:", error);
            return false;
        }
    };

    const handleAddSkill = async (e) => {
        e.preventDefault();
        if (!newSkill.name.trim() || !newSkill.category || !newSkill.level) {
            alert("Please fill in all fields");
            return;
        }

        setSubmitting(true);
        const addedSkill = await addSkill(user.id, newSkill);
        if (addedSkill) {
            setSkills([...skills, addedSkill]);
            setNewSkill({ name: '', level: '', category: '' });
            setIsModalOpen(false);
        }
        setSubmitting(false);
    };

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
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900">My Skills</h1>
                    <p className="text-slate-500 mt-2">Manage and track your professional expertise.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all transform hover:scale-105"
                >
                    <Plus size={20} />
                    Add New Skill
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Skills Stats */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <TrendingUp size={18} className="text-primary" /> Skill Proficiency
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs font-medium mb-1.5">
                                    <span className="text-slate-500">Advanced</span>
                                    <span className="text-primary font-bold">
                                        {skills.filter(s => s.level === 'Advanced').length}
                                    </span>
                                </div>
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(skills.filter(s => s.level === 'Advanced').length / Math.max(skills.length, 1)) * 100}%` }}
                                        className="h-full bg-primary"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-medium mb-1.5">
                                    <span className="text-slate-500">Intermediate</span>
                                    <span className="text-blue-400 font-bold">
                                        {skills.filter(s => s.level === 'Intermediate').length}
                                    </span>
                                </div>
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(skills.filter(s => s.level === 'Intermediate').length / Math.max(skills.length, 1)) * 100}%` }}
                                        className="h-full bg-blue-400"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-medium mb-1.5">
                                    <span className="text-slate-500">Beginner</span>
                                    <span className="text-blue-300 font-bold">
                                        {skills.filter(s => s.level === 'Beginner').length}
                                    </span>
                                </div>
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(skills.filter(s => s.level === 'Beginner').length / Math.max(skills.length, 1)) * 100}%` }}
                                        className="h-full bg-blue-200"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary to-blue-700 p-6 rounded-2xl text-white shadow-xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <Award className="mb-4 text-blue-200 group-hover:scale-110 transition-transform" size={32} />
                            <h3 className="text-lg font-bold mb-2">Keep Growing!</h3>
                            <p className="text-blue-100 text-sm leading-relaxed">
                                Add more skills to your profile to unlock new career roadmap suggestions and stand out to employers.
                            </p>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    </div>
                </div>

                {/* Skills Grid */}
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <AnimatePresence>
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={skill.id || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className={`p-2 rounded-lg ${skill.category === 'Frontend' ? 'bg-orange-50 text-orange-500' :
                                            skill.category === 'Backend' ? 'bg-blue-50 text-blue-500' :
                                                'bg-purple-50 text-purple-500'
                                            }`}>
                                            <BookOpen size={20} />
                                        </div>
                                        <select
                                            value={skill.level}
                                            onChange={async (e) => {
                                                const newLevel = e.target.value;
                                                const success = await handleUpdateLevel(skill.id, newLevel);
                                                if (!success) {
                                                    alert("Failed to update skill level. Please try again.");
                                                }
                                            }}
                                            className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border focus:ring-2 focus:ring-primary/20 cursor-pointer text-center transition-all ${skill.level === 'Advanced' ? 'bg-green-50 text-green-600 border-green-200' :
                                                skill.level === 'Intermediate' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                                                    'bg-slate-50 text-slate-500 border-slate-200'
                                                }`}
                                        >
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Advanced">Advanced</option>
                                        </select>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800">{skill.name}</h3>
                                    <p className="text-sm text-slate-500 mt-1">{skill.category}</p>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {skills.length === 0 && !loading && (
                            <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
                                <Plus size={48} className="mb-4 opacity-20" />
                                <p className="font-medium text-lg text-slate-500">No skills added yet</p>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="mt-4 text-primary font-semibold hover:underline"
                                >
                                    Click here to add your first skill
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Skill Modal */}
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
                            className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <h3 className="text-xl font-bold text-slate-900">Add New Skill</h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                                >
                                    <X size={20} className="text-slate-500" />
                                </button>
                            </div>
                            <form onSubmit={handleAddSkill} className="p-8 space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Skill Name</label>
                                    <input
                                        type="text"
                                        value={newSkill.name}
                                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                                        placeholder="e.g. Docker, Python, AWS"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                                        <select
                                            value={newSkill.category}
                                            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none bg-white font-medium"
                                        >
                                            <option value="" disabled>Select Category</option>
                                            <option value="Frontend">Frontend</option>
                                            <option value="Backend">Backend</option>
                                            <option value="Programming Languages">Programming Languages</option>
                                            <option value="Database">Database</option>
                                            <option value="DevOps">DevOps</option>
                                            <option value="Tools">Tools</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Proficiency</label>
                                        <select
                                            value={newSkill.level}
                                            onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none bg-white font-medium"
                                        >
                                            <option value="" disabled>Select Proficiency</option>
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Advanced">Advanced</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="pt-4 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="flex-1 px-4 py-3 rounded-xl bg-primary text-white font-extrabold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {submitting ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Save size={18} />
                                                Save Skill
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
};

export default Skills;
