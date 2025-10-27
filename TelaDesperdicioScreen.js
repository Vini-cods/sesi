import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const TelaDesperdicioScreen = ({ navigation }) => {
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

    const dadosNiveisRuido = [
        { nivel: 'Baixo', valor: 45, cor: '#4CAF50' },
        { nivel: 'Moderado', valor: 65, cor: '#FF9800' },
        { nivel: 'Alto', valor: 85, cor: '#F44336' },
        { nivel: 'Muito Alto', valor: 105, cor: '#D32F2F' },
    ];

    const renderBarGraph = (dados, cor, alturaMaxima = 180) => {
        const maxValor = Math.max(...dados.map(item => item.valor));

        return (
            <View style={[styles.graphContainer, { height: alturaMaxima }]}>
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
                            <Text style={styles.barValue}>{item.valor}</Text>
                        </View>
                        <Text style={styles.barLabel}>{item.dia || item.hora}</Text>
                    </View>
                ))}
            </View>
        );
    };

    const renderNoiseLevelGraph = () => {
        return (
            <View style={styles.noiseLevelContainer}>
                {dadosNiveisRuido.map((item, index) => (
                    <View key={index} style={styles.noiseLevelItem}>
                        <View style={styles.noiseLevelHeader}>
                            <View style={[styles.noiseLevelDot, { backgroundColor: item.cor }]} />
                            <Text style={styles.noiseLevelTitle}>{item.nivel}</Text>
                        </View>
                        <View style={styles.noiseLevelBarContainer}>
                            <View
                                style={[
                                    styles.noiseLevelBar,
                                    {
                                        width: `${(item.valor / 120) * 100}%`,
                                        backgroundColor: item.cor
                                    }
                                ]}
                            />
                        </View>
                        <Text style={styles.noiseLevelValue}>{item.valor} dB</Text>
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
                <Text style={styles.title}>Desperdício & Ruído</Text>
                <TouchableOpacity style={styles.profileButton}>
                    <Ionicons name="person-circle" size={34} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >

                {/* Gráfico de Desperdício */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Desperdício Semanal</Text>
                        <Text style={styles.sectionSubtitle}>Total: 155 kg</Text>
                    </View>
                    <View style={styles.graphCard}>
                        {renderBarGraph(dadosDesperdicio, '#D32F2F')}
                    </View>
                </View>

                {/* Gráfico de Decibéis do Refeitório */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Níveis de Ruído - Refeitório</Text>
                        <Text style={styles.sectionSubtitle}>Hoje</Text>
                    </View>
                    <View style={styles.graphCard}>
                        {renderBarGraph(dadosDecibeis, '#4CAF50')}
                        <View style={styles.graphFooter}>
                            <Text style={styles.graphFooterText}>Pico: 85 dB às 12:00</Text>
                        </View>
                    </View>
                </View>

                {/* Escala de Níveis de Ruído */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Escala de Decibéis</Text>
                    <View style={styles.graphCard}>
                        {renderNoiseLevelGraph()}
                        <View style={styles.legend}>
                            <Text style={styles.legendText}>Níveis de ruído recomendados para refeitórios: 45-65 dB</Text>
                        </View>
                    </View>
                </View>

                {/* Dica de Conservação */}
                <View style={styles.tipCard}>
                    <Ionicons name="bulb-outline" size={24} color="#FFA000" />
                    <View style={styles.tipContent}>
                        <Text style={styles.tipTitle}>Dica do Dia</Text>
                        <Text style={styles.tipText}>Reduzir o ruído no refeitório pode diminuir o desperdício em até 15%</Text>
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
                    <Ionicons name="stats-chart" size={26} color="#666" />
                    <Text style={[styles.navText, styles.navTextInactive]}>Estatísticas</Text>
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
        paddingTop: 50,
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
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
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
        alignItems: 'center',
    },
    bar: {
        width: 24,
        borderRadius: 6,
        minHeight: 8,
    },
    barValue: {
        fontSize: 12,
        color: '#333',
        marginTop: 4,
        fontWeight: '600',
    },
    barLabel: {
        fontSize: 13,
        color: '#666',
        textAlign: 'center',
        fontWeight: '500',
    },
    graphFooter: {
        marginTop: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    graphFooterText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
        textAlign: 'center',
    },
    noiseLevelContainer: {
        marginTop: 8,
    },
    noiseLevelItem: {
        marginBottom: 16,
    },
    noiseLevelHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    noiseLevelDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 8,
    },
    noiseLevelTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    noiseLevelBarContainer: {
        height: 8,
        backgroundColor: '#F0F0F0',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 4,
    },
    noiseLevelBar: {
        height: '100%',
        borderRadius: 4,
    },
    noiseLevelValue: {
        fontSize: 12,
        color: '#666',
        textAlign: 'right',
    },
    legend: {
        marginTop: 16,
        padding: 12,
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
    },
    legendText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    tipCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20,
    },
    tipContent: {
        flex: 1,
        marginLeft: 12,
    },
    tipTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    tipText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingVertical: 14,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderTopColor: '#E8E8E8',
        justifyContent: 'space-between',
        paddingBottom: 20,
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