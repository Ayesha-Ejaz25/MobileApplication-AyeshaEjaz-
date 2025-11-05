import { StyleSheet } from 'react-native';

// Colors define karein
export const colors = {
  primary: '#FF6B8B',
  secondary: '#FFD166', 
  background: '#FFF9F2',
  textDark: '#2E2E2E',
  textLight: '#666666',
  white: '#FFFFFF',
  border: '#E8E8E8',
};

// Typography define karein
export const typography = StyleSheet.create({
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  subheading: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.textDark,
  },
  body: {
    fontSize: 16,
    color: colors.textLight,
    lineHeight: 22,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
});

// Main global styles
const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
});

export default GlobalStyles;