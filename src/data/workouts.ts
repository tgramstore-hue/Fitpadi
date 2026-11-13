export interface WorkoutExercise {
  id: string;
  name: string;
  videoUrl: string;
  targetMuscle: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationSeconds: number;
}

export const WORKOUT_LIBRARY: WorkoutExercise[] = [
  {
    id: 'push-ups',
    name: 'Push-Ups',
    videoUrl: '/workouts/push-ups.mp4',
    targetMuscle: 'Chest, Triceps, Shoulders',
    difficulty: 'Beginner',
    durationSeconds: 40,
  },
  {
    id: 'squats',
    name: 'Squats',
    videoUrl: '/workouts/squats.mp4',
    targetMuscle: 'Quads, Glutes, Hamstrings',
    difficulty: 'Beginner',
    durationSeconds: 40,
  },
  {
    id: 'plank',
    name: 'Plank',
    videoUrl: '/workouts/plank.mp4',
    targetMuscle: 'Core, Shoulders',
    difficulty: 'Beginner',
    durationSeconds: 30,
  },
  {
    id: 'lunges',
    name: 'Lunges',
    videoUrl: '/workouts/lunges.mp4',
    targetMuscle: 'Quads, Glutes, Hamstrings',
    difficulty: 'Beginner',
    durationSeconds: 40,
  },
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    videoUrl: '/workouts/jumping-jacks.mp4',
    targetMuscle: 'Full Body, Cardio',
    difficulty: 'Beginner',
    durationSeconds: 40,
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    videoUrl: '/workouts/mountain-climbers.mp4',
    targetMuscle: 'Core, Shoulders, Cardio',
    difficulty: 'Intermediate',
    durationSeconds: 40,
  },
  {
    id: 'burpees',
    name: 'Burpees',
    videoUrl: '/workouts/burpees.mp4',
    targetMuscle: 'Full Body, Cardio',
    difficulty: 'Advanced',
    durationSeconds: 40,
  },
  {
    id: 'glute-bridges',
    name: 'Glute Bridges',
    videoUrl: '/workouts/glute-bridges.mp4',
    targetMuscle: 'Glutes, Hamstrings, Core',
    difficulty: 'Beginner',
    durationSeconds: 40,
  },
  {
    id: 'bicycle-crunches',
    name: 'Bicycle Crunches',
    videoUrl: '/workouts/bicycle-crunches.mp4',
    targetMuscle: 'Abs, Obliques',
    difficulty: 'Intermediate',
    durationSeconds: 40,
  },
  {
    id: 'high-knees',
    name: 'High Knees',
    videoUrl: '/workouts/high-knees.mp4',
    targetMuscle: 'Hip Flexors, Cardio, Core',
    difficulty: 'Intermediate',
    durationSeconds: 40,
  },
];

