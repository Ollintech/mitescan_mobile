import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, Modal } from 'react-native';
import HeaderBanner from '../components/HeaderBanner';

const { width } = Dimensions.get('window');

export default function BeehiveRegisterScreen({ navigation }) {
    const [formData, setFormData] = useState({
        name: 'COLMEIA 1',
        size: 'GRANDE',
        type: 'BOMBUS TEMARIUS',
        location: ''
    });

    const [showSizeModal, setShowSizeModal] = useState(false);
    const [showTypeModal, setShowTypeModal] = useState(false);

    const sizes = ['PEQUENA', 'MÉDIA', 'GRANDE'];
    const types = ['APIS MELLIFERA', 'BOMBUS TEMARIUS', 'TRIGONA SPINIPES'];

    const handleConfirm = () => {
        console.log('Dados da colmeia:', formData);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            {/* Header com Banner */}
            <HeaderBanner />

            {/* Área de conteúdo branca */}
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
                        <Text style={styles.cardTitle}>CADASTRAR COLMEIA</Text>
                    </View>

                    {/* Ícone de abelha e instrução */}
                    <View style={styles.instructionContainer}>
                        <Image 
                            source={require('../../assets/icon-bee.png')} 
                            style={styles.instructionBeeIcon}
                            resizeMode="contain"
                        />
                        <Text style={styles.instructionText}>PREENCHA AS INFORMAÇÕES ABAIXO</Text>
                    </View>

                    {/* Campo Nome */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Nome:</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.name}
                            onChangeText={(text) => setFormData({ ...formData, name: text })}
                        />
                    </View>

                    {/* Campo Tamanho - Dropdown */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Tamanho:</Text>
                        <TouchableOpacity 
                            style={styles.dropdownInput}
                            onPress={() => setShowSizeModal(true)}
                        >
                            <Text style={styles.dropdownText}>{formData.size}</Text>
                            <Text style={styles.dropdownArrow}>▼</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Campo Tipo de Abelha - Dropdown */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Tipo de Abelha:</Text>
                        <TouchableOpacity 
                            style={styles.dropdownInput}
                            onPress={() => setShowTypeModal(true)}
                        >
                            <Text style={styles.dropdownText}>{formData.type}</Text>
                            <Text style={styles.dropdownArrow}>▼</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Campo Localização */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Localização:</Text>
                        <TouchableOpacity 
                            style={styles.actionInput}
                            onPress={() => navigation.navigate('Map')}
                        >
                            <Text style={styles.actionInputText}>Clique aqui para definir localização</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Botão Confirmar */}
                    <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                        <Text style={styles.confirmButtonText}>CONFIRMAR</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Modal para seleção de Tamanho */}
            <Modal
                visible={showSizeModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowSizeModal(false)}
            >
                <TouchableOpacity 
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowSizeModal(false)}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Selecione o Tamanho</Text>
                        {sizes.map((size, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.modalOption}
                                onPress={() => {
                                    setFormData({ ...formData, size });
                                    setShowSizeModal(false);
                                }}
                            >
                                <Text style={styles.modalOptionText}>{size}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Modal para seleção de Tipo de Abelha */}
            <Modal
                visible={showTypeModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowTypeModal(false)}
            >
                <TouchableOpacity 
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowTypeModal(false)}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Selecione o Tipo de Abelha</Text>
                        {types.map((type, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.modalOption}
                                onPress={() => {
                                    setFormData({ ...formData, type });
                                    setShowTypeModal(false);
                                }}
                            >
                                <Text style={styles.modalOptionText}>{type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
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
    instructionContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    instructionBeeIcon: {
        width: 50,
        height: 50,
        tintColor: '#000000',
        marginBottom: 10,
    },
    instructionText: {
        fontSize: 14,
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
    input: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: '#000000',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    dropdownInput: {
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
    dropdownText: {
        fontSize: 16,
        color: '#000000',
        flex: 1,
    },
    dropdownArrow: {
        fontSize: 12,
        color: '#000000',
        marginLeft: 10,
    },
    actionInput: {
        backgroundColor: '#FFC90B',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        alignItems: 'center',
    },
    actionInputText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000000',
    },
    confirmButton: {
        backgroundColor: '#FFC90B',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalOption: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    modalOptionText: {
        fontSize: 16,
        color: '#000000',
    },
});
