import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { RootStackParamList } from '../../navigation/AppNavigator';

type RecipeScreenRouteProp = RouteProp<RootStackParamList, 'Recipe'>;

const RecipeScreen = () => {
  const route = useRoute<RecipeScreenRouteProp>();
  const { recipeId } = route.params;

  const mockRecipe = {
    id: recipeId,
    title: 'Asian Chicken Stir Fry',
    description: 'A quick and delicious stir fry using leftover chicken and vegetables',
    cookingTime: 25,
    difficulty: 'Easy',
    servings: 4,
    matchPercentage: 90,
    imageUrl: 'https://via.placeholder.com/400x200',
    ingredients: [
      { name: 'Chicken breast', quantity: '1 lb', unit: 'lb', essential: true },
      { name: 'Bell pepper', quantity: '2', unit: 'pieces', essential: true },
      { name: 'Yellow onion', quantity: '1', unit: 'piece', essential: true },
      { name: 'Cooked rice', quantity: '2 cups', unit: 'cups', essential: false },
      { name: 'Soy sauce', quantity: '3 tbsp', unit: 'tbsp', essential: true },
      { name: 'Vegetable oil', quantity: '2 tbsp', unit: 'tbsp', essential: true },
    ],
    instructions: [
      'Heat oil in a large wok or skillet over medium-high heat',
      'Cut chicken into bite-sized pieces and cook until golden brown',
      'Add sliced onions and bell peppers, stir fry for 3-4 minutes',
      'Add soy sauce and cook for another 2 minutes',
      'Serve hot over cooked rice and enjoy!',
    ],
    missingIngredients: ['Garlic', 'Ginger'],
    substitutions: [
      { original: 'Soy sauce', substitute: 'Tamari sauce', confidence: 0.95 },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: mockRecipe.imageUrl }} style={styles.heroImage} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{mockRecipe.title}</Text>
          <View style={styles.matchBadge}>
            <Text style={styles.matchText}>{mockRecipe.matchPercentage}% Match</Text>
          </View>
        </View>

        <Text style={styles.description}>{mockRecipe.description}</Text>

        <View style={styles.metaInfo}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.metaText}>{mockRecipe.cookingTime} min</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="bar-chart-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.metaText}>{mockRecipe.difficulty}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="people-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.metaText}>{mockRecipe.servings} servings</Text>
          </View>
        </View>

        {mockRecipe.missingIngredients.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Missing Ingredients</Text>
            <View style={styles.missingContainer}>
              {mockRecipe.missingIngredients.map((ingredient, index) => (
                <Text key={index} style={styles.missingIngredient}>
                  • {ingredient}
                </Text>
              ))}
              <TouchableOpacity style={styles.shopButton}>
                <Ionicons name="cart-outline" size={20} color={COLORS.surface} />
                <Text style={styles.shopButtonText}>Add to Shopping List</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {mockRecipe.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientItem}>
              <Text style={styles.ingredientQuantity}>
                {ingredient.quantity}
              </Text>
              <Text style={[
                styles.ingredientName,
                !ingredient.essential && styles.optionalIngredient,
              ]}>
                {ingredient.name}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {mockRecipe.instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.instructionText}>{instruction}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.startCookingButton}>
          <Ionicons name="play" size={24} color={COLORS.surface} />
          <Text style={styles.startCookingText}>Start Cooking</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  heroImage: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.textSecondary,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
    marginRight: 12,
  },
  matchBadge: {
    backgroundColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  matchText: {
    color: COLORS.surface,
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: 16,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  missingContainer: {
    backgroundColor: COLORS.warning + '20',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.warning,
  },
  missingIngredient: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 4,
  },
  shopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 12,
    gap: 8,
  },
  shopButtonText: {
    color: COLORS.surface,
    fontSize: 14,
    fontWeight: '600',
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  ingredientQuantity: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    width: 80,
  },
  ingredientName: {
    fontSize: 14,
    color: COLORS.text,
    flex: 1,
  },
  optionalIngredient: {
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    color: COLORS.surface,
    fontSize: 14,
    fontWeight: '600',
  },
  instructionText: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
    flex: 1,
  },
  startCookingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    gap: 8,
  },
  startCookingText: {
    color: COLORS.surface,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default RecipeScreen;