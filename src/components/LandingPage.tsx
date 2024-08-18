"use client";

import React, { useState } from "react";
import {
  UsersIcon,
  CalendarIcon,
  MapPinIcon,
  AcademicCapIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import LandingCarousel from "./LandingCarousel";
import { set } from "mongoose";
import Spinner from "./Spinner";

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to join waitlist");
      }

      setIsLoading(false);
      setIsSubmitted(true);
      setError("");
    } catch (error: any) {
      setIsLoading(false);
      console.error("Error:", error);
      setError(error.message || "Failed to join waitlist. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <h1 className="text-3xl font-bold">Sigma</h1>
          <button className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-300">
            Sign In
          </button>
        </nav>

        <div className="flex justify-center items-center w-full">
          <div className="lg:w-1/2 mb-10 lg:mb-0 mx-16 text-center">
            <LandingCarousel />
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
                  disabled={isLoading}
                  className="flex bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300 min-w-32 justify-center"
                >
                  {isLoading ? <Spinner /> : "Join Waitlist"}
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
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
