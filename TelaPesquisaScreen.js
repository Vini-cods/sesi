import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, G, Text as SvgText, Line, Polyline, Rect } from 'react-native-svg';
import { useData } from './DataContext';

const { width: screenWidth } = Dimensions.get('window');

const TelaPesquisaScreen = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [selectedDate, setSelectedDate] = useState('28/10/2025');

    // Use o contexto para obter os dados sincronizados
    const { dadosSemana, calcularTotaisParaPesquisa } = useData();

    // Obter dados da pesquisa baseados nos dados atuais
    const monthData = calcularTotaisParaPesquisa();

    // Calendário com dias do mês - agora baseado nos dados reais
    const monthDays = dadosSemana.map(dia => ({
        day: parseInt(dia.date.split('/')[0]),
        kg: dia.meals.reduce((sum, meal) => sum + meal.value, 0).toFixed(1),
        decibels: Math.max(...monthData[dia.fullDate]?.decibelData.map(item => item.value) || 0),
        date: dia.fullDate
    }));

    const currentData = monthData[selectedDate] || monthData['28/10/2025'];
    const selectedDayData = dadosSemana.find(dia => dia.fullDate === selectedDate);

    // Função para renderizar o gráfico de barras empilhadas
    const renderBarChart = () => {
        const chartHeight = 200;
        const chartWidth = screenWidth - 100;
        const barWidth = 45;
        const barSpacing = 10;
        const maxValor = 10;

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
                                    stroke="rgba(0, 0, 0, 0.15)"
                                    strokeWidth="1"
                                />
                            );
                        })}

                        {/* Barras do gráfico */}
                        {currentData.wasteData && currentData.wasteData.length > 0 && (
                            <React.Fragment>
                                {(() => {
                                    const totalDayValue = currentData.wasteData.reduce((sum, meal) => sum + meal.value, 0);
                                    let currentY = chartHeight;

                                    return currentData.wasteData.map((meal, mealIndex) => {
                                        const barHeight = (meal.value / maxValor) * chartHeight;
                                        const y = currentY - barHeight;
                                        currentY = y;

                                        return (
                                            <React.Fragment key={mealIndex}>
                                                <Rect
                                                    x={20}
                                                    y={y}
                                                    width={barWidth}
                                                    height={barHeight}
                                                    fill={meal.color}
                                                    rx="5"
                                                    ry="5"
                                                />
                                                {barHeight > 25 && (
                                                    <SvgText
                                                        x={20 + barWidth / 2}
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
                                    });
                                })()}

                                {/* Label do dia */}
                                <SvgText
                                    x={20 + barWidth / 2}
                                    y={chartHeight + 20}
                                    textAnchor="middle"
                                    fill="#333"
                                    fontSize="11"
                                    fontWeight="bold"
                                >
                                    {selectedDate.split('/')[0]}/{selectedDate.split('/')[1]}
                                </SvgText>
                                <SvgText
                                    x={20 + barWidth / 2}
                                    y={chartHeight + 38}
                                    textAnchor="middle"
                                    fill="rgba(0, 0, 0, 0.8)"
                                    fontSize="10"
                                >
                                    Total: {currentData.totalKg}kg
                                </SvgText>
                            </React.Fragment>
                        )}
                    </Svg>
                </View>
            </View>
        );
    };

    // Nova função para renderizar os detalhes das refeições
    const renderMealDetails = () => {
        if (!selectedDayData) return null;

        const totalDay = selectedDayData.meals.reduce((sum, meal) => sum + meal.value, 0);

        return (
            <View style={styles.mealDetailsContainer}>
                <Text style={styles.mealDetailsTitle}>Detalhes das Refeições - {selectedDate}</Text>

                <View style={styles.mealDetailsCard}>
                    {selectedDayData.meals.map((meal, index) => {
                        const percentage = totalDay > 0 ? (meal.value / totalDay) * 100 : 0;

                        return (
                            <View key={index} style={styles.mealDetailItem}>
                                <View style={styles.mealDetailLeft}>
                                    <View style={[styles.mealColorDot, { backgroundColor: meal.color }]} />
                                    <View>
                                        <Text style={styles.mealName}>{meal.name}</Text>
                                        <Text style={styles.mealPercentage}>
                                            {percentage.toFixed(1)}% do total
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.mealDetailRight}>
                                    <Text style={styles.mealValue}>{meal.value} kg</Text>
                                </View>
                            </View>
                        );
                    })}

                    {/* Total do dia */}
                    <View style={styles.dayTotal}>
                        <Text style={styles.dayTotalLabel}>Total do dia:</Text>
                        <Text style={styles.dayTotalValue}>{totalDay.toFixed(1)} kg</Text>
                    </View>
                </View>
            </View>
        );
    };

    // Função para obter tipos únicos de refeição
    const getUniqueMealTypes = () => {
        const mealNames = [];
        const uniqueMeals = [];

        Object.values(monthData).forEach(day => {
            if (day.wasteData) {
                day.wasteData.forEach(meal => {
                    if (!mealNames.includes(meal.name)) {
                        mealNames.push(meal.name);
                        uniqueMeals.push(meal);
                    }
                });
            }
        });

        return uniqueMeals;
    };

    const uniqueMealTypes = getUniqueMealTypes();

    const renderDonutChart = () => {
        const size = 180;
        const strokeWidth = 20;
        const radius = (size - strokeWidth) / 2;
        const circumference = 2 * Math.PI * radius;

        const total = currentData.decibelData.reduce((sum, item) => sum + item.value, 0);
        let accumulatedPercent = 0;

        return (
            <View style={styles.donutContainer}>
                <Svg width={size} height={size}>
                    <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
                        {currentData.decibelData.map((item, index) => {
                            const percent = item.value / total;
                            const strokeDasharray = `${circumference * percent} ${circumference * (1 - percent)}`;
                            const strokeDashoffset = circumference * accumulatedPercent;

                            accumulatedPercent += percent;

                            return (
                                <Circle
                                    key={index}
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={radius}
                                    stroke={item.color}
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={strokeDasharray}
                                    strokeDashoffset={strokeDashoffset}
                                    fill="transparent"
                                    strokeLinecap="round"
                                />
                            );
                        })}
                    </G>

                    {/* Texto central */}
                    <SvgText
                        x={size / 2}
                        y={size / 2 - 10}
                        textAnchor="middle"
                        fill="#D32F2F"
                        fontSize="16"
                        fontWeight="bold"
                    >
                        {Math.max(...currentData.decibelData.map(item => item.value))}dB
                    </SvgText>
                    <SvgText
                        x={size / 2}
                        y={size / 2 + 15}
                        textAnchor="middle"
                        fill="#666"
                        fontSize="12"
                    >
                        Pico
                    </SvgText>
                </Svg>

                {/* Legenda */}
                <View style={styles.legendContainer}>
                    {currentData.decibelData.map((item, index) => (
                        <View key={index} style={styles.legendItem}>
                            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                            <Text style={styles.legendText}>
                                {item.label}: {item.value}dB
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        );
    };

    const renderLineChart = () => {
        const maxY = 100;
        const chartHeight = 120;
        const chartWidth = screenWidth - 100;

        const points = currentData.lineChartData.map((point, index) => {
            const x = (index / (currentData.lineChartData.length - 1)) * chartWidth;
            const y = chartHeight - (point.decibels / maxY) * chartHeight;
            return `${x},${y}`;
        }).join(' ');

        const peakIndex = currentData.lineChartData.reduce((maxIndex, point, index, array) =>
            point.decibels > array[maxIndex].decibels ? index : maxIndex, 0
        );
        const peakX = (peakIndex / (currentData.lineChartData.length - 1)) * chartWidth;
        const peakY = chartHeight - (currentData.lineChartData[peakIndex].decibels / maxY) * chartHeight;

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
                        {[0, 25, 50, 75, 100].map((value) => {
                            const y = chartHeight - (value / maxY) * chartHeight;
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

                        <Polyline
                            points={points}
                            fill="none"
                            stroke="#E57373"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        <Circle
                            cx={peakX}
                            cy={peakY}
                            r="6"
                            fill="#D32F2F"
                        />
                        <Circle
                            cx={peakX}
                            cy={peakY}
                            r="3"
                            fill="white"
                        />

                        <SvgText
                            x={peakX}
                            y={peakY - 15}
                            textAnchor="middle"
                            fill="#D32F2F"
                            fontSize="12"
                            fontWeight="bold"
                        >
                            {currentData.lineChartData[peakIndex].decibels}dB
                        </SvgText>

                        <Line
                            x1={peakX}
                            y1={peakY}
                            x2={peakX}
                            y2={chartHeight}
                            stroke="#D32F2F"
                            strokeWidth="1"
                            strokeDasharray="4,4"
                        />

                        {/* Labels do eixo X */}
                        {currentData.lineChartData.map((point, index) => {
                            const x = (index / (currentData.lineChartData.length - 1)) * chartWidth;
                            return (
                                <SvgText
                                    key={index}
                                    x={x}
                                    y={chartHeight + 15}
                                    textAnchor="middle"
                                    fill="#666"
                                    fontSize="10"
                                >
                                    {point.time}
                                </SvgText>
                            );
                        })}
                    </Svg>
                </View>
            </View>
        );
    };

    const renderCalendar = () => {
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro'];

        // Apenas dias úteis da semana
        const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];

        return (
            <View style={styles.calendarContainer}>
                <Text style={styles.calendarTitle}>
                    {monthNames[currentMonth]} {currentYear}
                </Text>

                <View style={styles.calendarDaysHeader}>
                    {daysOfWeek.map((day, index) => (
                        <View key={index} style={styles.calendarDayHeaderContainer}>
                            <Text style={styles.calendarDayHeader}>
                                {day}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.calendarGrid}>
                    {monthDays.map((dayData) => {
                        const isSelected = dayData.date === selectedDate;
                        const isToday = dayData.day === currentDay;

                        return (
                            <TouchableOpacity
                                key={dayData.day}
                                style={[
                                    styles.calendarDay,
                                    isSelected && styles.calendarSelectedDay,
                                    isToday && styles.calendarToday
                                ]}
                                onPress={() => setSelectedDate(dayData.date)}
                            >
                                <Text style={[
                                    styles.calendarDayText,
                                    isSelected && styles.calendarSelectedDayText,
                                    isToday && styles.calendarTodayText
                                ]}>
                                    {dayData.day}
                                </Text>
                                <View style={styles.calendarDayInfo}>
                                    <Text style={styles.calendarDayKg}>{dayData.kg}kg</Text>
                                    <Text style={styles.calendarDayDb}>{dayData.decibels}dB</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        );
    };

    const renderDailyInfo = () => {
        return (
            <View style={styles.dailyInfoContainer}>
                <Text style={styles.dailyInfoTitle}>Informações do Dia - {selectedDate}</Text>
                <View style={styles.dailyInfoCard}>
                    <View style={styles.dailyInfoRow}>
                        <Text style={styles.dailyInfoLabel}>Data:</Text>
                        <Text style={styles.dailyInfoValue}>{selectedDate}</Text>
                    </View>
                    <View style={styles.dailyInfoRow}>
                        <Text style={styles.dailyInfoLabel}>Desperdício Total:</Text>
                        <Text style={styles.dailyInfoValue}>{currentData.totalKg}kg</Text>
                    </View>
                    <View style={styles.dailyInfoRow}>
                        <Text style={styles.dailyInfoLabel}>Decibéis Máximos:</Text>
                        <Text style={styles.dailyInfoValue}>
                            {Math.max(...currentData.decibelData.map(item => item.value))}dB
                        </Text>
                    </View>
                    <View style={styles.dailyInfoNote}>
                        <Text style={styles.dailyInfoNoteText}>{currentData.note}</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

            {/* Header com perfil - IDÊNTICO AO TelaDesperdicio */}
            <View style={styles.header}>
                <View style={styles.profilePill}>
                    <View style={styles.avatar} />
                    <View>
                        <Text style={styles.profileName}>Bem Vinda</Text>
                        <Text style={styles.profileSubtext}>Danielle da Silva Rogério</Text>
                    </View>
                </View>
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Barra de Pesquisa */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Pesquisar..."
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholderTextColor="#999"
                    />
                </View>

                {/* Calendário */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Calendário Novembro 2025</Text>
                    {renderCalendar()}
                </View>

                {/* Gráfico de Barras - Desperdício por Refeição */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Desperdício por Refeição</Text>
                    <View style={styles.chartCard}>
                        {/* Legenda compacta */}
                        <View style={styles.compactLegend}>
                            {uniqueMealTypes.map((meal, index) => (
                                <View key={index} style={styles.compactLegendItem}>
                                    <View style={[styles.legendDot, { backgroundColor: meal.color }]} />
                                    <Text style={styles.compactLegendText}>{meal.name}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Gráfico de barras */}
                        {renderBarChart()}
                    </View>
                </View>

                {/* NOVA SEÇÃO: Detalhes das Refeições */}
                {renderMealDetails()}

                {/* Gráfico de Linha - Decibéis ao Longo do Dia */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Decibéis ao Longo do Dia</Text>
                    <View style={styles.chartCard}>
                        {renderLineChart()}
                    </View>
                </View>

                {/* Gráfico de Rosca - Distribuição de Decibéis */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Distribuição de Decibéis por Período</Text>
                    <View style={styles.chartCard}>
                        {renderDonutChart()}
                    </View>
                </View>

                {/* Informações do Dia Selecionado */}
                {renderDailyInfo()}

                {/* Cards de Estatísticas */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Ionicons name="volume-high" size={24} color="#D32F2F" />
                        <Text style={styles.statValue}>
                            {Math.max(...currentData.decibelData.map(item => item.value))}dB
                        </Text>
                        <Text style={styles.statLabel}>Pico do Dia</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Ionicons name="restaurant" size={24} color="#4CAF50" />
                        <Text style={styles.statValue}>{currentData.totalKg}kg</Text>
                        <Text style={styles.statLabel}>Desperdício</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Ionicons name="time" size={24} color="#FFA726" />
                        <Text style={styles.statValue}>
                            {currentData.lineChartData.reduce((max, point, index, array) =>
                                point.decibels > array[max].decibels ? index : max, 0
                            )}
                        </Text>
                        <Text style={styles.statLabel}>Horário Crítico</Text>
                    </View>
                </View>

            </ScrollView>

            {/* Barra inferior de navegação - IDÊNTICA AO TelaDesperdicio */}
            <View style={styles.bottomNav}>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('TelaDesperdicio')}
                >
                    <Ionicons name="home" size={28} color="#FFFFFF" />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
                    <Ionicons name="search" size={28} color="#FFFFFF" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Perfil')}
                >
                    <Ionicons name="person" size={28} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#F5F5F5',
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
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 120,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
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
    // Estilos para o gráfico de barras
    chartContainer: {
        flexDirection: 'row',
    },
    chartWrapper: {
        flex: 1,
    },
    yAxisLabels: {
        justifyContent: 'space-between',
        marginRight: 8,
        height: 200,
        paddingVertical: 5,
    },
    axisLabel: {
        fontSize: 11,
        color: '#666',
        fontWeight: '600',
    },
    // Legenda compacta
    compactLegend: {
        flexDirection: 'column',
        marginBottom: 20,
        backgroundColor: '#f8f8f8',
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
        color: '#333',
        fontWeight: '500',
    },
    // NOVOS ESTILOS: Detalhes das Refeições
    mealDetailsContainer: {
        marginBottom: 20,
    },
    mealDetailsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#D32F2F',
        marginBottom: 12,
    },
    mealDetailsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    mealDetailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F8F8F8',
    },
    mealDetailLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    mealColorDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginRight: 12,
    },
    mealName: {
        fontSize: 15,
        fontWeight: '500',
        color: '#333',
    },
    mealPercentage: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    mealDetailRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mealValue: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#D32F2F',
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
    // Gráfico de Linha
    chartArea: {
        flex: 1,
    },
    // Calendário
    calendarContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    calendarTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#D32F2F',
        textAlign: 'center',
        marginBottom: 15,
    },
    calendarDaysHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    calendarDayHeaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    calendarDayHeader: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        textAlign: 'center',
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    calendarDay: {
        width: '20%', // 100% dividido por 5 dias (Seg-Sex)
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 2,
        borderRadius: 8,
        padding: 2,
    },
    calendarSelectedDay: {
        backgroundColor: '#D32F2F',
    },
    calendarToday: {
        borderWidth: 2,
        borderColor: '#FFA726',
    },
    calendarDayText: {
        fontSize: 12,
        color: '#333',
        fontWeight: '500',
    },
    calendarSelectedDayText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    calendarTodayText: {
        color: '#FFA726',
        fontWeight: 'bold',
    },
    calendarDayInfo: {
        alignItems: 'center',
        marginTop: 2,
    },
    calendarDayKg: {
        fontSize: 8,
        color: '#4CAF50',
        fontWeight: 'bold',
    },
    calendarDayDb: {
        fontSize: 8,
        color: '#D32F2F',
        fontWeight: 'bold',
    },
    // Gráfico de Rosca
    donutContainer: {
        alignItems: 'center',
    },
    legendContainer: {
        marginTop: 20,
        width: '100%',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        justifyContent: 'center',
    },
    legendColor: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 8,
    },
    legendText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    // Informações do Dia
    dailyInfoContainer: {
        marginBottom: 20,
    },
    dailyInfoTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#D32F2F',
        marginBottom: 12,
    },
    dailyInfoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    dailyInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    dailyInfoLabel: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    dailyInfoValue: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold',
    },
    dailyInfoNote: {
        marginTop: 10,
        padding: 12,
        backgroundColor: '#FFF3E0',
        borderRadius: 10,
    },
    dailyInfoNoteText: {
        fontSize: 12,
        color: '#E65100',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    // Estatísticas
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statCard: {
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
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#D32F2F',
        marginTop: 8,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 11,
        color: '#666',
        textAlign: 'center',
        fontWeight: '500',
    },
    // Navegação inferior
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
    navItemActive: {
        transform: [{ scale: 1.1 }],
    },
});

export default TelaPesquisaScreen;