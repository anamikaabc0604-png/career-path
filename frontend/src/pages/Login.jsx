import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { loginUser } from "../services/api";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser(email, password);

            if (response.ok) {
                const userData = await response.json();
                localStorage.setItem("user", JSON.stringify(userData));
                alert("Login successful!");
                navigate("/dashboard");
            } else {
                const errorData = await response.text();
                alert("Login failed: " + errorData);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Login failed. Please check if the backend is running.");
        }
    };


    return (
        <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-10"
            >
                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900">
                        Welcome Back 👋
                    </h1>
                    <p className="mt-2 text-slate-600">
                        Login to continue your career journey
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                    >
                        Login <ArrowRight size={18} />
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-slate-600">
                    Don’t have an account?{" "}
                    <Link
                        to="/register"
                        className="text-primary font-semibold hover:underline"
                    >
                        Create one
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
