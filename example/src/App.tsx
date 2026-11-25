import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import { requestReview } from 'react-native-in-app-store-review';

export default function App() {
  const [status, setStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRateApp = async () => {
    setIsLoading(true);
    setStatus('Requesting review...');

    try {
      const result = await requestReview();
      console.log('Review request completed:', result);
      setStatus(`✅ ${result}`);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      console.error('Review request failed:', errorMessage);
      setStatus(`❌ Error: ${errorMessage}`);
      Alert.alert('Review Request Failed', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>In-App Rating Example</Text>
        <Text style={styles.subtitle}>
          {Platform.OS === 'android'
            ? 'Uses Google Play In-App Review API'
            : 'Uses Apple StoreKit Review API'}
        </Text>

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleRateApp}
          disabled={isLoading}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Requesting...' : '⭐ Rate Our App'}
          </Text>
        </TouchableOpacity>

        {status ? <Text style={styles.status}>{status}</Text> : null}

        <Text style={styles.note}>
          Note: The native review dialog may not appear every time. The
          operating system controls when and whether the prompt is shown.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4A90D9',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonDisabled: {
    backgroundColor: '#A0C4E8',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  status: {
    marginTop: 24,
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  note: {
    marginTop: 32,
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 24,
    lineHeight: 18,
  },
});
