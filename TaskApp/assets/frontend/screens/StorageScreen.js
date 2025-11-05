import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageScreen = () => {
  // Store Data ke liye state
  const [storeKey, setStoreKey] = useState('');
  const [storeValue, setStoreValue] = useState('');

  // Fetch Data ke liye state  
  const [fetchKey, setFetchKey] = useState('');
  const [fetchedData, setFetchedData] = useState('');

  // Remove Data ke liye state
  const [removeKey, setRemoveKey] = useState('');

  // Button press state for hover effect
  const [buttonStates, setButtonStates] = useState({
    store: false,
    fetch: false,
    remove: false
  });

  // 1. DATA STORE KARNE KA FUNCTION
  const storeData = async () => {
    try {
      if (!storeKey.trim()) {
        Alert.alert('Error', 'Please enter a key');
        return;
      }

      await AsyncStorage.setItem(storeKey, storeValue);
      Alert.alert('Success', `Data stored for key: ${storeKey}`);
      
      // Input fields clear karen
      setStoreKey('');
      setStoreValue('');
    } catch (error) {
      Alert.alert('Error', 'Failed to save data');
    }
  };

  // 2. DATA FETCH KARNE KA FUNCTION
  const fetchData = async () => {
    try {
      if (!fetchKey.trim()) {
        Alert.alert('Error', 'Please enter a key');
        return;
      }

      const value = await AsyncStorage.getItem(fetchKey);
      
      if (value !== null) {
        setFetchedData(value);
      } else {
        setFetchedData('');
        Alert.alert('Not Found', `No data for key: ${fetchKey}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch data');
    }
  };

  // 3. DATA REMOVE KARNE KA FUNCTION
  const removeData = async () => {
    try {
      if (!removeKey.trim()) {
        Alert.alert('Error', 'Please enter a key');
        return;
      }

      await AsyncStorage.removeItem(removeKey);
      Alert.alert('Success', `Data removed for key: ${removeKey}`);
      setRemoveKey('');
      
      // Agar remove wahi key hai jo fetch mein hai, to clear karen
      if (removeKey === fetchKey) {
        setFetchedData('');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to remove data');
    }
  };

  // Hover effect handlers
  const handlePressIn = (buttonName) => {
    setButtonStates(prev => ({...prev, [buttonName]: true}));
  };

  const handlePressOut = (buttonName) => {
    setButtonStates(prev => ({...prev, [buttonName]: false}));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Data Center</Text>

      {/* SECTION 1: STORE DATA */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Store Data</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter key (e.g., userToken, theme, language)"
          value={storeKey}
          onChangeText={setStoreKey}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Enter value"
          value={storeValue}
          onChangeText={setStoreValue}
        />
        
        <TouchableOpacity 
          style={[
            styles.button, 
            buttonStates.store && styles.buttonHover
          ]}
          onPress={storeData}
          onPressIn={() => handlePressIn('store')}
          onPressOut={() => handlePressOut('store')}
        >
          <Text style={styles.buttonText}>Store Data</Text>
        </TouchableOpacity>
      </View>

      {/* SECTION 2: FETCH DATA */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Fetch Data</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter key to fetch"
          value={fetchKey}
          onChangeText={setFetchKey}
        />
        
        <TouchableOpacity 
          style={[
            styles.button, 
            buttonStates.fetch && styles.buttonHover
          ]}
          onPress={fetchData}
          onPressIn={() => handlePressIn('fetch')}
          onPressOut={() => handlePressOut('fetch')}
        >
          <Text style={styles.buttonText}>Fetch Data</Text>
        </TouchableOpacity>

        {fetchedData !== '' && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Fetched Value:</Text>
            <Text style={styles.resultValue}>{fetchedData}</Text>
          </View>
        )}
      </View>

      {/* SECTION 3: REMOVE DATA */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Remove Data</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter key to remove"
          value={removeKey}
          onChangeText={setRemoveKey}
        />
        
        <TouchableOpacity 
          style={[
            styles.button, 
            styles.removeButton,
            buttonStates.remove && styles.removeButtonHover
          ]}
          onPress={removeData}
          onPressIn={() => handlePressIn('remove')}
          onPressOut={() => handlePressOut('remove')}
        >
          <Text style={styles.buttonText}>Remove Data</Text>
        </TouchableOpacity>
      </View>

      {/* TESTING SUGGESTIONS */}
      <View style={styles.suggestionBox}>
        <Text style={styles.suggestionTitle}>Test with these keys:</Text>
        <Text style={styles.suggestion}>• userToken</Text>
        <Text style={styles.suggestion}>• theme</Text>
        <Text style={styles.suggestion}>• language</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#80A1BA',
    marginTop: 10,
  },
  section: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#80A1BA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#91C4C3',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#80A1BA',
  },
  input: {
    borderWidth: 1,
    borderColor: '#91C4C3',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f8fafc',
  },
  button: {
    backgroundColor: '#80A1BA',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#80A1BA',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonHover: {
    backgroundColor: '#91C4C3',
    transform: [{ scale: 0.98 }],
  },
  removeButton: {
    backgroundColor: '#80A1BA',
    shadowColor: '#80A1BA',
  },
  removeButtonHover: {
    backgroundColor: '#80A1BA',
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#e8f6f3',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#91C4C3',
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#80A1BA',
    marginBottom: 5,
  },
  resultValue: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
  suggestionBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#80A1BA',
    shadowColor: '#80A1BA',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#80A1BA',
  },
  suggestion: {
    fontSize: 14,
    color: '#91C4C3',
    marginBottom: 5,
    fontWeight: '500',
  },
});

export default StorageScreen;