import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Line, Rect, Text as SvgText, G } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');

const TelaPesquisaScreen = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [selectedYear, setSelectedYear] = useState(2025);

    // Dados de exemplo baseados na imagem - valores em kg
    const weeklyData = [
        {
            day: 'Seg',
            periods: [
                { period: 'Café Manhã', kg: 2.5, color: '#FFD700' },
                { period: 'Almoço', kg: 4.8, color: '#4CAF50' },
                { period: 'Café Tarde', kg: 1.2, color: '#2196F3' }
            ],
            total: 8.5
        },
        {
            day: 'Ter',
            periods: [
                { period: 'Café Manhã', kg: 3.1, color: '#FFD700' },
                { period: 'Almoço', kg: 5.2, color: '#4CAF50' },
                { period: 'Café Tarde', kg: 0.9, color: '#2196F3' }
            ],
            total: 9.2
        },
        {
            day: 'Qua',
            periods: [
                { period: 'Café Manhã', kg: 2.8, color: '#FFD700' },
                { period: 'Almoço', kg: 6.1, color: '#4CAF50' },
                { period: 'Café Tarde', kg: 1.5, color: '#2196F3' }
            ],
            total: 10.4
        },
        {
            day: 'Qui',
            periods: [
                { period: 'Café Manhã', kg: 3.3, color: '#FFD700' },
                { period: 'Almoço', kg: 4.5, color: '#4CAF50' },
                { period: 'Café Tarde', kg: 1.1, color: '#2196F3' }
            ],
            total: 8.9
        },
        {
            day: 'Sex',
            periods: [
                { period: 'Café Manhã', kg: 2.1, color: '#FFD700' },
                { period: 'Almoço', kg: 7.3, color: '#4CAF50' },
                { period: 'Café Tarde', kg: 1.8, color: '#2196F3' }
            ],
            total: 11.2
        },
    ];

    // Dados anuais baseados na imagem
    const annualData = [
        { year: 2020, kg: 15.2 },
        { year: 2021, kg: 12.8 },
        { year: 2022, kg: 10.5 },
        { year: 2023, kg: 8.9 },
        { year: 2024, kg: 7.3 },
        { year: 2025, kg: 6.2 },
    ];

    const renderWeeklyChart = () => {
        const maxKg = Math.max(...weeklyData.map(item => item.total));
        const chartHeight = 180;
        const chartWidth = screenWidth - 60;
        const barWidth = (chartWidth - 60) / weeklyData.length;
        const scaleFactor = (chartHeight - 40) / maxKg;

        return (
            <View style={styles.chartContainer}>
                <View style={styles.yAxisLabels}>
                    <Text style={styles.axisLabel}>{maxKg}kg</Text>
                    <Text style={styles.axisLabel}>{Math.round(maxKg * 0.75 * 10) / 10}kg</Text>
                    <Text style={styles.axisLabel}>{Math.round(maxKg * 0.5 * 10) / 10}kg</Text>
                    <Text style={styles.axisLabel}>{Math.round(maxKg * 0.25 * 10) / 10}kg</Text>
                    <Text style={styles.axisLabel}>0kg</Text>
                </View>
                <View style={styles.chartArea}>
                    <Svg width={chartWidth} height={chartHeight}>
                        {/* Linhas de grade horizontais */}
                        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                            const y = chartHeight - 20 - (ratio * (chartHeight - 40));
                            return (
                                <Line
                                    key={index}
                                    x1="30"
                                    y1={y}
                                    x2={chartWidth}
                                    y2={y}
                                    stroke="#e0e0e0"
                                    strokeWidth="1"
                                />
                            );
                        })}

                        {/* Eixo Y */}
                        <Line
                            x1="30"
                            y1="20"
                            x2="30"
                            y2={chartHeight - 20}
                            stroke="#666"
                            strokeWidth="2"
                        />

                        {/* Eixo X */}
                        <Line
                            x1="30"
                            y1={chartHeight - 20}
                            x2={chartWidth}
                            y2={chartHeight - 20}
                            stroke="#666"
                            strokeWidth="2"
                        />

                        {/* Barras do gráfico em formato empilhado */}
                        {weeklyData.map((dayData, index) => {
                            const x = 35 + (index * barWidth);
                            let currentY = chartHeight - 20;

                            return (
                                <G key={index}>
                                    {/* Renderizar cada período como segmento da barra */}
                                    {dayData.periods.map((period, periodIndex) => {
                                        const segmentHeight = period.kg * scaleFactor;
                                        const y = currentY - segmentHeight;

                                        const segment = (
                                            <Rect
                                                key={periodIndex}
                                                x={x}
                                                y={y}
                                                width={barWidth - 6}
                                                height={segmentHeight}
                                                fill={period.color}
                                                rx={2}
                                            />
                                        );

                                        currentY = y;
                                        return segment;
                                    })}

                                    {/* Label do dia */}
                                    <SvgText
                                        x={x + (barWidth - 6) / 2}
                                        y={chartHeight - 5}
                                        textAnchor="middle"
                                        fill="#666"
                                        fontSize="11"
                                        fontWeight="500"
                                    >
                                        {dayData.day}
                                    </SvgText>

                                    {/* Total no topo da barra */}
                                    <SvgText
                                        x={x + (barWidth - 6) / 2}
                                        y={currentY - 8}
                                        textAnchor="middle"
                                        fill="#333"
                                        fontSize="10"
                                        fontWeight="bold"
                                    >
                                        {dayData.total}kg
                                    </SvgText>
                                </G>
                            );
                        })}
                    </Svg>
                </View>
            </View>
        );
    };

    const renderAnnualChart = () => {
        const maxKg = Math.max(...annualData.map(item => item.kg));
        const chartHeight = 180;
        const chartWidth = screenWidth - 60;
        const barWidth = (chartWidth - 60) / annualData.length;
        const scaleFactor = (chartHeight - 40) / maxKg;

        return (
            <View style={styles.chartContainer}>
                <View style={styles.yAxisLabels}>
                    <Text style={styles.axisLabel}>{maxKg}kg</Text>
                    <Text style={styles.axisLabel}>{Math.round(maxKg * 0.75 * 10) / 10}kg</Text>
                    <Text style={styles.axisLabel}>{Math.round(maxKg * 0.5 * 10) / 10}kg</Text>
                    <Text style={styles.axisLabel}>{Math.round(maxKg * 0.25 * 10) / 10}kg</Text>
                    <Text style={styles.axisLabel}>0kg</Text>
                </View>
                <View style={styles.chartArea}>
                    <Svg width={chartWidth} height={chartHeight}>
                        {/* Linhas de grade horizontais */}
                        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                            const y = chartHeight - 20 - (ratio * (chartHeight - 40));
                            return (
                                <Line
                                    key={index}
                                    x1="30"
                                    y1={y}
                                    x2={chartWidth}
                                    y2={y}
                                    stroke="#e0e0e0"
                                    strokeWidth="1"
                                />
                            );
                        })}

                        {/* Eixo Y */}
                        <Line
                            x1="30"
                            y1="20"
                            x2="30"
                            y2={chartHeight - 20}
                            stroke="#666"
                            strokeWidth="2"
                        />

                        {/* Eixo X */}
                        <Line
                            x1="30"
                            y1={chartHeight - 20}
                            x2={chartWidth}
                            y2={chartHeight - 20}
                            stroke="#666"
                            strokeWidth="2"
                        />

                        {/* Barras do gráfico anual */}
                        {annualData.map((item, index) => {
                            const barHeight = item.kg * scaleFactor;
                            const x = 35 + (index * barWidth);
                            const y = chartHeight - 20 - barHeight;

                            return (
                                <G key={index}>
                                    <Rect
                                        x={x}
                                        y={y}
                                        width={barWidth - 6}
                                        height={barHeight}
                                        fill={item.year === selectedYear ? '#D32F2F' : '#FFA726'}
                                        rx={3}
                                    />
                                    <SvgText
                                        x={x + (barWidth - 6) / 2}
                                        y={chartHeight - 5}
                                        textAnchor="middle"
                                        fill="#666"
                                        fontSize="11"
                                        fontWeight="500"
                                    >
                                        {item.year}
                                    </SvgText>
                                    <SvgText
                                        x={x + (barWidth - 6) / 2}
                                        y={y - 8}
                                        textAnchor="middle"
                                        fill={item.year === selectedYear ? '#D32F2F' : '#FFA726'}
                                        fontSize="10"
                                        fontWeight="bold"
                                    >
                                        {item.kg}kg
                                    </SvgText>
                                </G>
                            );
                        })}
                    </Svg>
                </View>
            </View>
        );
    };

    const renderCalendar = () => {
        const days = [ 'Seg', 'Ter', 'Qua', 'Qui', 'Sex'];
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        // Obter primeiro dia do mês
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        // Obter número de dias no mês
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

        return (
            <View style={styles.calendarContainer}>
                <Text style={styles.calendarTitle}>
                    {monthNames[currentMonth]} {currentYear}
                </Text>
                <View style={styles.calendarDays}>
                    {days.map((day, index) => (
                        <Text key={index} style={styles.calendarDayHeader}>
                            {day}
                        </Text>
                    ))}
                </View>
                <View style={styles.calendarGrid}>
                    {/* Dias vazios no início */}
                    {Array.from({ length: firstDay }, (_, index) => (
                        <View key={`empty-${index}`} style={styles.calendarDay} />
                    ))}

                    {/* Dias do mês */}
                    {Array.from({ length: daysInMonth }, (_, index) => {
                        const day = index + 1;
                        const isCurrentDay = day === currentDay;
                        return (
                            <View
                                key={day}
                                style={[
                                    styles.calendarDay,
                                    isCurrentDay && styles.calendarCurrentDay
                                ]}
                            >
                                <Text style={[
                                    styles.calendarDayText,
                                    isCurrentDay && styles.calendarCurrentDayText
                                ]}>
                                    {day}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        );
    };

    // Legenda dos horários
    const renderLegend = () => {
        const periods = [
            { label: 'Café da Manhã', color: '#FFD700' },
            { label: 'Almoço', color: '#4CAF50' },
            { label: 'Café da Tarde', color: '#2196F3' }
        ];

        return (
            <View style={styles.legendContainer}>
                {periods.map((period, index) => (
                    <View key={index} style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: period.color }]} />
                        <Text style={styles.legendText}>{period.label}</Text>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

            {/* Header */}
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
                    <Text style={styles.sectionLabel}>Calendário</Text>
                    {renderCalendar()}
                </View>

                {/* Gráfico Semanal */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Desperdício Semanal por Horário</Text>
                    <View style={styles.chartCard}>
                        {renderWeeklyChart()}
                        {renderLegend()}
                    </View>
                </View>

                {/* Gráfico Anual */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Comparativo Anual</Text>
                    <View style={styles.chartCard}>
                        {renderAnnualChart()}
                    </View>
                </View>

                {/* Estatísticas Rápidas */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>
                            {weeklyData.reduce((sum, day) => sum + day.total, 0).toFixed(1)}kg
                        </Text>
                        <Text style={styles.statLabel}>Total Semanal</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>
                            {(weeklyData.reduce((sum, day) => sum + day.total, 0) / weeklyData.length).toFixed(1)}kg
                        </Text>
                        <Text style={styles.statLabel}>Média Diária</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>
                            {Math.max(...weeklyData.map(day => day.total)).toFixed(1)}kg
                        </Text>
                        <Text style={styles.statLabel}>Pico Semanal</Text>
                    </View>
                </View>

            </ScrollView>

            {/* Barra inferior de navegação FUNCIONAL */}
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

                <TouchableOpacity style={styles.navItem}>
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
        flexDirection: 'row',
        alignItems: 'center',
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
        flex: 1,
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
        marginBottom: 25,
    },
    sectionLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#D32F2F',
        marginBottom: 15,
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
        height: 180,
        paddingVertical: 10,
    },
    axisLabel: {
        fontSize: 10,
        color: '#666',
        fontWeight: '500',
    },
    chartArea: {
        flex: 1,
    },
    // Legenda
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendColor: {
        width: 14,
        height: 14,
        borderRadius: 7,
        marginRight: 6,
    },
    legendText: {
        fontSize: 11,
        color: '#666',
        fontWeight: '500',
    },
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
    calendarDays: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    calendarDayHeader: {
        flex: 1,
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    calendarDay: {
        width: '14.28%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 2,
    },
    calendarCurrentDay: {
        backgroundColor: '#D32F2F',
        borderRadius: 20,
    },
    calendarDayText: {
        fontSize: 12,
        color: '#333',
        fontWeight: '500',
    },
    calendarCurrentDayText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
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
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 11,
        color: '#666',
        textAlign: 'center',
        fontWeight: '500',
    },
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