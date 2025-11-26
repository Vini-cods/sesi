import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

const DiaMundialContraDesperdicioScreen = ({ navigation }) => {
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
                <Text style={styles.headerTitle}>Dia Mundial</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Título Principal */}
                <View style={styles.titleContainer}>
                    <Text style={styles.mainTitle}>CONTRA O</Text>
                    <Text style={styles.mainSubtitle}>DESPERDÍCIO</Text>
                </View>

                {/* Cards de Informações */}
                <View style={styles.infoCards}>
                    {/* Card Organização na fila */}
                    <View style={styles.infoCard}>
                        <Text style={styles.cardTitle}>Organização na fila</Text>
                        <Text style={styles.cardText}>
                            Todos os alunos são se alimentar, portanto respeito a fila e seus momentos, estamos de olhos.
                        </Text>
                    </View>

                    {/* Card Junção de resquícios */}
                    <View style={styles.infoCard}>
                        <Text style={styles.cardTitle}>Junção de resquícios</Text>
                        <Text style={styles.cardText}>
                            Juntar toda a comida que derrubou do prato na bandeja ou na mesa.
                        </Text>
                    </View>

                    {/* Card Sem pressa */}
                    <View style={styles.infoCard}>
                        <Text style={styles.cardTitle}>Sem pressa!</Text>
                        <Text style={styles.cardText}>
                            Comer com atenção e estabelecer uma calma respiração entre os intervalos de mastigação.
                        </Text>
                    </View>

                    {/* Card Dados mensais */}
                    <View style={styles.infoCard}>
                        <Text style={styles.cardTitle}>Dados mensais</Text>
                        <Text style={styles.cardText}>
                            Aparece sua conta SESI e assem é feleto de tal forma manterha-se conectado.
                        </Text>
                    </View>
                </View>

                {/* Horário */}
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>14:40</Text>
                </View>

                {/* Rodapé */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Sem Venda</Text>
                    <Text style={styles.footerName}>Dancide da Silva Rogério</Text>
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
        fontWeight: '600',
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
    titleContainer: {
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 20,
    },
    mainTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#D32F2F',
        textAlign: 'center',
    },
    mainSubtitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginTop: -5,
    },
    infoCards: {
        gap: 16,
        marginBottom: 40,
    },
    infoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#D32F2F',
        marginBottom: 8,
    },
    cardText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    timeContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    timeText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#D32F2F',
    },
    footer: {
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        paddingTop: 20,
    },
    footerText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    footerName: {
        fontSize: 14,
        color: '#666',
    },
});

export default DiaMundialContraDesperdicioScreen;