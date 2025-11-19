// DataContext.js
import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData deve ser usado dentro de um DataProvider');
    }
    return context;
};

export const DataProvider = ({ children }) => {
    // Dados iniciais para cada dia da semana
    const [dadosSemana, setDadosSemana] = useState([
        {
            dia: 'Seg',
            date: '24/10',
            fullDate: '24/10/2025',
            meals: [
                { id: 1, name: 'Café de Manhã', value: 1.8, color: '#FFC107' },
                { id: 2, name: 'Almoço', value: 2.5, color: '#4CAF50' },
                { id: 3, name: 'Café de Tarde', value: 0.8, color: '#2196F3' },
            ]
        },
        {
            dia: 'Ter',
            date: '25/10',
            fullDate: '25/10/2025',
            meals: [
                { id: 1, name: 'Café de Manhã', value: 1.2, color: '#FFC107' },
                { id: 2, name: 'Almoço', value: 3.1, color: '#4CAF50' },
                { id: 3, name: 'Café de Tarde', value: 1.0, color: '#2196F3' },
            ]
        },
        {
            dia: 'Qua',
            date: '26/10',
            fullDate: '26/10/2025',
            meals: [
                { id: 1, name: 'Café de Manhã', value: 2.1, color: '#FFC107' },
                { id: 2, name: 'Almoço', value: 2.8, color: '#4CAF50' },
                { id: 3, name: 'Café de Tarde', value: 0.9, color: '#2196F3' },
            ]
        },
        {
            dia: 'Qui',
            date: '27/10',
            fullDate: '27/10/2025',
            meals: [
                { id: 1, name: 'Café de Manhã', value: 1.5, color: '#FFC107' },
                { id: 2, name: 'Almoço', value: 2.2, color: '#4CAF50' },
                { id: 3, name: 'Café de Tarde', value: 1.2, color: '#2196F3' },
            ]
        },
        {
            dia: 'Sex',
            date: '28/10',
            fullDate: '28/10/2025',
            meals: [
                { id: 1, name: 'Café de Manhã', value: 1.9, color: '#FFC107' },
                { id: 2, name: 'Almoço', value: 3.3, color: '#4CAF50' },
                { id: 3, name: 'Café de Tarde', value: 0.7, color: '#2196F3' },
            ]
        },
    ]);

    // Função para atualizar as refeições de um dia
    const atualizarRefeicoesDia = (date, novasRefeicoes) => {
        setDadosSemana(prev =>
            prev.map(dia =>
                dia.fullDate === date ? { ...dia, meals: novasRefeicoes } : dia
            )
        );
    };

    // Buscar dados de um dia específico
    const getDadosPorData = (date) => {
        return dadosSemana.find(dia => dia.fullDate === date);
    };

    // Calcular totais para pesquisa
    const calcularTotaisParaPesquisa = () => {
        const dadosPesquisa = {};

        dadosSemana.forEach(dia => {
            const totalKg = dia.meals.reduce((sum, meal) => sum + meal.value, 0);
            const maxDecibels = Math.floor(totalKg * 6 + 40);

            // Gerar dados de decibéis baseados no desperdício
            const baseDecibel = Math.floor(totalKg * 5 + 40);
            dadosPesquisa[dia.fullDate] = {
                decibelData: [
                    { label: 'Manhã', value: baseDecibel - 5, color: '#FFD700' },
                    { label: 'Tarde', value: baseDecibel, color: '#4CAF50' },
                    { label: 'Noite', value: baseDecibel + 5, color: '#D32F2F' }
                ],
                lineChartData: [
                    { time: '08:00', decibels: baseDecibel - 10 },
                    { time: '10:00', decibels: baseDecibel - 5 },
                    { time: '12:00', decibels: baseDecibel + 10 },
                    { time: '14:00', decibels: baseDecibel },
                    { time: '16:00', decibels: baseDecibel - 5 },
                    { time: '18:00', decibels: baseDecibel + 5 },
                    { time: '20:00', decibels: baseDecibel - 2 }
                ],
                totalKg: parseFloat(totalKg.toFixed(1)),
                wasteData: dia.meals,
                note: totalKg > 10 ?
                    'Dia com alto nível de desperdício. Os alunos estavam agitados durante as refeições.' :
                    totalKg > 8 ?
                        'Dia com desperdício moderado. Ambiente relativamente controlado.' :
                        'Dia com baixo desperdício. Ambiente tranquilo e organizado.'
            };
        });

        return dadosPesquisa;
    };

    const value = {
        dadosSemana,
        setDadosSemana,
        atualizarRefeicoesDia,
        getDadosPorData,
        calcularTotaisParaPesquisa
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};