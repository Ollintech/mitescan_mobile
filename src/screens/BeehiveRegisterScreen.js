import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';

const { width } = Dimensions.get('window');

export default function BeehiveRegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    type: '',
    capacity: '',
    installationDate: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.location) {
      Alert.alert('Erro', 'Por favor, preencha pelo menos o nome e localização da colmeia');
      return;
    }
    
    Alert.alert(
      'Sucesso', 
      'Colmeia cadastrada com sucesso!', 
      [
        { 
          text: 'OK', 
          onPress: () => navigation.goBack() 
        }
      ]
    );
  };

  const handleTakePhoto = () => {
    Alert.alert('Câmera', 'Funcionalidade de câmera em desenvolvimento');
  };

  const handleSelectLocation = () => {
    Alert.alert('Localização', 'Funcionalidade de GPS em desenvolvimento');
  };

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
        <Text style={styles.headerTitle}>Nova Colmeia</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Card de Foto */}
        <View style={styles.photoCard}>
          <Text style={styles.cardTitle}>📸 Foto da Colmeia</Text>
          <TouchableOpacity 
            style={styles.photoButton}
            onPress={handleTakePhoto}
          >
            <Text style={styles.photoButtonText}>📷 Tirar Foto</Text>
          </TouchableOpacity>
        </View>
        
        {/* Formulário */}
        <View style={styles.formCard}>
          <Text style={styles.cardTitle}>Informações da Colmeia</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nome da Colmeia *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Colmeia A1"
              placeholderTextColor="#999"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Localização *</Text>
            <View style={styles.locationContainer}>
              <TextInput
                style={[styles.input, styles.locationInput]}
                placeholder="Ex: Fazenda São João"
                placeholderTextColor="#999"
                value={formData.location}
                onChangeText={(value) => handleInputChange('location', value)}
              />
              <TouchableOpacity 
                style={styles.locationButton}
                onPress={handleSelectLocation}
              >
                <Text style={styles.locationButtonText}>📍</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descreva características da colmeia..."
              placeholderTextColor="#999"
              value={formData.description}
              onChangeText={(value) => handleInputChange('description', value)}
              multiline
              numberOfLines={3}
            />
          </View>
          
          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.inputLabel}>Tipo</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Langstroth"
                placeholderTextColor="#999"
                value={formData.type}
                onChangeText={(value) => handleInputChange('type', value)}
              />
            </View>
            
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.inputLabel}>Capacidade</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 10 quadros"
                placeholderTextColor="#999"
                value={formData.capacity}
                onChangeText={(value) => handleInputChange('capacity', value)}
              />
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Data de Instalação</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/AAAA"
              placeholderTextColor="#999"
              value={formData.installationDate}
              onChangeText={(value) => handleInputChange('installationDate', value)}
            />
          </View>
        </View>
        
        {/* Botões de ação */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSubmit}
          >
            <Text style={styles.saveButtonText}>Salvar Colmeia</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  scrollContainer: {
    padding: 20,
  },
  photoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  photoButton: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  photoButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationInput: {
    flex: 1,
    marginRight: 10,
  },
  locationButton: {
    backgroundColor: '#4CAF50',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationButtonText: {
    fontSize: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#999',
    borderRadius: 10,
    padding: 15,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#999',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    padding: 15,
    flex: 1,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
