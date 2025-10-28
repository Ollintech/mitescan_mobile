import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Alert, Platform, Image, ActivityIndicator } from 'react-native';
import { getStoredUser, updateHive, deleteHive } from '../api/client';

const { width } = Dimensions.get('window');

// Componente do Header customizado (Baseado na imagem Minhas Colmeias)
const CustomHeader = ({ navigation, title }) => (
    <View style={headerStyles.header}>
        {/* Container para Seta de Retorno e Título */}
        <View style={headerStyles.headerContent}>
            <TouchableOpacity 
                onPress={() => navigation.goBack()} 
                style={headerStyles.backButton}
            >
                {/* Seta de retorno <- */}
                <Text style={headerStyles.backIcon}>←</Text>
            </TouchableOpacity>
            
            <Text style={headerStyles.title}>{title}</Text>
        </View>

        {/* Botão Adicionar (ou Editar) - Usei um ícone de caneta para edição */}
        <TouchableOpacity style={headerStyles.addButton}>
             <Text style={headerStyles.addText}>✎</Text>
        </TouchableOpacity>
    </View>
);

const headerStyles = StyleSheet.create({
    header: {
        backgroundColor: '#FFD700', // Amarelo do design
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50, // Ajuste para status bar
        paddingBottom: 15,
        elevation: 0, // Remove a sombra padrão do header, se houver
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        paddingRight: 15,
        paddingVertical: 5,
    },
    backIcon: {
        fontSize: 30,
        color: '#333',
        fontWeight: '300',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    addButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    addText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default function BeehiveEditScreen({ navigation, route }) {
    // Desestrutura o objeto beehive recebido via navegação
    const { beehive } = route.params || {};
    
    const [formData, setFormData] = useState({
        name: 'COLMEIA 1', // Mock data para visualização
        location: '-24.708450, -48.002531', // Mock data
        description: 'Colmeia do apiário sul, instalada sob sombra parcial.',
        type: 'Bombus Temarius', // Mock data
        capacity: '10', 
        installationDate: '10/05/2023',
        status: 'healthy',
        notes: ''
    });

    // Popula o formulário com os dados da colmeia quando o componente é montado ou 'beehive' muda
    useEffect(() => {
        if (beehive) {
            setFormData({
                name: beehive.name || '',
                location: beehive.location || '',
                description: beehive.description || '',
                type: beehive.type || '',
                capacity: beehive.capacity ? String(beehive.capacity) : '', 
                installationDate: beehive.installationDate || '',
                status: beehive.status || 'healthy',
                notes: beehive.notes || ''
            });
        }
        // Remove o header nativo para usar o customizado
        navigation.setOptions({ headerShown: false });
    }, [beehive, navigation]);

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
        Alert.alert('Confirmar', 'Salvar alterações desta colmeia?', [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Salvar', onPress: async () => {
              try {
                const user = await getStoredUser();
                if (!user?.id || !beehive?.id) throw new Error('Dados insuficientes');
                // Extrair lat/lng se formato "lat, lng"
                let location_lat; let location_lng;
                const parts = String(formData.location).split(',').map(p => parseFloat(p));
                if (parts.length === 2 && parts.every(n => !Number.isNaN(n))) {
                  location_lat = parts[0];
                  location_lng = parts[1];
                }
                const update = {
                  bee_type_id: undefined,
                  location_lat,
                  location_lng,
                  size: formData.capacity ? Number(formData.capacity) : undefined,
                  humidity: undefined,
                  temperature: undefined,
                };
                await updateHive(user.id, beehive.id, update);
                Alert.alert('Sucesso', 'Colmeia atualizada com sucesso!', [{ text: 'OK', onPress: () => navigation.goBack() }]);
              } catch (e) {
                Alert.alert('Erro', String(e?.data?.detail || e?.message || 'Falha ao atualizar colmeia'));
              }
            }
          }
        ]);
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
                    onPress: async () => {
                      try {
                        const user = await getStoredUser();
                        if (!user?.id || !beehive?.id) throw new Error('Dados insuficientes');
                        await deleteHive(user.id, beehive.id, { confirm: true });
                        Alert.alert('Sucesso', 'Colmeia excluída com sucesso!', [{ text: 'OK', onPress: () => navigation.goBack() }]);
                      } catch (e) {
                        Alert.alert('Erro', String(e?.data?.detail || e?.message || 'Falha ao excluir colmeia'));
                      }
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
    
    // Função para renderizar o padrão de fundo (hexágonos cinzas)
    const renderBackgroundPattern = () => (
        <View style={styles.backgroundPattern}>
            {[...Array(10)].map((_, i) => (
                <Text key={i} style={styles.hexIcon}>⬢</Text>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            
            {/* 1. Header Customizado no estilo da imagem */}
            <CustomHeader 
                navigation={navigation} 
                title={'MINHAS COLMEIAS'} 
            />
            
            {/* 2. ScrollView principal com padrão de fundo */}
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Padrão de hexágonos no fundo do ScrollView */}
                {renderBackgroundPattern()}

                {/* Card de Detalhes da Colmeia (Simulando o Card da imagem, mas adaptado para edição) */}
                <View style={styles.infoCard}>
                    <Image 
                        source={{ uri: 'https://via.placeholder.com/100x120.png?text=Abelha' }} 
                        style={styles.beehiveImage} 
                    />
                    <View style={styles.infoDetails}>
                        <Text style={styles.cardTitle}>{formData.name}</Text>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailIcon}>🐝</Text>
                            <Text style={styles.detailText}>{formData.type}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailIcon}>📍</Text>
                            <Text style={styles.detailText}>{formData.location}</Text>
                        </View>
                    </View>
                    
                    {/* Status lateral - Adaptado para a tela de edição */}
                    <View style={[styles.statusBox, { borderColor: getStatusColor(formData.status) }]}>
                        <Text style={styles.statusBoxTitle}>ESTADO</Text>
                        <Text style={[styles.statusBoxText, { color: getStatusColor(formData.status) }]}>
                            {formData.status === 'healthy' ? 'SEGURA' : 'PERIGO'}
                        </Text>
                    </View>
                </View>
                
                {/* Formulário de Edição (Mantido com estilos limpos) */}
                <View style={styles.formCard}>
                    <Text style={styles.formCardTitle}>Editar Informações</Text>
                    
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
                        <Text style={styles.inputLabel}>Tipo da Abelha</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ex: Apis Mellifera"
                            placeholderTextColor="#999"
                            value={formData.type}
                            onChangeText={(value) => handleInputChange('type', value)}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Localização * (Coordenadas)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="-XX.XXXXXX, -YY.YYYYYY"
                            placeholderTextColor="#999"
                            value={formData.location}
                            onChangeText={(value) => handleInputChange('location', value)}
                        />
                    </View>
                    
                    {/* Botões de status adaptados para a aparência final */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Status Manual (para testes)</Text>
                        <View style={styles.statusButtons}>
                            {['healthy', 'warning', 'critical'].map(s => (
                                <TouchableOpacity 
                                    key={s}
                                    style={[
                                        styles.statusButtonFinal, 
                                        formData.status === s && { backgroundColor: getStatusColor(s), borderColor: getStatusColor(s) }
                                    ]}
                                    onPress={() => handleInputChange('status', s)}
                                >
                                    <Text style={[
                                        styles.statusButtonTextFinal,
                                        formData.status === s && { color: 'white' }
                                    ]}>
                                        {s === 'healthy' ? 'Saudável' : s === 'warning' ? 'Atenção' : 'Crítica'}
                                    </Text>
                                </TouchableOpacity>
                            ))}
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
                            numberOfLines={4}
                        />
                    </View>
                </View>
                
                {/* Botões de ação Final */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity 
                        style={[styles.actionButton, styles.deleteButtonFinal]}
                        onPress={handleDelete}
                    >
                        <Text style={styles.deleteButtonTextFinal}>🗑️ EXCLUIR</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[styles.actionButton, styles.saveButtonFinal]}
                        onPress={handleSave}
                    >
                        <Text style={styles.saveButtonTextFinal}>SALVAR</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#383838', // Fundo externo cinza escuro
    },
    backgroundPattern: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        opacity: 0.1, // Suaviza a visibilidade
        flexDirection: 'column',
        alignItems: 'flex-end',
        pointerEvents: 'none', // Garante que o toque passe através
    },
    hexIcon: {
        fontSize: 100,
        color: '#999', // Cinza para o padrão
        lineHeight: 80,
    },
    scrollContainer: {
        padding: 20,
        flexGrow: 1, 
        backgroundColor: '#f5f5f5', // Fundo da seção de conteúdo branco/claro
        borderTopLeftRadius: 30, // Curva superior para transição do fundo
        borderTopRightRadius: 30,
        marginTop: -20, // Sobrepõe um pouco o header
        paddingTop: 30,
        paddingBottom: 100, 
    },
    
    // --- Card de Detalhes (Adaptado da imagem da lista) ---
    infoCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    beehiveImage: {
        width: 100,
        height: 120,
        borderRadius: 10,
        marginRight: 15,
        resizeMode: 'cover',
    },
    infoDetails: {
        flex: 1,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    detailIcon: {
        fontSize: 16,
        marginRight: 5,
        color: '#999',
    },
    detailText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    statusBox: {
        width: 80,
        height: 100,
        borderRadius: 10,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        marginLeft: 10,
        backgroundColor: '#e8f5e9', // Fundo claro para o status
    },
    statusBoxTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    statusBoxText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    
    // --- Formulário de Edição ---
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
    formCardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10,
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
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
        height: 100, 
        textAlignVertical: 'top', 
    },
    statusButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    statusButtonFinal: {
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 10,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    statusButtonTextFinal: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    
    // --- Botões de Ação Final (Fundo Amarelo) ---
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 20,
    },
    actionButton: {
        borderRadius: 10,
        padding: 15,
        flex: 1,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    deleteButtonFinal: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#F44336',
        marginRight: 10,
    },
    deleteButtonTextFinal: {
        color: '#F44336',
        fontSize: 16,
        fontWeight: 'bold',
    },
    saveButtonFinal: {
        backgroundColor: '#FFD700', // Amarelo principal
    },
    saveButtonTextFinal: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
});