import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import GlobalStyles, { colors, typography } from '../styles/GlobalStyles';

const HomeScreen = ({ navigateTo }) => {
  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: 'Chocolate Cake',
      price: '₨ 2,499',
      image: require('../../assets/images/choclatecake.jpg'),
    },
    {
      id: 2, 
      name: 'Cheese Cake',
      price: '₨ 2,299',
      image: require('../../assets/images/cheesecake.jpg'),
    },
  ];

  return (
    <ScrollView style={GlobalStyles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section - Inline styling */}
      <View style={{
        backgroundColor: colors.primary,
        borderRadius: 20,
        padding: 30,
        marginVertical: 20,
        alignItems: 'center',
      }}>
        <Text style={{
          fontSize: 32,
          fontWeight: 'bold',
          color: colors.white,
          textAlign: 'center',
        }}>
          Sweet Sweet Bakery
        </Text>
        <Text style={{
          fontSize: 16,
          color: colors.white,
          textAlign: 'center',
          marginTop: 10,
          opacity: 0.9,
        }}>
          Freshly baked happiness every day
        </Text>
      </View>

      {/* Welcome Section */}
      <View style={{ marginVertical: 20 }}>
        <Text style={[typography.heading, { textAlign: 'center' }]}>
          Welcome to Sweet Sweet!
        </Text>
        <Text style={[typography.body, { textAlign: 'center', marginTop: 10 }]}>
          Discover our delicious collection of handcrafted cakes
        </Text>
      </View>

      {/* Featured Products */}
      <View style={{ marginVertical: 20 }}>
        <Text style={[typography.subheading, { marginBottom: 15 }]}>
          Featured Cakes
        </Text>
        
        {featuredProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={[GlobalStyles.card, { 
              flexDirection: 'row', 
              alignItems: 'center',
            }]}
            onPress={() => navigateTo('ProductDetail', product)}
          >
            <Image
              source={product.image}
              style={{
                width: 80,
                height: 80,
                borderRadius: 10,
                marginRight: 15,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text style={[typography.subheading, { fontSize: 18 }]}>
                {product.name}
              </Text>
              <Text style={typography.price}>{product.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* CTA Button - Inline styling */}
      <TouchableOpacity
        style={[GlobalStyles.button, { marginVertical: 20 }]}
        onPress={() => navigateTo('Products')}
      >
        <Text style={GlobalStyles.buttonText}>View All Cakes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HomeScreen;