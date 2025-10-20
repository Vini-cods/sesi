import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ImageBackground } from 'react-native';

const InicioScreen = ({ navigation }) => {
    return (
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80' }}
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
                            onPress={() => navigation.navigate('TelaInicio')}
                        >
                            <Text style={styles.entrarButtonText}>Entrar</Text>
                        </TouchableOpacity>

                        <View style={styles.loginSection}>
                            <Text style={styles.contaText}>Não tem uma conta?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                                <Text style={styles.loginText}>Cadastro</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.loginSection}>
                            <Text style={styles.contaText}>Já tem uma conta?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.loginText}>Login</Text>
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
        backgroundColor: 'rgba(255, 100, 80, 0.6)',
    },
    content: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 28,
        paddingTop: 36,
        paddingBottom: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
    },
    bemVindoTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#C62828',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 14,
        color: '#424242',
        lineHeight: 20,
        marginBottom: 28,
    },
    entrarButton: {
        backgroundColor: '#D32F2F',
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#D32F2F',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    entrarButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
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