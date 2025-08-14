import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function LoadingScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const honeycombAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animação de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // Animação da barra de progresso
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 3500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    // Animação contínua da colmeia
    Animated.loop(
      Animated.timing(honeycombAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Animação de rotação contínua
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();

    // Navega para o login após 4 segundos
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim, scaleAnim, slideAnim, honeycombAnim, rotateAnim, progressAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const honeycombOpacity = honeycombAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.1, 0.2, 0.1],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return (
    <LinearGradient
      colors={['#FFD700', '#FFA500', '#FF8C00']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Padrão de colmeia animado */}
      <Animated.View style={[styles.honeycombBackground, { opacity: honeycombOpacity }]}>
        {[...Array(30)].map((_, index) => (
          <Animated.View 
            key={index} 
            style={[
              styles.honeycombCell, 
              { 
                left: (index % 6) * 70 + (index % 2) * 35,
                top: Math.floor(index / 6) * 60,
                transform: [{ rotate: spin }],
              }
            ]} 
          />
        ))}
      </Animated.View>
      
      {/* Logo principal animado */}
      <Animated.View 
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: slideAnim }
            ]
          }
        ]}
      >
        <Text style={styles.logoText}>HIVE SCAN</Text>
        <Text style={styles.logoSubtext}>🐝</Text>
        <Text style={styles.tagline}>Transformando a apicultura através da tecnologia</Text>
      </Animated.View>
      
      {/* Indicador de carregamento elegante */}
      <Animated.View 
        style={[
          styles.loadingContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.loadingBar}>
          <Animated.View 
            style={[
              styles.loadingProgress,
              {
                width: progressWidth,
              }
            ]} 
          />
        </View>
        <Text style={styles.loadingText}>Inicializando HIVE SCAN...</Text>
      </Animated.View>

      {/* Versão do app */}
      <Animated.Text 
        style={[
          styles.versionText,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        v1.0.0
      </Animated.Text>
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
  },
  honeycombCell: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    transform: [{ rotate: '45deg' }],
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 120,
  },
  logoText: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#333',
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 6,
    letterSpacing: 2,
  },
  logoSubtext: {
    fontSize: 72,
    marginTop: 15,
    marginBottom: 20,
  },
  tagline: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    maxWidth: 280,
    lineHeight: 22,
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  loadingBar: {
    width: 200,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginBottom: 20,
    overflow: 'hidden',
  },
  loadingProgress: {
    height: '100%',
    backgroundColor: '#333',
    borderRadius: 2,
  },
  loadingText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  versionText: {
    position: 'absolute',
    bottom: 40,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
