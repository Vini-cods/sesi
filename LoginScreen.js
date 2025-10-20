import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import CustomCheckBox from './CustomCheckBox';

const LoginScreen = ({ navigation }) => {
    const [lembrar, setLembrar] = useState(false);
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const handleLogin = () => {
        console.log('Dados do login:', { senha, confirmarSenha, lembrar });
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

                <View style={styles.container}>
                    <View style={styles.card}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Bem Vindo.</Text>
                        </View>

                        <View style={styles.form}>
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

                            <View style={styles.lembrarContainer}>
                                <CustomCheckBox
                                    value={lembrar}
                                    onValueChange={setLembrar}
                                    label="Lembrar"
                                />
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.entrarButton,
                                    (!senha || !confirmarSenha) && styles.buttonDisabled
                                ]}
                                onPress={handleLogin}
                                disabled={!senha || !confirmarSenha}
                            >
                                <Text style={styles.entrarButtonText}>Entrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
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
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
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
    label: {
        fontSize: 16,
        fontWeight: '600',
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
    lembrarContainer: {
        marginTop: 16,
        marginBottom: 32,
    },
    entrarButton: {
        backgroundColor: '#D32F2F',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonDisabled: {
        backgroundColor: '#BDBDBD',
    },
    entrarButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LoginScreen;