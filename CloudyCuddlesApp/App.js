import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './assets/backend/firebase';
import AuthScreen from './assets/frontend/screens/AuthScreen';
import HomeScreen from './assets/frontend/screens/HomeScreen';
import { Colors } from './assets/frontend/theme';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    console.log('Setting up auth state listener...');
    
    try {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          console.log('Auth state updated:', user ? user.email : 'No user');
          setUser(user);
          setLoading(false);
          setAuthError(null);
        },
        (error) => {
          console.log('Auth state error:', error);
          setAuthError(error.message);
          setLoading(false);
        }
      );

      return unsubscribe;
    } catch (error) {
      console.log('Error setting up auth listener:', error);
      setAuthError(error.message);
      setLoading(false);
    }
  }, []);

  // Show loading
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Cloudy Cuddles...</Text>
        <ActivityIndicator size="large" color={Colors.accent} style={{ marginTop: 20 }} />
      </View>
    );
  }

  // Show error if any
  if (authError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Authentication Error</Text>
        <Text style={styles.errorText}>{authError}</Text>
        <Text style={styles.retryText}>Please restart the app</Text>
      </View>
    );
  }

  // Show appropriate screen based on auth state
  return user ? <HomeScreen /> : <AuthScreen />;
};

const styles = {
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: Colors.text,
    marginBottom: 20,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    color: '#FF6B6B',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryText: {
    fontSize: 14,
    color: Colors.text,
    fontStyle: 'italic',
  },
};

export default App;