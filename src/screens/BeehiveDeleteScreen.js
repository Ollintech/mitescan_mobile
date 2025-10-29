import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, Alert } from 'react-native';
import HeaderBanner from '../components/HeaderBanner';

const { width } = Dimensions.get('window');

export default function BeehiveDeleteScreen({ navigation, route }) {
    const beehive = route.params?.beehive || {
        name: 'COLMEIA 1',
        size: 'GRANDE',
        type: 'BOMBUS TEMARIUS',
        location: 'JACUPIRANGA, 24.708450, -48.002531'
    };

    const handleDelete = () => {
        Alert.alert(
            'Confirmar Exclusão',
            'Tem certeza que deseja excluir esta colmeia? Esta ação não pode ser desfeita.',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'EXCLUIR',
                    style: 'destructive',
                    onPress: () => {
                        // Lógica de exclusão aqui
                        console.log('Colmeia excluída:', beehive.name);
                        Alert.alert('Sucesso', 'Colmeia excluída com sucesso!', [
                            {
                                text: 'OK',
                                onPress: () => navigation.goBack()
                            }
                        ]);
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            {/* Header com Banner */}
            <HeaderBanner />

            {/* Área de conteúdo */}
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
                        <Text style={styles.cardTitle}>EXCLUIR COLMEIA</Text>
                    </View>

                    {/* Confirmação com ícone de abelha */}
                    <View style={styles.confirmationContainer}>
                        <Image 
                            source={require('../../assets/icon-bee.png')} 
                            style={styles.confirmationBeeIcon}
                            resizeMode="contain"
                        />
                        <Text style={styles.confirmationText}>DESEJA EXCLUIR ESTA COLMEIA?</Text>
                    </View>

                    {/* Informações da colmeia - Nome */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Nome:</Text>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoText}>{beehive.name}</Text>
                        </View>
                    </View>

                    {/* Informações da colmeia - Tamanho */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Tamanho:</Text>
                        <View style={styles.infoBoxWithArrow}>
                            <Text style={styles.infoText}>{beehive.size || 'GRANDE'}</Text>
                            <Text style={styles.arrowIcon}>▼</Text>
                        </View>
                    </View>

                    {/* Informações da colmeia - Tipo */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Tipo de Abelha:</Text>
                        <View style={styles.infoBoxWithArrow}>
                            <Text style={styles.infoText}>{beehive.type || 'BOMBUS TEMARIUS'}</Text>
                            <Text style={styles.arrowIcon}>▼</Text>
                        </View>
                    </View>

                    {/* Informações da colmeia - Localização */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Localização:</Text>
                        <View style={styles.locationBox}>
                            <Text style={styles.locationText}>{beehive.location}</Text>
                        </View>
                    </View>

                    {/* Botão Excluir */}
                    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                        <Text style={styles.deleteButtonText}>EXCLUIR</Text>
                    </TouchableOpacity>
                </View>
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
    },
    titleBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
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
    confirmationContainer: {
        alignItems: 'center',
        marginBottom: 30,
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    confirmationBeeIcon: {
        width: 50,
        height: 50,
        tintColor: '#000000',
        marginBottom: 15,
    },
    confirmationText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
        textAlign: 'center',
    },
    fieldContainer: {
        marginBottom: 20,
    },
    fieldLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 8,
    },
    infoBox: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    infoText: {
        fontSize: 16,
        color: '#000000',
    },
    infoBoxWithArrow: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    arrowIcon: {
        fontSize: 12,
        color: '#000000',
    },
    locationBox: {
        backgroundColor: '#FFC90B',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    locationText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000000',
    },
    deleteButton: {
        backgroundColor: '#DC3545',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    deleteButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});
