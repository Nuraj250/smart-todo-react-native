import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

interface Props {
  onPress: () => void;
}

const FloatingActionButton: React.FC<Props> = ({ onPress }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          {
            backgroundColor: theme === 'dark' ? '#0f9d58' : '#2196f3',
            shadowColor: theme === 'dark' ? '#fff' : '#000',
          },
        ]}
      >
        <AntDesign name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  button: {
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
  },
});

export default FloatingActionButton;
