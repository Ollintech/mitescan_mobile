import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';

const { width } = Dimensions.get('window');

export default function BeehiveEditScreen({ navigation, route }) {
  const { beehive } = route.params || {};
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    type: '',
    capacity: '',
    installationDate: '',
    status: 'healthy',
    notes: ''
  });

  useEffect(() => {
    if (beehive) {
      setFormData({
        name: beehive.name || '',
        location: beehive.location || '',
        description: beehive.description || '',
        type: beehive.type || '',
        capacity: beehive.capacity || '',
        installationDate: beehive.installationDate || '',
        status: beehive.status || 'healthy',
        notes: beehive.notes || ''
      });
    }
  }, [beehive]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.location) {
      Alert.alert('Erro', 'Por favor, preencha pelo menos o nome e localização da colmeia');
      return;
    }
    
    Alert.alert(
      'Sucesso', 
      'Colmeia atualizada com sucesso!', 
      [
        { 
          text: 'OK', 
          onPress: () => navigation.goBack() 
        }
      ]
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Excluir Colmeia',
      `Tem certeza que deseja excluir a colmeia "${formData.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Sucesso', 'Colmeia excluída com sucesso!', [
              { text: 'OK', onPress: () => navigation.goBack() }
            ]);
          }
        }
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return '#4CAF50';
      case 'warning': return '#FF9800';
      case 'critical': return '#F44336';
      default: return '#999';
    }
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
        <Text style={styles.headerTitle}>Editar Colmeia</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Informações da Colmeia */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>🏠 {formData.name || 'Nome da Colmeia'}</Text>
          <View style={styles.statusContainer}>
            <View 
              style={[
                styles.statusIndicator, 
                { backgroundColor: getStatusColor(formData.status) }
              ]} 
            />
            <Text style={styles.statusText}>
              Status: {formData.status === 'healthy' ? 'Saudável' : 
                      formData.status === 'warning' ? 'Atenção' : 'Crítica'}
            </Text>
          </View>
        </View>
        
        {/* Formulário de Edição */}
        <View style={styles.formCard}>
          <Text style={styles.cardTitle}>Editar Informações</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nome da Colmeia *</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome da colmeia"
              placeholderTextColor="#999"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Localização *</Text>
            <TextInput
              style={styles.input}
              placeholder="Localização da colmeia"
              placeholderTextColor="#999"
              value={formData.location}
              onChangeText={(value) => handleInputChange('location', value)}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descrição da colmeia..."
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
                placeholder="Tipo da colmeia"
                placeholderTextColor="#999"
                value={formData.type}
                onChangeText={(value) => handleInputChange('type', value)}
              />
            </View>
            
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.inputLabel}>Capacidade</Text>
              <TextInput
                style={styles.input}
                placeholder="Capacidade"
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
              placeholder="Data de instalação"
              placeholderTextColor="#999"
              value={formData.installationDate}
              onChangeText={(value) => handleInputChange('installationDate', value)}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Status</Text>
            <View style={styles.statusButtons}>
              <TouchableOpacity 
                style={[
                  styles.statusButton, 
                  formData.status === 'healthy' && styles.statusButtonActive,
                  { borderColor: '#4CAF50' }
                ]}
                onPress={() => handleInputChange('status', 'healthy')}
              >
                <Text style={[
                  styles.statusButtonText,
                  formData.status === 'healthy' && styles.statusButtonTextActive
                ]}>Saudável</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.statusButton, 
                  formData.status === 'warning' && styles.statusButtonActive,
                  { borderColor: '#FF9800' }
                ]}
                onPress={() => handleInputChange('status', 'warning')}
              >
                <Text style={[
                  styles.statusButtonText,
                  formData.status === 'warning' && styles.statusButtonTextActive
                ]}>Atenção</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.statusButton, 
                  formData.status === 'critical' && styles.statusButtonActive,
                  { borderColor: '#F44336' }
                ]}
                onPress={() => handleInputChange('status', 'critical')}
              >
                <Text style={[
                  styles.statusButtonText,
                  formData.status === 'critical' && styles.statusButtonTextActive
                ]}>Crítica</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Observações</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Observações sobre a colmeia..."
              placeholderTextColor="#999"
              value={formData.notes}
              onChangeText={(value) => handleInputChange('notes', value)}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>
        
        {/* Botões de ação */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <Text style={styles.deleteButtonText}>🗑️ Excluir</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Salvar</Text>
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
  infoCard: {
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
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
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
  statusButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusButton: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statusButtonActive: {
    backgroundColor: '#4CAF50',
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  statusButtonTextActive: {
    color: '#fff',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: '#ffebee',
    borderRadius: 10,
    padding: 15,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#f44336',
    fontSize: 14,
    fontWeight: '600',
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
    fontSize: 14,
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
    fontSize: 14,
    fontWeight: 'bold',
  },
});
