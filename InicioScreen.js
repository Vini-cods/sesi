import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ImageBackground } from 'react-native';

const InicioScreen = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('./img/sesi.jpeg')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <StatusBar barStyle="light-content" />

                <View style={styles.content}>
                    <View style={styles.card}>
                        <Text style={styles.bemVindoTitle}>Bem Vindo.</Text>

                        <Text style={styles.subtitle}>
                            Acesse sua conta SESI e mantenha-se conectado ao conhecimento e à inovação.
                        </Text>

                        <TouchableOpacity
                            style={styles.entrarButton}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.entrarButtonText}>Entrar</Text>
                        </TouchableOpacity>

                        <View style={styles.loginSection}>
                            <Text style={styles.contaText}>Não tem uma conta?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                                <Text style={styles.loginText}>Cadastro</Text>
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
    content: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 0,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 140,
        paddingHorizontal: 28,
        paddingTop: 36,
        paddingBottom: 90,
    },
    bemVindoTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#424242',
        lineHeight: 20,
        marginBottom: 28,
        textAlign: 'center',
    },
    entrarButton: {
        backgroundColor: '#D32F2F',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 16,
    },
    entrarButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
    },
    contaText: {
        color: '#000000',
        fontSize: 14,
        marginRight: 5,
    },
    loginText: {
        color: '#5B8FE5',
        fontSize: 14,
        fontWeight: '500',
    },
});

export default InicioScreen;