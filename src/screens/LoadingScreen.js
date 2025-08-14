import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function LoadingScreen({ navigation }) {
  useEffect(() => {
    // Simula um tempo de carregamento e navega para o login
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#FFD700', '#FFA500']}
      style={styles.container}
    >
      {/* Padrão de colmeia de fundo */}
      <View style={styles.honeycombBackground}>
        {[...Array(20)].map((_, index) => (
          <View key={index} style={[styles.honeycombCell, { 
            left: (index % 5) * 80 + (index % 2) * 40,
            top: Math.floor(index / 5) * 70
          }]} />
        ))}
      </View>
      
      {/* Logo principal */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>HIVE SCAN</Text>
        <Text style={styles.logoSubtext}>🐝</Text>
      </View>
      
      {/* Indicador de carregamento */}
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
        <View style={styles.loadingDots}>
          <View style={[styles.dot, styles.dot1]} />
          <View style={[styles.dot, styles.dot2]} />
          <View style={[styles.dot, styles.dot3]} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  honeycombBackground: {
    position: 'absolute',
    width: width,
    height: height,
    opacity: 0.1,
  },
  honeycombCell: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 30,
    transform: [{ rotate: '45deg' }],
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 100,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  logoSubtext: {
    fontSize: 64,
    marginTop: 10,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    fontWeight: '500',
  },
  loadingDots: {
    flexDirection: 'row',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#333',
    marginHorizontal: 4,
  },
  dot1: {
    opacity: 0.3,
  },
  dot2: {
    opacity: 0.6,
  },
  dot3: {
    opacity: 1,
  },
});
