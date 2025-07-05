import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, theme === 'dark' && styles.darkText]}>
        Smart To-Do
      </Text>
      <ThemeToggle />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
});

export default Header;
