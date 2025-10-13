import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Easing, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function LoadingScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideTopAnim = useRef(new Animated.Value(-100)).current;
  const slideBottomAnim = useRef(new Animated.Value(100)).current;
  const logoScaleAnim = useRef(new Animated.Value(0.5)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequência de animações
    const animationSequence = async () => {
      // 1. Anima as imagens de fundo
      await new Promise(resolve => {
        Animated.parallel([
          Animated.timing(slideTopAnim, {
            toValue: 0,
            duration: 1200,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(slideBottomAnim, {
            toValue: 0,
            duration: 1200,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]).start(resolve);
      });

      // 2. Anima o logo principal
      await new Promise(resolve => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(logoScaleAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.elastic(1),
            useNativeDriver: true,
          }),
        ]).start(resolve);
      });

      // 3. Anima a barra de progresso
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    };

    animationSequence();

    // Navega para o login após 4 segundos
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim, scaleAnim, slideTopAnim, slideBottomAnim, logoScaleAnim, progressAnim]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 250],
  });

  return (
    <View style={styles.container}>
      {/* Imagem superior - canto esquerdo */}
      <Animated.View 
        style={[
          styles.topImageContainer,
          {
            transform: [{ translateY: slideTopAnim }]
          }
        ]}
      >
        <Image 
          source={require('../../assets/splash-screen/top.png')} 
          style={styles.topImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Logo principal centralizado */}
      <Animated.View 
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: logoScaleAnim }]
          }
        ]}
      >
        <Image 
          source={require('../../assets/splash-screen/mitescan_logo.png')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Indicador de carregamento */}
      <Animated.View 
        style={[
          styles.loadingContainer,
          {
            opacity: fadeAnim,
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
      </Animated.View>

      {/* Imagem inferior - canto direito */}
      <Animated.View 
        style={[
          styles.bottomImageContainer,
          {
            transform: [{ translateY: slideBottomAnim }]
          }
        ]}
      >
        <Image 
          source={require('../../assets/splash-screen/bottom.png')} 
          style={styles.bottomImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Versão do app */}
      <Animated.Text 
        style={[
          styles.versionText,
          {
            opacity: fadeAnim,
          }
        ]}
      >
        v1.0
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topImageContainer: {
    position: 'absolute',
    top: -40,
    left: 0,
    width: width * 0.4,
    height: height * 0.3,
  },
  topImage: {
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 40,
    marginTop: 60,
  },
  logoImage: {
    width: width * 0.5,
    height: height * 0.12,
    marginBottom: 30,
  },
  tagline: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    fontWeight: '600',
    maxWidth: 280,
    lineHeight: 22,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  loadingBar: {
    width: 250,
    height: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 3,
    marginBottom: 20,
    overflow: 'hidden',
  },
  loadingProgress: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 3,
  },
  loadingText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bottomImageContainer: {
    position: 'absolute',
    bottom: -40,
    right: 0,
    width: width * 0.4,
    height: height * 0.3,
  },
  bottomImage: {
    width: '100%',
    height: '100%',
  },
  versionText: {
    position: 'absolute',
    bottom: 20,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    zIndex: 10,
  },
});
