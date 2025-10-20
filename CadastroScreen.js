import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, ScrollView } from 'react-native';
import CustomCheckBox from './CustomCheckBox';

const CadastroScreen = () => {
    const [concordo, setConcordo] = useState(false);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>Bem Vindo.</Text>
                </View>

                <View style={styles.form}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu nome completo"
                        placeholderTextColor="#999"
                    />

                    <Text style={styles.label}>E-mail</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu e-mail"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

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

                    <View style={styles.termosContainer}>
                        <CustomCheckBox
                            value={concordo}
                            onValueChange={setConcordo}
                            label="Eu concordo com os Termos e Condições"
                        />
                    </View>

                    <TouchableOpacity style={styles.enterButton}>
                        <Text style={styles.enterButtonText}>Enter</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        flexGrow: 1,
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
        paddingBottom: 40,
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
    termosContainer: {
        marginTop: 24,
        marginBottom: 32,
    },
    enterButton: {
        backgroundColor: '#D32F2F',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
    },
    enterButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CadastroScreen;