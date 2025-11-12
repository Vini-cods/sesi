import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TelaSolScreen = ({ navigation, route }) => {
    const figurinhas = [
        { id: 1, source: require('./img/sol.png') },
        { id: 2, source: require('./img/figurinha1.png') },
        { id: 3, source: require('./img/figurinha2.png') },
        { id: 4, source: require('./img/figurinha3.png') },
        { id: 5, source: require('./img/figurinha4.png') },
        { id: 6, source: require('./img/figurinha5.png') },
    ];

    const handleFigurinhaPress = (figurinha) => {
        navigation.navigate('TelaDesperdicio', { figurinhaSelecionada: figurinha });
    };

    // Agrupar figurinhas em duplas
    const figurinhasAgrupadas = [];
    for (let i = 0; i < figurinhas.length; i += 2) {
        figurinhasAgrupadas.push(figurinhas.slice(i, i + 2));
    }

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
                contentContainerStyle={styles.scrollContent}
            >
                <Text style={styles.sectionTitle}>Como esta Hoje?</Text>
                
                <View style={styles.figurinhasContainer}>
                    {figurinhasAgrupadas.map((dupla, index) => (
                        <View key={index} style={styles.duplaContainer}>
                            {dupla.map((figurinha) => (
                                <TouchableOpacity
                                    key={figurinha.id}
                                    style={styles.figurinhaItem}
                                    onPress={() => handleFigurinhaPress(figurinha)}
                                >
                                    <Image
                                        source={figurinha.source}
                                        style={styles.figurinhaImage}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#D32F2F',
        textAlign: 'center',
        marginBottom: 20,
    },
    figurinhasContainer: {
        marginBottom: 20,
    },
    duplaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    figurinhaItem: {
        width: '48%',
        aspectRatio: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    figurinhaImage: {
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

export default TelaSolScreen;