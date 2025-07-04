import React from 'react';
import { TouchableOpacity, StyleSheet, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    onPress: () => void;
}

export default function FloatingActionButton({ onPress }: Props) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
            <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#00b4d8',
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6.65,
        elevation: 8,
    },
});
