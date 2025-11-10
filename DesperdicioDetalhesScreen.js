import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Dimensions, Modal, TextInput, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Line, Rect, Text as SvgText } from 'react-native-svg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const DesperdicioDetalhesScreen = ({ navigation }) => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editingData, setEditingData] = useState({ dayIndex: null, meal: null });

    // Animação para o header
    const scrollY = useRef(new Animated.Value(0)).current;
    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    // Dados iniciais para cada dia da semana
    const [dadosSemana, setDadosSemana] = useState([
        {
            dia: 'Seg',
            date: '24/10',
            meals: [
                { id: 1, name: 'Café de Manhã', value: 1.8, color: '#FFC107' },
                { id: 2, name: 'Almoço', value: 2.5, color: '#4CAF50' },
                { id: 3, name: 'Café de Tarde', value: 0.8, color: '#2196F3' },
            ]
        },
        {
            dia: 'Ter',
            date: '25/10',
            meals: [
                { id: 1, name: 'Café de Manhã', value: 1.2, color: '#FFC107' },
                { id: 2, name: 'Almoço', value: 3.1, color: '#4CAF50' },
                { id: 3, name: 'Café de Tarde', value: 1.0, color: '#2196F3' },
            ]
        },
        {
            dia: 'Qua',
            date: '26/10',
            meals: [
                { id: 1, name: 'Café de Manhã', value: 2.1, color: '#FFC107' },
                { id: 2, name: 'Almoço', value: 2.8, color: '#4CAF50' },
                { id: 3, name: 'Café de Tarde', value: 0.9, color: '#2196F3' },
            ]
        },
        {
            dia: 'Qui',
            date: '27/10',
            meals: [
                { id: 1, name: 'Café de Manhã', value: 1.5, color: '#FFC107' },
                { id: 2, name: 'Almoço', value: 2.2, color: '#4CAF50' },
                { id: 3, name: 'Café de Tarde', value: 1.2, color: '#2196F3' },
            ]
        },
        {
            dia: 'Sex',
            date: '28/10',
            meals: [
                { id: 1, name: 'Café de Manhã', value: 1.9, color: '#FFC107' },
                { id: 2, name: 'Almoço', value: 3.3, color: '#4CAF50' },
                { id: 3, name: 'Café de Tarde', value: 0.7, color: '#2196F3' },
            ]
        },
    ]);

    const maxValor = 10;
    const totalMensal = dadosSemana.reduce((acc, day) =>
        acc + day.meals.reduce((sum, meal) => sum + meal.value, 0), 0
    );

    const handleEditMeal = (dayIndex, meal) => {
        setEditingData({ dayIndex, meal: { ...meal } });
        setEditModalVisible(true);
    };

    const handleSaveMeal = () => {
        if (editingData.dayIndex !== null && editingData.meal) {
            const updatedDadosSemana = [...dadosSemana];
            const dayMeals = updatedDadosSemana[editingData.dayIndex].meals;

            if (editingData.meal.id && !dayMeals.find(m => m.id === editingData.meal.id)) {
                updatedDadosSemana[editingData.dayIndex].meals = [...dayMeals, editingData.meal];
            } else {
                updatedDadosSemana[editingData.dayIndex].meals = dayMeals.map(m =>
                    m.id === editingData.meal.id ? editingData.meal : m
                );
            }

            setDadosSemana(updatedDadosSemana);
        }
        setEditModalVisible(false);
        setEditingData({ dayIndex: null, meal: null });
    };

    const handleAddMeal = (dayIndex) => {
        const newMeal = {
            id: Date.now(),
            name: 'Nova Refeição',
            value: 0,
            color: '#9C27B0'
        };
        setEditingData({ dayIndex, meal: newMeal });
        setEditModalVisible(true);
    };

    const handleDeleteMeal = (dayIndex, mealId) => {
        const updatedDadosSemana = [...dadosSemana];
        updatedDadosSemana[dayIndex].meals = updatedDadosSemana[dayIndex].meals.filter(m => m.id !== mealId);
        setDadosSemana(updatedDadosSemana);
        setEditModalVisible(false);
    };

    // Função de scroll simplificada
    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        scrollY.setValue(offsetY);
    };

    const renderBarChart = () => {
        const chartHeight = 400;
        const chartWidth = screenWidth - 100;
        const barWidth = 45;
        const barSpacing = 10;

        return (
            <View style={styles.chartContainer}>
                <View style={styles.yAxisLabels}>
                    <Text style={styles.axisLabel}>10kg</Text>
                    <Text style={styles.axisLabel}>8kg</Text>
                    <Text style={styles.axisLabel}>6kg</Text>
                    <Text style={styles.axisLabel}>4kg</Text>
                    <Text style={styles.axisLabel}>2kg</Text>
                    <Text style={styles.axisLabel}>0</Text>
                </View>
                <View style={styles.chartWrapper}>
                    <Svg width={chartWidth} height={chartHeight + 60}>
                        {/* Linhas horizontais de referência */}
                        {[0, 2, 4, 6, 8, 10].map((value, index) => {
                            const y = chartHeight - (value / maxValor) * chartHeight;
                            return (
                                <Line
                                    key={value}
                                    x1="0"
                                    y1={y}
                                    x2={chartWidth}
                                    y2={y}
                                    stroke="rgba(255, 255, 255, 0.15)"
                                    strokeWidth="1"
                                />
                            );
                        })}

                        {/* Barras do gráfico */}
                        {dadosSemana.map((day, dayIndex) => {
                            const x = 20 + (dayIndex * (barWidth + barSpacing));
                            const totalDayValue = day.meals.reduce((sum, meal) => sum + meal.value, 0);
                            let currentY = chartHeight;

                            return (
                                <React.Fragment key={dayIndex}>
                                    {/* Barras empilhadas */}
                                    {day.meals.map((meal, mealIndex) => {
                                        const barHeight = (meal.value / maxValor) * chartHeight;
                                        const y = currentY - barHeight;
                                        currentY = y;

                                        return (
                                            <React.Fragment key={`${dayIndex}-${mealIndex}`}>
                                                <Rect
                                                    x={x}
                                                    y={y}
                                                    width={barWidth}
                                                    height={barHeight}
                                                    fill={meal.color}
                                                    rx="5"
                                                    ry="5"
                                                />
                                                {barHeight > 25 && (
                                                    <SvgText
                                                        x={x + barWidth / 2}
                                                        y={y + barHeight / 2 + 4}
                                                        textAnchor="middle"
                                                        fill="#FFFFFF"
                                                        fontSize="10"
                                                        fontWeight="bold"
                                                    >
                                                        {meal.value}kg
                                                    </SvgText>
                                                )}
                                            </React.Fragment>
                                        );
                                    })}

                                    {/* Labels dos dias */}
                                    <SvgText
                                        x={x + barWidth / 2}
                                        y={chartHeight + 20}
                                        textAnchor="middle"
                                        fill="#FFFFFF"
                                        fontSize="11"
                                        fontWeight="bold"
                                    >
                                        {day.dia}
                                    </SvgText>
                                    <SvgText
                                        x={x + barWidth / 2}
                                        y={chartHeight + 38}
                                        textAnchor="middle"
                                        fill="rgba(255, 255, 255, 0.8)"
                                        fontSize="10"
                                    >
                                        {day.date}
                                    </SvgText>
                                </React.Fragment>
                            );
                        })}
                    </Svg>
                </View>
            </View>
        );
    };

    const getUniqueMealTypes = () => {
        const mealNames = [];
        const uniqueMeals = [];

        dadosSemana.forEach(day => {
            day.meals.forEach(meal => {
                if (!mealNames.includes(meal.name)) {
                    mealNames.push(meal.name);
                    uniqueMeals.push(meal);
                }
            });
        });

        return uniqueMeals;
    };

    const uniqueMealTypes = getUniqueMealTypes();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

            {/* Header com perfil - COPIADO DO TelaDesperdicioScreen */}
            <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
                <View style={styles.profilePill}>
                    <View style={styles.avatar} />
                    <View>
                        <Text style={styles.profileName}>Bem Vinda</Text>
                        <Text style={styles.profileSubtext}>Danielle da Silva Rogério</Text>
                    </View>
                </View>
            </Animated.View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {/* Perfil estático - aparece quando o header some */}
                <View style={styles.staticProfile}>
                    <View style={styles.profilePill}>
                        <View style={styles.avatar} />
                        <View>
                            <Text style={styles.profileName}>Bem Vinda</Text>
                            <Text style={styles.profileSubtext}>Danielle da Silva Rogério</Text>
                        </View>
                    </View>
                </View>

                {/* Card principal vermelho */}
                <View style={styles.mainCard}>
                    {/* Título do card */}
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Desperdício</Text>
                        <Text style={styles.cardDate}>27/10/2025</Text>
                    </View>

                    {/* Legenda compacta no topo */}
                    <View style={styles.compactLegend}>
                        {uniqueMealTypes.map((meal, index) => (
                            <View key={index} style={styles.compactLegendItem}>
                                <View style={[styles.legendDot, { backgroundColor: meal.color }]} />
                                <Text style={styles.compactLegendText}>{meal.name}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Gráfico */}
                    {renderBarChart()}
                </View>

                {/* Cards de detalhes - agora em fundo branco */}
                <View style={styles.detailsSection}>
                    <Text style={styles.detailsSectionTitle}>Detalhes por Dia</Text>
                    {dadosSemana.map((day, dayIndex) => (
                        <View key={dayIndex} style={styles.dayCard}>
                            <View style={styles.dayCardHeader}>
                                <Text style={styles.dayCardTitle}>{day.dia} - {day.date}</Text>
                                <TouchableOpacity
                                    style={styles.addDayMealButton}
                                    onPress={() => handleAddMeal(dayIndex)}
                                >
                                    <Ionicons name="add" size={20} color="#D32F2F" />
                                </TouchableOpacity>
                            </View>
                            {day.meals.map((meal, mealIndex) => (
                                <View key={mealIndex} style={styles.dayMealItem}>
                                    <View style={styles.legendLeft}>
                                        <View style={[styles.colorDot, { backgroundColor: meal.color }]} />
                                        <Text style={styles.legendText}>{meal.name}</Text>
                                    </View>
                                    <View style={styles.dayMealRight}>
                                        <Text style={styles.mealValue}>{meal.value} kg</Text>
                                        <TouchableOpacity
                                            style={styles.editButton}
                                            onPress={() => handleEditMeal(dayIndex, meal)}
                                        >
                                            <Ionicons name="create-outline" size={20} color="#D32F2F" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                            <View style={styles.dayTotal}>
                                <Text style={styles.dayTotalLabel}>Total do dia:</Text>
                                <Text style={styles.dayTotalValue}>
                                    {day.meals.reduce((sum, meal) => sum + meal.value, 0).toFixed(1)} kg
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Total */}
                <View style={styles.totalSection}>
                    <Text style={styles.totalLabel}>Total da Semana</Text>
                    <Text style={styles.totalText}>{totalMensal.toFixed(1)} kg</Text>
                    <Text style={styles.totalSubtext}>24/10 - 28/10</Text>
                </View>
            </ScrollView>

            {/* Bottom Navigation - COPIADO DO TelaDesperdicioScreen */}
            <View style={styles.bottomNav}>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('TelaDesperdicio')}
                >
                    <Ionicons name="home" size={28} color="#FFFFFF" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Pesquisa')}
                >
                    <Ionicons name="search" size={28} color="#FFFFFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="person" size={28} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

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
                                {editingData.meal?.id && dadosSemana[editingData.dayIndex]?.meals.find(m => m.id === editingData.meal.id)
                                    ? `Editar ${editingData.meal.name} - ${dadosSemana[editingData.dayIndex]?.dia}`
                                    : `Nova Refeição - ${dadosSemana[editingData.dayIndex]?.dia}`}
                            </Text>
                            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                                <Ionicons name="close" size={28} color="#666" />
                            </TouchableOpacity>
                        </View>

                        {editingData.meal && (
                            <>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Nome da Refeição</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={editingData.meal.name}
                                        onChangeText={(text) => setEditingData({
                                            ...editingData,
                                            meal: { ...editingData.meal, name: text }
                                        })}
                                        placeholder="Ex: Café da Manhã"
                                        placeholderTextColor="#999"
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Quantidade Desperdiçada (kg)</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={editingData.meal.value.toString()}
                                        onChangeText={(text) => {
                                            const value = parseFloat(text) || 0;
                                            setEditingData({
                                                ...editingData,
                                                meal: { ...editingData.meal, value }
                                            });
                                        }}
                                        keyboardType="decimal-pad"
                                        placeholder="0.0"
                                        placeholderTextColor="#999"
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Cor</Text>
                                    <View style={styles.colorPicker}>
                                        {['#FFC107', '#4CAF50', '#2196F3', '#9C27B0', '#FF5722', '#00BCD4'].map((color) => (
                                            <TouchableOpacity
                                                key={color}
                                                style={[
                                                    styles.colorOption,
                                                    { backgroundColor: color },
                                                    editingData.meal.color === color && styles.colorOptionSelected
                                                ]}
                                                onPress={() => setEditingData({
                                                    ...editingData,
                                                    meal: { ...editingData.meal, color }
                                                })}
                                            />
                                        ))}
                                    </View>
                                </View>

                                <View style={styles.modalActions}>
                                    {editingData.meal.id && editingData.dayIndex !== null && (
                                        <TouchableOpacity
                                            style={styles.deleteButton}
                                            onPress={() => handleDeleteMeal(editingData.dayIndex, editingData.meal.id)}
                                        >
                                            <Text style={styles.deleteButtonText}>Excluir</Text>
                                        </TouchableOpacity>
                                    )}
                                    <TouchableOpacity
                                        style={[styles.saveButton, !editingData.meal.id ? styles.saveButtonFull : null]}
                                        onPress={handleSaveMeal}
                                    >
                                        <Text style={styles.saveButtonText}>Salvar</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
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
    // Header animado (copia do TelaDesperdicioScreen)
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#F5F5F5',
        zIndex: 1000,
    },
    profilePill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D32F2F',
        borderRadius: 25,
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignSelf: 'flex-start',
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
        marginRight: 10,
    },
    profileName: {
        fontSize: 11,
        color: '#FFFFFF',
        fontWeight: '400',
    },
    profileSubtext: {
        fontSize: 12,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    // Perfil estático que aparece no scroll
    staticProfile: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 10,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 120,
    },
    mainCard: {
        backgroundColor: '#D32F2F',
        borderRadius: 30,
        padding: 25,
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    cardHeader: {
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    cardDate: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        marginTop: 4,
    },
    compactLegend: {
        flexDirection: 'column',
        marginBottom: 20,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 15,
        padding: 15,
    },
    compactLegendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
    },
    legendDot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        marginRight: 10,
    },
    compactLegendText: {
        fontSize: 13,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    chartContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    chartWrapper: {
        flex: 1,
    },
    yAxisLabels: {
        justifyContent: 'space-between',
        marginRight: 8,
        height: 400,
        paddingVertical: 5,
    },
    axisLabel: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '600',
    },
    detailsSection: {
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    detailsSectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        marginLeft: 5,
    },
    dayCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    dayCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    dayCardTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#333',
    },
    addDayMealButton: {
        padding: 8,
    },
    dayMealItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    legendLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    colorDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginRight: 12,
    },
    legendText: {
        fontSize: 15,
        color: '#333',
        fontWeight: '500',
    },
    dayMealRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mealValue: {
        fontSize: 14,
        color: '#666',
        fontWeight: '600',
        marginRight: 10,
    },
    editButton: {
        padding: 8,
    },
    dayTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    dayTotalLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },
    dayTotalValue: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#D32F2F',
    },
    totalSection: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 25,
        marginBottom: 20,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    totalLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        fontWeight: '500',
    },
    totalText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#D32F2F',
        marginBottom: 5,
    },
    totalSubtext: {
        fontSize: 14,
        color: '#999',
        fontWeight: '500',
    },
    // Bottom Navigation - COPIADO DO TelaDesperdicioScreen
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: '#C62828',
        paddingVertical: 22,
        paddingHorizontal: 40,
        justifyContent: 'space-around',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
        height: 80,
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
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
        maxHeight: '80%',
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
    colorPicker: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    colorOption: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 3,
        borderColor: 'transparent',
    },
    colorOptionSelected: {
        borderColor: '#333',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 10,
    },
    deleteButton: {
        flex: 1,
        backgroundColor: '#FFEBEE',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#D32F2F',
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
    saveButtonFull: {
        flex: 2,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DesperdicioDetalhesScreen;