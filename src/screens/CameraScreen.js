import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function CameraScreen({ navigation, route }) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [flashMode, setFlashMode] = useState('off');
  
  const beehive = route.params?.beehive;

  const handleCapture = () => {
    if (isCapturing) return;
    
    setIsCapturing(true);
    
    // Simula o processo de captura
    setTimeout(() => {
      setIsCapturing(false);
      setCapturedImage('https://via.placeholder.com/300x400/FFD700/333?text=Foto+da+Colmeia');
      Alert.alert('Sucesso', 'Foto capturada com sucesso!');
    }, 2000);
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleUsePhoto = () => {
    Alert.alert('Sucesso', 'Foto selecionada para análise!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  const handleFlashToggle = () => {
    setFlashMode(flashMode === 'off' ? 'on' : 'off');
    Alert.alert('Flash', `Flash ${flashMode === 'off' ? 'ativado' : 'desativado'}`);
  };

  const handleSettings = () => {
    Alert.alert('Configurações', 'Funcionalidade em desenvolvimento');
  };

  if (capturedImage) {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Foto Capturada</Text>
          <View style={styles.placeholder} />
        </View>
        
        {/* Imagem capturada */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: capturedImage }} 
            style={styles.capturedImage}
            resizeMode="contain"
          />
        </View>
        
        {/* Informações da colmeia */}
        {beehive && (
          <View style={styles.beehiveInfo}>
            <Text style={styles.beehiveName}>📸 {beehive.name}</Text>
            <Text style={styles.beehiveLocation}>{beehive.location}</Text>
          </View>
        )}
        
        {/* Botões de ação */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.retakeButton}
            onPress={handleRetake}
          >
            <Text style={styles.retakeButtonText}>🔄 Nova Foto</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.useButton}
            onPress={handleUsePhoto}
          >
            <Text style={styles.useButtonText}>✅ Usar Foto</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Câmera</Text>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={handleSettings}
        >
          <Text style={styles.settingsButtonText}>⚙️</Text>
        </TouchableOpacity>
      </View>
      
      {/* Área da câmera */}
      <View style={styles.cameraContainer}>
        {/* Visor da câmera */}
        <View style={styles.cameraView}>
          {/* Grid de foco */}
          <View style={styles.focusGrid}>
            {[...Array(9)].map((_, index) => (
              <View key={index} style={styles.gridCell} />
            ))}
          </View>
          
          {/* Informações da colmeia */}
          {beehive && (
            <View style={styles.beehiveOverlay}>
              <Text style={styles.overlayText}>{beehive.name}</Text>
              <Text style={styles.overlaySubtext}>{beehive.location}</Text>
            </View>
          )}
          
          {/* Indicador de flash */}
          {flashMode === 'on' && (
            <View style={styles.flashIndicator}>
              <Text style={styles.flashText}>⚡</Text>
            </View>
          )}
        </View>
        
        {/* Controles da câmera */}
        <View style={styles.cameraControls}>
          {/* Botão de flash */}
          <TouchableOpacity 
            style={styles.flashButton}
            onPress={handleFlashToggle}
          >
            <Text style={styles.flashButtonText}>
              {flashMode === 'on' ? '⚡' : '⚡'}
            </Text>
          </TouchableOpacity>
          
          {/* Botão de captura */}
          <TouchableOpacity 
            style={[
              styles.captureButton,
              isCapturing && styles.captureButtonCapturing
            ]}
            onPress={handleCapture}
            disabled={isCapturing}
          >
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
          
          {/* Botão de galeria */}
          <TouchableOpacity 
            style={styles.galleryButton}
            onPress={() => Alert.alert('Galeria', 'Funcionalidade em desenvolvimento')}
          >
            <Text style={styles.galleryButtonText}>🖼️</Text>
          </TouchableOpacity>
        </View>
        
        {/* Dicas de uso */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Dicas para uma boa foto:</Text>
          <Text style={styles.tipsText}>• Mantenha a câmera estável</Text>
          <Text style={styles.tipsText}>• Certifique-se de boa iluminação</Text>
          <Text style={styles.tipsText}>• Foque na área da colmeia</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  placeholder: {
    width: 40,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cameraView: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusGrid: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridCell: {
    width: '33.33%',
    height: '33.33%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  beehiveOverlay: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 10,
  },
  overlayText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlaySubtext: {
    color: '#ccc',
    fontSize: 12,
  },
  flashIndicator: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(255, 193, 7, 0.8)',
    padding: 10,
    borderRadius: 20,
  },
  flashText: {
    fontSize: 20,
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  flashButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flashButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFD700',
  },
  captureButtonCapturing: {
    backgroundColor: '#FFD700',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFD700',
  },
  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  tipsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
  },
  tipsTitle: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tipsText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  capturedImage: {
    width: width * 0.9,
    height: height * 0.6,
    borderRadius: 15,
  },
  beehiveInfo: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    alignItems: 'center',
  },
  beehiveName: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  beehiveLocation: {
    color: '#fff',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  retakeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  retakeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  useButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },
  useButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
