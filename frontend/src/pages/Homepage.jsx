import React from 'react';
import { Link } from 'react-router-dom';
//import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, User, TrendingUp, Compass, Shield, BarChart3, Target } from 'lucide-react';
import heroImage from '../assets/hero-image.png';

const Homepage = () => {
    return (
        <div className="pt-16"> {/* Add padding top for fixed navbar */}

            {/* 1. Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:w-1/2 text-center lg:text-left"
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
                                Navigate Your Career with <span className="text-primary">Confidence</span>
                            </h1>
                            <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
                                Discover your strengths, track your skills, and get guided career paths tailored just for you.
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link to="/register" className="px-8 py-4 bg-primary text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
                                    Get Started <ArrowRight size={20} />
                                </Link>
                                <Link to="/login" className="px-8 py-4 bg-white text-slate-700 text-lg font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center">
                                    Login
                                </Link>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:w-1/2"
                        >
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl opacity-30 blur-2xl animate-pulse"></div>
                                <img src={heroImage} alt="Career Roadmap" className="relative rounded-2xl shadow-2xl border border-slate-100 w-full" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. About Section */}
            <section id="about" className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">About the Platform</h2>
                    <p className="text-xl text-slate-600 leading-relaxed mb-8">
                        Smart Career Path Navigator helps students and early professionals assess their skills, track progress, and explore career paths aligned with industry needs.
                    </p>
                    <button className="px-6 py-3 text-primary font-medium border border-primary rounded-lg hover:bg-blue-50 transition-colors">
                        Learn More
                    </button>
                </div>
            </section>

            {/* 3. How It Works */}
            <section id="how-it-works" className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
                        <p className="mt-4 text-slate-600">Start your journey in 3 simple steps</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <User size={40} />, title: "Create Your Profile", desc: "Sign up and securely log in. Build your career profile." },
                            { icon: <BarChart3 size={40} />, title: "Add Your Skills", desc: "Add skills like Java, React, SQL. Choose skill level." },
                            { icon: <Compass size={40} />, title: "Get Career Guidance", desc: "Explore suitable career paths. Identify skill gaps." }
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center"
                            >
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-primary mb-6">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Step {index + 1}: {step.title}</h3>
                                <p className="text-slate-600">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Features Section */}
            <section id="features" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">Key Features</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <Shield className="text-green-500" />, title: "Secure Authentication", desc: "JWT-based login system" },
                            { icon: <TrendingUp className="text-blue-500" />, title: "Skill Tracking", desc: "Monitor growth over time" },
                            { icon: <Compass className="text-purple-500" />, title: "Path Suggestions", desc: "Data-driven recommendations" },
                            { icon: <Target className="text-red-500" />, title: "Personalized Dashboard", desc: "Skills + career roadmap" }
                        ].map((feature, i) => (
                            <div key={i} className="p-6 border border-slate-100 rounded-xl hover:shadow-lg transition-shadow bg-slate-50/50">
                                <div className="mb-4">{feature.icon}</div>
                                <h4 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h4>
                                <p className="text-slate-600 text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Why Choose Us */}
            <section className="py-20 bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
                            <ul className="space-y-4">
                                {[
                                    "Beginner-friendly platform",
                                    "Real-world skill mapping",
                                    "Built for students & freshers",
                                    "Simple, fast, and secure"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircle className="text-green-400" size={20} />
                                        <span className="text-lg text-slate-200">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="md:w-1/2 bg-slate-800 p-8 rounded-2xl border border-slate-700">
                            {/* Decorative content */}
                            <div className="space-y-4 opacity-75">
                                <div className="h-4 bg-slate-600 rounded w-3/4"></div>
                                <div className="h-4 bg-slate-600 rounded w-1/2"></div>
                                <div className="h-4 bg-slate-600 rounded w-full"></div>
                                <div className="h-4 bg-slate-600 rounded w-5/6"></div>
                            </div>
                            <div className="mt-6 text-center text-slate-400">
                                <p>Students love the clarity we provide.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. CTA */}
            <section className="py-24 bg-primary">
                <div className="max-w-4xl mx-auto px-4 text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">Your career deserves a clear path.</h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register" className="px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-xl hover:bg-slate-50 transition-colors">Start Your Journey</Link>
                        <Link to="/register" className="px-8 py-4 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-colors">Create Free Account</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Homepage;
