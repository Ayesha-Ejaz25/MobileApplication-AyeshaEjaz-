import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { auth, db } from '../../backend/firebase';
import { signOut } from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';
import { Colors } from '../theme';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [toyName, setToyName] = useState('');
  const [savedToys, setSavedToys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');

  // Correct Soft Toys Categories with proper images
  const categories = [
    {
      id: 1,
      name: 'Teddy Bears',
      image: 'https://m.media-amazon.com/images/I/717MbIJmckL.jpg',
      count: '25+ Items'
    },
    {
      id: 2,
      name: 'Animal Toys',
      image: 'https://images.unsplash.com/photo-1693847972439-0a61b27bf16b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      count: '30+ Items'
    },
    {
      id: 3,
      name: 'Cartoon Characters',
      image: 'https://images.unsplash.com/photo-1725290471606-674dd6676178?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      count: '20+ Items'
    },
    {
      id: 4,
      name: 'Baby Toys',
      image: 'https://images.unsplash.com/photo-1547999926-9e384876b19c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      count: '15+ Items'
    }
  ];

  // Featured Toys with correct images and Pakistani Prices
  const featuredToys = [
    {
      id: 1,
      name: 'Cuddle Bear',
      price: 'Rs 1,299',
      image: 'https://images.unsplash.com/photo-1605186993719-18943891d58f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: '4.8'
    },
    {
      id: 2,
      name: 'Fluffy Bunny',
      price: 'Rs 899',
      image: 'https://images.unsplash.com/photo-1567169866456-a0759b6bb0c8?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: '4.6'
    },
    {
      id: 3,
      name: 'Sleepy Panda',
      price: 'Rs 1,599',
      image: 'https://plus.unsplash.com/premium_photo-1664392325486-6afb0827afe7?q=80&w=1048&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: '4.9'
    },
    {
      id: 4,
      name: 'Rainbow Unicorn',
      price: 'Rs 2,199',
      image: 'https://images.unsplash.com/photo-1588671938895-bb25d431aa9a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: '4.7'
    },
    {
      id: 5,
      name: 'Baby Elephant',
      price: 'Rs 1,099',
      image: 'https://images.unsplash.com/photo-1664924520071-f1c1ab17d77f?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: '4.5'
    }
  ];

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const email = user.email;
      setUserName(email.split('@')[0]);
    
      // TEMPORARY: Simple query without orderBy to avoid index error
      const toysQuery = query(
        collection(db, 'userToys'),
        where('userId', '==', user.uid)
        // orderBy('createdAt', 'desc') - Removed temporarily
      );

      const unsubscribe = onSnapshot(toysQuery, (snapshot) => {
        const toys = [];
        snapshot.forEach((doc) => {
          toys.push({ id: doc.id, ...doc.data() });
        });
        // Manual sorting instead of Firestore orderBy
        toys.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return b.createdAt.toDate() - a.createdAt.toDate();
          }
          return 0;
        });
        setSavedToys(toys);
      });

      return () => unsubscribe();
    }
  }, []);

  const handleSaveToy = async () => {
    if (!toyName.trim()) {
      Alert.alert('Error', 'Please enter your toy\'s nickname');
      return;
    }

    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'userToys'), {
        toyName: toyName.trim(),
        userId: user.uid,
        userEmail: user.email,
        createdAt: serverTimestamp()
      });
      
      setToyName('');
      Alert.alert('Success', 'Toy nickname saved successfully! 🎉');
    } catch (error) {
      Alert.alert('Error', 'Failed to save: ' + error.message);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert('Error', 'Logout failed. Please try again.');
    }
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <View style={styles.categoryOverlay}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryCount}>{item.count}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFeaturedToy = ({ item }) => (
    <View style={styles.featuredCard}>
      <Image source={{ uri: item.image }} style={styles.featuredImage} />
      <View style={styles.featuredInfo}>
        <Text style={styles.toyName}>{item.name}</Text>
        <View style={styles.priceRating}>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
        </View>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSavedToy = ({ item, index }) => (
    <View style={styles.savedToyCard}>
      <Text style={styles.toyNumber}>#{index + 1}</Text>
      <Text style={styles.savedToyName}>"{item.toyName}"</Text>
      <Text style={styles.savedDate}>
        {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString('en-IN') : 'Recently'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Welcome back! 👋</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Cloudy Cuddles</Text>
          <Text style={styles.heroSubtitle}>Where Every Toy Has a Story ❤️</Text>
        </View>

        {/* Save Toy Section */}
        <View style={styles.saveSection}>
          <Text style={styles.sectionTitle}>Name Your Toy Buddy</Text>
          <Text style={styles.sectionSubtitle}>Give a cute nickname to your favorite toy</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your favourite toy's nickname..."
              placeholderTextColor="#999"
              value={toyName}
              onChangeText={setToyName}
              maxLength={50}
            />
            <TouchableOpacity 
              style={[
                styles.saveButton,
                loading && styles.disabledButton
              ]}
              onPress={handleSaveToy}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                <Text style={styles.saveButtonText}>Save to Firebase</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shop By Category</Text>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Featured Toys Slider */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Toys</Text>
          <Text style={styles.sectionSubtitle}>Best selling soft toys in Pakistan</Text>
          <FlatList
            data={featuredToys}
            renderItem={renderFeaturedToy}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          />
        </View>

        {/* Saved Toys Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Toy Collection</Text>
          {savedToys.length > 0 ? (
            <FlatList
              data={savedToys}
              renderItem={renderSavedToy}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.savedToysList}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No toys saved yet</Text>
              <Text style={styles.emptyStateSubtext}>Start by naming your first toy! 🧸</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

// Styles same as before...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: Colors.accent,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  welcome: {
    fontSize: 16,
    color: Colors.white,
    opacity: 0.9,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: 4,
  },
  logoutBtn: {
    backgroundColor: Colors.tertiary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 24,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: Colors.text,
    opacity: 0.8,
    textAlign: 'center',
    marginTop: 8,
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 24,
  },
  saveSection: {
    backgroundColor: Colors.white,
    marginHorizontal: 24,
    marginBottom: 30,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 10,
  },
  textInput: {
    backgroundColor: Colors.secondary,
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 2,
    borderColor: Colors.accent,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: Colors.accent,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoriesList: {
    paddingVertical: 10,
  },
  categoryCard: {
    width: 140,
    height: 160,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 12,
  },
  categoryName: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  categoryCount: {
    color: Colors.white,
    fontSize: 12,
    opacity: 0.8,
  },
  featuredList: {
    paddingVertical: 10,
  },
  featuredCard: {
    width: width * 0.65,
    backgroundColor: Colors.white,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: 150,
  },
  featuredInfo: {
    padding: 12,
  },
  toyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  priceRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.accent,
  },
  rating: {
    fontSize: 14,
    color: '#666',
  },
  buyButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  savedToysList: {
    paddingTop: 10,
  },
  savedToyCard: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toyNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.accent,
    marginRight: 12,
  },
  savedToyName: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '600',
    flex: 1,
  },
  savedDate: {
    fontSize: 12,
    color: '#666',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
  },
});

export default HomeScreen;