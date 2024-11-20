import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function Navbar() {
  const { user, signOut } = useAuthStore();

  return (
    <nav className="bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8" />
            <span className="font-bold text-xl">FitTrack</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/exercises" className="hover:text-indigo-200">Exercises</Link>
                <Link to="/planner" className="hover:text-indigo-200">Workout Planner</Link>
                <Link to="/profile" className="hover:text-indigo-200">
                  <User className="h-6 w-6" />
                </Link>
                <button
                  onClick={() => signOut()}
                  className="hover:text-indigo-200"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-indigo-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-500 px-4 py-2 rounded-md font-medium hover:bg-indigo-400"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}