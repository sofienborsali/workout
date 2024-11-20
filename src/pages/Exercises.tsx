import React, { useState } from "react";
import { ExerciseCard } from "../components/ExerciseCard";
import { ExerciseFilter } from "../components/ExerciseFilter";

const MUSCLE_GROUPS = [
  "Chest",
  "Back",
  "Shoulders",
  "Arms",
  "Legs",
  "Core",
  "Full Body",
];

const SAMPLE_EXERCISES = [
  {
    id: "1",
    name: "Bench Press",
    muscleGroup: "Chest",
    instructions:
      "Lie on a flat bench, grip the barbell with hands slightly wider than shoulder-width, lower the bar to your chest, and press back up.",
    imageUrl:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    name: "Deadlift",
    muscleGroup: "Back",
    instructions:
      "Stand with feet hip-width apart, bend down to grip the barbell, keep your back straight, and lift by extending your hips and knees.",
    imageUrl:
      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    name: "Deadlift",
    muscleGroup: "Back",
    instructions:
      "Stand with feet hip-width apart, bend down to grip the barbell, keep your back straight, and lift by extending your hips and knees.",
    imageUrl:
      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    name: "Deadlift",
    muscleGroup: "Back",
    instructions:
      "Stand with feet hip-width apart, bend down to grip the barbell, keep your back straight, and lift by extending your hips and knees.",
    imageUrl:
      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5",
    name: "Deadlift",
    muscleGroup: "Back",
    instructions:
      "Stand with feet hip-width apart, bend down to grip the barbell, keep your back straight, and lift by extending your hips and knees.",
    imageUrl:
      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "6",
    name: "Deadlift",
    muscleGroup: "Back",
    instructions:
      "Stand with feet hip-width apart, bend down to grip the barbell, keep your back straight, and lift by extending your hips and knees.",
    imageUrl:
      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "7",
    name: "Deadlift",
    muscleGroup: "Back",
    instructions:
      "Stand with feet hip-width apart, bend down to grip the barbell, keep your back straight, and lift by extending your hips and knees.",
    imageUrl:
      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "8",
    name: "Deadlift",
    muscleGroup: "Back",
    instructions:
      "Stand with feet hip-width apart, bend down to grip the barbell, keep your back straight, and lift by extending your hips and knees.",
    imageUrl:
      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "9",
    name: "Deadlift",
    muscleGroup: "Back",
    instructions:
      "Stand with feet hip-width apart, bend down to grip the barbell, keep your back straight, and lift by extending your hips and knees.",
    imageUrl:
      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  // Add more exercises as needed
];

export function Exercises() {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExercises = SAMPLE_EXERCISES.filter((exercise) => {
    const matchesMuscleGroup =
      selectedMuscleGroup === "" ||
      exercise.muscleGroup === selectedMuscleGroup;
    const matchesSearch = exercise.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesMuscleGroup && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Exercise Library</h1>
      <ExerciseFilter
        muscleGroups={MUSCLE_GROUPS}
        selectedMuscleGroup={selectedMuscleGroup}
        searchQuery={searchQuery}
        onMuscleGroupChange={setSelectedMuscleGroup}
        onSearchChange={setSearchQuery}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} {...exercise} />
        ))}
      </div>
    </div>
  );
}
