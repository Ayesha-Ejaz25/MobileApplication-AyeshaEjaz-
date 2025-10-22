// frontend/screens/ProductDetail.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const theme = {
  primary:'#A77370', secondary:'#C87377', accent:'#D38F8F',
  light:'#FEE3E5', background:'#FDD4D7', text:'#4A4A4A'
};

export default function ProductDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;

  const images = product.images || [product.image];
  const [mainImage,setMainImage] = useState(images[0]);

  const reviews = [
    { id: 1, name: 'Ayesha', comment: 'Amazing product!', rating:5 },
    { id: 2, name: 'Sara', comment: 'Loved it!', rating:4 },
    { id: 3, name: 'Hina', comment: 'Perfect fragrance.', rating:4.5 },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff"/>
        </TouchableOpacity>
        <Text style={styles.logo}>Blossoms by Aysh</Text>
        <View style={{width:24}}/>
      </View>

      <Image source={mainImage} style={styles.mainImage}/>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbnails}>
        {images.map((img,idx)=>(
          <TouchableOpacity key={idx} onPress={()=>setMainImage(img)}>
            <Image source={img} style={styles.thumbnailImage}/>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>PKR {product.price.toLocaleString()}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.rating}>
          {Array.from({length:5},(_,i)=>(
            <Ionicons key={i} name={i<Math.floor(product.rating)?'star':'star-outline'} size={18} color="#FFD700"/>
          ))}
          <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
        </View>

      </View>

      <TouchableOpacity style={styles.cartButton}>
        <Text style={styles.cartButtonText}>Add to Cart</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Customer Reviews</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.reviewContainer}>
        {reviews.map((r)=>(
          <View key={r.id} style={styles.reviewCard}>
            <Text style={styles.reviewName}>{r.name}</Text>
            <View style={styles.reviewRating}>
              {Array.from({length:5},(_,i)=>(
                <Ionicons key={i} name={i<Math.floor(r.rating)?'star':'star-outline'} size={14} color="#FFD700"/>
              ))}
            </View>
            <Text style={styles.reviewText}>{r.comment}</Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:theme.background},
  header:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:theme.primary,padding:12,paddingTop:40},
  logo:{fontFamily:'AguDisplay', fontSize:20,color:'#fff',textAlign:'center'},
  mainImage:{width:width,height:400,resizeMode:'cover'},
  thumbnails:{flexDirection:'row',marginVertical:10,paddingHorizontal:10},
  thumbnailImage:{width:80,height:80,marginRight:10,borderRadius:10},
  info:{paddingHorizontal:16,marginBottom:12},
  name:{fontFamily:'AguDisplay', fontSize:20, color:theme.primary, marginBottom:6},
  price:{fontFamily:'AguDisplay', fontSize:18, color:theme.secondary, marginBottom:6},
  rating:{flexDirection:'row',alignItems:'center'},
  ratingText:{marginLeft:6,fontFamily:'AguDisplay', color:theme.text},
  description:{marginTop:8,fontFamily:'AguDisplay', fontSize:14, color:theme.text},
  cartButton:{backgroundColor:theme.primary,marginHorizontal:16,paddingVertical:12,borderRadius:25,alignItems:'center',marginBottom:20},
  cartButtonText:{color:'#fff',fontFamily:'AguDisplay', fontSize:16},
  sectionTitle:{fontFamily:'AguDisplay', fontSize:18,color:theme.primary,paddingHorizontal:16,marginBottom:8},
  reviewContainer:{paddingLeft:16,marginBottom:20},
  reviewCard:{width:200,backgroundColor:theme.light,borderRadius:12,padding:10,marginRight:12},
  reviewName:{fontFamily:'AguDisplay',fontWeight:'bold',marginBottom:4},
  reviewRating:{flexDirection:'row',marginBottom:6},
  reviewText:{fontFamily:'AguDisplay', fontSize:14, color:theme.text},
});
