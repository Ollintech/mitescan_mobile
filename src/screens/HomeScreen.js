import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }) {
  const beehives = [
    {
      id: 1,
      name: 'COLMEIA 1',
      temperature: '23°C',
      humidity: '42%',
      status: 'healthy', // healthy, warning, critical
      image: 'https://via.placeholder.com/80x80/FFD700/000000?text=🐝'
    },
    {
      id: 2,
      name: 'COLMEIA 2',
      temperature: '25°C',
      humidity: '45%',
      status: 'warning',
      image: 'https://via.placeholder.com/80x80/FFD700/000000?text=🐝'
    },
    {
      id: 3,
      name: 'COLMEIA 3',
      temperature: '22°C',
      humidity: '38%',
      status: 'healthy',
      image: 'https://via.placeholder.com/80x80/FFD700/000000?text=🐝'
    },
    {
      id: 4,
      name: 'COLMEIA 4',
      temperature: '27°C',
      humidity: '48%',
      status: 'critical',
      image: 'https://via.placeholder.com/80x80/FFD700/000000?text=🐝'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'critical':
        return '🚨';
      default:
        return '❓';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return '#4CAF50';
      case 'warning':
        return '#FF9800';
      case 'critical':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Amarelo */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image 
            source={require('../../assets/ms-icon.png')} 
            style={styles.headerIcon}
            resizeMode="contain"
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Seção de KPIs Agrupados */}
        <View style={styles.kpiSection}>
          <View style={styles.kpiHeader}>
            <Text style={styles.kpiTitle}>INDICADORES PRINCIPAIS</Text>
          </View>
          
          <View style={styles.kpiGrid}>
            {/* KPI Colmeias */}
            <View style={styles.kpiCard}>
              <View style={styles.kpiIconContainer}>
                <Text style={styles.kpiIcon}>🐝</Text>
              </View>
              <Text style={styles.kpiValue}>5</Text>
              <Text style={styles.kpiLabel}>COLMEIAS</Text>
            </View>

            {/* KPI Taxa de Varroa */}
            <View style={styles.kpiCard}>
              <View style={styles.kpiIconContainer}>
                <Text style={styles.kpiIcon}>📊</Text>
              </View>
              <Text style={styles.kpiValue}>40%</Text>
              <Text style={styles.kpiLabel}>TAXA DE VARROA</Text>
            </View>

            {/* KPI Colmeias + Varroa */}
            <View style={styles.kpiCard}>
              <View style={styles.kpiIconContainer}>
                <Text style={styles.kpiIcon}>⚠️</Text>
              </View>
              <Text style={styles.kpiValue}>2</Text>
              <Text style={styles.kpiLabel}>COLMEIAS + VARROA</Text>
            </View>
          </View>
        </View>

        {/* Seção Colmeias em Tempo Real */}
        <View style={styles.realtimeSection}>
          <View style={styles.realtimeHeader}>
            <Text style={styles.realtimeTitle}>SUAS COLMEIAS EM TEMPO REAL</Text>
          </View>
          
          {beehives.map((beehive) => (
            <View key={beehive.id} style={styles.beehiveCard}>
              <Image source={require('../../assets/hive-example.png')} style={styles.beehiveImage} />
              <View style={styles.beehiveInfo}>
                <View style={styles.beehiveRow}>
                  <Text style={styles.beehiveName}>⬤ {beehive.name}</Text>
                </View>
                <View style={styles.beehiveRow}>
                  <Text style={styles.beehiveMetric}>🌡️ {beehive.temperature}</Text>
                  <Text style={styles.beehiveMetric}>💧 {beehive.humidity}</Text>
                </View>
              </View>
              <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(beehive.status) }]}>
                <Text style={styles.statusIcon}>{getStatusIcon(beehive.status)}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFD700',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    width: 75,
    height: 75,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  kpiSection: {
    marginBottom: 30,
  },
  kpiHeader: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  kpiTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  kpiGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  kpiCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    flex: 1,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    minHeight: 120,
  },
  kpiIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  kpiIcon: {
    fontSize: 24,
  },
  kpiValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
    textAlign: 'center',
  },
  kpiLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  realtimeSection: {
    marginBottom: 30,
  },
  realtimeHeader: {
    backgroundColor: '#FFD700',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  realtimeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  beehiveCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  beehiveImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 12,
    resizeMode: 'cover',
  },
  beehiveInfo: {
    flex: 1,
  },
  beehiveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  beehiveName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 15,
  },
  beehiveMetric: {
    fontSize: 14,
    color: '#666',
    marginRight: 20,
  },
  statusIndicator: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusIcon: {
    fontSize: 24,
  },
});
