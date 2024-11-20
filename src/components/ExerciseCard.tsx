import React from 'react';
import { Heart } from 'lucide-react';
import { useWorkoutStore } from '../store/workoutStore';

interface ExerciseCardProps {
  id: string;
  name: string;
  muscleGroup: string;
  instructions: string;
  imageUrl: string;
}

export function ExerciseCard({
  id,
  name,
  muscleGroup,
  instructions,
  imageUrl,
}: ExerciseCardProps) {
  const { favoriteExercises, addToFavorites, removeFromFavorites } = useWorkoutStore();
  const isFavorite = favoriteExercises.includes(id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{name}</h3>
          <button
            onClick={() => isFavorite ? removeFromFavorites(id) : addToFavorites(id)}
            className={`p-2 rounded-full ${
              isFavorite ? 'text-red-500' : 'text-gray-400'
            } hover:bg-gray-100`}
          >
            <Heart className="h-5 w-5" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        <span className="inline-block px-2 py-1 mt-2 text-sm bg-indigo-100 text-indigo-800 rounded">
          {muscleGroup}
        </span>
        <p className="mt-2 text-gray-600 text-sm line-clamp-3">{instructions}</p>
      </div>
    </div>
  );
}