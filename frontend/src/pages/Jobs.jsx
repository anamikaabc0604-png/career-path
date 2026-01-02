import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import {
    Briefcase,
    Bell,
    Search,
    Filter,
    MapPin,
    DollarSign,
    Clock,
    Zap,
    CheckCircle2,
    ArrowUpRight,
    SlidersHorizontal,
    Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_JOBS = [
    {
        id: 1,
        title: "Senior Full Stack Engineer",
        company: "TechNova Solutions",
        location: "Remote (San Francisco, CA)",
        salary: "$140k - $180k",
        type: "Full-time",
        posted: "2 hours ago",
        matchScore: 98,
        skills: ["React", "Node.js", "AWS", "TypeScript"],
        logo: "TN",
        color: "bg-blue-600"
    },
    {
        id: 2,
        title: "Product Designer",
        company: "CreativeFlow",
        location: "Hybrid (New York, NY)",
        salary: "$120k - $150k",
        type: "Full-time",
        posted: "5 hours ago",
        matchScore: 92,
        skills: ["Figma", "UI/UX", "User Research"],
        logo: "CF",
        color: "bg-purple-600"
    },
    {
        id: 3,
        title: "Backend Developer (Go)",
        company: "Streamline Systems",
        location: "Remote",
        salary: "$130k - $170k",
        type: "Contract",
        posted: "1 day ago",
        matchScore: 85,
        skills: ["Golang", "PostgreSQL", "Docker", "gRPC"],
        logo: "SS",
        color: "bg-emerald-600"
    },
    {
        id: 4,
        title: "Frontend Lead",
        company: "BrightPixel",
        location: "Austin, TX",
        salary: "$150k - $190k",
        type: "Full-time",
        posted: "3 days ago",
        matchScore: 78,
        skills: ["React", "Next.js", "Tailwind CSS", "Architecture"],
        logo: "BP",
        color: "bg-orange-600"
    },
    {
        id: 5,
        title: "DevOps Architect",
        company: "CloudScale",
        location: "Remote",
        salary: "$160k - $210k",
        type: "Full-time",
        posted: "1 week ago",
        matchScore: 72,
        skills: ["Kubernetes", "Terraform", "CI/CD", "Azure"],
        logo: "CS",
        color: "bg-indigo-600"
    }
];

const JobCard = ({ job }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:shadow-blue-500/5 transition-all group overflow-hidden relative"
    >
        <div className="absolute top-0 right-0 p-4">
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${job.matchScore >= 90 ? 'bg-emerald-50 text-emerald-600' :
                job.matchScore >= 80 ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-500'
                }`}>
                <Zap size={14} />
                {job.matchScore}% Match
            </div>
        </div>

        <div className="flex gap-4 mb-5">
            <div className={`w-14 h-14 ${job.color} rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg ring-4 ring-white`}>
                {job.logo}
            </div>
            <div>
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-primary transition-colors">{job.title}</h3>
                <p className="text-slate-500 font-medium flex items-center gap-1.5 text-sm">
                    {job.company}
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-primary hover:underline cursor-pointer">Follow</span>
                </p>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
                <MapPin size={16} className="text-slate-400" />
                {job.location}
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
                <DollarSign size={16} className="text-slate-400" />
                {job.salary}
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Clock size={16} className="text-slate-400" />
                {job.posted}
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Briefcase size={16} className="text-slate-400" />
                {job.type}
            </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
            {job.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-slate-50 border border-slate-100 text-slate-600 text-xs font-medium rounded-lg">
                    {skill}
                </span>
            ))}
        </div>

        <div className="flex items-center gap-3">
            <button className="flex-1 bg-primary text-white font-bold py-2.5 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group/btn">
                Apply Now
                <ArrowUpRight size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </button>
            <button className="p-3 bg-slate-50 text-slate-400 hover:text-primary hover:bg-blue-50 border border-slate-200 rounded-xl transition-all">
                <Star size={20} />
            </button>
        </div>
    </motion.div>
);

const Jobs = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isAlertActive, setIsAlertActive] = useState(true);
    const [showPreferences, setShowPreferences] = useState(false);

    const filteredJobs = MOCK_JOBS.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <DashboardLayout>
            <div className="space-y-8 pb-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Job Alerts</h1>
                        <p className="text-slate-500">Personalized career opportunities matched with your roadmap.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all cursor-pointer ${isAlertActive ? 'bg-blue-50 border-primary/20 text-primary' : 'bg-white border-slate-200 text-slate-400'
                            }`} onClick={() => setIsAlertActive(!isAlertActive)}>
                            <Bell size={18} className={isAlertActive ? 'fill-primary' : ''} />
                            <span className="font-bold text-sm">Alerts {isAlertActive ? 'On' : 'Off'}</span>
                        </div>
                        <button
                            onClick={() => setShowPreferences(true)}
                            className="bg-primary hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
                        >
                            <SlidersHorizontal size={18} />
                            Preferences
                        </button>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by job title, keyword, or company..."
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-700"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-50 transition-all text-sm">
                            <Filter size={18} className="text-slate-400" />
                            Filters
                        </button>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: 'Total Matches', value: '42', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { label: 'New Today', value: '8', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
                        { label: 'Saved Jobs', value: '15', icon: Star, color: 'text-purple-600', bg: 'bg-purple-50' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Jobs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    <AnimatePresence mode='popLayout'>
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => (
                                <JobCard key={job.id} job={job} />
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full py-20 text-center"
                            >
                                <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                                    <Search size={40} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No matching jobs found</h3>
                                <p className="text-slate-500">Try adjusting your filters or search query to find more results.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Preferences Modal */}
            <AnimatePresence>
                {showPreferences && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
                            onClick={() => setShowPreferences(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-3xl shadow-2xl z-[70] overflow-hidden"
                        >
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-bold text-slate-900">Alert Preferences</h2>
                                    <button
                                        onClick={() => setShowPreferences(false)}
                                        className="p-2 hover:bg-slate-100 rounded-lg transition-all text-slate-400"
                                    >
                                        <SlidersHorizontal size={20} />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-3">Frequency</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {['Daily', 'Weekly', 'Real-time'].map(freq => (
                                                <button key={freq} className={`py-2 px-4 rounded-xl border text-sm font-semibold transition-all ${freq === 'Daily' ? 'bg-primary text-white border-primary shadow-lg shadow-blue-500/20' : 'bg-white text-slate-600 border-slate-200 hover:border-primary/50'
                                                    }`}>
                                                    {freq}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-3">Job Type</label>
                                        <div className="flex flex-wrap gap-2">
                                            {['Full-time', 'Contract', 'Remote', 'Internship', 'Freelance'].map(type => (
                                                <button key={type} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-blue-50 hover:border-primary/30 transition-all">
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-3">Desired Salary (Min)</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                type="text"
                                                placeholder="e.g. 100,000"
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-slate-700 font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                                                <Zap size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">AI Matcher</p>
                                                <p className="text-xs text-slate-500">Only notify for {'>'}80% matches</p>
                                            </div>
                                        </div>
                                        <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 flex gap-3">
                                    <button
                                        onClick={() => setShowPreferences(false)}
                                        className="flex-1 px-6 py-3 bg-slate-50 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => setShowPreferences(false)}
                                        className="flex-1 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
};

export default Jobs;

