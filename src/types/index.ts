export interface Ingredient {
  id: string;
  name: string;
  category: string;
  confidence: number;
  quantity?: string;
  unit?: string;
  expirationDate?: Date;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  cookingTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  servings: number;
  ingredients: RecipeIngredient[];
  instructions: string[];
  imageUrl?: string;
  matchPercentage: number;
  missingIngredients: string[];
  substitutions?: Substitution[];
}

export interface RecipeIngredient {
  name: string;
  quantity: string;
  unit: string;
  essential: boolean;
}

export interface Substitution {
  original: string;
  substitute: string;
  confidence: number;
}

export interface VoiceCommand {
  type: 'search' | 'filter' | 'navigate' | 'control';
  intent: string;
  parameters?: Record<string, any>;
}

export interface UserPreferences {
  dietaryRestrictions: string[];
  allergies: string[];
  preferredCuisines: string[];
  cookingSkillLevel: 'beginner' | 'intermediate' | 'advanced';
  maxCookingTime: number;
}

export interface IngredientInventory {
  ingredients: Ingredient[];
  pantryStaples: string[];
  lastUpdated: Date;
}