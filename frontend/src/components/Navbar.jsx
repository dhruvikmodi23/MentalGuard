import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
    const { isAuthenticated, isAdmin, logout, user } = useContext(AuthContext);

    return (
        <nav className="bg-blue-900 text-white py-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between px-6">
                <NavLink to="/" className="text-xl font-bold">
                    MentalGuard
                </NavLink>
                <div className="flex items-center space-x-6">
                    <NavLink to="/" className="hover:text-teal-400">Home</NavLink>
                    <NavLink to="/about" className="hover:text-teal-400">About</NavLink>
                    <NavLink to="/blog" className="hover:text-teal-400">Blog</NavLink>
                    {isAdmin ? (
                        <NavLink to="/admin/contact" className="hover:text-teal-400">
                            Contact Dashboard
                        </NavLink>
                    ) : (
                        <NavLink to="/contact" className="hover:text-teal-400">
                            Contact
                        </NavLink>
                    )}
                    {isAuthenticated ? (
                        <>
                            {!isAdmin && (
                                <NavLink to="/appointments" className="hover:text-teal-400">
                                    Appointments
                                </NavLink>
                            )}
                            {!isAdmin && (
                                <NavLink to="/chat" className="hover:text-teal-400">
                                    Chat
                                </NavLink>
                            )}
                            <NavLink to="/counseling" className="hover:text-teal-400">
                                Counseling
                            </NavLink>
                            <NavLink to="/workshops" className="hover:text-teal-400">
                                Workshops
                            </NavLink>
                            <NavLink to="/video" className="hover:text-teal-400">
                                Videocall
                            </NavLink>
                            
                            {isAdmin ? (
                                <NavLink to="/admin/dashboard" className="hover:text-teal-400">
                                    Admin Portal
                                </NavLink>
                            ) : (
                                <NavLink to="/user/dashboard" className="hover:text-teal-400">
                                    MyAppointments
                                </NavLink>
                            )}
                            {isAdmin ? (
                                <NavLink to="/admin/question" className="hover:text-teal-400">
                                    Question
                                </NavLink>
                            ) : (
                                <NavLink to="/user/test" className="hover:text-teal-400">
                                    Test
                                </NavLink>
                            )}
                            <button
                                onClick={() => {
                                    logout();
                                    window.location.href = "/login";
                                }}
                                className="hover:text-teal-400"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="hover:text-teal-400">
                                Login
                            </NavLink>
                            <NavLink to="/register" className="hover:text-teal-400">
                                Register
                            </NavLink>
                        </>
                    )}
                </div>
                {isAuthenticated && user && (
                    <NavLink to="/profile">
                        <div className="flex items-center space-x-2">
                            <img
                                src="/avatar.png"
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full"
                            />
                            <span className="font-medium">{user.name}</span>
                        </div>
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default NavigationBar;