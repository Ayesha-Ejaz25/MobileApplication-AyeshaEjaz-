import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const slides = [
  { image: require('../../assets/images/home.jpg'), text: null, screen: 'Categories' },
  { image: require('../../assets/images/sale.jpg'), text: 'Sale is Live ✨', screen: 'Sale' },
  { image: require('../../assets/images/summer.jpg'), text: 'Summer Collection', screen: 'Summer' },
  { image: require('../../assets/images/winter.jpg'), text: 'Winter Collection', screen: 'Winter' },
  { image: require('../../assets/images/perfumes.jpg'), text: 'Perfumes Collection', screen: 'Perfumes' },
];

export default function Home() {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      setCurrentIndex(nextIndex);
      scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
      >
        {slides.map((slide, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            onPress={() => navigation.navigate(slide.screen)}
          >
            <ImageBackground source={slide.image} style={styles.slide}>
              {/* Top Right Logo */}
              <Text style={styles.logo}>Blossoms by Aysh</Text>

              {/* Slide Text */}
              {slide.text && <Text style={styles.slideText}>{slide.text}</Text>}

              {/* Shop Now Button on First Slide */}
              {index === 0 && (
                <TouchableOpacity
                  style={styles.shopButton}
                  onPress={() => navigation.navigate('Categories')}
                >
                  <Text style={styles.shopButtonText}>Shop Now</Text>
                </TouchableOpacity>
              )}
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
}

const theme = {
  primary: '#A77370',
  secondary: '#C87377',
  accent: '#D38F8F',
  light: '#FEE3E5',
  background: '#FDD4D7',
  text: '#4A4A4A',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  slide: {
    width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
 logo: {
  position: 'absolute',
  top: 40,
  right: 30,
  fontSize: 25,
  fontFamily: 'AguDisplay',
  color: '#FEE3E5',
  textShadowColor: '#5C4033',
  textShadowRadius: 3,
  textShadowOffset: { width: 3, height: 1 },
  // multiple layered shadow for clean stroke illusion
},

  slideText: {
    position: 'absolute',
    bottom: 90,
    fontSize: 30,
    fontFamily: 'AguDisplay',
    color: '#efe0e1ff',
    textShadowColor: '#00000070',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  shopButton: {
    position: 'absolute',
    bottom: 90,
    backgroundColor: theme.primary,
    paddingHorizontal: 80,
    paddingVertical: 10,
    borderRadius: 30,
  },
  shopButtonText: {
    color: '#fff',
    fontFamily: 'AguDisplay',
    fontSize: 16,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff80',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: theme.primary,
    width: 10,
  },
});
