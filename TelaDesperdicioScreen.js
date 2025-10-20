import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

const TelaDesperdicioScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#D32F2F" />

            <View style={styles.header}>
                <Text style={styles.title}>Controle de Desperdício</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.welcomeText}>Bem-vindo ao Sistema SESI</Text>
                <Text style={styles.subtitle}>Controle de desperdício alimentar</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Inicio')}
                >
                    <Text style={styles.buttonText}>Voltar para Início</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        backgroundColor: '#D32F2F',
        paddingVertical: 20,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666666',
        marginBottom: 32,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#D32F2F',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default TelaDesperdicioScreen;