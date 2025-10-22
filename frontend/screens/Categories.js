import React, { useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableWithoutFeedback, 
  Dimensions, 
  ScrollView, 
  Animated, 
  TouchableOpacity 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';  // <-- import Ionicons

const { width } = Dimensions.get('window');
const boxWidth = width - 40;

const categories = [
  { title: 'Sale', image: require('../../assets/images/sale.jpg'), screen: 'Sale' },
  { title: 'Summer Collection', image: require('../../assets/images/summer.jpg'), screen: 'Summer' },
  { title: 'Winter Collection', image: require('../../assets/images/winter.jpg'), screen: 'Winter' },
  { title: 'Perfumes Collection', image: require('../../assets/images/perfumes.jpg'), screen: 'Perfumes' },
];

export default function Categories() {
  const navigation = useNavigation();
  const scaleValues = useRef(categories.map(() => new Animated.Value(1))).current;

  const handlePressIn = (index) => {
    Animated.spring(scaleValues[index], {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (index) => {
    Animated.spring(scaleValues[index], {
      toValue: 1,
      friction: 4,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* ✅ Header */}
      <View style={styles.header}>
        {/* Arrow Icon for navigating home */}
        <TouchableOpacity 
          style={styles.arrowBtn}
          onPress={() => navigation.navigate('Home')}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={28} color="#875957ff" />
        </TouchableOpacity>

        <Text style={styles.logo}>Blossoms by Aysh</Text>
      </View>

      {/* ✅ Column Layout */}
      <View style={styles.column}>
        {categories.map((cat, idx) => (
          <TouchableWithoutFeedback
            key={idx}
            onPressIn={() => handlePressIn(idx)}
            onPressOut={() => handlePressOut(idx)}
            onPress={() => navigation.navigate(cat.screen)}
          >
            <Animated.View style={[styles.card, { transform: [{ scale: scaleValues[idx] }] }]}>
              <Image source={cat.image} style={styles.image} />
              <Text style={styles.title}>{cat.title}</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </ScrollView>
  );
}

const theme = {
  primary: '#A77370',
  secondary: '#C87377',
  accent: '#D38F8F',
  light: '#FEE3E5',
  background: '#FDD4D7',  // 🌸 original background color
  text: '#4A4A4A',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    width: '90%',
    backgroundColor: theme.background, // ✅ original pinkish color
    opacity: 0.95,                    // thodi transparency for elegant effect
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
    position: 'relative',
  },
  arrowBtn: {
    position: 'absolute',
    left: 10,
    top: '100%',
    transform: [{ translateY: -14 }],
    zIndex: 10,
  },
  logo: {
    fontFamily: 'AguDisplay',
    fontSize: 29,
    color: '#875957ff', // 🌸 dark text for contrast on light background
    textAlign: 'center',
  },
  column: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
  card: {
    width: boxWidth,
    marginBottom: 20,
    backgroundColor: theme.light,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    textAlign: 'center',
    fontFamily: 'AguDisplay',
    fontSize: 20,
    color: theme.primary,
    paddingVertical: 10,
  },
});
