import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image, Alert } from 'react-native';
import HeaderBanner from '../components/HeaderBanner';

const { width } = Dimensions.get('window');

export default function CameraScreen({ navigation, route }) {
  const handleFinalize = () => {
    Alert.alert('Sucesso', 'Colmeia cadastrada com sucesso!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header com Banner */}
      <HeaderBanner />
      
      {/* Área de conteúdo com ScrollView */}
      <ScrollView 
        style={styles.contentArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollphiIndicator={false}
      >
        {/* Card branco centralizado */}
        <View style={styles.card}>
          {/* Barra de título com botão de voltar */}
          <View style={styles.titleBar}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.cardTitle}>CONECTAR CÂMERA</Text>
          </View>

          {/* Instruções */}
          <Text style={styles.instructions}>
            LIGUE SUA CÂMERA E A CONECTE AO APLICATIVO PARA ANÁLISE!
          </Text>

          {/* Campo de câmera encontrada */}
          <View style={styles.cameraField}>
            <Text style={styles.cameraFieldText}>
              Câmera encontrada: Câmera A8 Icsee
            </Text>
          </View>

          {/* Preview da imagem */}
          <View style={styles.imagePreviewContainer}>
            <Image 
              source={require('../../assets/hive-example.png')} 
              style={styles.imagePreview}
              resizeMode="cover"
            />
          </View>
        </View>
        
        {/* Botão FINALIZAR */}
        <TouchableOpacity 
          style={styles.finalizeButton}
          onPress={handleFinalize}
        >
          <Text style={styles.finalizeButtonText}>FINALIZAR</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentArea: {
    flex: 1,
  },
  scrollContent: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    width: width * 0.9,
    shadowColor: '#/_000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
    marginBottom: 20,
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#FFC90B',
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  backIcon: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    flex: 1,
  },
  instructions: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  cameraField: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cameraFieldText: {
    fontSize: 14,
    color: '#000000',
  },
  imagePreviewContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imagePreview: {
    width: '100%',
    height: 200,
  },
  finalizeButton: {
    backgroundColor: '#FFC90B',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    width: width * 0.9,
  },
  finalizeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});
