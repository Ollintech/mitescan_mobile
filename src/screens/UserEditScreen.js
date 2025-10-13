import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';

const { width } = Dimensions.get('window');

export default function UserEditScreen({ navigation, route }) {
  const { user } = route.params || {};
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'active',
    phone: '',
    address: '',
    notes: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'user',
        status: user.status || 'active',
        phone: user.phone || '',
        address: user.address || '',
        notes: user.notes || ''
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      Alert.alert('Erro', 'Por favor, preencha pelo menos o nome e email do usuário');
      return;
    }
    
    Alert.alert(
      'Sucesso', 
      'Usuário atualizado com sucesso!', 
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
      'Excluir Usuário',
      `Tem certeza que deseja excluir o usuário "${formData.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Sucesso', 'Usuário excluído com sucesso!', [
              { text: 'OK', onPress: () => navigation.goBack() }
            ]);
          }
        }
      ]
    );
  };

  const getRoleText = (role) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'manager': return 'Gerente';
      case 'user': return 'Usuário';
      default: return 'Desconhecido';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ? '#4CAF50' : '#999';
  };

  const getStatusText = (status) => {
    return status === 'active' ? 'Ativo' : 'Inativo';
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
        <Text style={styles.headerTitle}>Editar Usuário</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Informações do Usuário */}
        <View style={styles.infoCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={styles.userName}>{formData.name || 'Nome do Usuário'}</Text>
          <View style={styles.statusContainer}>
            <View 
              style={[
                styles.statusIndicator, 
                { backgroundColor: getStatusColor(formData.status) }
              ]} 
            />
            <Text style={styles.statusText}>
              Status: {getStatusText(formData.status)}
            </Text>
          </View>
        </View>
        
        {/* Formulário de Edição */}
        <View style={styles.formCard}>
          <Text style={styles.cardTitle}>Editar Informações</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nome Completo *</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome completo do usuário"
              placeholderTextColor="#999"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email *</Text>
            <TextInput
              style={styles.input}
              placeholder="Email do usuário"
              placeholderTextColor="#999"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Função</Text>
            <View style={styles.roleButtons}>
              <TouchableOpacity 
                style={[
                  styles.roleButton, 
                  formData.role === 'user' && styles.roleButtonActive
                ]}
                onPress={() => handleInputChange('role', 'user')}
              >
                <Text style={[
                  styles.roleButtonText,
                  formData.role === 'user' && styles.roleButtonTextActive
                ]}>Usuário</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.roleButton, 
                  formData.role === 'manager' && styles.roleButtonActive
                ]}
                onPress={() => handleInputChange('role', 'manager')}
              >
                <Text style={[
                  styles.roleButtonText,
                  formData.role === 'manager' && styles.roleButtonTextActive
                ]}>Gerente</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.roleButton, 
                  formData.role === 'admin' && styles.roleButtonActive
                ]}
                onPress={() => handleInputChange('role', 'admin')}
              >
                <Text style={[
                  styles.roleButtonText,
                  formData.role === 'admin' && styles.roleButtonTextActive
                ]}>Admin</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Status</Text>
            <View style={styles.statusButtons}>
              <TouchableOpacity 
                style={[
                  styles.statusButton, 
                  formData.status === 'active' && styles.statusButtonActive
                ]}
                onPress={() => handleInputChange('status', 'active')}
              >
                <Text style={[
                  styles.statusButtonText,
                  formData.status === 'active' && styles.statusButtonTextActive
                ]}>Ativo</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.statusButton, 
                  formData.status === 'inactive' && styles.statusButtonActive
                ]}
                onPress={() => handleInputChange('status', 'inactive')}
              >
                <Text style={[
                  styles.statusButtonText,
                  formData.status === 'inactive' && styles.statusButtonTextActive
                ]}>Inativo</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Telefone</Text>
            <TextInput
              style={styles.input}
              placeholder="Telefone do usuário"
              placeholderTextColor="#999"
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              keyboardType="phone-pad"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Endereço</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Endereço do usuário..."
              placeholderTextColor="#999"
              value={formData.address}
              onChangeText={(value) => handleInputChange('address', value)}
              multiline
              numberOfLines={2}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Observações</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Observações sobre o usuário..."
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
    backgroundColor: '#FFD700',
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
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 40,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
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
    height: 60,
    textAlignVertical: 'top',
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roleButton: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  roleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  roleButtonTextActive: {
    color: '#333',
  },
  statusButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusButton: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statusButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
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
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
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
