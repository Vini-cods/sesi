import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

const InicioScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <Text style={styles.bemVindoTitle}># Bem Vindo.</Text>

            <Text style={styles.subtitle}>
                Acesse sua conta SESI e mantenha-se conectado ao conhecimento e à inovação.
            </Text>

            <View style={styles.content}>
                <View style={styles.entrarSection}>
                    <Text style={styles.entrarTitle}>Entrar</Text>
                    <View style={styles.contaInfo}>
                        <Text style={styles.contaText}>Não tem uma conta?</Text>
                        <TouchableOpacity>
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        paddingTop: 60,
    },
    bemVindoTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
        marginBottom: 40,
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    entrarSection: {
        marginTop: 20,
    },
    entrarTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
        marginBottom: 8,
    },
    contaInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    contaText: {
        color: '#666',
        fontSize: 14,
        marginRight: 6,
    },
    loginText: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '500',
    },
});

export default InicioScreen;