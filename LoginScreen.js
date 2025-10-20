import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import CustomCheckBox from './CustomCheckBox';

const LoginScreen = () => {
    const [lembrar, setLembrar] = useState(false);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            <View style={styles.header}>
                <Text style={styles.title}>Bem Vindo.</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#999"
                    secureTextEntry
                />

                <Text style={styles.label}>Confirmação de senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Confirme sua senha"
                    placeholderTextColor="#999"
                    secureTextEntry
                />

                <View style={styles.lembrarContainer}>
                    <CustomCheckBox
                        value={lembrar}
                        onValueChange={setLembrar}
                        label="Lembrar"
                    />
                </View>

                <TouchableOpacity style={styles.entrarButton}>
                    <Text style={styles.entrarButtonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
    },
    header: {
        paddingVertical: 40,
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333333',
    },
    form: {
        paddingHorizontal: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 8,
        marginTop: 16,
    },
    input: {
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#333333',
    },
    lembrarContainer: {
        marginTop: 16,
        marginBottom: 32,
    },
    entrarButton: {
        backgroundColor: '#D32F2F',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
    },
    entrarButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LoginScreen;