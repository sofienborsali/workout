import React from 'react';
import { Search } from 'lucide-react';

interface ExerciseFilterProps {
  muscleGroups: string[];
  selectedMuscleGroup: string;
  searchQuery: string;
  onMuscleGroupChange: (group: string) => void;
  onSearchChange: (query: string) => void;
}

export function ExerciseFilter({
  muscleGroups,
  selectedMuscleGroup,
  searchQuery,
  onMuscleGroupChange,
  onSearchChange,
}: ExerciseFilterProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search exercises..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">Muscle Groups</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onMuscleGroupChange('')}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedMuscleGroup === ''
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {muscleGroups.map((group) => (
            <button
              key={group}
              onClick={() => onMuscleGroupChange(group)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedMuscleGroup === group
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {group}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}