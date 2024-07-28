"use client";

import React, { useState } from "react";
import {
  UsersIcon,
  CalendarIcon,
  MapPinIcon,
  AcademicCapIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }
    console.log("Email submitted:", email);
    setIsSubmitted(true);
    setError("");
  };

  const features = [
    { icon: UsersIcon, text: "Interest-based Matching" },
    { icon: CalendarIcon, text: "Smart Scheduling" },
    { icon: MapPinIcon, text: "Safe Public Venues" },
    { icon: AcademicCapIcon, text: "Skill Level Pairing" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <h1 className="text-3xl font-bold">Sigma</h1>
          <a
            href="#"
            className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-opacity-90 transition duration-300"
          >
            Sign In
          </a>
        </nav>

        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 mr-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Meet new people in the real world.
            </h2>
            <p className="text-xl mb-8">
              Welcome to Sigma, the app that makes it easy to connect with
              others who share your passions. Whether you`re a beginner or a
              pro, Sigma helps you find genuine, like-minded individuals. Create
              your profile, share your interests, and start making real
              connections today.
            </p>
            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="relative flex-grow">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for early access"
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
                >
                  Join Waitlist
                </button>
              </form>
            ) : (
              <div
                className="bg-green-500 text-white p-4 rounded-lg"
                role="alert"
              >
                <p className="font-bold">Success!</p>
                <p>You`re on the list! We`ll notify you when Sigma launches.</p>
              </div>
            )}
            {error && <p className="text-red-300 mt-2">{error}</p>}
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-6">
            {features.map((Feature, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-lg"
              >
                <Feature.icon className="h-12 w-12 mb-4 text-white" />
                <h3 className="text-xl font-semibold mb-2">{Feature.text}</h3>
                <p className="text-sm text-gray-200">
                  Experience the power of real connections with Sigma`s smart
                  features.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
