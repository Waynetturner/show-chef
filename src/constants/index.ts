export const APP_CONFIG = {
  RECOGNITION_TIMEOUT: 2000,
  VOICE_RESPONSE_TIMEOUT: 1000,
  APP_LAUNCH_TIMEOUT: 3000,
  TARGET_RECOGNITION_ACCURACY: 0.85,
  TARGET_VOICE_ACCURACY: 0.9,
  PARTIAL_MATCH_THRESHOLD: 0.8,
};

export const COLORS = {
  primary: '#2E7D32',
  secondary: '#4CAF50', 
  accent: '#FF5722',
  background: '#FAFAFA',
  surface: '#FFFFFF',
  text: '#212121',
  textSecondary: '#757575',
  error: '#F44336',
  warning: '#FF9800',
  success: '#4CAF50',
};

export const INGREDIENT_CATEGORIES = [
  'vegetables',
  'fruits', 
  'proteins',
  'grains',
  'dairy',
  'herbs',
  'spices',
  'pantry',
] as const;

export const DIETARY_RESTRICTIONS = [
  'vegetarian',
  'vegan',
  'gluten-free',
  'dairy-free',
  'nut-free',
  'keto',
  'paleo',
  'low-carb',
] as const;

export const VOICE_COMMANDS = {
  WAKE_WORDS: ['hey chef', 'show chef'],
  SEARCH_INTENTS: ['find recipes', 'what can I make', 'cook with'],
  NAVIGATION_INTENTS: ['go back', 'next recipe', 'show ingredients'],
  CONTROL_INTENTS: ['start timer', 'repeat step', 'volume up'],
} as const;