import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

const CarregamentoScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.sesiText}>SESI</Text>
            <Text style={styles.saoPauloText}>SÃO PAULO</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    sesiText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
        textAlign: 'center',
    },
    saoPauloText: {
        fontSize: 18,
        color: '#000',
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default CarregamentoScreen;