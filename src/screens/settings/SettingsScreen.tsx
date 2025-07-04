import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, DIETARY_RESTRICTIONS } from '../../constants';

const SettingsScreen = () => {
  const [voiceEnabled, setVoiceEnabled] = React.useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [selectedDiets, setSelectedDiets] = React.useState<string[]>([]);

  const settingSections = [
    {
      title: 'Preferences',
      items: [
        {
          icon: 'mic',
          title: 'Voice Commands',
          subtitle: 'Enable voice interaction',
          type: 'switch',
          value: voiceEnabled,
          onValueChange: setVoiceEnabled,
        },
        {
          icon: 'notifications',
          title: 'Notifications',
          subtitle: 'Cooking reminders and tips',
          type: 'switch',
          value: notificationsEnabled,
          onValueChange: setNotificationsEnabled,
        },
        {
          icon: 'restaurant',
          title: 'Dietary Restrictions',
          subtitle: 'Customize your diet preferences',
          type: 'navigation',
          onPress: () => showDietaryOptions(),
        },
      ],
    },
    {
      title: 'Inventory',
      items: [
        {
          icon: 'list',
          title: 'My Pantry',
          subtitle: 'Manage saved ingredients',
          type: 'navigation',
          onPress: () => Alert.alert('Pantry', 'Pantry management coming soon!'),
        },
        {
          icon: 'refresh',
          title: 'Clear Inventory',
          subtitle: 'Reset all saved ingredients',
          type: 'navigation',
          onPress: () => confirmClearInventory(),
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          icon: 'person',
          title: 'Profile',
          subtitle: 'Manage your account',
          type: 'navigation',
          onPress: () => Alert.alert('Profile', 'Profile management coming soon!'),
        },
        {
          icon: 'card',
          title: 'Subscription',
          subtitle: 'Upgrade to Premium',
          type: 'navigation',
          onPress: () => Alert.alert('Premium', 'Premium features coming soon!'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: 'help-circle',
          title: 'Help & FAQ',
          subtitle: 'Get help using ShowChef',
          type: 'navigation',
          onPress: () => Alert.alert('Help', 'Help documentation coming soon!'),
        },
        {
          icon: 'mail',
          title: 'Contact Support',
          subtitle: 'Get in touch with our team',
          type: 'navigation',
          onPress: () => Alert.alert('Contact', 'Support contact coming soon!'),
        },
        {
          icon: 'information-circle',
          title: 'About',
          subtitle: 'Version 1.0.0',
          type: 'navigation',
          onPress: () => showAbout(),
        },
      ],
    },
  ];

  const showDietaryOptions = () => {
    Alert.alert(
      'Dietary Restrictions',
      'Select your dietary preferences (multiple selection coming soon)',
      DIETARY_RESTRICTIONS.map(diet => ({
        text: diet.charAt(0).toUpperCase() + diet.slice(1),
        onPress: () => console.log(`Selected: ${diet}`),
      }))
    );
  };

  const confirmClearInventory = () => {
    Alert.alert(
      'Clear Inventory',
      'Are you sure you want to clear all saved ingredients? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => clearInventory() },
      ]
    );
  };

  const clearInventory = () => {
    Alert.alert('Success', 'Inventory cleared successfully!');
  };

  const showAbout = () => {
    Alert.alert(
      'About ShowChef',
      'ShowChef v1.0.0\n\nAI-powered recipe discovery app that transforms leftover ingredients into personalized meal solutions.\n\n© 2024 ShowChef Team',
      [{ text: 'OK' }]
    );
  };

  const renderSettingItem = (item: any, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.settingItem}
        onPress={item.onPress}
        disabled={item.type === 'switch'}
      >
        <View style={styles.settingIcon}>
          <Ionicons name={item.icon} size={24} color={COLORS.primary} />
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
        </View>
        {item.type === 'switch' ? (
          <Switch
            value={item.value}
            onValueChange={item.onValueChange}
            trackColor={{ false: COLORS.textSecondary, true: COLORS.primary }}
            thumbColor={COLORS.surface}
          />
        ) : (
          <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {settingSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map((item, itemIndex) => renderSettingItem(item, itemIndex))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
    marginHorizontal: 20,
  },
  sectionContent: {
    backgroundColor: COLORS.surface,
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});

export default SettingsScreen;