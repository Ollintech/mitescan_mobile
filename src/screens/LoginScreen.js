import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [conta, setConta] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simulação de login - A sua lógica atual tem um erro: 'login' não está definido.
    // Presumindo que você queira usar 'email' e 'password' (ou 'conta' e 'password')
    // Corrigi para usar 'email' (que é um campo de login) e 'password'.
    if (email && password) {
      // navigation.replace é usado para substituir a tela atual na pilha
      navigation.replace('MainTabs'); 
    } else {
      // Opcional: Adicionar feedback ao usuário se os campos estiverem vazios
      console.log('Preencha email e senha para logar.');
    }
  };

  const handleRegisterPress = () => {
    // Redireciona para a tela de cadastro
    navigation.navigate('Register'); 
  };

  return (
    <View style={styles.container}>
      {/* Imagem de fundo */}
      <Image 
        source={require('../../assets/background-register.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      {/* Overlay amarelo sólido */}
      <View style={styles.overlay} />
      
      {/* Card branco centralizado */}
      <View style={styles.loginCard}>
        {/* Ícone circular preto com abelha */}
        <View style={styles.iconContainer}>
          <View style={styles.blackCircle}>
            <Image 
              source={require('../../assets/icon-bee.png')} 
              style={styles.beeIcon}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Título Login */}
        <Text style={styles.loginTitle}>Login</Text>

        {/* Campo Conta */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Conta:</Text>
          <TextInput
            style={styles.textInput}
            value={conta}
            onChangeText={setConta}
            placeholder="Digite sua conta root"
            placeholderTextColor="#999"
          />
        </View>

        {/* Campo Login */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email:</Text>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu email"
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

        {/* Botão ENTRAR */}
        <TouchableOpacity style={styles.enterButton} onPress={handleLogin}>
          <View style={styles.gradientButton}>
            <Text style={styles.enterButtonText}>ENTRAR</Text>
          </View>
        </TouchableOpacity>

        {/* Texto de cadastro */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            Não possui conta? 
            {/* TouchableOpacity para o link de cadastro */}
            <TouchableOpacity onPress={handleRegisterPress} activeOpacity={0.7}>
              <Text style={styles.registerLink}>Cadastre-se!</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFC90B',
    opacity: 0.7,
  },

  loginCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 35,
    width: width * 0.85,
    alignItems: 'center',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
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
  beeIcon: {
    width: 32,
    height: 32,
    tintColor: '#FFFFFF',
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
    backgroundColor: '#FFC90B',
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  enterButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  registerContainer: {
    alignItems: 'center',
    // Adicionado flexDirection: 'row' para que o link fique inline com o texto
    flexDirection: 'row', 
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 16,
    color: '#666666',
    // Opcional: Adicionado para garantir que o texto "Não possui conta?" e o TouchableOpacity estejam na mesma linha
    lineHeight: 20, 
  },
  registerLink: {
    color: '#FFC90B',
    fontWeight: 'bold',
    // Adicionado para que o link tenha um espaçamento adequado
    marginLeft: 5, 
    fontSize: 16, // Garantir o mesmo tamanho de fonte
    lineHeight: 20, // Garantir a mesma altura de linha
  },
});