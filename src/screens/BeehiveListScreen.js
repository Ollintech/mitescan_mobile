import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Dimensions, Alert, Image } from 'react-native';

const { width } = Dimensions.get('window');

export default function BeehiveListScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dados mockados das colmeias
  const [beehives] = useState([
    {
      id: 1,
      name: 'Colmeia A1',
      location: 'Fazenda São João',
      status: 'healthy',
      temperature: '35°C',
      humidity: '65%',
      lastAnalysis: '2024-01-15',
      image: '🏠'
    },
    {
      id: 2,
      name: 'Colmeia B2',
      location: 'Fazenda São João',
      status: 'warning',
      temperature: '38°C',
      humidity: '70%',
      lastAnalysis: '2024-01-14',
      image: '🏠'
    },
    {
      id: 3,
      name: 'Colmeia C3',
      location: 'Fazenda Santa Maria',
      status: 'healthy',
      temperature: '36°C',
      humidity: '62%',
      lastAnalysis: '2024-01-13',
      image: '🏠'
    },
    {
      id: 4,
      name: 'Colmeia D4',
      location: 'Fazenda Santa Maria',
      status: 'critical',
      temperature: '40°C',
      humidity: '75%',
      lastAnalysis: '2024-01-12',
      image: '🏠'
    },
    {
      id: 5,
      name: 'Colmeia E5',
      location: 'Fazenda São João',
      status: 'healthy',
      temperature: '34°C',
      humidity: '60%',
      lastAnalysis: '2024-01-11',
      image: '🏠'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return '#4CAF50';
      case 'warning': return '#FF9800';
      case 'critical': return '#F44336';
      default: return '#999';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'healthy': return 'Saudável';
      case 'warning': return 'Atenção';
      case 'critical': return 'Crítica';
      default: return 'Desconhecido';
    }
  };

  const handleEditBeehive = (beehive) => {
    navigation.navigate('BeehiveEdit', { beehive });
  };

  const handleDeleteBeehive = (beehive) => {
    Alert.alert(
      'Excluir Colmeia',
      `Tem certeza que deseja excluir a colmeia "${beehive.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Sucesso', 'Colmeia excluída com sucesso!');
          }
        }
      ]
    );
  };

  const filteredBeehives = beehives.filter(beehive =>
    beehive.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    beehive.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header Amarelo com Logo */}
      
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minhas Colmeias</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('BeehiveRegister')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar colmeias..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filteredBeehives.map((beehive) => (
          <View key={beehive.id} style={styles.beehiveCard}>
            <View style={styles.beehiveHeader}>
              <View style={styles.beehiveImageContainer}>
                <Text style={styles.beehiveImage}>{beehive.image}</Text>
              </View>
              <View style={styles.beehiveInfo}>
                <Text style={styles.beehiveName}>{beehive.name}</Text>
                <Text style={styles.beehiveLocation}>{beehive.location}</Text>
                <View style={styles.statusContainer}>
                  <View 
                    style={[
                      styles.statusIndicator, 
                      { backgroundColor: getStatusColor(beehive.status) }
                    ]} 
                  />
                  <Text style={styles.statusText}>{getStatusText(beehive.status)}</Text>
                </View>
              </View>
              <View style={styles.beehiveMetrics}>
                <Text style={styles.metricText}>🌡️ {beehive.temperature}</Text>
                <Text style={styles.metricText}>💧 {beehive.humidity}</Text>
              </View>
            </View>
            
            <View style={styles.beehiveFooter}>
              <Text style={styles.lastAnalysis}>
                Última análise: {beehive.lastAnalysis}
              </Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={() => handleEditBeehive(beehive)}
                >
                  <Text style={styles.editButtonText}>✏️ Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => handleDeleteBeehive(beehive)}
                >
                  <Text style={styles.deleteButtonText}>🗑️ Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
        
        {filteredBeehives.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>🏠</Text>
            <Text style={styles.emptyStateText}>Nenhuma colmeia encontrada</Text>
            <Text style={styles.emptyStateSubtext}>
              {searchQuery ? 'Tente ajustar sua busca' : 'Adicione sua primeira colmeia'}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  logoHeader: {
    backgroundColor: '#FFD700',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 5,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoHeaderContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoHeaderIcon: {
    width: 95,
    height: 95,
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#FFD700',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  scrollContainer: {
    padding: 20,
  },
  beehiveCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  beehiveHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  beehiveImageContainer: {
    marginRight: 15,
  },
  beehiveImage: {
    fontSize: 40,
  },
  beehiveInfo: {
    flex: 1,
  },
  beehiveName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  beehiveLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
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
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  beehiveMetrics: {
    alignItems: 'flex-end',
  },
  metricText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  beehiveFooter: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  lastAnalysis: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#ffebee',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#f44336',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
