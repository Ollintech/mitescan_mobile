import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert, ScrollView, Image } from 'react-native';
import HeaderBanner from '../components/HeaderBanner';

const { width, height } = Dimensions.get('window');

export default function MapScreen({ navigation, route }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  // Verifica se é uma tela de seleção de localização
  const isLocationSelection = route.params?.onLocationSelect;
  
  // Dados mockados das colmeias no mapa (posições em porcentagem)
  const beehiveLocations = [
    { id: 1, name: 'Colmeia A1', x: 25, y: 30, status: 'healthy' },
    { id: 2, name: 'Colmeia B2', x: 55, y: 25, status: 'warning' },
    { id: 3, name: 'Colmeia C3', x: 20, y: 50, status: 'healthy' },
    { id: 4, name: 'Colmeia D4', x: 60, y: 45, status: 'critical' },
    { id: 5, name: 'Colmeia E5', x: 45, y: 40, status: 'healthy' },
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
    if (isLocationSelection) {
      // Se for seleção de localização, seleciona o ponto
      setSelectedLocation(location);
    } else {
      // Comportamento normal da tela de mapa
      setSelectedLocation(location);
      Alert.alert(
        location.name,
        `Status: ${location.status === 'healthy' ? 'Saudável' : location.status === 'warning' ? 'Atenção' : 'Crítica'}`,
        [
          { text: 'Ver Detalhes', onPress: () => navigation.navigate('BeehiveEdit', { beehive: { id: location.id, name: location.name } }) },
          { text: 'Fechar', style: 'cancel' }
        ]
      );
    }
  };

  const handleMapPress = (event) => {
    if (isLocationSelection) {
      // Calcula as coordenadas baseadas na posição do toque
      const { locationX, locationY } = event.nativeEvent;
      const coordinates = {
        latitude: (locationY / height) * 100, // Coordenadas mockadas
        longitude: (locationX / width) * 100
      };
      
      // Endereço mockado baseado na posição
      const address = `Localização selecionada (${coordinates.latitude.toFixed(2)}, ${coordinates.longitude.toFixed(2)})`;
      
      setSelectedLocation({ x: locationX, y: locationY, coordinates, address });
    }
  };

  const handleConfirmLocation = () => {
    if (selectedLocation && isLocationSelection && route.params?.onLocationSelect) {
      const { coordinates, address } = selectedLocation;
      route.params.onLocationSelect(coordinates, address);
      navigation.goBack();
    } else {
      Alert.alert('Informação', 'Localização: JACUPIRANGA, -24.708450, -48.002531');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header com Banner */}
      <HeaderBanner />
      
      {/* Área de conteúdo com ScrollView */}
      <ScrollView 
        style={styles.contentArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
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
            <Text style={styles.cardTitle}>DEFINIR LOCALIZAÇÃO</Text>
          </View>
          
          {/* Área do mapa */}
      <TouchableOpacity 
        style={styles.mapContainer} 
        activeOpacity={1}
        onPress={handleMapPress}
      >
        {/* Fundo do mapa */}
        <View style={styles.mapBackground}>
          {/* Grade do mapa */}
          <View style={styles.mapGrid}>
            {[...Array(12)].map((_, i) => (
              <View key={`h-${i}`} style={[styles.gridLineHorizontal, { top: `${(i * 100) / 12}%` }]} />
            ))}
            {[...Array(12)].map((_, i) => (
              <View key={`v-${i}`} style={[styles.gridLineVertical, { left: `${(i * 100) / 12}%` }]} />
            ))}
          </View>
          
          {/* Marcadores das colmeias existentes */}
          {beehiveLocations.map((location) => (
            <View
              key={location.id}
              style={[
                styles.beehiveMarker,
                {
                  left: `${location.x}%`,
                  top: `${location.y}%`,
                  backgroundColor: getStatusColor(location.status),
                  transform: [{ translateX: -15 }, { translateY: -15 }]
                }
              ]}
            >
              <Text style={styles.markerText}>🏠</Text>
            </View>
          ))}
          
          {/* Marcador de localização selecionada */}
          {selectedLocation && isLocationSelection && (
            <View style={[
              styles.selectedLocationMarker,
              {
                left: selectedLocation.x - 20,
                top: selectedLocation.y - 20,
              }
            ]}>
              <Text style={styles.selectedLocationText}>📍</Text>
            </View>
          )}
          
          {/* Marcador de localização atual */}
          <View style={styles.currentLocationMarker}>
            <View style={styles.currentLocationPin}>
              <Text style={styles.currentLocationText}>📍</Text>
            </View>
            <View style={styles.currentLocationBox}>
              <Text style={styles.currentLocationLabel}>Você está aqui</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      
          {/* Informações de localização */}
          <View style={styles.locationInfo}>
            <View style={styles.locationItem}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.locationText}>JACUPIRANGA</Text>
            </View>
            <View style={styles.locationItem}>
              <Text style={styles.coordinateIcon}>🎯</Text>
              <Text style={styles.coordinateText}>-24.708450, -48.002531</Text>
            </View>
          </View>
        </View>
        
        {/* Botão AVANÇAR */}
        <TouchableOpacity 
          style={styles.advanceButton}
          onPress={handleConfirmLocation}
        >
          <Text style={styles.advanceButtonText}>AVANÇAR</Text>
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
    shadowColor: '#000',
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
  mapContainer: {
    marginBottom: 10,
  },
  mapBackground: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    height: 280,
    position: 'relative',
    borderWidth: 2,
    borderColor: '#4CAF50',
    overflow: 'hidden',
  },
  mapGrid: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  gridLineHorizontal: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  gridLineVertical: {
    position: 'absolute',
    height: '100%',
    width: 1,
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
    bottom: '10%',
    right: '15%',
    alignItems: 'center',
    zIndex: 10,
  },
  currentLocationPin: {
    marginBottom: 5,
  },
  currentLocationText: {
    fontSize: 32,
  },
  currentLocationBox: {
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  currentLocationLabel: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  selectedLocationMarker: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  selectedLocationText: {
    fontSize: 24,
    color: '#FFD700',
  },
  confirmationContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  confirmButton: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
  locationInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 15,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  coordinateIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  coordinateText: {
    fontSize: 14,
    color: '#000000',
  },
  advanceButton: {
    backgroundColor: '#FFC90B',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    width: width * 0.9,
  },
  advanceButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});
