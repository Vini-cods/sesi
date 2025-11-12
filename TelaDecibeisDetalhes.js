import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Line, Rect, Text as SvgText } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');

const TelaDecibeisDetalhes = ({ navigation }) => {
    // Dados dos decibéis por dia da semana (segunda a sexta)
    const dadosDecibeisSemana = [
        { dia: 'SEG', decibeis: 65, porcentagem: 75 },
        { dia: 'TER', decibeis: 58, porcentagem: 65 },
        { dia: 'QUA', decibeis: 72, porcentagem: 82 },
        { dia: 'QUI', decibeis: 61, porcentagem: 70 },
        { dia: 'SEX', decibeis: 68, porcentagem: 78 },
    ];

    const renderBarChart = () => {
        const chartHeight = 200;
        const chartWidth = screenWidth - 80;
        const maxDecibeis = 100;
        const barWidth = (chartWidth - 100) / dadosDecibeisSemana.length;

        return (
            <View style={styles.chartContainer}>
                <View style={styles.yAxisLabels}>
                    <Text style={styles.axisLabel}>100</Text>
                    <Text style={styles.axisLabel}>75</Text>
                    <Text style={styles.axisLabel}>50</Text>
                    <Text style={styles.axisLabel}>25</Text>
                    <Text style={styles.axisLabel}>0</Text>
                </View>
                <View style={styles.chartArea}>
                    <Svg width={chartWidth} height={chartHeight}>
                        {/* Linhas de grade horizontais */}
                        {[0, 25, 50, 75, 100].map((value) => {
                            const y = chartHeight - (value / maxDecibeis) * chartHeight;
                            return (
                                <Line
                                    key={value}
                                    x1="0"
                                    y1={y}
                                    x2={chartWidth}
                                    y2={y}
                                    stroke="#f0f0f0"
                                    strokeWidth="1"
                                    strokeDasharray="4,4"
                                />
                            );
                        })}

                        {/* Barras do gráfico */}
                        {dadosDecibeisSemana.map((item, index) => {
                            const x = 50 + (index * barWidth);
                            const barHeight = (item.decibeis / maxDecibeis) * chartHeight;
                            const y = chartHeight - barHeight;

                            return (
                                <View key={index}>
                                    <Rect
                                        x={x}
                                        y={y}
                                        width={barWidth - 10}
                                        height={barHeight}
                                        fill="#D32F2F"
                                        rx={4}
                                    />
                                    <SvgText
                                        x={x + (barWidth - 10) / 2}
                                        y={y - 10}
                                        textAnchor="middle"
                                        fill="#D32F2F"
                                        fontSize="12"
                                        fontWeight="bold"
                                    >
                                        {item.decibeis}dB
                                    </SvgText>
                                    <SvgText
                                        x={x + (barWidth - 10) / 2}
                                        y={chartHeight + 20}
                                        textAnchor="middle"
                                        fill="#666"
                                        fontSize="12"
                                        fontWeight="500"
                                    >
                                        {item.dia}
                                    </SvgText>
                                </View>
                            );
                        })}
                    </Svg>
                </View>
            </View>
        );
    };

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
                <Text style={styles.headerTitle}>Detalhes dos Decibéis</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Card de resumo */}
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>Resumo Semanal</Text>
                    <View style={styles.summaryStats}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>64.8 dB</Text>
                            <Text style={styles.statLabel}>Média Semanal</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>72 dB</Text>
                            <Text style={styles.statLabel}>Pico Máximo</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>58 dB</Text>
                            <Text style={styles.statLabel}>Mínimo</Text>
                        </View>
                    </View>
                </View>

                {/* Gráfico de barras */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Decibéis por Dia da Semana</Text>
                    <View style={styles.chartCard}>
                        {renderBarChart()}
                    </View>
                </View>

                {/* Lista de dias */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Detalhamento por Dia</Text>
                    <View style={styles.daysList}>
                        {dadosDecibeisSemana.map((item, index) => (
                            <View key={index} style={styles.dayItem}>
                                <View style={styles.dayInfo}>
                                    <Text style={styles.dayName}>{item.dia}</Text>
                                    <Text style={styles.dayDecibels}>{item.decibeis} dB</Text>
                                </View>
                                <View style={styles.percentageBar}>
                                    <View 
                                        style={[
                                            styles.percentageFill,
                                            { width: `${item.porcentagem}%` }
                                        ]} 
                                    />
                                    <Text style={styles.percentageText}>{item.porcentagem}%</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Recomendações */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Recomendações</Text>
                    <View style={styles.recommendationsCard}>
                        <View style={styles.recommendationItem}>
                            <Ionicons name="volume-medium-outline" size={20} color="#D32F2F" />
                            <Text style={styles.recommendationText}>
                                Mantenha o volume abaixo de 70 dB durante o trabalho
                            </Text>
                        </View>
                        <View style={styles.recommendationItem}>
                            <Ionicons name="time-outline" size={20} color="#D32F2F" />
                            <Text style={styles.recommendationText}>
                                Faça pausas regulares para descanso auditivo
                            </Text>
                        </View>
                        <View style={styles.recommendationItem}>
                            <Ionicons name="ear-outline" size={20} color="#D32F2F" />
                            <Text style={styles.recommendationText}>
                                Use proteção auditiva em ambientes muito ruidosos
                            </Text>
                        </View>
                    </View>
                </View>
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
    summaryCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#D32F2F',
        marginBottom: 15,
    },
    summaryStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    section: {
        marginBottom: 20,
    },
    sectionLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#D32F2F',
        marginBottom: 12,
    },
    chartCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    chartContainer: {
        flexDirection: 'row',
    },
    yAxisLabels: {
        justifyContent: 'space-between',
        marginRight: 8,
        height: 200,
    },
    axisLabel: {
        fontSize: 10,
        color: '#999',
    },
    chartArea: {
        flex: 1,
    },
    daysList: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    dayItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    dayInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '30%',
    },
    dayName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        width: 40,
    },
    dayDecibels: {
        fontSize: 14,
        color: '#666',
        marginLeft: 10,
    },
    percentageBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    percentageFill: {
        height: '100%',
        backgroundColor: '#D32F2F',
        borderRadius: 10,
    },
    percentageText: {
        position: 'absolute',
        right: 8,
        fontSize: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    recommendationsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    recommendationItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    recommendationText: {
        flex: 1,
        fontSize: 14,
        color: '#333',
        marginLeft: 10,
        lineHeight: 20,
    },
});

export default TelaDecibeisDetalhes;