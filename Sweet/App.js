import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import HomeScreen from './frontend/screens/HomeScreen';
import ProductsScreen from './frontend/screens/ProductsScreen';
import ProductDetailScreen from './frontend/screens/ProductDetailScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [screenHistory, setScreenHistory] = useState(['Home']);

  const navigateTo = (screen, product = null) => {
    setScreenHistory([...screenHistory, screen]);
    setCurrentScreen(screen);
    setSelectedProduct(product);
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop();
      const previousScreen = newHistory[newHistory.length - 1];
      
      setScreenHistory(newHistory);
      setCurrentScreen(previousScreen);
      setSelectedProduct(null);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Products':
        return <ProductsScreen navigateTo={navigateTo} />;
      case 'ProductDetail':
        return <ProductDetailScreen product={selectedProduct} navigateTo={navigateTo} />;
      default:
        return <HomeScreen navigateTo={navigateTo} />;
    }
  };

  // Header with proper styling
  const renderHeader = () => {
    if (currentScreen === 'Home') return null;
    
    const titles = {
      'Products': 'Our Cakes',
      'ProductDetail': 'Cake Details'
    };

    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#FF6B8B',
        borderBottomWidth: 1,
        borderBottomColor: '#E55A7A',
        // Inline styling for better visibility
        height: 60,
        justifyContent: 'flex-start',
      }}>
        {/* Back Arrow - Larger and more visible */}
        <TouchableOpacity 
          onPress={goBack}
          style={{ 
            marginRight: 15,
            padding: 8,
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: 20,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ 
            color: 'white', 
            fontSize: 22, 
            fontWeight: 'bold',
            lineHeight: 24,
          }}>
            ←
          </Text>
        </TouchableOpacity>
        
        <Text style={{ 
          color: 'white', 
          fontSize: 20, 
          fontWeight: 'bold',
          // Inline text styling
          textAlign: 'center',
          flex: 1,
          marginRight: 40, // Balance the back button space
        }}>
          {titles[currentScreen]}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF9F2' }}>
      <StatusBar backgroundColor="#FF6B8B" barStyle="light-content" />
      {renderHeader()}
      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>
    </SafeAreaView>
  );
};

export default App;