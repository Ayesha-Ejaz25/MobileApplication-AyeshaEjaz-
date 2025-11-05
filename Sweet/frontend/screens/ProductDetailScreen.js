import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import GlobalStyles, { colors, typography } from '../styles/GlobalStyles';

const ProductDetailScreen = ({ product, navigateTo }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    Alert.alert(
      'Added to Cart',
      `${quantity} ${product.name}(s) added to your cart!`,
      [{ text: 'OK', onPress: () => navigateTo('Products') }]
    );
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <ScrollView style={GlobalStyles.container} showsVerticalScrollIndicator={false}>
      {/* Product Image */}
      <Image
        source={product.image}
        style={[GlobalStyles.productImage, { height: 300, marginTop: 20 }]}
      />

      {/* Product Info */}
      <View style={[GlobalStyles.card, { marginTop: 20 }]}>
        <Text style={typography.heading}>{product.name}</Text>
        <Text style={[typography.price, { marginVertical: 10 }]}>
          {product.price}
        </Text>
        <Text style={typography.body}>
          {product.description}
        </Text>
      </View>

      {/* Quantity Selector - Inline styling */}
      <View style={[GlobalStyles.card, {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }]}>
        <Text style={typography.subheading}>Quantity</Text>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.border,
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={decreaseQuantity}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>-</Text>
          </TouchableOpacity>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            marginHorizontal: 20,
            minWidth: 30,
            textAlign: 'center',
          }}>
            {quantity}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={increaseQuantity}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.white }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Add to Cart Button */}
      <TouchableOpacity
        style={[GlobalStyles.button, { marginVertical: 20 }]}
        onPress={handleAddToCart}
      >
        <Text style={GlobalStyles.buttonText}>
          Add to Cart
        </Text>
      </TouchableOpacity>

      {/* Product Details */}
      <View style={GlobalStyles.card}>
        <Text style={[typography.subheading, { marginBottom: 10 }]}>
          Product Details
        </Text>
        <Text style={typography.body}>
          • Made with premium ingredients{'\n'}
          • Freshly baked daily{'\n'}
          • Suitable for all occasions{'\n'}
          • Free delivery on orders over ₨ 2,000
        </Text>
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;