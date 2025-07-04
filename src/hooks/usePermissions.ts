import { useState, useEffect } from 'react';
import { useCameraPermissions } from 'expo-camera';
import { Audio } from 'expo-av';

interface PermissionState {
  camera: boolean;
  audio: boolean;
  loading: boolean;
  error: string | null;
}

export const usePermissions = () => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [audioPermissions, setAudioPermissions] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAudioPermissions = async () => {
    try {
      const audioStatus = await Audio.getPermissionsAsync();
      setAudioPermissions(audioStatus);
    } catch (err) {
      setError('Failed to check audio permissions');
    }
  };

  const requestPermissions = async () => {
    try {
      setLoading(true);
      setError(null);

      const cameraResult = await requestCameraPermission();
      const audioResult = await Audio.requestPermissionsAsync();

      setAudioPermissions(audioResult);

      const cameraGranted = cameraResult?.granted || false;
      const audioGranted = audioResult.granted;

      if (!cameraGranted || !audioGranted) {
        setError('Camera and microphone permissions are required for ShowChef to work properly.');
      }

      return { camera: cameraGranted, audio: audioGranted };
    } catch (err) {
      setError('Failed to request permissions');
      return { camera: false, audio: false };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initPermissions = async () => {
      await checkAudioPermissions();
      setLoading(false);
    };
    initPermissions();
  }, []);

  const cameraGranted = cameraPermission?.granted || false;
  const audioGranted = audioPermissions?.granted || false;

  return {
    camera: cameraGranted,
    audio: audioGranted,
    loading,
    error,
    requestPermissions,
    hasAllPermissions: cameraGranted && audioGranted,
  };
};