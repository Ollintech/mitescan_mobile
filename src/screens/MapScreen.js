import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

export default function MapScreen({ navigation, route }) {
  const [selectedCoord, setSelectedCoord] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [loading, setLoading] = useState(true);

  const isLocationSelection = route.params?.onLocationSelect;

  // MOCK beehives no mapa (comentado - pode ativar se quiser)
  // const beehiveLocations = [
  //   { id: 1, name: 'Colmeia A1', latitude: -23.55, longitude: -46.63, status: 'healthy' },
  // ];

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setInitialRegion({
            latitude: -14.2350,
            longitude: -51.9253,
            latitudeDelta: 20,
            longitudeDelta: 20,
          });
          setLoading(false);
          return;
        }
        const current = await Location.getCurrentPositionAsync({});
        setInitialRegion({
          latitude: current.coords.latitude,
          longitude: current.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      } catch (e) {
        setInitialRegion({
          latitude: -14.2350,
          longitude: -51.9253,
          latitudeDelta: 20,
          longitudeDelta: 20,
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleLongPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setSelectedCoord({ latitude, longitude });
  };

  const handleConfirmLocation = () => {
    if (!selectedCoord || !isLocationSelection) return;
    const address = `(${selectedCoord.latitude.toFixed(5)}, ${selectedCoord.longitude.toFixed(5)})`;
    route.params.onLocationSelect(selectedCoord, address);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isLocationSelection ? 'Selecionar Localização' : 'Mapa das Colmeias'}
        </Text>
        {!isLocationSelection && (
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('BeehiveRegister')}>
            <Text style={styles.addButtonText}>+</nText>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.mapContainer}>
        {loading || !initialRegion ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator />
          </View>
        ) : (
          <MapView
            style={styles.map}
            initialRegion={initialRegion}
            onLongPress={handleLongPress}
            showsUserLocation
            showsMyLocationButton
          >
            {selectedCoord && (
              <Marker coordinate={selectedCoord} title="Local selecionado" />
            )}
            {/* {beehiveLocations.map(loc => (
              <Marker key={loc.id} coordinate={{ latitude: loc.latitude, longitude: loc.longitude }} title={loc.name} />
            ))} */}
          </MapView>
        )}
      </View>

      {isLocationSelection && selectedCoord && (
        <View style={styles.confirmationContainer}>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmLocation}>
            <Text style={styles.confirmButtonText}>Confirmar Localização</Text>
          </TouchableOpacity>
        </View>
      )}
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
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
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
  },
  map: {
    flex: 1,
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
});
