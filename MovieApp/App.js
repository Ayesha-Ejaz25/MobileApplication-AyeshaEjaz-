import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  RefreshControl,
  StatusBar,
  SafeAreaView,
} from 'react-native';

// Netflix-style colors
const colors = {
  primary: '#E50914',
  background: '#141414',
  card: '#2F2F2F',
  text: '#FFFFFF',
  textSecondary: '#B3B3B3',
  header: '#000000',
  separator: '#333333',
};

// Movie posters database - only for the 5 movies from the API
const moviePosters = {
  'Star Wars': 'https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg',
  'Back to the Future': 'https://image.tmdb.org/t/p/w500/xlBivetfrtF84Yx0zISShnNtHYe.jpg',
  'The Matrix': 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
  'Inception': 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
  'Interstellar': 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'
};

// Movie details for the 5 specific movies
const movieDetails = {
  'Star Wars': {
    genres: ['Sci-Fi', 'Adventure', 'Action'],
    description: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire\'s world-destroying battle station.',
    rating: 8.6
  },
  'Back to the Future': {
    genres: ['Adventure', 'Comedy', 'Sci-Fi'],
    description: 'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',
    rating: 8.5
  },
  'The Matrix': {
    genres: ['Action', 'Sci-Fi'],
    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    rating: 8.7
  },
  'Inception': {
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    rating: 8.8
  },
  'Interstellar': {
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    rating: 8.6
  }
};

const MovieScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0.9))[0];

  const fetchMovies = async (isRefresh = false) => {
    try {
      if (!isRefresh) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }
      setError(null);

      const response = await fetch('https://reactnative.dev/movies.json');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const json = await response.json();
      
      // Check if movies array exists
      if (!json.movies || !Array.isArray(json.movies)) {
        throw new Error('Invalid data format from API');
      }
      
      // Only use the movies from the API and add our details
      const enhancedMovies = json.movies.map(movie => {
        const details = movieDetails[movie.title] || {
          genres: ['Action', 'Drama'],
          description: 'A classic movie that has stood the test of time.',
          rating: 8.0
        };
        
        const poster = moviePosters[movie.title] || 'https://image.tmdb.org/t/p/w500/6FxOPJ9Ysilpq0IgkrMJ7PubFhq.jpg';
        
        return {
          ...movie,
          poster: poster,
          genres: details.genres,
          description: details.description,
          rating: details.rating
        };
      });
      
      setMovies(enhancedMovies);
      
      // Animate in the content
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    } catch (err) {
      setError('Failed to load movies. Please try again.');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const onRefresh = () => {
    fetchMovies(true);
  };

  const getReleaseYearColor = (year) => {
    const currentYear = new Date().getFullYear();
    const yearDiff = currentYear - parseInt(year);
    
    if (yearDiff <= 2) return '#10B981'; // Recent - Emerald
    if (yearDiff <= 5) return '#F59E0B'; // Medium - Amber
    return colors.textSecondary; // Older - Gray
  };

  const renderMovieItem = ({ item, index }) => (
    <Animated.View
      style={[
        styles.movieCard,
        {
          opacity: fadeAnim,
          transform: [
            { scale: scaleAnim },
            { translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0]
              })
            }
          ],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => setSelectedMovie(selectedMovie?.id === item.id ? null : item)}
        activeOpacity={0.8}
      >
        <View style={styles.posterContainer}>
          <Image
            source={{ uri: item.poster }}
            style={styles.posterImage}
            resizeMode="cover"
          />
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingBadgeText}>⭐ {item.rating}</Text>
          </View>
        </View>
        
        <View style={styles.movieInfo}>
          <Text style={styles.movieTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.yearContainer}>
            <Text style={[
              styles.releaseYear,
              { color: getReleaseYearColor(item.releaseYear) }
            ]}>
              {item.releaseYear}
            </Text>
          </View>
          <View style={styles.genreContainer}>
            {item.genres && item.genres.map((genre, idx) => (
              <Text key={idx} style={styles.genreTag}>
                {genre}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.chevron}>
          <Text style={styles.chevronText}>
            {selectedMovie?.id === item.id ? '▲' : '▼'}
          </Text>
        </View>
      </TouchableOpacity>

      {selectedMovie?.id === item.id && (
        <Animated.View 
          style={[
            styles.movieDetails,
            {
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Release Year:</Text>
            <Text style={styles.detailValue}>{item.releaseYear}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Rating:</Text>
            <Text style={styles.detailValue}>⭐ {item.rating}/10</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.genreContainer}>
            {item.genres && item.genres.map((genre, idx) => (
              <Text key={idx} style={styles.genreTag}>
                {genre}
              </Text>
            ))}
          </View>
          <Text style={styles.movieDescription}>
            {item.description}
          </Text>
        </Animated.View>
      )}
    </Animated.View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.header} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading Movies...</Text>
          <Text style={styles.loadingSubtext}>Fetching the latest cinema collection</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.header} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorEmoji}>🎬</Text>
          <Text style={styles.errorTitle}>Oops!</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchMovies}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.header} />
      
      {/* Netflix Style Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.netflixLogo}>
            <Text style={styles.netflixLogoText}>N</Text>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Movie Collection</Text>
            <Text style={styles.headerSubtitle}>
              {movies.length} {movies.length === 1 ? 'Movie' : 'Movies'} Available
            </Text>
          </View>
        </View>
      </View>

      {/* Movies List */}
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
            style={styles.refreshControl}
          />
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No movies found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
  },
  loadingSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
  errorEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  retryButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    padding: 16,
    paddingTop: 8,
    backgroundColor: colors.header,
    borderBottomWidth: 1,
    borderBottomColor: colors.separator,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  netflixLogo: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  netflixLogoText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  movieCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginHorizontal: 4,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.separator,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  posterContainer: {
    marginRight: 16,
    position: 'relative',
  },
  posterImage: {
    width: 70,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#404040',
  },
  ratingBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  ratingBadgeText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: 'bold',
  },
  movieInfo: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
    lineHeight: 22,
  },
  yearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  releaseYear: {
    fontSize: 16,
    fontWeight: '600',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreTag: {
    fontSize: 12,
    color: colors.textSecondary,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  chevron: {
    paddingLeft: 8,
  },
  chevronText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  movieDetails: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderTopWidth: 1,
    borderTopColor: colors.separator,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  movieDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginTop: 8,
  },
  separator: {
    height: 1,
    backgroundColor: colors.separator,
    marginVertical: 8,
  },
  refreshControl: {
    backgroundColor: colors.background,
  },
});

export default MovieScreen;