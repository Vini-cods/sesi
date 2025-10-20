import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';

const TelaInicioScreen = () => {
    const [decibeis, setDecibeis] = useState([
        { valor: 50, ativo: false },
        { valor: 60, ativo: false },
        { valor: 70, ativo: true },
        { valor: 80, ativo: false },
        { valor: 90, ativo: false },
        { valor: 100, ativo: false },
        { valor: 150, ativo: false },
        { valor: 200, ativo: false },
        { valor: 250, ativo: false },
        { valor: 300, ativo: false },
    ]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

            <View style={styles.header}>
                <Text style={styles.title}>Desperdício</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.subtitle}>Decibéis</Text>

                <ScrollView style={styles.listaDecibeis}>
                    {decibeis.map((item, index) => (
                        <View
                            key={index}
                            style={[
                                styles.itemDecibel,
                                item.ativo && styles.itemAtivo
                            ]}
                        >
                            <Text style={[
                                styles.textDecibel,
                                item.ativo && styles.textAtivo
                            ]}>
                                {item.valor}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
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
        backgroundColor: '#FFFFFF',
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666666',
        marginBottom: 16,
    },
    listaDecibeis: {
        flex: 1,
    },
    itemDecibel: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 16,
        paddingHorizontal: 20,
        marginBottom: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    itemAtivo: {
        backgroundColor: '#D32F2F',
        borderColor: '#C62828',
    },
    textDecibel: {
        fontSize: 16,
        color: '#333333',
        fontWeight: '500',
    },
    textAtivo: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default TelaInicioScreen;