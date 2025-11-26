import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

const DiaMundialContraDesperdicioScreen = ({ navigation, route }) => {
    
    const cardsDisponiveis = [
        {
            id: 1,
            title: 'Organização na fila',
            description: 'Todos os alunos vão se alimentar, portanto respeite a fila e seus momentos, estamos de olho!',
            icon: 'fast-food',
            color: 'red'
        },
        {
            id: 2,
            title: 'Sem pressa!',
            description: 'Comer com atenção e estabelecer uma calma respiração entre os intervalos de mastigação',
            icon: 'happy',
            color: 'white'
        },
        {
            id: 3,
            title: 'Junção de resquícios',
            description: 'Juntar toda a comida que derrubou do prato na bandeja ou na mesa',
            icon: 'leaf',
            color: 'white'
        },
        {
            id: 4,
            title: 'Dados mensais',
            description: 'Acesse sua conta SESI e assim é feito de tal forma mantenha-se conectado',
            icon: 'pie-chart',
            color: 'red'
        }
    ];

    const handleCardPress = (card) => {
        // Navega de volta para TelaDesperdicio substituindo o card do Dia Mundial
        navigation.navigate('TelaDesperdicio', { 
            cardDiaMundialSelecionado: card 
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F0F4F0" translucent />

            <View style={styles.backgroundContainer}>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Header com badge */}
                    <View style={styles.header}>
                        <View style={styles.badge}>
                            <View style={styles.avatarCircle} />
                            <View style={styles.badgeTextContainer}>
                                <Text style={styles.badgeLabel}>Bem Vinda</Text>
                                <Text style={styles.badgeName}>Daniele da Silva Rogério</Text>
                            </View>
                        </View>
                        <View style={styles.headerIcons}>
                            <Ionicons name="trophy" size={32} color="#FFD700" />
                        </View>
                    </View>

                    {/* Grade de Cards 2x2 */}
                    <View style={styles.cardsGrid}>
                        {/* Linha 1 */}
                        <View style={styles.cardRow}>
                            <TouchableOpacity 
                                style={[styles.card, styles.cardRed]}
                                onPress={() => handleCardPress(cardsDisponiveis[0])}
                            >
                                <View style={styles.cardIconContainer}>
                                    <Ionicons name="fast-food" size={32} color="#FFF" />
                                </View>
                                <Text style={styles.cardTitle}>Organização na fila</Text>
                                <Text style={styles.cardDescription}>
                                    Todos os alunos vão se alimentar, portanto respeite a fila e seus momentos, estamos de olho!
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.card, styles.cardWhite]}
                                onPress={() => handleCardPress(cardsDisponiveis[1])}
                            >
                                <View style={[styles.cardIconContainer, styles.cardIconRed]}>
                                    <Ionicons name="happy" size={32} color="#D32F2F" />
                                </View>
                                <Text style={[styles.cardTitle, styles.cardTitleRed]}>Sem pressa!</Text>
                                <Text style={styles.cardDescriptionDark}>
                                    Comer com atenção e estabelecer uma calma respiração entre os intervalos de mastigação
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Linha 2 */}
                        <View style={styles.cardRow}>
                            <TouchableOpacity 
                                style={[styles.card, styles.cardWhite]}
                                onPress={() => handleCardPress(cardsDisponiveis[2])}
                            >
                                <View style={[styles.cardIconContainer, styles.cardIconRed]}>
                                    <Ionicons name="leaf" size={32} color="#D32F2F" />
                                </View>
                                <Text style={[styles.cardTitle, styles.cardTitleRed]}>Junção de resquícios</Text>
                                <Text style={styles.cardDescriptionDark}>
                                    Juntar toda a comida que derrubou do prato na bandeja ou na mesa
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.card, styles.cardRed]}
                                onPress={() => handleCardPress(cardsDisponiveis[3])}
                            >
                                <View style={styles.cardIconContainer}>
                                    <Ionicons name="pie-chart" size={32} color="#FFF" />
                                </View>
                                <Text style={styles.cardTitle}>Dados mensais</Text>
                                <Text style={styles.cardDescription}>
                                    Acesse sua conta SESI e assim é feito de tal forma mantenha-se conectado
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Imagens promocionais */}
                    <View style={styles.promoSection}>
                        <View style={[styles.promoCard, styles.promoCardYellow]}>
                            <View style={styles.promoIconContainer}>
                                <Ionicons name="ribbon" size={40} color="#D32F2F" />
                            </View>
                            <Text style={styles.promoText}>DIA MUNDIAL{'\n'}CONTRA O{'\n'}DESPERDÍCIO</Text>
                        </View>
                        <View style={[styles.promoCard, styles.promoCardGray]}>
                            <View style={styles.promoIconContainer}>
                                <Ionicons name="people" size={40} color="#FFF" />
                            </View>
                            <Text style={styles.promoTextWhite}>JUNTOS CONTRA{'\n'}O DESPERDÍCIO</Text>
                        </View>
                    </View>
                </ScrollView>

                {/* Bottom Navigation */}
                <View style={styles.bottomNav}>
                    <TouchableOpacity style={styles.navButton}>
                        <Ionicons name="home" size={28} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButton}>
                        <Ionicons name="search" size={28} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButton}>
                        <Ionicons name="person" size={28} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

// Os styles permanecem os mesmos...
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F0',
    },
    backgroundContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#F0F4F0',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D32F2F',
        borderRadius: 25,
        paddingVertical: 8,
        paddingHorizontal: 16,
        paddingRight: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    avatarCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFF',
        marginRight: 12,
    },
    badgeTextContainer: {
        justifyContent: 'center',
    },
    badgeLabel: {
        fontSize: 10,
        color: '#FFF',
        fontWeight: '500',
    },
    badgeName: {
        fontSize: 12,
        color: '#FFF',
        fontWeight: 'bold',
    },
    headerIcons: {
        flexDirection: 'row',
        gap: 10,
    },
    cardsGrid: {
        marginBottom: 20,
        gap: 15,
    },
    cardRow: {
        flexDirection: 'row',
        gap: 15,
    },
    card: {
        flex: 1,
        borderRadius: 16,
        padding: 16,
        minHeight: 160,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    cardRed: {
        backgroundColor: '#D32F2F',
    },
    cardWhite: {
        backgroundColor: '#FFF',
    },
    cardIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardIconRed: {
        backgroundColor: '#FFEBEE',
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 8,
    },
    cardTitleRed: {
        color: '#D32F2F',
    },
    cardDescription: {
        fontSize: 11,
        color: '#FFF',
        lineHeight: 16,
        opacity: 0.95,
    },
    cardDescriptionDark: {
        fontSize: 11,
        color: '#666',
        lineHeight: 16,
    },
    promoSection: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 20,
    },
    promoCard: {
        flex: 1,
        height: 140,
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    promoCardYellow: {
        backgroundColor: '#FFE082',
    },
    promoCardGray: {
        backgroundColor: '#90A4AE',
    },
    promoIconContainer: {
        marginBottom: 8,
    },
    promoText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#D32F2F',
        textAlign: 'center',
        lineHeight: 14,
    },
    promoTextWhite: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
        lineHeight: 14,
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#D32F2F',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 16,
        paddingBottom: 20,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    navButton: {
        padding: 8,
    },
});

export default DiaMundialContraDesperdicioScreen;