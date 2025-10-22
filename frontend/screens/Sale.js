// frontend/screens/Sale.js
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, Animated, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

const theme = {
  primary: '#A77370',
  secondary: '#C87377',
  accent: '#D38F8F',
  light: '#FEE3E5',
  background: '#FDD4D7',
  text: '#4A4A4A',
};

// ==== Inline Product Data for Sale (2 each from Summer/Winter/Perfumes) ====
const SALE_PRODUCTS = [
  // Summer Pret
  { id:'s_pret1', name:'Pret S 1', price:3499, rating:4.5, images:[
      require('../../assets/images/PretS1.0.jpg'),
      require('../../assets/images/PretS1.1.jpg'),
      require('../../assets/images/PretS1.2.jpg')
    ],description: 'Nice, light summer cloth perfect for warm weather.'
  },
  { id:'s_pret2', name:'Pret S 2', price:3999, rating:4.2, images:[
      require('../../assets/images/PretS2.0.jpg'),
      require('../../assets/images/PretS2.1.jpg'),
      require('../../assets/images/PretS2.2.jpg')
    ],description: 'Nice, light summer cloth perfect for warm weather.'
  },

  // Summer Unstitched
  { id:'s_uns1', name:'UnS 1', price:2499, rating:4.1, images:[
      require('../../assets/images/UnS1.0.jpg'),
      require('../../assets/images/UnS1.1.jpg'),
      require('../../assets/images/UnS1.2.jpg')
    ],description: 'Nice, light summer cloth perfect for warm weather.'
  },
  { id:'s_uns2', name:'UnS 2', price:2799, rating:4.0, images:[
      require('../../assets/images/UnS2.0.jpg'),
      require('../../assets/images/UnS2.1.jpg'),
      require('../../assets/images/UnS2.2.jpg')
    ],description: 'Nice, light summer cloth perfect for warm weather.'
  },

  // Winter Pret
  { id:'w_pret1', name:'Pret W 1', price:3499, rating:4.5, images:[
      require('../../assets/images/PretW1.0.jpg'),
      require('../../assets/images/PretW1.1.jpg'),
      require('../../assets/images/PretW1.2.jpg')
    ],description: 'Warm and cozy winter cloth, perfect for cold weather.'
  },
  { id:'w_pret2', name:'Pret W 2', price:3999, rating:4.2, images:[
      require('../../assets/images/PretW2.0.jpg'),
      require('../../assets/images/PretW2.1.jpg'),
      require('../../assets/images/PretW2.2.jpg')
    ],description: 'Warm and cozy winter cloth, perfect for cold weather.'
  },

  // Winter Unstitched
  { id:'w_uns1', name:'UnW 1', price:2499, rating:4.1, images:[
      require('../../assets/images/UnW1.0.jpg'),
      require('../../assets/images/UnW1.1.jpg'),
      require('../../assets/images/UnW1.2.jpg')
    ],description: 'Warm and cozy winter cloth, perfect for cold weather.'
  },
  { id:'w_uns2', name:'UnW 2', price:2799, rating:4.0, images:[
      require('../../assets/images/UnW2.0.jpg'),
      require('../../assets/images/UnW2.1.jpg'),
      require('../../assets/images/UnW2.2.jpg')
    ],description: 'Warm and cozy winter cloth, perfect for cold weather.'
  },

  // Perfumes Women
  { id:'p_w1', name:'Freg F 1', price:1200, rating:4.5, images:[
      require('../../assets/images/fregF1.0.jpg'),
      require('../../assets/images/fregF1.1.jpg'),
      require('../../assets/images/fregF1.2.jpg')
    ], description: 'Refreshing floral fragrance, perfect for daily wear.'
  },
  { id:'p_w2', name:'Freg F 2', price:1500, rating:4.2, images:[
      require('../../assets/images/fregF2.0.jpg'),
      require('../../assets/images/fregF2.1.jpg'),
      require('../../assets/images/fregF2.2.jpg')
    ], description: 'Refreshing floral fragrance, perfect for daily wear.'
  },

  // Perfumes Men
  { id:'p_m1', name:'Freg M 1', price:1300, rating:4.3, images:[
      require('../../assets/images/fregM1.0.jpg'),
      require('../../assets/images/fregM1.1.jpg'),
      require('../../assets/images/fregM1.2.jpg')
    ], description: 'Refreshing floral fragrance, perfect for daily wear.'
  },
  { id:'p_m2', name:'Freg M 2', price:1600, rating:4.1, images:[
      require('../../assets/images/fregM2.0.jpg'),
      require('../../assets/images/fregM2.1.jpg'),
      require('../../assets/images/fregM2.2.jpg')
    ] ,description: 'Refreshing floral fragrance, perfect for daily wear.'
  },
];

