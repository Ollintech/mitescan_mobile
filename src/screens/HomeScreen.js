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
        <View style={styles.logoContainer}>
          <Text style={styles.logoMite}>MITE</Text>
          <Text style={styles.logoScan}>SCAN</Text>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Cards Principais */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.hexIcon}>⬡</Text>
            </View>
            <Text style={styles.metricLabel}>COLMEIAS</Text>
            <Text style={styles.metricValue}>5</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.hexIcon}>⬡</Text>
            </View>
            <Text style={styles.metricLabel}>TAXA DE VARROA</Text>
            <Text style={styles.metricValue}>40%</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.hexIcon}>⬡</Text>
            </View>
            <Text style={styles.metricLabel}>COLMEIAS + VARROA</Text>
            <Text style={styles.metricValue}>2</Text>
          </View>
        </View>

        {/* Seção Colmeias em Tempo Real */}
        <View style={styles.realtimeSection}>
          <View style={styles.realtimeHeader}>
            <Text style={styles.realtimeTitle}>SUAS COLMEIAS EM TEMPO REAL</Text>
          </View>
          
          {beehives.map((beehive) => (
            <View key={beehive.id} style={styles.beehiveCard}>
              <Image source={{ uri: beehive.image }} style={styles.beehiveImage} />
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

        {/* Botões de Ação Rápida */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('BeehiveRegister')}
          >
            <Text style={styles.actionButtonText}>+ Nova Colmeia</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Analysis')}
          >
            <Text style={styles.actionButtonText}>🔬 Nova Análise</Text>
          </TouchableOpacity>
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
    paddingTop: 50,
    paddingBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoContainer: {
    alignItems: 'flex-start',
  },
  logoMite: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  logoScan: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    fontSize: 24,
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  metricsContainer: {
    marginBottom: 30,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  metricHeader: {
    marginBottom: 10,
  },
  hexIcon: {
    fontSize: 20,
    color: '#FFD700',
  },
  metricLabel: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    marginBottom: 10,
  },
  metricValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
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
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
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
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    flex: 0.48,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  actionButtonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
});
