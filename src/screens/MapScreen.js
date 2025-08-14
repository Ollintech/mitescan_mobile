import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function MapScreen({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  // Dados mockados das colmeias no mapa
  const beehiveLocations = [
    { id: 1, name: 'Colmeia A1', x: width * 0.3, y: height * 0.4, status: 'healthy' },
    { id: 2, name: 'Colmeia B2', x: width * 0.6, y: height * 0.3, status: 'warning' },
    { id: 3, name: 'Colmeia C3', x: width * 0.2, y: height * 0.6, status: 'healthy' },
    { id: 4, name: 'Colmeia D4', x: width * 0.7, y: height * 0.7, status: 'critical' },
    { id: 5, name: 'Colmeia E5', x: width * 0.5, y: height * 0.5, status: 'healthy' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return '#4CAF50';
      case 'warning': return '#FF9800';
      case 'critical': return '#F44336';
      default: return '#999';
    }
  };

  const handleLocationPress = (location) => {
    setSelectedLocation(location);
    Alert.alert(
      location.name,
      `Status: ${location.status === 'healthy' ? 'Saudável' : location.status === 'warning' ? 'Atenção' : 'Crítica'}`,
      [
        { text: 'Ver Detalhes', onPress: () => navigation.navigate('BeehiveEdit', { beehive: { id: location.id, name: location.name } }) },
        { text: 'Fechar', style: 'cancel' }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mapa das Colmeias</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('BeehiveRegister')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      {/* Área do mapa */}
      <View style={styles.mapContainer}>
        {/* Fundo do mapa */}
        <View style={styles.mapBackground}>
          {/* Grade do mapa */}
          <View style={styles.mapGrid}>
            {[...Array(10)].map((_, i) => (
              <View key={i} style={[styles.gridLine, { top: (height * 0.8) * (i / 10) }]} />
            ))}
            {[...Array(10)].map((_, i) => (
              <View key={i} style={[styles.gridLine, { left: (width * 0.8) * (i / 10), top: 0, width: 1, height: height * 0.8 }]} />
            ))}
          </View>
          
          {/* Marcadores das colmeias */}
          {beehiveLocations.map((location) => (
            <TouchableOpacity
              key={location.id}
              style={[
                styles.beehiveMarker,
                {
                  left: location.x - 15,
                  top: location.y - 15,
                  backgroundColor: getStatusColor(location.status)
                }
              ]}
              onPress={() => handleLocationPress(location)}
            >
              <Text style={styles.markerText}>🏠</Text>
            </TouchableOpacity>
          ))}
          
          {/* Marcador de localização atual */}
          <View style={styles.currentLocationMarker}>
            <Text style={styles.currentLocationText}>📍</Text>
            <Text style={styles.currentLocationLabel}>Você está aqui</Text>
          </View>
        </View>
        
        {/* Legenda */}
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Legenda</Text>
          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <View style={[styles.legendIndicator, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.legendText}>Saudável</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendIndicator, { backgroundColor: '#FF9800' }]} />
              <Text style={styles.legendText}>Atenção</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendIndicator, { backgroundColor: '#F44336' }]} />
              <Text style={styles.legendText}>Crítica</Text>
            </View>
          </View>
        </View>
      </View>
      
      {/* Botões de ação */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => Alert.alert('GPS', 'Ativando GPS...')}
        >
          <Text style={styles.actionButtonText}>📍 GPS</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => Alert.alert('Zoom', 'Ajustando zoom...')}
        >
          <Text style={styles.actionButtonText}>🔍 Zoom</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('BeehiveRegister')}
        >
          <Text style={styles.actionButtonText}>➕ Nova</Text>
        </TouchableOpacity>
      </View>
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
  mapContainer: {
    flex: 1,
    padding: 20,
  },
  mapBackground: {
    backgroundColor: '#e8f5e8',
    borderRadius: 15,
    height: height * 0.6,
    position: 'relative',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  mapGrid: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  gridLine: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  beehiveMarker: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  markerText: {
    fontSize: 16,
  },
  currentLocationMarker: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
  },
  currentLocationText: {
    fontSize: 24,
  },
  currentLocationLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  legend: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  legendItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    alignItems: 'center',
  },
  legendIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginBottom: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  actionButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
});
