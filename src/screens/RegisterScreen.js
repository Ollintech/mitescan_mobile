import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert, ScrollView, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }
    
    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }
    
    // Aqui você implementaria a lógica de registro
    Alert.alert('Sucesso', 'Conta criada com sucesso!', [
      { text: 'OK', onPress: () => navigation.navigate('Login') }
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
      
      
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
                 {/* Logo */}
         <View style={styles.logoContainer}>
           <Text style={styles.logoText}>HIVE SCAN</Text>
           <Image 
             source={require('../../assets/icon-bee.png')} 
             style={styles.logoBeeIcon}
             resizeMode="contain"
           />
         </View>
        
        {/* Card de registro */}
        <View style={styles.registerCard}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerIcon}>👤</Text>
            <Text style={styles.headerTitle}>Cadastro</Text>
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nome completo"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            <TextInput
              style={styles.input}
              placeholder="Confirmar senha"
              placeholderTextColor="#999"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>
          
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Cadastrar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonText}>Já tenho conta</Text>
          </TouchableOpacity>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  logoBeeIcon: {
    width: 40,
    height: 40,
    marginTop: 5,
    tintColor: '#333',
  },
  registerCard: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 35,
    width: width * 0.85,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  headerIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  registerButton: {
    backgroundColor: '#FFC90B',
    borderRadius: 15,
    padding: 18,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  registerButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFC90B',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFC90B',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
