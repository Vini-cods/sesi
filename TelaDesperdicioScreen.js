import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

const TelaDesperdicioScreen = ({ navigation, route }) => {
    // Estado para armazenar a figurinha selecionada
    const [figurinhaSelecionada, setFigurinhaSelecionada] = useState(require('./img/sol.png'));

    // Atualiza a figurinha quando retorna da tela de seleção
    useEffect(() => {
        if (route.params?.figurinhaSelecionada) {
            setFigurinhaSelecionada(route.params.figurinhaSelecionada.source);
        }
    }, [route.params?.figurinhaSelecionada]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

            {/* Header com perfil */}
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
                {/* Cards principais */}
                <View style={styles.mainCards}>
                    {/* Card Desperdício - AGORA É UM BOTÃO COM IMAGEM */}
                    <TouchableOpacity
                        style={styles.cardDesperdicio}
                        onPress={() => navigation.navigate('DesperdicioDetalhes')}
                    >
                        <Image
                            source={require('./img/desperdicio.jpeg')}
                            style={styles.graficoBarrasImage}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>

                    {/* Card Contra Desperdício */}
                    <View style={styles.cardContra}>
                        <View style={styles.circleDecoration} />
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>DIA MUNDIAL</Text>
                            <Text style={styles.badgeTitle}>CONTRA O</Text>
                            <Text style={styles.badgeSubtitle}>DESPERDÍCIO</Text>
                        </View>
                    </View>
                </View>

                {/* Gráfico de Decibéis - AGORA É UMA IMAGEM E UM BOTÃO QUE NAVEGA PARA DETALHES */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Decibéis</Text>
                    <TouchableOpacity
                        style={styles.chartCard}
                        onPress={() => navigation.navigate('TelaDecibeisDetalhes')}
                    >
                        <Image
                            source={require('./img/decibeis.jpeg')}
                            style={styles.graficoDecibeisImage}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>

                {/* Espaçamento adicional para descer os elementos */}
                <View style={styles.spacing} />

                {/* Cards inferiores */}
                <View style={styles.bottomCards}>
                    {/* Card Emoji - AGORA É UM BOTÃO QUE NAVEGA PARA TELA DO SOL */}
                    <TouchableOpacity
                        style={styles.cardEmoji}
                        onPress={() => navigation.navigate('TelaSol')}
                    >
                        <Image
                            source={figurinhaSelecionada}
                            style={styles.solImage}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    {/* Card Imagem - AGORA É UM BOTÃO */}
                    <TouchableOpacity
                        style={styles.cardImage}
                        onPress={() => navigation.navigate('Pesquisa')}
                    >
                        <Image
                            source={require('./img/cenoura.jpeg')}
                            style={styles.cenouraImage}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {/* Barra inferior de navegação */}
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
    spacing: {
        height: 10,
    },
    mainCards: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 10,
        marginTop: 60,
    },
    cardDesperdicio: {
        flex: 1,
        backgroundColor: '#D32F2F',
        borderRadius: 20,
        padding: 20,
        height: 150,
        justifyContent: 'space-between',
        overflow: 'hidden',
        position: 'relative',
    },
    graficoBarrasImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '130%',
        height: '150%',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        zIndex: 1,
    },
    barChartIcon: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 8,
    },
    miniBar: {
        width: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 4,
    },
    cardContra: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
    },
    circleDecoration: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FFA726',
        opacity: 0.3,
    },
    badge: {
        zIndex: 1,
    },
    badgeText: {
        fontSize: 10,
        color: '#333',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 2,
    },
    badgeTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#D32F2F',
        textAlign: 'center',
    },
    badgeSubtitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    graficoDecibeisImage: {
        width: '100%',
        height: 150,
    },
    bottomCards: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 20,
    },
    cardEmoji: {
        flex: 1,
        backgroundColor: 'transparent',
        borderRadius: 20,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    solImage: {
        width: '100%',
        height: '100%',
    },
    cardImage: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        height: 140,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cenouraImage: {
        width: '100%',
        height: '100%',
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
});

export default TelaDesperdicioScreen;