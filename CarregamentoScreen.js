import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

const CarregamentoScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Text style={styles.sesiText}>SESI</Text>
            <Text style={styles.saoPauloText}>SÃO PAULO</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A39B96',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    sesiText: {
        fontSize: 64,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#D32F2F',
        marginBottom: 4,
        textAlign: 'center',
        letterSpacing: 2,
    },
    saoPauloText: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: '400',
        textAlign: 'center',
        letterSpacing: 3,
    },
});

export default CarregamentoScreen;