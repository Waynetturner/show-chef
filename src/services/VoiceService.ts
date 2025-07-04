import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import { VoiceCommand } from '../types';
import { VOICE_COMMANDS } from '../constants';

class VoiceService {
  private recording: Audio.Recording | null = null;
  private isListening: boolean = false;

  async startListening(): Promise<void> {
    try {
      if (this.isListening) return;

      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        throw new Error('Audio permission not granted');
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      this.recording = new Audio.Recording();
      await this.recording.prepareToRecordAsync({
        android: {
          extension: '.m4a',
          outputFormat: Audio.AndroidOutputFormat.MPEG_4,
          audioEncoder: Audio.AndroidAudioEncoder.AAC,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: '.m4a',
          outputFormat: Audio.IOSOutputFormat.MPEG4AAC,
          audioQuality: Audio.IOSAudioQuality.HIGH,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
        web: {
          mimeType: 'audio/webm',
          bitsPerSecond: 128000,
        },
      });

      await this.recording.startAsync();
      this.isListening = true;
    } catch (error) {
      console.error('Failed to start listening:', error);
      throw error;
    }
  }

  async stopListening(): Promise<string | null> {
    try {
      if (!this.recording || !this.isListening) return null;

      await this.recording.stopAndUnloadAsync();
      const uri = this.recording.getURI();
      this.recording = null;
      this.isListening = false;

      return uri;
    } catch (error) {
      console.error('Failed to stop listening:', error);
      return null;
    }
  }

  speak(text: string, options?: Speech.SpeechOptions): void {
    const defaultOptions: Speech.SpeechOptions = {
      language: 'en-US',
      pitch: 1.0,
      rate: 0.85,
      ...options,
    };

    Speech.speak(text, defaultOptions);
  }

  stopSpeaking(): void {
    Speech.stop();
  }

  parseVoiceCommand(text: string): VoiceCommand | null {
    const lowerText = text.toLowerCase().trim();

    if (VOICE_COMMANDS.SEARCH_INTENTS.some(intent => lowerText.includes(intent))) {
      return {
        type: 'search',
        intent: 'find_recipes',
        parameters: { query: text },
      };
    }

    if (VOICE_COMMANDS.NAVIGATION_INTENTS.some(intent => lowerText.includes(intent))) {
      return {
        type: 'navigate',
        intent: lowerText.includes('back') ? 'go_back' : 
                lowerText.includes('next') ? 'next_recipe' : 'show_ingredients',
      };
    }

    if (VOICE_COMMANDS.CONTROL_INTENTS.some(intent => lowerText.includes(intent))) {
      return {
        type: 'control',
        intent: lowerText.includes('timer') ? 'start_timer' :
                lowerText.includes('repeat') ? 'repeat_step' : 'volume_control',
        parameters: { action: lowerText },
      };
    }

    return null;
  }

  get isCurrentlyListening(): boolean {
    return this.isListening;
  }
}

export default new VoiceService();