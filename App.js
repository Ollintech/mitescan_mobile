import React, { useState, useEffect } from 'react';
import { View, Text, Image, Animated, TouchableOpacity, Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

// Importando as telas
import LoadingScreen from './src/screens/LoadingScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import BeehiveListScreen from './src/screens/BeehiveListScreen';
import BeehiveEditScreen from './src/screens/BeehiveEditScreen';
import BeehiveRegisterScreen from './src/screens/BeehiveRegisterScreen';
import MapScreen from './src/screens/MapScreen';
import CameraScreen from './src/screens/CameraScreen';
import AnalysisScreen from './src/screens/AnalysisScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import UsersScreen from './src/screens/UsersScreen';
import UserEditScreen from './src/screens/UserEditScreen';

// Importando os ícones personalizados
import homeIcon from './assets/nav-icon/home-icon.png';
import beehiveIcon from './assets/nav-icon/register-hive-icon.png';
import analysisIcon from './assets/nav-icon/analisys-icon.png';
import historyIcon from './assets/nav-icon/list-analisys-icon.png';
import usersIcon from './assets/nav-icon/profile-icon.png';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Componente personalizado para as tabs com animações
function CustomTabBar({ state, descriptors, navigation }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const animatedValues = state.routes.map(() => new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedValues[activeIndex], {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      ...animatedValues.map((anim, index) =>
        Animated.timing(anim, {
          toValue: index === activeIndex ? 1 : 0,
          duration: 300,
          useNativeDriver: false,
        })
      )
    ]).start();
  }, [activeIndex]);

  const handleTabPress = (route, index) => {
    setActiveIndex(index);
    navigation.navigate(route.name);
  };

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const isActive = activeIndex === index;

        const animatedScale = animatedValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.1],
        });

        const animatedOpacity = animatedValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0.7, 1],
        });

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabItem}
            onPress={() => handleTabPress(route, index)}
            activeOpacity={0.8}
          >
            <Animated.View
              style={[
                styles.tabContent,
                {
                  transform: [{ scale: animatedScale }],
                  opacity: animatedOpacity,
                }
              ]}
            >
              {/* Ícone com efeito de brilho */}
              <View style={styles.iconContainer}>
                <Image 
                  source={getIconByName(route.name)}
                  style={[
                    styles.tabIcon,
                    { tintColor: isActive ? '#333333' : '#000000' }
                  ]}
                />
                {isActive && <View style={styles.iconGlow} />}
              </View>
              
              {/* Label com animação */}
              <Animated.Text
                style={[
                  styles.tabLabel,
                  {
                    color: isActive ? '#333333' : '#000000',
                    fontWeight: isActive ? '700' : '500',
                  }
                ]}
              >
                {options.title}
              </Animated.Text>
              
              {/* Indicador inferior */}
              {isActive && (
                <Animated.View 
                  style={[
                    styles.activeIndicator,
                    {
                      opacity: animatedValues[index],
                      transform: [{
                        scale: animatedValues[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 1],
                        })
                      }]
                    }
                  ]}
                />
              )}
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// Função para obter o ícone correto
function getIconByName(routeName) {
  switch (routeName) {
    case 'Dashboard':
      return homeIcon;
    case 'Colmeias':
      return beehiveIcon;
    case 'Análises':
      return analysisIcon;
    case 'Histórico':
      return historyIcon;
    case 'Usuários':
      return usersIcon;
    default:
      return homeIcon;
  }
}

// Navegação principal com tabs
function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={HomeScreen}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen 
        name="Colmeias" 
        component={BeehiveListScreen}
        options={{ title: 'Colmeias' }}
      />
      <Tab.Screen 
        name="Análises" 
        component={AnalysisScreen}
        options={{ title: 'Análises' }}
      />
      <Tab.Screen 
        name="Histórico" 
        component={HistoryScreen}
        options={{ title: 'Histórico' }}
      />
      <Tab.Screen 
        name="Usuários" 
        component={UsersScreen}
        options={{ title: 'Usuários' }}
      />
    </Tab.Navigator>
  );
}

// Estilos
const styles = {
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFD700',
    height: 90,
    paddingBottom: 15,
    paddingTop: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 20,
    position: 'relative',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 3,
  },
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  iconGlow: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    backgroundColor: 'rgba(51, 51, 51, 0.1)',
    borderRadius: 20,
    zIndex: -1,
  },
  tabLabel: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 1,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -8,
    width: 6,
    height: 6,
    backgroundColor: '#333333',
    borderRadius: 3,
  },
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        initialRouteName="Loading"
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          transitionSpec: {
            open: {
              animation: 'timing',
              config: { duration: 400, easing: Easing.bezier(0.25, 0.46, 0.45, 0.94) },
            },
            close: {
              animation: 'timing',
              config: { duration: 350, easing: Easing.bezier(0.55, 0.055, 0.675, 0.19) },
            },
          },
        }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="BeehiveRegister" component={BeehiveRegisterScreen} />
        <Stack.Screen name="BeehiveEdit" component={BeehiveEditScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="UserEdit" component={UserEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
