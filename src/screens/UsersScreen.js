import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Dimensions, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons'; // Importação da biblioteca de ícones

const { width } = Dimensions.get('window');

export default function UsersScreen({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    
    // Dados mockados dos usuários
    const [users] = useState([
        {
            id: 1,
            name: 'João Silva',
            email: 'joao.silva@email.com',
            role: 'admin',
            status: 'active',
            avatar: '👨‍🌾'
        },
        {
            id: 2,
            name: 'Maria Santos',
            email: 'maria.santos@email.com',
            role: 'user',
            status: 'active',
            avatar: '👩‍🌾'
        },
        {
            id: 3,
            name: 'Pedro Costa',
            email: 'pedro.costa@email.com',
            role: 'user',
            status: 'inactive',
            avatar: '👨‍🌾'
        },
        {
            id: 4,
            name: 'Ana Oliveira',
            email: 'ana.oliveira@email.com',
            role: 'manager',
            status: 'active',
            avatar: '👩‍🌾'
        },
        {
            id: 5,
            name: 'Carlos Ferreira',
            email: 'carlos.ferreira@email.com',
            role: 'user',
            status: 'active',
            avatar: '👨‍🌾'
        }
    ]);

    const getRoleText = (role) => {
        switch (role) {
            case 'admin': return 'Administrador';
            case 'manager': return 'Gerente';
            case 'user': return 'Usuário';
            default: return 'Desconhecido';
        }
    };

    const getStatusColor = (status) => {
        return status === 'active' ? '#4CAF50' : '#999';
    };

    const getStatusText = (status) => {
        return status === 'active' ? 'Ativo' : 'Inativo';
    };

    const handleEditUser = (user) => {
        Alert.alert('Editar Usuário', `Ação: Editar ${user.name}`);
        // navigation.navigate('UserEdit', { user });
    };

    const handleDeleteUser = (user) => {
        Alert.alert(
            'Excluir Usuário',
            `Tem certeza que deseja excluir o usuário "${user.name}"?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Excluir', 
                    style: 'destructive',
                    onPress: () => {
                        Alert.alert('Sucesso', 'Usuário excluído com sucesso!');
                    }
                }
            ]
        );
    };

    const handleAddUser = () => {
        Alert.alert('Adicionar Usuário', 'Funcionalidade em desenvolvimento');
    };

    const handleLogout = () => {
        Alert.alert(
            'Sair',
            'Tem certeza que deseja sair?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Sair',
                    style: 'destructive',
                    onPress: () => {
                        // Reset da navegação para voltar ao login
                        // navigation.dispatch(
                        //   CommonActions.reset({
                        //     index: 0,
                        //     routes: [{ name: 'Login' }],
                        //   })
                        // );
                        Alert.alert('Logout', 'Simulação de Saída');
                    },
                },
            ]
        );
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Usuários</Text>
                <View style={styles.headerButtons}>
                    <TouchableOpacity 
                        style={styles.logoutButton}
                        onPress={handleLogout}
                    >
                        {/* Ícone de Sair */}
                        <Text style={styles.logoutButtonText}>🚪</Text>
                    </TouchableOpacity>
                    
                    {/* Botão ADICIONAR (create-icon) */}
                    <TouchableOpacity 
                        style={styles.addButton}
                        onPress={handleAddUser}
                    >
                        {/* Substituindo o texto '+' pelo ícone create-icon */}
                        <Ionicons name="add-circle-outline" size={30} color="#333" />
                    </TouchableOpacity>
                </View>
            </View>
            
            {/* Barra de pesquisa */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar usuários..."
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Lista de usuários */}
                {filteredUsers.map((user) => (
                    <View key={user.id} style={styles.userCard}>
                        <View style={styles.userHeader}>
                            <View style={styles.userAvatar}>
                                <Text style={styles.avatarText}>{user.avatar}</Text>
                            </View>
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>{user.name}</Text>
                                <Text style={styles.userEmail}>{user.email}</Text>
                                <View style={styles.userDetails}>
                                    <Text style={styles.userRole}>{getRoleText(user.role)}</Text>
                                    <View style={styles.statusContainer}>
                                        <View 
                                            style={[
                                                styles.statusIndicator, 
                                                { backgroundColor: getStatusColor(user.status) }
                                            ]} 
                                        />
                                        <Text style={styles.statusText}>{getStatusText(user.status)}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        
                        <View style={styles.userActions}>
                            {/* Botão EDITAR (edit-icon) */}
                            <TouchableOpacity 
                                style={styles.editButton}
                                onPress={() => handleEditUser(user)}
                            >
                                {/* Substituindo o texto '✏️ Editar' pelo ícone edit-icon */}
                                <Feather name="edit-3" size={16} color="#333" />
                                <Text style={styles.editButtonText}>Editar</Text>
                            </TouchableOpacity>
                            
                            {/* Botão EXCLUIR (delete-icon) */}
                            <TouchableOpacity 
                                style={styles.deleteButton}
                                onPress={() => handleDeleteUser(user)}
                            >
                                {/* Substituindo o texto '🗑️ Excluir' pelo ícone delete-icon */}
                                <Ionicons name="trash-outline" size={16} color="#f44336" />
                                <Text style={styles.deleteButtonText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
                
                {filteredUsers.length === 0 && (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateIcon}>👥</Text>
                        <Text style={styles.emptyStateText}>Nenhum usuário encontrado</Text>
                        <Text style={styles.emptyStateSubtext}>
                            {searchQuery ? 'Tente ajustar sua busca' : 'Adicione seu primeiro usuário'}
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
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    headerButtons: {
        flexDirection: 'row',
        gap: 10,
    },
    logoutButton: {
        backgroundColor: '#FF6B3b',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    logoutButtonText: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    // Ajuste para acomodar o ícone maior
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Removido addButtonText, pois o ícone é o elemento principal agora
    
    searchContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    searchInput: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
    },
    scrollContainer: {
        padding: 20,
    },
    userCard: {
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
    userHeader: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    avatarText: {
        fontSize: 24,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    userDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userRole: {
        fontSize: 12,
        color: '#999',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        color: '#666',
    },
    userActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 15,
    },
    editButton: {
        backgroundColor: '#FFD700',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
        flex: 1,
        marginRight: 10,
        alignItems: 'center',
        flexDirection: 'row', // Para alinhar o ícone e o texto
        justifyContent: 'center',
        gap: 5, // Espaço entre ícone e texto
    },
    editButtonText: {
        color: '#333',
        fontSize: 14,
        fontWeight: '500',
    },
    deleteButton: {
        backgroundColor: '#ffebee',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row', // Para alinhar o ícone e o texto
        justifyContent: 'center',
        gap: 5, // Espaço entre ícone e texto
    },
    deleteButtonText: {
        color: '#f44336',
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