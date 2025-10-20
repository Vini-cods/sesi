import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const TelaDesperdicioScreen = ({ navigation }) => {
    const decibeis = [50, 60, 70, 80, 90, 100, 150, 200, 250, 300];

    // Dados fictícios para os gráficos
    const dadosDesperdicio = [
        { dia: 'Seg', valor: 20 },
        { dia: 'Ter', valor: 35 },
        { dia: 'Qua', valor: 28 },
        { dia: 'Qui', valor: 42 },
        { dia: 'Sex', valor: 30 },
    ];

    const dadosDecibeis = [
        { hora: '08:00', valor: 55 },
        { hora: '10:00', valor: 78 },
        { hora: '12:00', valor: 85 },
        { hora: '14:00', valor: 52 },
        { hora: '16:00', valor: 80 },
    ];

    const renderBarGraph = (dados, cor) => {
        const maxValor = Math.max(...dados.map(item => item.valor));

        return (
            <View style={styles.graphContainer}>
                {dados.map((item, index) => (
                    <View key={index} style={styles.barContainer}>
                        <View style={styles.barWrapper}>
                            <View
                                style={[
                                    styles.bar,
                                    {
                                        height: `${(item.valor / maxValor) * 80}%`,
                                        backgroundColor: cor
                                    }
                                ]}
                            />
                        </View>
                        <Text style={styles.barLabel}>{item.dia || item.hora}</Text>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#D32F2F" />

            {/* Header com ícone de perfil */}
            <View style={styles.header}>
                <Text style={styles.title}>Desperdício</Text>
                <TouchableOpacity style={styles.profileButton}>
                    <Ionicons name="person-circle" size={34} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >

                {/* Seção Decibéis */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Decibéis</Text>

                    <View style={styles.decibeisList}>
                        {decibeis.map((decibel, index) => (
                            <View key={index} style={[
                                styles.decibelItem,
                                index === decibeis.length - 1 && styles.decibelItemLast
                            ]}>
                                <Text style={styles.decibelText}>{decibel}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Gráfico de Desperdício */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Desperdício Semanal (kg)</Text>
                    <View style={styles.graphCard}>
                        {renderBarGraph(dadosDesperdicio, '#D32F2F')}
                    </View>
                </View>

                {/* Gráfico de Decibéis do Refeitório */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Decibéis do Refeitório</Text>
                    <View style={styles.graphCard}>
                        {renderBarGraph(dadosDecibeis, '#4CAF50')}
                    </View>
                </View>

                {/* Espaço extra para evitar que o conteúdo fique muito próximo da barra inferior */}
                <View style={styles.bottomSpacer} />

            </ScrollView>

            {/* Barra inferior de navegação */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="home" size={26} color="#D32F2F" />
                    <Text style={styles.navText}>Início</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="stats-chart" size={26} color="#D32F2F" />
                    <Text style={styles.navText}>Estatísticas</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="settings" size={26} color="#666" />
                    <Text style={[styles.navText, styles.navTextInactive]}>Config</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="person" size={26} color="#666" />
                    <Text style={[styles.navText, styles.navTextInactive]}>Perfil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        backgroundColor: '#D32F2F',
        paddingVertical: 18,
        paddingHorizontal: 24,
        paddingTop: 50, // Espaço para a status bar
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    profileButton: {
        padding: 4,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    section: {
        marginBottom: 28,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 16,
        marginLeft: 4,
    },
    decibeisList: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 5,
        overflow: 'hidden',
    },
    decibelItem: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    decibelItemLast: {
        borderBottomWidth: 0,
    },
    decibelText: {
        fontSize: 17,
        color: '#333333',
        fontWeight: '400',
    },
    graphCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 5,
    },
    graphContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 180,
        marginTop: 12,
    },
    barContainer: {
        alignItems: 'center',
        flex: 1,
    },
    barWrapper: {
        height: 140,
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    bar: {
        width: 24,
        borderRadius: 6,
        minHeight: 8,
    },
    barLabel: {
        fontSize: 13,
        color: '#666',
        textAlign: 'center',
        fontWeight: '500',
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingVertical: 14,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderTopColor: '#E8E8E8',
        justifyContent: 'space-between',
        paddingBottom: 20, // Espaço para o notch/gestures
    },
    navItem: {
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 8,
    },
    navText: {
        fontSize: 13,
        color: '#D32F2F',
        marginTop: 6,
        fontWeight: '600',
    },
    navTextInactive: {
        color: '#888',
        fontWeight: '500',
    },
    bottomSpacer: {
        height: 20,
    },
});

export default TelaDesperdicioScreen;