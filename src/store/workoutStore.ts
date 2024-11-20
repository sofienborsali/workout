import { create } from 'zustand';

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  instructions: string;
  imageUrl: string;
}

interface WorkoutPlan {
  id: string;
  name: string;
  exercises: Exercise[];
  scheduledDate: Date;
}

interface WorkoutState {
  exercises: Exercise[];
  favoriteExercises: string[];
  workoutPlans: WorkoutPlan[];
  addToFavorites: (exerciseId: string) => void;
  removeFromFavorites: (exerciseId: string) => void;
  createWorkoutPlan: (plan: WorkoutPlan) => void;
}

export const useWorkoutStore = create<WorkoutState>((set) => ({
  exercises: [],
  favoriteExercises: [],
  workoutPlans: [],
  addToFavorites: (exerciseId) =>
    set((state) => ({
      favoriteExercises: [...state.favoriteExercises, exerciseId],
    })),
  removeFromFavorites: (exerciseId) =>
    set((state) => ({
      favoriteExercises: state.favoriteExercises.filter((id) => id !== exerciseId),
    })),
  createWorkoutPlan: (plan) =>
    set((state) => ({
      workoutPlans: [...state.workoutPlans, plan],
    })),
}));