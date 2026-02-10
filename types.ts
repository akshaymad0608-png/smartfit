export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  content?: string;
}

export interface Workout {
  name: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  exercises: string[];
}

export interface DietPlan {
  type: 'Vegetarian' | 'Non-Vegetarian' | 'Vegan' | 'Global';
  calories: number;
  meals: {
    breakfast: string;
    lunch: string;
    snack: string;
    dinner: string;
  };
}

export interface DayPlan {
  day: number;
  focus: string;
  workout: string;
  dietFocus: string;
  completed?: boolean;
}