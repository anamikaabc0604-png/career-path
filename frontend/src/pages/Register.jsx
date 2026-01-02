import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        careerGoal: "Full Stack Developer",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await registerUser(formData);

            if (response.ok) {
                alert("Registered successfully!");
                navigate("/login");
            } else {
                const errorData = await response.text();
                alert("Registration failed: " + errorData);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Registration failed. Please check if the backend is running.");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-20">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
                <h2 className="text-3xl font-bold text-center text-slate-900 mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-600">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-600">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-600">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-600">
                            Career Goal
                        </label>
                        <select
                            name="careerGoal"
                            value={formData.careerGoal}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium bg-white"
                        >
                            <option value="Full Stack Developer">Full Stack Developer</option>
                            <option value="Data Scientist">Data Scientist</option>
                            <option value="DevOps Engineer">DevOps Engineer</option>
                            <option value="Product Manager">Product Manager</option>
                            <option value="UI/UX Designer">UI/UX Designer</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/20"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-slate-600 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