export default function Sale() {
  const navigation = useNavigation();
  const scaleMap = useRef(SALE_PRODUCTS.reduce((acc,p)=>({ ...acc, [p.id]: new Animated.Value(1)}),{})).current;

  SALE_PRODUCTS.forEach(p=>{
    if(!scaleMap[p.id]) scaleMap[p.id] = new Animated.Value(1);
  });

  const onPressIn = id => Animated.spring(scaleMap[id], { toValue:0.97, useNativeDriver:true }).start();
  const onPressOut = id => Animated.spring(scaleMap[id], { toValue:1, friction:6, useNativeDriver:true }).start();

  // scrolling banner animation
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(()=>{
    const interval = setInterval(()=>{
      Animated.timing(scrollX, { toValue: width, duration: 7000, useNativeDriver:true }).start(()=>{
        scrollX.setValue(-width);
      });
    },7000);
    return ()=>clearInterval(interval);
  },[]);

  const renderCard = ({ item })=>{
    const discountPrice = Math.round(item.price * 0.8);
    const scale = scaleMap[item.id] || new Animated.Value(1);
    return (
      <View style={styles.cardWrap}>
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={()=>navigation.navigate('ProductDetail',{product:item})}
          onPressIn={()=>onPressIn(item.id)}
          onPressOut={()=>onPressOut(item.id)}
        >
          <Animated.View style={[styles.card,{transform:[{scale}]}]}>
            <Image source={item.images[0]} style={styles.image}/>
            <View style={styles.cartBtn}>
              <Ionicons name="cart" size={18} color="#fff"/>
            </View>
            <View style={styles.cardBody}>
              <Text numberOfLines={1} style={styles.cardTitle}>{item.name}</Text>
              <View style={styles.row}>
                <Text style={styles.originalPrice}>PKR {item.price.toLocaleString()}</Text>
                <Text style={styles.discountPrice}>PKR {discountPrice.toLocaleString()}</Text>
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
        <TouchableOpacity
          onPress={() => navigation.navigate('Categories')}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.logo}>Blossoms by Aysh</Text>
      </View>

      <View style={styles.bannerWrap}>
        <Animated.Text style={[styles.bannerText,{transform:[{translateX:scrollX}]}]}>
          Flat 20% off on these products avail now!
        </Animated.Text>
      </View>

      <FlatList
        data={SALE_PRODUCTS}
        keyExtractor={i=>i.id}
        renderItem={renderCard}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{flex:1,backgroundColor:theme.background},
  header:{width:'100%',paddingVertical:18,alignItems:'center',justifyContent:'center',backgroundColor:'#A77370',marginTop:0,paddingTop:50},
  backBtn: {
    position: 'absolute',
    left: 10,
    top: Platform.OS === 'ios' ? 50 : 20,
    padding: 35,
    zIndex: 10,
  },
  logo:{fontFamily:'AguDisplay',fontSize:20,color:'#fffdfcff'},

  bannerWrap:{height:25,overflow:'hidden',marginVertical:6,paddingHorizontal:10},
  bannerText:{fontFamily:'AguDisplay',fontSize:19,color:theme.primary},

  list:{paddingHorizontal:CARD_MARGIN,paddingBottom:40},
  cardWrap:{flex:1,padding:CARD_MARGIN/2},
  card:{backgroundColor:theme.light,borderRadius:12,overflow:'hidden'},
  image:{width:CARD_WIDTH,height:CARD_WIDTH,resizeMode:'cover'},
  cartBtn:{position:'absolute',right:10,top:10,backgroundColor:theme.primary,padding:8,borderRadius:20,opacity:0.95,zIndex:5,alignItems:'center',justifyContent:'center'},
  cardBody:{padding:10},
  cardTitle:{fontFamily:'AguDisplay',fontSize:14,color:theme.text},
  row:{flexDirection:'row',justifyContent:'space-between',marginTop:8,alignItems:'center'},
  originalPrice:{fontFamily:'AguDisplay',fontSize:13,color:'#777',textDecorationLine:'line-through'},
  discountPrice:{fontFamily:'AguDisplay',fontSize:14,color:theme.primary,fontWeight:'bold'},
});
