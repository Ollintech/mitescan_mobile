import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { getStoredUser, getAllHives, createHiveAnalysis } from '../api/client';

const { width } = Dimensions.get('window');

export default function AnalysisScreen({ navigation }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedBeehive, setSelectedBeehive] = useState(null);
  const [availableBeehives, setAvailableBeehives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // MOCK opcional (comentado)
  // const MOCK_AVAILABLE_BEEHIVES = [
  //   { id: 1, name: 'Colmeia A1', status: 'healthy', lastAnalysis: '2024-01-15' },
  //   { id: 2, name: 'Colmeia B2', status: 'warning', lastAnalysis: '2024-01-14' },
  // ];

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const user = await getStoredUser();
        if (!user?.id) throw new Error('Usuário não identificado');
        const hives = await getAllHives(user.id);
        const normalized = hives.map(h => ({ id: h.id, name: `Colmeia #${h.id}`, status: 'healthy', lastAnalysis: '—' }));
        if (mounted) setAvailableBeehives(normalized);
      } catch (e) {
        if (mounted) setError(e?.data?.detail || e?.message || 'Erro ao carregar colmeias');
        // if (mounted) setAvailableBeehives(MOCK_AVAILABLE_BEEHIVES);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

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

  const handleStartAnalysis = async (beehive) => {
    try {
      setSelectedBeehive(beehive);
      setIsAnalyzing(true);
      const user = await getStoredUser();
      if (!user?.id) throw new Error('Usuário não identificado');
      // Placeholder: image_path e detection_confidence simulados
      const image_path = 'app://placeholder.jpg';
      const detection_confidence = 0.9;
      const varroa_detected = false;
      await createHiveAnalysis({ hive_id: beehive.id, user_id: user.id, image_path, varroa_detected, detection_confidence });
      setIsAnalyzing(false);
      Alert.alert('Análise', 'Análise registrada com sucesso.');
    } catch (e) {
      setIsAnalyzing(false);
      Alert.alert('Erro', String(e?.data?.detail || e?.message || 'Falha ao criar análise'));
    }
  };

  const handleQuickAnalysis = () => {
    Alert.alert(
      'Análise Rápida',
      'Deseja fazer uma análise rápida da colmeia mais próxima?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Analisar', 
          onPress: () => {
            setIsAnalyzing(true);
            setTimeout(() => {
              setIsAnalyzing(false);
              Alert.alert('Análise Concluída', 'Colmeia analisada com sucesso!');
            }, 2000);
          }
        }
      ]
    );
  };

  if (isAnalyzing) {
    return (
      <View style={styles.analyzingContainer}>
        <View style={styles.analyzingContent}>
          <Text style={styles.analyzingIcon}>🔬</Text>
          <Text style={styles.analyzingTitle}>Analisando Colmeia</Text>
          <Text style={styles.analyzingSubtitle}>
            {selectedBeehive ? selectedBeehive.name : 'Colmeia selecionada'}
          </Text>
          <View style={styles.loadingDots}>
            <View style={[styles.dot, styles.dot1]} />
            <View style={[styles.dot, styles.dot2]} />
            <View style={[styles.dot, styles.dot3]} />
          </View>
          <Text style={styles.analyzingText}>Processando dados...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Análise de Colmeias</Text>
        <TouchableOpacity 
          style={styles.historyButton}
          onPress={() => navigation.navigate('History')}
        >
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading && (
          <View style={{ padding: 20 }}>
            <ActivityIndicator />
          </View>
        )}
        {!!error && !loading && (
          <View style={{ padding: 20 }}>
            <Text style={{ color: '#f44336' }}>{String(error)}</Text>
          </View>
        )}
        
        {/* Lista de Colmeias para Análise */}
        <View style={styles.beehivesCard}>
          <Text style={styles.cardTitle}>Colmeias Disponíveis</Text>
          <Text style={styles.cardSubtitle}>
            Selecione uma colmeia para análise detalhada
          </Text>
          
          {availableBeehives.map((beehive) => (
            <View key={beehive.id} style={styles.beehiveItem}>
              <View style={styles.beehiveInfo}>
                <Text style={styles.beehiveName}>{beehive.name}</Text>
                <View style={styles.statusContainer}>
                  <View 
                    style={[
                      styles.statusIndicator, 
                      { backgroundColor: getStatusColor(beehive.status) }
                    ]} 
                  />
                  <Text style={styles.statusText}>{getStatusText(beehive.status)}</Text>
                </View>
                <Text style={styles.lastAnalysis}>
                  Última análise: {beehive.lastAnalysis}
                </Text>
              </View>
              
              <TouchableOpacity 
                style={styles.analyzeButton}
                onPress={() => handleStartAnalysis(beehive)}
              >
                <Text style={styles.analyzeButtonText}>Analisar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        
        {/* Dicas de Análise */}
        <View style={styles.tipsCard}>
          <Text style={styles.cardTitle}>💡 Dicas para Análise</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipText}>• Mantenha a câmera estável durante a análise</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipText}>• Analise em boa iluminação para melhores resultados</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipText}>• Faça análises regulares para monitorar a saúde</Text>
          </View>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  historyButton: {
    backgroundColor: '#FFD700',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyButtonText: {
    fontSize: 20,
  },
  scrollContainer: {
    padding: 20,
  },
  quickAnalysisCard: {
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
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  quickAnalysisButton: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  quickAnalysisButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  beehivesCard: {
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
  beehiveItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  beehiveInfo: {
    flex: 1,
  },
  beehiveName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
  },
  lastAnalysis: {
    fontSize: 12,
    color: '#999',
  },
  analyzeButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  analyzeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  tipsCard: {
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
  tipItem: {
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  analyzingContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  analyzingContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  analyzingIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  analyzingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  analyzingSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  loadingDots: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFD700',
    marginHorizontal: 4,
  },
  dot1: {
    opacity: 0.3,
  },
  dot2: {
    opacity: 0.6,
  },
  dot3: {
    opacity: 1,
  },
  analyzingText: {
    fontSize: 16,
    color: '#666',
  },
});
