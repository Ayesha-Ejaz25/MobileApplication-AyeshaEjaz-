import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import GlobalStyles, { colors, typography } from '../styles/GlobalStyles';

const ProductsScreen = ({ navigateTo }) => {
  // All products data
  const products = [
    {
      id: 1,
      name: 'Chocolate Cake',
      description: 'Rich and moist chocolate cake with chocolate frosting',
      price: '₨ 2,499',
      image: require('../../assets/images/choclatecake.jpg'),
    },
    {
      id: 2,
      name: 'Cheese Cake', 
      description: 'Creamy New York style cheese cake with berry topping',
      price: '₨ 2,299',
      image: require('../../assets/images/cheesecake.jpg'),
    },
    {
      id: 3,
      name: 'Red Velvet Cake',
      description: 'Classic red velvet with cream cheese frosting',
      price: '₨ 2,699', 
      image: require('../../assets/images/redvelvetcake.jpg'),
    },
    {
      id: 4,
      name: 'Lotus Cake',
      description: 'Caramelized biscuit cake with lotus spread',
      price: '₨ 2,899',
      image: require('../../assets/images/lotuscake.jpg'),
    },
  ];

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={[GlobalStyles.card, { marginBottom: 15 }]}
      onPress={() => navigateTo('ProductDetail', item)}
    >
      <Image
        source={item.image}
        style={GlobalStyles.productImage}
      />
      <View style={{ paddingTop: 12 }}>
        <Text style={typography.subheading}>{item.name}</Text>
        <Text style={[typography.body, { marginVertical: 5 }]}>
          {item.description}
        </Text>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 8,
        }}>
          <Text style={typography.price}>{item.price}</Text>
          <Text style={{ color: colors.primary, fontWeight: '600' }}>
            View Details →
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[GlobalStyles.container, { paddingTop: 20 }]}>
      <Text style={[typography.heading, { marginBottom: 20, textAlign: 'center' }]}>
        Our Delicious Cakes
      </Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductsScreen;