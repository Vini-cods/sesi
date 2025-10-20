import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, ScrollView, ImageBackground } from 'react-native';
import CustomCheckBox from './CustomCheckBox';

const CadastroScreen = ({ navigation }) => {
    const [concordo, setConcordo] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const handleCadastro = () => {
        console.log('Dados do cadastro:', { nome, email, senha, confirmarSenha, concordo });
        navigation.navigate('TelaDesperdicio');
    };

    return (
        <ImageBackground
            source={require('./img/sesi.jpeg')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <StatusBar barStyle="light-content" />

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.card}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Bem Vindo.</Text>
                        </View>

                        <View style={styles.form}>
                            <Text style={styles.labelBold}>Nome</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="   Digite seu nome completo"
                                placeholderTextColor="#999"
                                value={nome}
                                onChangeText={setNome}
                            />

                            <Text style={styles.label}>E-mail</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="   Digite seu e-mail"
                                placeholderTextColor="#999"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />

                            <Text style={styles.label}>Senha</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="   Digite sua senha"
                                placeholderTextColor="#999"
                                secureTextEntry
                                value={senha}
                                onChangeText={setSenha}
                            />

                            <Text style={styles.label}>Confirmação de senha</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="   Confirme sua senha"
                                placeholderTextColor="#999"
                                secureTextEntry
                                value={confirmarSenha}
                                onChangeText={setConfirmarSenha}
                            />

                            <View style={styles.termosContainer}>
                                <CustomCheckBox
                                    value={concordo}
                                    onValueChange={setConcordo}
                                    label="Eu concordo com os Termos e Condições"
                                />
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.enterButton,
                                    (!concordo || !nome || !email || !senha || !confirmarSenha) && styles.buttonDisabled
                                ]}
                                onPress={handleCadastro}
                                disabled={!concordo || !nome || !email || !senha || !confirmarSenha}
                            >
                                <Text style={styles.enterButtonText}>Enter</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        borderRadius: 20,
        paddingHorizontal: 24,
        paddingVertical: 32,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        paddingVertical: 10,
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333333',
    },
    form: {
        width: '100%',
    },
    labelBold: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 8,
        marginTop: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '400',
        color: '#333333',
        marginBottom: 8,
        marginTop: 16,
    },
    input: {
        backgroundColor: '#F5F5F5',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        borderWidth: 0,
        borderRadius: 0,
        paddingVertical: 12,
        paddingHorizontal: 0,
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
        marginBottom: 16,
    },
    buttonDisabled: {
        backgroundColor: '#BDBDBD',
    },
    enterButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CadastroScreen;