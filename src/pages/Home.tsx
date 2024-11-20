import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Calendar, LineChart } from 'lucide-react';

export function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
          Transform Your Fitness Journey
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          Track your workouts, discover new exercises, and achieve your fitness goals
          with our comprehensive fitness tracking platform.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-500"
          >
            Get Started
          </Link>
          <Link
            to="/exercises"
            className="bg-white text-indigo-600 px-6 py-3 rounded-md font-medium border border-indigo-600 hover:bg-indigo-50"
          >
            Browse Exercises
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Dumbbell className="h-12 w-12 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Exercise Library</h3>
          <p className="text-gray-600">
            Access our comprehensive database of exercises with detailed instructions
            and proper form guides.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Calendar className="h-12 w-12 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Workout Planner</h3>
          <p className="text-gray-600">
            Create and schedule custom workout routines tailored to your fitness goals.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <LineChart className="h-12 w-12 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
          <p className="text-gray-600">
            Monitor your fitness journey with detailed progress tracking and analytics.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md p-8 mt-16">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
          alt="Fitness Training"
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="text-gray-600 mb-6">
          Join thousands of users who have transformed their fitness routine with
          our platform. Get access to premium features and start tracking your
          progress today.
        </p>
        <Link
          to="/register"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-500"
        >
          Sign Up Now
        </Link>
      </section>
    </div>
  );
}