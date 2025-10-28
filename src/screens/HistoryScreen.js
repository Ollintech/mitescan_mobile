import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { listHiveAnalyses } from '../api/client';

const { width } = Dimensions.get('window');

export default function HistoryScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // const MOCK_ANALYSES = [ ... ] // manter mocks aqui se quiser

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await listHiveAnalyses();
        const normalized = data.map(a => ({
          id: a.id,
          beehiveName: `Colmeia #${a.hive_id}`,
          date: new Date(a.created_at).toISOString().slice(0, 10),
          time: new Date(a.created_at).toISOString().slice(11, 16),
          result: a.varroa_detected ? 'critical' : 'healthy',
          confidence: `${Math.round((a.detection_confidence || 0) * 100)}%`,
          analyst: '—',
          notes: '',
        }));
        if (mounted) setAnalyses(normalized);
      } catch (e) {
        if (mounted) setError(e?.data?.detail || e?.message || 'Erro ao carregar histórico');
        // if (mounted) setAnalyses(MOCK_ANALYSES);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const getResultColor = (result) => {
    switch (result) {
      case 'healthy': return '#4CAF50';
      case 'warning': return '#FF9800';
      case 'critical': return '#F44336';
      default: return '#999';
    }
  };

  const getResultText = (result) => {
    switch (result) {
      case 'healthy': return 'Saudável';
      case 'warning': return 'Atenção';
      case 'critical': return 'Crítica';
      default: return 'Desconhecido';
    }
  };

  const getResultIcon = (result) => {
    switch (result) {
      case 'healthy': return '✅';
      case 'warning': return '⚠️';
      case 'critical': return '🚨';
      default: return '❓';
    }
  };

  const filteredAnalyses = selectedFilter === 'all' 
    ? analyses 
    : analyses.filter(analysis => analysis.result === selectedFilter);

  const getFilterStats = () => {
    const total = analyses.length;
    const healthy = analyses.filter(a => a.result === 'healthy').length;
    const warning = analyses.filter(a => a.result === 'warning').length;
    const critical = analyses.filter(a => a.result === 'critical').length;
    
    return { total, healthy, warning, critical };
  };

  const stats = getFilterStats();

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
        <Text style={styles.headerTitle}>Histórico de Análises</Text>
        <View style={styles.placeholder} />
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
        {/* Estatísticas */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.healthy}</Text>
            <Text style={styles.statLabel}>Saudáveis</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.warning}</Text>
            <Text style={styles.statLabel}>Atenção</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.critical}</Text>
            <Text style={styles.statLabel}>Críticas</Text>
          </View>
        </View>
        
        {/* Filtros */}
        <View style={styles.filtersCard}>
          <Text style={styles.filtersTitle}>Filtrar por Resultado</Text>
          <View style={styles.filterButtons}>
            <TouchableOpacity 
              style={[
                styles.filterButton, 
                selectedFilter === 'all' && styles.filterButtonActive
              ]}
              onPress={() => setSelectedFilter('all')}
            >
              <Text style={[
                styles.filterButtonText,
                selectedFilter === 'all' && styles.filterButtonTextActive
              ]}>Todos</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.filterButton, 
                selectedFilter === 'healthy' && styles.filterButtonActive
              ]}
              onPress={() => setSelectedFilter('healthy')}
            >
              <Text style={[
                styles.filterButtonText,
                selectedFilter === 'healthy' && styles.filterButtonTextActive
              ]}>Saudáveis</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.filterButton, 
                selectedFilter === 'warning' && styles.filterButtonActive
              ]}
              onPress={() => setSelectedFilter('warning')}
            >
              <Text style={[
                styles.filterButtonText,
                selectedFilter === 'warning' && styles.filterButtonTextActive
              ]}>Atenção</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.filterButton, 
                selectedFilter === 'critical' && styles.filterButtonActive
              ]}
              onPress={() => setSelectedFilter('critical')}
            >
              <Text style={[
                styles.filterButtonText,
                selectedFilter === 'critical' && styles.filterButtonTextActive
              ]}>Críticas</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Lista de Análises */}
        {filteredAnalyses.map((analysis) => (
          <View key={analysis.id} style={styles.analysisCard}>
            <View style={styles.analysisHeader}>
              <View style={styles.analysisInfo}>
                <Text style={styles.beehiveName}>{analysis.beehiveName}</Text>
                <Text style={styles.analysisDate}>
                  {analysis.date} às {analysis.time}
                </Text>
              </View>
              <View style={styles.resultContainer}>
                <Text style={styles.resultIcon}>{getResultIcon(analysis.result)}</Text>
                <Text style={[
                  styles.resultText, 
                  { color: getResultColor(analysis.result) }
                ]}>
                  {getResultText(analysis.result)}
                </Text>
              </View>
            </View>
            
            <View style={styles.analysisDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Confiança:</Text>
                <Text style={styles.detailValue}>{analysis.confidence}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Analista:</Text>
                <Text style={styles.detailValue}>{analysis.analyst}</Text>
              </View>
              {analysis.notes && (
                <View style={styles.notesContainer}>
                  <Text style={styles.notesLabel}>Observações:</Text>
                  <Text style={styles.notesText}>{analysis.notes}</Text>
                </View>
              )}
            </View>
            
            <View style={styles.analysisActions}>
              <TouchableOpacity 
                style={styles.viewButton}
                onPress={() => Alert.alert('Ver Detalhes', 'Funcionalidade em desenvolvimento')}
              >
                <Text style={styles.viewButtonText}>👁️ Ver Detalhes</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.shareButton}
                onPress={() => Alert.alert('Compartilhar', 'Funcionalidade em desenvolvimento')}
              >
                <Text style={styles.shareButtonText}>📤 Compartilhar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        
        {filteredAnalyses.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📊</Text>
            <Text style={styles.emptyStateText}>Nenhuma análise encontrada</Text>
            <Text style={styles.emptyStateSubtext}>
              {selectedFilter === 'all' ? 'Realize sua primeira análise' : 'Nenhuma análise com este resultado'}
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
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  filtersCard: {
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
  filtersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  filterButton: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 10,
    minWidth: '48%',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#333',
  },
  analysisCard: {
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
  analysisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  analysisInfo: {
    flex: 1,
  },
  beehiveName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  analysisDate: {
    fontSize: 14,
    color: '#666',
  },
  resultContainer: {
    alignItems: 'center',
  },
  resultIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  resultText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  analysisDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  notesContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  notesLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginBottom: 5,
  },
  notesText: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
  },
  analysisActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  viewButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  shareButton: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#1976d2',
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
