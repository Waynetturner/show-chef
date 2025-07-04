import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { usePermissions } from '../../hooks/usePermissions';
import { COLORS, APP_CONFIG } from '../../constants';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CameraScreen = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [detectedIngredients, setDetectedIngredients] = useState<string[]>([]);
  const cameraRef = useRef<CameraView>(null);
  const { hasAllPermissions, requestPermissions, loading } = usePermissions();

  useEffect(() => {
    if (!hasAllPermissions && !loading) {
      Alert.alert(
        'Permissions Required',
        'ShowChef needs camera access to identify ingredients. Please grant permissions to continue.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Grant Permissions', onPress: requestPermissions },
        ]
      );
    }
  }, [hasAllPermissions, loading]);

  const handleScanIngredients = async () => {
    if (!cameraRef.current || isScanning) return;

    setIsScanning(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });

      setTimeout(() => {
        setDetectedIngredients(['Chicken Breast', 'Bell Pepper', 'Onion', 'Rice']);
        setIsScanning(false);
      }, APP_CONFIG.RECOGNITION_TIMEOUT);

    } catch (error) {
      console.error('Failed to scan ingredients:', error);
      Alert.alert('Error', 'Failed to scan ingredients. Please try again.');
      setIsScanning(false);
    }
  };

  const handleManualAdd = () => {
    Alert.alert(
      'Add Ingredient',
      'Manual ingredient input will be available in a future update.',
      [{ text: 'OK' }]
    );
  };

  const handleVoiceInput = () => {
    Alert.alert(
      'Voice Input',
      'Voice ingredient detection will be available in a future update.',
      [{ text: 'OK' }]
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Checking permissions...</Text>
      </View>
    );
  }

  if (!hasAllPermissions) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="camera-outline" size={64} color={COLORS.textSecondary} />
        <Text style={styles.permissionText}>Camera access required</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermissions}>
          <Text style={styles.permissionButtonText}>Grant Permissions</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
      >
        <View style={styles.overlay}>
          <View style={styles.topOverlay}>
            <Text style={styles.instructionText}>
              Point camera at your ingredients
            </Text>
          </View>

          <View style={styles.scanFrame} />

          <View style={styles.bottomOverlay}>
            {detectedIngredients.length > 0 && (
              <View style={styles.ingredientsContainer}>
                <Text style={styles.detectedTitle}>Detected Ingredients:</Text>
                {detectedIngredients.map((ingredient, index) => (
                  <Text key={index} style={styles.ingredientText}>
                    • {ingredient}
                  </Text>
                ))}
              </View>
            )}

            <View style={styles.controlsContainer}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleManualAdd}
              >
                <Ionicons name="text" size={24} color={COLORS.primary} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.scanButton,
                  isScanning && styles.scanButtonActive,
                ]}
                onPress={handleScanIngredients}
                disabled={isScanning}
              >
                {isScanning ? (
                  <Text style={styles.scanButtonText}>Scanning...</Text>
                ) : (
                  <Ionicons name="camera" size={32} color={COLORS.surface} />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleVoiceInput}
              >
                <Ionicons name="mic" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 18,
    color: COLORS.text,
    textAlign: 'center',
    marginVertical: 16,
  },
  permissionButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  topOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  instructionText: {
    color: COLORS.surface,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
  },
  scanFrame: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.6,
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: COLORS.accent,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingBottom: 40,
  },
  ingredientsContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
  },
  detectedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  ingredientText: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 4,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingHorizontal: 40,
    gap: 24,
  },
  scanButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.surface,
  },
  scanButtonActive: {
    backgroundColor: COLORS.warning,
  },
  scanButtonText: {
    color: COLORS.surface,
    fontSize: 12,
    fontWeight: '600',
  },
  secondaryButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default CameraScreen;