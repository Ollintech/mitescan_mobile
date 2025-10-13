import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert, ScrollView, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [conta, setConta] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // 1. Validação de campos vazios
    if (!name || !email || !password || !confirmPassword || !conta) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }
    
    // 2. Validação de senha
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }
    
    // 3. Validação de tamanho da senha
    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }
    
    // 4. Lógica de registro (Simulação de Sucesso)
    Alert.alert('Sucesso', 'Conta criada com sucesso!', [
      { 
        text: 'OK', 
        // Redireciona para o Login, substituindo a tela atual (melhor para autenticação)
        onPress: () => navigation.replace('Login') 
      } 
    ]);
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
      
      {/* ScrollView para garantir que o conteúdo seja rolável se necessário */}
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.registerCard}>
          
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

          {/* Título Cadastro */}
          <Text style={styles.loginTitle}>Cadastro</Text>
          
          {/* Nome completo */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nome completo:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Digite seu nome"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>
          
          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Digite seu email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          {/* Senha */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Senha:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Crie sua senha (mín. 6 caracteres)"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          
          {/* Confirmar senha */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirmar senha:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Confirme sua senha"
              placeholderTextColor="#999"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          {/* Conta root */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Conta root:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Digite sua conta root"
              placeholderTextColor="#999"
              value={conta}
              onChangeText={setConta}
              autoCapitalize="words"
            />
          </View>
          
          {/* Botão CADASTRAR */}
          <TouchableOpacity style={styles.enterButton} onPress={handleRegister}>
            <View style={styles.gradientButton}>
              <Text style={styles.enterButtonText}>CADASTRAR</Text>
            </View>
          </TouchableOpacity>
          
          {/* Link para quem JÁ possui conta */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              Já possui conta? 
              <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.7}>
                <Text style={styles.registerLink}>Fazer Login!</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    opacity: 0.6,
  },
  // AJUSTE VERTICAL: paddingVertical mínimo
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15, 
  },
  
  registerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 25, 
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
    marginBottom: 10,
  },
  blackCircle: {
    width: 50, 
    height: 50, 
    borderRadius: 25,
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
    width: 28, 
    height: 28, 
    tintColor: '#FFFFFF',
  },
  loginTitle: { 
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15, 
  },
  
  // AJUSTE VERTICAL: Espaçamento entre inputs reduzido
  inputContainer: {
    width: '100%',
    marginBottom: 10, 
  },
  inputLabel: {
    fontSize: 14, 
    fontWeight: '600',
    color: '#000000',
    marginBottom: 3, 
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  textInput: { 
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8, 
    fontSize: 16,
    color: '#000000',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  
  // AJUSTE VERTICAL: Espaçamento em torno do botão
  enterButton: { 
    width: '100%',
    marginTop: 5, 
    marginBottom: 15, 
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
    paddingVertical: 12, 
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
    fontSize: 16, 
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  
  // Ajustes finais no link
  registerContainer: {
    alignItems: 'center',
    flexDirection: 'row', 
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 14, 
    color: '#666666',
    lineHeight: 20, 
  },
  registerLink: {
    color: '#FFC90B',
    fontWeight: 'bold',
    marginLeft: 5, 
    fontSize: 14, 
    lineHeight: 20, 
  },
});