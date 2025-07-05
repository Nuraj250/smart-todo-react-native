import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: () => void;
  onToggleComplete: (id: string) => void;
}

const TaskItem: React.FC<Props> = ({ task, onDelete, onEdit, onToggleComplete }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => onToggleComplete(task.id)}
      style={[
        styles.container,
        theme === 'dark' && styles.darkContainer,
        task.completed && styles.completed,
      ]}
    >
      <View style={styles.textRow}>
        <Text
          style={[
            styles.title,
            task.completed && styles.strike,
            theme === 'dark' && styles.darkText,
          ]}
        >
          {task.title}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
          <Feather name="edit-2" size={18} color={theme === 'dark' ? '#fff' : '#333'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.iconBtn}>
          <MaterialIcons name="delete" size={20} color="#e74c3c" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 6,
    borderRadius: 12,
    backgroundColor: '#f4f4f4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  darkContainer: {
    backgroundColor: '#1e1e1e',
  },
  textRow: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: '#222',
  },
  darkText: {
    color: '#fff',
  },
  completed: {
    opacity: 0.5,
  },
  strike: {
    textDecorationLine: 'line-through',
  },
  actions: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  iconBtn: {
    marginHorizontal: 6,
  },
});

export default TaskItem;
