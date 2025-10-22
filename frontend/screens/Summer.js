import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2; // 2 columns

const theme = {
  primary: '#A77370',
  secondary: '#C87377',
  accent: '#D38F8F',
  light: '#FEE3E5',
  background: '#FDD4D7',
  text: '#4A4A4A',
};

// Products arrays
const PRET_PRODUCTS = [
  { id: 'pret1', name: 'Pret S 1', price: 3499, rating: 4.5, images: [require('../../assets/images/PretS1.0.jpg'), require('../../assets/images/PretS1.1.jpg'), require('../../assets/images/PretS1.2.jpg')],description: 'Nice, light summer cloth perfect for warm weather.' },
  { id: 'pret2', name: 'Pret S 2', price: 3999, rating: 4.2, images: [require('../../assets/images/PretS2.0.jpg'), require('../../assets/images/PretS2.1.jpg'), require('../../assets/images/PretS2.2.jpg')],description: 'Nice, light summer cloth perfect for warm weather.' },
  { id: 'pret3', name: 'Pret S 3', price: 3299, rating: 4.6, images: [require('../../assets/images/PretS3.0.jpg'), require('../../assets/images/PretS3.1.jpg'), require('../../assets/images/PretS3.2.jpg')] ,description: 'Nice, light summer cloth perfect for warm weather.'},
  { id: 'pret4', name: 'Pret S 4', price: 3799, rating: 4.3, images: [require('../../assets/images/PretS4.0.jpg'), require('../../assets/images/PretS4.1.jpg'), require('../../assets/images/PretS4.2.jpg')],description: 'Nice, light summer cloth perfect for warm weather.' },
];

const UNSTITCHED_PRODUCTS = [
  { id: 'uns1', name: 'UnS 1', price: 2499, rating: 4.1, images: [require('../../assets/images/UnS1.0.jpg'), require('../../assets/images/UnS1.1.jpg'), require('../../assets/images/UnS1.2.jpg')],description: 'Nice, light summer cloth perfect for warm weather.' },
  { id: 'uns2', name: 'UnS 2', price: 2799, rating: 4.0, images: [require('../../assets/images/UnS2.0.jpg'), require('../../assets/images/UnS2.1.jpg'), require('../../assets/images/UnS2.2.jpg')],description: 'Nice, light summer cloth perfect for warm weather.' },
  { id: 'uns3', name: 'UnS 3', price: 2199, rating: 4.4, images: [require('../../assets/images/UnS3.0.jpg'), require('../../assets/images/UnS3.1.jpg'), require('../../assets/images/UnS3.2.jpg')],description: 'Nice, light summer cloth perfect for warm weather.' },
  { id: 'uns4', name: 'UnS 4', price: 2899, rating: 4.2, images: [require('../../assets/images/UnS4.0.jpg'), require('../../assets/images/UnS4.1.jpg')],description: 'Nice, light summer cloth perfect for warm weather.' },
];

export default function Summer() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState('Pret'); // default category
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const products = selected === 'Pret' ? PRET_PRODUCTS : UNSTITCHED_PRODUCTS;

  // Scale animation for press/hover
  const scaleMap = useRef(products.reduce((acc, p) => ({ ...acc, [p.id]: new Animated.Value(1) }), {})).current;
  products.forEach(p => { if (!scaleMap[p.id]) scaleMap[p.id] = new Animated.Value(1); });

  const onPressIn = id => Animated.spring(scaleMap[id], { toValue: 0.97, useNativeDriver: true }).start();
  const onPressOut = id => Animated.spring(scaleMap[id], { toValue: 1, friction: 6, useNativeDriver: true }).start();

  const renderCard = ({ item }) => {
    const scale = scaleMap[item.id] || new Animated.Value(1);

    return (
      <View style={styles.cardWrap}>
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={() => navigation.navigate('ProductDetail', { product: item })}
          onPressIn={() => onPressIn(item.id)}
          onPressOut={() => onPressOut(item.id)}
          onMouseEnter={() => Platform.OS === 'web' && Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start()}
          onMouseLeave={() => Platform.OS === 'web' && Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()}
        >
          <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
            <Image source={item.images[0]} style={styles.image} />
            <TouchableOpacity style={styles.cartBtn} activeOpacity={0.9}>
              <Ionicons name="cart" size={18} color="#fff" />
            </TouchableOpacity>
            <View style={styles.cardBody}>
              <Text numberOfLines={1} style={styles.cardTitle}>{item.name}</Text>
              <View style={styles.row}>
                <Text style={styles.price}>PKR {item.price.toLocaleString()}</Text>
                <Text style={styles.rating}>★ {item.rating}</Text>
              </View>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.logo}>Blossoms by Aysh</Text>
      </View>

      <View style={styles.titleRow}>
        <Text style={styles.title}>Summer Collection</Text>
        <View style={styles.selectorWrap}>
          <TouchableOpacity
            style={styles.selector}
            onPress={() => setDropdownOpen(prev => !prev)}
            activeOpacity={0.9}
          >
            <Text style={styles.selectorText}>{selected}</Text>
            <Ionicons name={dropdownOpen ? 'chevron-up' : 'chevron-down'} size={18} color={theme.primary} />
          </TouchableOpacity>

          {dropdownOpen && (
            <View style={styles.dropdown}>
              <TouchableOpacity onPress={() => { setSelected('Pret'); setDropdownOpen(false); }} style={styles.option}>
                <Text style={styles.optionText}>Pret</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setSelected('Unstitched'); setDropdownOpen(false); }} style={styles.option}>
                <Text style={styles.optionText}>Unstitched</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <FlatList
        data={products}
        keyExtractor={(i) => i.id}
        renderItem={renderCard}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.background },
  header: {
    width: '100%',
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A77370',
    marginTop: 0,
    paddingTop: 50,
  },
  backBtn: {
    position: 'absolute',
    left: 10,
    top: Platform.OS === 'ios' ? 50 : 20,
    padding: 35,
    zIndex: 10,
  },
  logo: {
    fontFamily: 'AguDisplay',
    fontSize: 20,
    color: '#fffdfcff',
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 6,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'AguDisplay',
    fontSize: 22,
    color: theme.text,
  },

  selectorWrap: { position: 'relative' },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.light,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.accent,
  },
  selectorText: {
    fontFamily: 'AguDisplay',
    color: theme.primary,
    marginRight: 6,
  },
  dropdown: {
    position: 'absolute',
    right: 0,
    top: 48,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 6,
    width: 140,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#eee',
    zIndex: 9999,
  },
  option: { paddingVertical: 8, paddingHorizontal: 12 },
  optionText: { fontFamily: 'AguDisplay', color: '#333' },

  list: { paddingHorizontal: CARD_MARGIN, paddingBottom: 40 },
  cardWrap: { flex: 1, padding: CARD_MARGIN / 2 },
  card: { backgroundColor: theme.light, borderRadius: 12, overflow: 'hidden' },
  image: { width: CARD_WIDTH, height: CARD_WIDTH, resizeMode: 'cover' },
  cartBtn: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: theme.primary,
    padding: 8,
    borderRadius: 20,
    zIndex: 5,
    opacity: 0.95,
  },
  cardBody: { padding: 10 },
  cardTitle: { fontFamily: 'AguDisplay', fontSize: 14, color: theme.text },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    alignItems: 'center',
  },
  price: { fontFamily: 'AguDisplay', color: theme.primary, fontSize: 14 },
  rating: { fontFamily: 'AguDisplay', color: '#777', fontSize: 13 },
});
