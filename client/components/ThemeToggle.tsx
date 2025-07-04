import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <TouchableOpacity style={styles.toggle} onPress={toggleTheme}>
            <Text style={styles.text}>{theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    toggle: {
        padding: 10,
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        color: '#fff',
    },
});
