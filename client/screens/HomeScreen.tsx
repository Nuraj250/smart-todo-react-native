import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import TaskItem from '../components/TaskItem';
import FloatingActionButton from '../components/FloatingActionButton';
import TaskModal from '../components/TaskModal';
import Header from '../components/Header';
import { loadTasksFromStorage, saveTasksToStorage } from '../utils/storage';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  // Load saved tasks on mount
  useEffect(() => {
    (async () => {
      const saved = await loadTasksFromStorage();
      setTasks(saved);
    })();
  }, []);

  // Persist changes to storage
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  const addOrUpdateTask = (task: Task) => {
    setTasks((prev) => {
      const exists = prev.find((t) => t.id === task.id);
      if (exists) {
        return prev.map((t) => (t.id === task.id ? task : t));
      }
      return [...prev, task];
    });
    setModalVisible(false);
    setEditTask(null);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.darkBg]}>
      <Header />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onDelete={deleteTask}
            onEdit={() => {
              setEditTask(item);
              setModalVisible(true);
            }}
            onToggleComplete={toggleComplete}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={[styles.emptyText, theme === 'dark' && styles.darkText]}>
            No tasks yet.
          </Text>
        }
      />

      <FloatingActionButton onPress={() => setModalVisible(true)} />

      <TaskModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setEditTask(null);
        }}
        onSave={addOrUpdateTask}
        task={editTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  darkBg: {
    backgroundColor: '#121212',
  },
  darkText: {
    color: '#fff',
  },
  emptyText: {
    marginTop: 50,
    textAlign: 'center',
    color: '#777',
    fontSize: 16,
  },
});

export default HomeScreen;
