import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PerfilScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#D32F2F" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Meu Perfil</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Seção de Informações Pessoais */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatarLarge} />
                        <TouchableOpacity style={styles.editPhotoButton}>
                            <Ionicons name="camera" size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.userName}>Danielle da Silva Rogério</Text>
                    <Text style={styles.userRole}>Nutricionista - SESI</Text>
                    <Text style={styles.userEmail}>danielle.silva@portalsesisp.org.br</Text>

                    <TouchableOpacity style={styles.editProfileButton}>
                        <Text style={styles.editProfileText}>Editar Perfil</Text>
                    </TouchableOpacity>
                </View>

                {/* Seção de Estatísticas Gerais */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Estatísticas Gerais</Text>

                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <Ionicons name="restaurant" size={24} color="#D32F2F" />
                            <Text style={styles.statNumber}>28.5</Text>
                            <Text style={styles.statLabel}>Kg Desperdiçados</Text>
                            <Text style={styles.statPeriod}>Esta Semana</Text>
                        </View>

                        <View style={styles.statCard}>
                            <Ionicons name="volume-high" size={24} color="#4CAF50" />
                            <Text style={styles.statNumber}>65.4</Text>
                            <Text style={styles.statLabel}>dB Médios</Text>
                            <Text style={styles.statPeriod}>Média Semanal</Text>
                        </View>

                        <View style={styles.statCard}>
                            <Ionicons name="calendar" size={24} color="#FFA726" />
                            <Text style={styles.statNumber}>24</Text>
                            <Text style={styles.statLabel}>Dias Registrados</Text>
                            <Text style={styles.statPeriod}>Este Mês</Text>
                        </View>

                        <View style={styles.statCard}>
                            <Ionicons name="school" size={24} color="#2196F3" />
                            <Text style={styles.statNumber}>156</Text>
                            <Text style={styles.statLabel}>Alunos</Text>
                            <Text style={styles.statPeriod}>Atendidos</Text>
                        </View>
                    </View>
                </View>

                {/* Seção de Resumo do Mês */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Resumo do Mês</Text>

                    <View style={styles.monthSummaryCard}>
                        <View style={styles.summaryRow}>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryLabel}>Desperdício Total</Text>
                                <Text style={styles.summaryValue}>112.8 kg</Text>
                                <Text style={styles.summaryTrend}>↘️ 12% vs mês anterior</Text>
                            </View>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryLabel}>Ruído Médio</Text>
                                <Text style={styles.summaryValue}>68.2 dB</Text>
                                <Text style={styles.summaryTrend}>↘️ 5% vs mês anterior</Text>
                            </View>
                        </View>

                        <View style={styles.summaryRow}>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryLabel}>Dias com Baixo Desperdício</Text>
                                <Text style={styles.summaryValue}>18</Text>
                                <Text style={styles.summaryTrend}>↗️ 3 dias a mais</Text>
                            </View>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryLabel}>Eficiência Alimentar</Text>
                                <Text style={styles.summaryValue}>87%</Text>
                                <Text style={styles.summaryTrend}>↗️ 8% de melhoria</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Seção de Configurações */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Configurações</Text>

                    <View style={styles.menuList}>
                        <TouchableOpacity style={styles.menuItem}>
                            <Ionicons name="notifications-outline" size={24} color="#666" />
                            <Text style={styles.menuText}>Notificações</Text>
                            <Ionicons name="chevron-forward" size={20} color="#999" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem}>
                            <Ionicons name="school-outline" size={24} color="#666" />
                            <Text style={styles.menuText}>Minha Escola</Text>
                            <Ionicons name="chevron-forward" size={20} color="#999" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem}>
                            <Ionicons name="people-outline" size={24} color="#666" />
                            <Text style={styles.menuText}>Turmas Responsáveis</Text>
                            <Ionicons name="chevron-forward" size={20} color="#999" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem}>
                            <Ionicons name="lock-closed-outline" size={24} color="#666" />
                            <Text style={styles.menuText}>Privacidade</Text>
                            <Ionicons name="chevron-forward" size={20} color="#999" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem}>
                            <Ionicons name="help-circle-outline" size={24} color="#666" />
                            <Text style={styles.menuText}>Ajuda & Suporte</Text>
                            <Ionicons name="chevron-forward" size={20} color="#999" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem}>
                            <Ionicons name="information-circle-outline" size={24} color="#666" />
                            <Text style={styles.menuText}>Sobre o App</Text>
                            <Ionicons name="chevron-forward" size={20} color="#999" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Seção de Ações Rápidas */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ações Rápidas</Text>

                    <View style={styles.quickActions}>
                        <TouchableOpacity style={styles.quickActionItem}>
                            <Ionicons name="document-text-outline" size={28} color="#D32F2F" />
                            <Text style={styles.quickActionText}>Relatório Semanal</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.quickActionItem}>
                            <Ionicons name="analytics-outline" size={28} color="#4CAF50" />
                            <Text style={styles.quickActionText}>Análises</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.quickActionItem}>
                            <Ionicons name="share-social-outline" size={28} color="#2196F3" />
                            <Text style={styles.quickActionText}>Compartilhar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Botão Sair */}
                <TouchableOpacity style={styles.logoutButton}>
                    <Ionicons name="log-out-outline" size={24} color="#D32F2F" />
                    <Text style={styles.logoutText}>Sair da Conta</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#F5F5F5',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#D32F2F',
    },
    placeholder: {
        width: 40,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    profileSection: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 30,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    avatarLarge: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#D32F2F',
    },
    editPhotoButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#D32F2F',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        textAlign: 'center',
    },
    userRole: {
        fontSize: 16,
        color: '#D32F2F',
        fontWeight: '600',
        marginBottom: 5,
        textAlign: 'center',
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
    editProfileButton: {
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    editProfileText: {
        color: '#D32F2F',
        fontWeight: '600',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    statCard: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#D32F2F',
        marginTop: 8,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        fontWeight: '500',
    },
    statPeriod: {
        fontSize: 10,
        color: '#999',
        textAlign: 'center',
        marginTop: 2,
    },
    monthSummaryCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    summaryItem: {
        flex: 1,
        paddingHorizontal: 10,
    },
    summaryLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
        fontWeight: '500',
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 2,
    },
    summaryTrend: {
        fontSize: 10,
        color: '#4CAF50',
        fontWeight: '500',
    },
    menuList: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        marginLeft: 15,
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    quickActionItem: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 15,
        marginHorizontal: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    quickActionText: {
        fontSize: 12,
        color: '#333',
        marginTop: 8,
        textAlign: 'center',
        fontWeight: '500',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 15,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    logoutText: {
        fontSize: 16,
        color: '#D32F2F',
        fontWeight: '600',
        marginLeft: 10,
    },
});

export default PerfilScreen;