import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  const quickActions = [
    {
      id: 'scan',
      title: 'Scan Ingredients',
      subtitle: 'Point camera at your ingredients',
      icon: 'camera',
      onPress: () => navigation.navigate('Camera'),
    },
    {
      id: 'voice',
      title: 'Voice Search',
      subtitle: 'Tell me what you have',
      icon: 'mic',
      onPress: () => {},
    },
    {
      id: 'inventory',
      title: 'My Pantry',
      subtitle: 'Manage saved ingredients',
      icon: 'list',
      onPress: () => {},
    },
  ];

  const recentRecipes = [
    {
      id: '1',
      title: 'Chicken Stir Fry',
      cookingTime: '25 min',
      difficulty: 'Easy',
      imageUrl: 'https://via.placeholder.com/120x80',
    },
    {
      id: '2',
      title: 'Vegetable Curry',
      cookingTime: '30 min',
      difficulty: 'Medium',
      imageUrl: 'https://via.placeholder.com/120x80',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to ShowChef!</Text>
        <Text style={styles.subtitleText}>
          What can I help you cook today?
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={styles.actionCard}
            onPress={action.onPress}
          >
            <View style={styles.actionIcon}>
              <Ionicons name={action.icon as any} size={24} color={COLORS.primary} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Recipes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recentRecipes.map((recipe) => (
            <TouchableOpacity
              key={recipe.id}
              style={styles.recipeCard}
              onPress={() => navigation.navigate('Recipe', { recipeId: recipe.id })}
            >
              <Image source={{ uri: recipe.imageUrl }} style={styles.recipeImage} />
              <View style={styles.recipeInfo}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <Text style={styles.recipeDetails}>
                  {recipe.cookingTime} • {recipe.difficulty}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.primaryButton}>
          <Ionicons name="camera" size={24} color={COLORS.surface} />
          <Text style={styles.primaryButtonText}>Start Cooking!</Text>
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
  header: {
    padding: 20,
    paddingTop: 10,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  recipeCard: {
    width: 160,
    marginRight: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeImage: {
    width: '100%',
    height: 100,
    backgroundColor: COLORS.textSecondary,
  },
  recipeInfo: {
    padding: 12,
  },
  recipeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  recipeDetails: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.surface,
  },
});

export default HomeScreen;