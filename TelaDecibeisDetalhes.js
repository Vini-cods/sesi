import React, { useState, useRef } from 'react';
import {
    View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView,
    Dimensions, Modal, TextInput, Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Line, Rect, Text as SvgText } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');

const TelaDecibeisDetalhes = ({ navigation }) => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editingData, setEditingData] = useState({ dayIndex: null, decibeis: null });
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);

    // Estado local para os dados dos decibéis
    const [dadosDecibeisSemana, setDadosDecibeisSemana] = useState([
        { dia: 'SEG', decibeis: 65, porcentagem: 75, fullDate: '24/10' },
        { dia: 'TER', decibeis: 58, porcentagem: 65, fullDate: '25/10' },
        { dia: 'QUA', decibeis: 72, porcentagem: 82, fullDate: '26/10' },
        { dia: 'QUI', decibeis: 61, porcentagem: 70, fullDate: '27/10' },
        { dia: 'SEX', decibeis: 68, porcentagem: 78, fullDate: '28/10' },
    ]);

    // Animação para o header
    const scrollY = useRef(new Animated.Value(0)).current;
    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const mediaSemanal = dadosDecibeisSemana.reduce((acc, day) => acc + day.decibeis, 0) / dadosDecibeisSemana.length;
    const picoMaximo = Math.max(...dadosDecibeisSemana.map(day => day.decibeis));
    const minimo = Math.min(...dadosDecibeisSemana.map(day => day.decibeis));

    const selectedDay = dadosDecibeisSemana[selectedDayIndex];

    const handleEditDecibeis = (dayIndex) => {
        setEditingData({
            dayIndex,
            decibeis: dadosDecibeisSemana[dayIndex].decibeis.toString()
        });
        setEditModalVisible(true);
    };

    const handleSaveDecibeis = () => {
        if (editingData.dayIndex !== null && editingData.decibeis !== null) {
            const novosDecibeis = parseInt(editingData.decibeis) || 0;
            const novaPorcentagem = Math.min(novosDecibeis * 1.15, 100);

            setDadosDecibeisSemana(prev =>
                prev.map((item, index) =>
                    index === editingData.dayIndex
                        ? {
                            ...item,
                            decibeis: novosDecibeis,
                            porcentagem: Math.round(novaPorcentagem)
                        }
                        : item
                )
            );
        }
        setEditModalVisible(false);
        setEditingData({ dayIndex: null, decibeis: null });
    };

    // Função de scroll
    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        scrollY.setValue(offsetY);
    };

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
                            const isSelected = index === selectedDayIndex;

                            return (
                                <React.Fragment key={index}>
                                    <Rect
                                        x={x}
                                        y={y}
                                        width={barWidth - 10}
                                        height={barHeight}
                                        fill={isSelected ? "#B71C1C" : "#D32F2F"}
                                        rx={4}
                                    />
                                    <SvgText
                                        x={x + (barWidth - 10) / 2}
                                        y={y - 10}
                                        textAnchor="middle"
                                        fill={isSelected ? "#B71C1C" : "#D32F2F"}
                                        fontSize="12"
                                        fontWeight="bold"
                                    >
                                        {item.decibeis}dB
                                    </SvgText>
                                    <SvgText
                                        x={x + (barWidth - 10) / 2}
                                        y={chartHeight + 20}
                                        textAnchor="middle"
                                        fill={isSelected ? "#D32F2F" : "#666"}
                                        fontSize="12"
                                        fontWeight="500"
                                    >
                                        {item.dia}
                                    </SvgText>

                                    {/* Touchable overlay para seleção */}
                                    <Rect
                                        x={x}
                                        y={0}
                                        width={barWidth - 10}
                                        height={chartHeight + 40}
                                        fill="transparent"
                                        onPress={() => setSelectedDayIndex(index)}
                                    />
                                </React.Fragment>
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

            {/* Header animado */}
            <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#D32F2F" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detalhes dos Decibéis</Text>
                <View style={styles.placeholder} />
            </Animated.View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {/* Header estático */}
                <View style={styles.staticHeader}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#D32F2F" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Detalhes dos Decibéis</Text>
                    <View style={styles.placeholder} />
                </View>

                {/* Card de resumo */}
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>Resumo Semanal</Text>
                    <View style={styles.summaryStats}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{mediaSemanal.toFixed(1)} dB</Text>
                            <Text style={styles.statLabel}>Média Semanal</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{picoMaximo} dB</Text>
                            <Text style={styles.statLabel}>Pico Máximo</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{minimo} dB</Text>
                            <Text style={styles.statLabel}>Mínimo</Text>
                        </View>
                    </View>
                </View>

                {/* Indicador do dia selecionado */}
                <View style={styles.selectedDayIndicator}>
                    <Text style={styles.selectedDayText}>
                        Visualizando: <Text style={styles.selectedDayHighlight}>
                            {selectedDay.dia} - {selectedDay.fullDate}
                        </Text>
                    </Text>
                    <Text style={styles.selectedDayTotal}>
                        {selectedDay.decibeis} dB
                    </Text>
                </View>

                {/* Gráfico de barras */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Decibéis por Dia da Semana</Text>
                    <View style={styles.chartCard}>
                        {renderBarChart()}
                    </View>
                </View>

                {/* Detalhes do dia selecionado */}
                <View style={styles.dayDetailsContainer}>
                    <Text style={styles.dayDetailsTitle}>
                        Detalhes do Dia - {selectedDay.dia} {selectedDay.fullDate}
                    </Text>
                    <View style={styles.dayDetailsCard}>
                        <View style={styles.dayDetailItem}>
                            <View style={styles.dayDetailLeft}>
                                <Ionicons name="volume-high" size={24} color="#D32F2F" />
                                <View>
                                    <Text style={styles.detailLabel}>Nível de Decibéis</Text>
                                    <Text style={styles.detailSubtext}>Medição atual</Text>
                                </View>
                            </View>
                            <View style={styles.dayDetailRight}>
                                <Text style={styles.detailValue}>{selectedDay.decibeis} dB</Text>
                                <TouchableOpacity
                                    style={styles.editButton}
                                    onPress={() => handleEditDecibeis(selectedDayIndex)}
                                >
                                    <Ionicons name="create-outline" size={20} color="#D32F2F" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.percentageInfo}>
                            <Text style={styles.percentageLabel}>Intensidade Sonora</Text>
                            <View style={styles.percentageBar}>
                                <View
                                    style={[
                                        styles.percentageFill,
                                        { width: `${selectedDay.porcentagem}%` }
                                    ]}
                                />
                                <Text style={styles.percentageText}>{selectedDay.porcentagem}%</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Lista de dias */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Todos os Dias</Text>
                    <View style={styles.daysList}>
                        {dadosDecibeisSemana.map((item, index) => (
                            <View key={index} style={[
                                styles.dayItem,
                                index === selectedDayIndex && styles.selectedDayItem
                            ]}>
                                <View style={styles.dayInfo}>
                                    <Text style={styles.dayName}>{item.dia}</Text>
                                    <Text style={styles.dayDate}>{item.fullDate}</Text>
                                    <Text style={styles.dayDecibels}>{item.decibeis} dB</Text>
                                </View>
                                <View style={styles.dayActions}>
                                    <TouchableOpacity
                                        style={styles.selectButton}
                                        onPress={() => setSelectedDayIndex(index)}
                                    >
                                        <Ionicons
                                            name="eye"
                                            size={18}
                                            color={index === selectedDayIndex ? "#FFD700" : "#666"}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.editButton}
                                        onPress={() => handleEditDecibeis(index)}
                                    >
                                        <Ionicons name="create-outline" size={20} color="#D32F2F" />
                                    </TouchableOpacity>
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

            {/* Modal de Edição */}
            <Modal
                visible={editModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setEditModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                Editar Decibéis - {editingData.dayIndex !== null && dadosDecibeisSemana[editingData.dayIndex]?.dia}
                            </Text>
                            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                                <Ionicons name="close" size={28} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Nível de Decibéis (dB)</Text>
                            <TextInput
                                style={styles.input}
                                value={editingData.decibeis}
                                onChangeText={(text) => setEditingData({
                                    ...editingData,
                                    decibeis: text
                                })}
                                keyboardType="numeric"
                                placeholder="Ex: 65"
                                placeholderTextColor="#999"
                            />
                        </View>

                        <View style={styles.modalInfo}>
                            <Text style={styles.modalInfoText}>
                                💡 Recomendação: Mantenha abaixo de 70 dB para proteção auditiva
                            </Text>
                        </View>

                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setEditModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={handleSaveDecibeis}
                            >
                                <Text style={styles.saveButtonText}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    // Header animado
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#F5F5F5',
        zIndex: 1000,
    },
    // Header estático
    staticHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        paddingTop: 20,
        paddingBottom: 10,
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
    // Indicador do dia selecionado
    selectedDayIndicator: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    selectedDayText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    selectedDayHighlight: {
        fontWeight: 'bold',
        color: '#D32F2F',
    },
    selectedDayTotal: {
        fontSize: 16,
        color: '#D32F2F',
        fontWeight: 'bold',
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
    // Detalhes do dia selecionado
    dayDetailsContainer: {
        marginBottom: 20,
    },
    dayDetailsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#D32F2F',
        marginBottom: 12,
    },
    dayDetailsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    dayDetailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    dayDetailLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    detailLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10,
    },
    detailSubtext: {
        fontSize: 12,
        color: '#666',
        marginLeft: 10,
        marginTop: 2,
    },
    dayDetailRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#D32F2F',
        marginRight: 10,
    },
    // Informações de porcentagem
    percentageInfo: {
        marginTop: 10,
    },
    percentageLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    percentageBar: {
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
    // Lista de dias
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
    selectedDayItem: {
        backgroundColor: '#FFF5F5',
        borderLeftWidth: 4,
        borderLeftColor: '#D32F2F',
    },
    dayInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    dayName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        width: 40,
    },
    dayDate: {
        fontSize: 12,
        color: '#999',
        width: 40,
        marginLeft: 5,
    },
    dayDecibels: {
        fontSize: 14,
        color: '#666',
        marginLeft: 10,
        fontWeight: '600',
    },
    dayActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectButton: {
        padding: 6,
        marginRight: 8,
    },
    editButton: {
        padding: 8,
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
    // Modal styles
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
        maxHeight: '50%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        marginRight: 10,
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        color: '#333',
    },
    modalInfo: {
        backgroundColor: '#E3F2FD',
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
    },
    modalInfoText: {
        fontSize: 12,
        color: '#1976D2',
        textAlign: 'center',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: 'bold',
    },
    saveButton: {
        flex: 1,
        backgroundColor: '#D32F2F',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TelaDecibeisDetalhes;