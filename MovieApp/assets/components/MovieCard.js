// assets/components/MovieCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const colors = {
  primary: '#E50914',
  background: '#141414',
  card: '#2F2F2F',
  text: '#FFFFFF',
  textSecondary: '#B3B3B3',
};

const MovieCard = ({ movie, onPress, isFeatured = false }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.movieCard,
        isFeatured && styles.featuredCard
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.posterContainer}>
        <Image
          source={{ uri: movie.poster }}
          style={styles.posterImage}
          resizeMode="cover"
        />
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>⭐ {Math.random() * 2 + 8}/10</Text>
        </View>
      </View>
      
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.releaseYear}>
          {movie.releaseYear}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  movieCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  featuredCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  posterContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  posterImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  ratingBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  movieInfo: {
    flex: 1,
  },
  movieTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  releaseYear: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default MovieCard;