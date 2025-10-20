import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const CustomCheckBox = ({ value, onValueChange, label, style }) => {
    return (
        <TouchableOpacity
            style={[styles.container, style]}
            onPress={() => onValueChange(!value)}
            activeOpacity={0.7}
        >
            <View style={[styles.checkbox, value && styles.checkboxChecked]}>
                {value && <View style={styles.checkboxInner} />}
            </View>
            {label && <Text style={styles.label}>{label}</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#666666',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        backgroundColor: '#FFFFFF',
    },
    checkboxChecked: {
        borderColor: '#D32F2F',
        backgroundColor: '#D32F2F',
    },
    checkboxInner: {
        width: 10,
        height: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
    },
    label: {
        fontSize: 14,
        color: '#666666',
    },
});

export default CustomCheckBox;