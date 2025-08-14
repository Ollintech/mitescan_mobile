import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegação principal com tabs
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#333',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={HomeScreen}
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="dashboard" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Colmeias" 
        component={BeehiveListScreen}
        options={{
          title: 'Colmeias',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="beehive" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Mapa" 
        component={MapScreen}
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="map" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Análises" 
        component={AnalysisScreen}
        options={{
          title: 'Análises',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="analysis" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Histórico" 
        component={HistoryScreen}
        options={{
          title: 'Histórico',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="history" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Usuários" 
        component={UsersScreen}
        options={{
          title: 'Usuários',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="users" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Componente para ícones das tabs
function TabIcon({ name, color, size }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: size * 0.8, color: color }}>
        {name === 'dashboard' && '🏠'}
        {name === 'beehive' && '🐝'}
        {name === 'map' && '🗺️'}
        {name === 'analysis' && '🔬'}
        {name === 'history' && '📊'}
        {name === 'users' && '👥'}
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        initialRouteName="Loading"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Telas de Autenticação */}
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        
        {/* Navegação Principal com Tabs */}
        <Stack.Screen name="MainTabs" component={MainTabs} />
        
        {/* Telas de Gestão de Colmeias */}
        <Stack.Screen name="BeehiveRegister" component={BeehiveRegisterScreen} />
        <Stack.Screen name="BeehiveEdit" component={BeehiveEditScreen} />
        
        {/* Telas de Funcionalidades */}
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        
        {/* Telas de Gestão de Usuários */}
        <Stack.Screen name="UserEdit" component={UserEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
