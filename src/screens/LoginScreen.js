import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simulação de login
    if (login && password) {
      navigation.replace('MainTabs');
    }
  };

  return (
    <View style={styles.container}>
      {/* Fundo amarelo com padrão de abelhas */}
      <View style={styles.beePattern}>
        {[...Array(20)].map((_, index) => (
          <View key={index} style={[styles.beeOutline, {
            left: (index % 5) * 80 + (index % 2) * 40,
            top: Math.floor(index / 5) * 70
          }]}>
            <Text style={styles.beeIcon}>🐝</Text>
          </View>
        ))}
      </View>

      {/* Card branco centralizado */}
      <View style={styles.loginCard}>
        {/* Ícone circular preto com abelha branca */}
        <View style={styles.iconContainer}>
          <View style={styles.blackCircle}>
            <Text style={styles.whiteBee}>🐝</Text>
          </View>
        </View>

        {/* Título Login */}
        <Text style={styles.loginTitle}>Login</Text>

        {/* Campo Login */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Login:</Text>
          <TextInput
            style={styles.textInput}
            value={login}
            onChangeText={setLogin}
            placeholder="Digite seu login"
            placeholderTextColor="#999"
          />
        </View>

        {/* Campo Senha */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Senha:</Text>
          <TextInput
            style={styles.textInput}
            value={password}
            onChangeText={setPassword}
            placeholder="Digite sua senha"
            placeholderTextColor="#999"
            secureTextEntry
          />
        </View>

        {/* Botão ENTRAR com gradiente */}
        <TouchableOpacity style={styles.enterButton} onPress={handleLogin}>
          <LinearGradient
            colors={['#FFD700', '#FFA500']}
            style={styles.gradientButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.enterButtonText}>ENTRAR</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Texto de cadastro */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            Não possui conta? <Text style={styles.registerLink}>Cadastre-se!</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  beePattern: {
    position: 'absolute',
    width: width,
    height: height,
  },
  beeOutline: {
    position: 'absolute',
    opacity: 0.3,
  },
  beeIcon: {
    fontSize: 24,
    color: '#DAA520',
  },
  loginCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    width: width * 0.85,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  iconContainer: {
    marginTop: -30,
    marginBottom: 20,
  },
  blackCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  whiteBee: {
    fontSize: 32,
    color: '#FFFFFF',
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  textInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000000',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  enterButton: {
    width: '100%',
    marginTop: 10,
    marginBottom: 30,
    borderRadius: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  gradientButton: {
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enterButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  registerContainer: {
    alignItems: 'center',
  },
  registerText: {
    fontSize: 16,
    color: '#666666',
  },
  registerLink: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
});
