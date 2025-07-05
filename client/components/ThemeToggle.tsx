import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.toggle}>
      <Feather
        name={theme === 'dark' ? 'sun' : 'moon'}
        size={22}
        color={theme === 'dark' ? '#ffd700' : '#333'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggle: {
    padding: 8,
    borderRadius: 10,
  },
});

export default ThemeToggle;
