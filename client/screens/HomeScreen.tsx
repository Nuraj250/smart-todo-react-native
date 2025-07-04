import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import TaskItem from '../components/TaskItem';
import TaskModal from '../components/TaskModal';
import FloatingActionButton from '../components/FloatingActionButton';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const STORAGE_KEY = 'SMART_TODO_TASKS';

export default function HomeScreen() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [filter, setFilter] = useState<{ priority: string; category: string }>({ priority: '', category: '' });

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) setTasks(JSON.parse(data));
    } catch (err) {
      console.error('Load error:', err);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  const handleSaveTask = (
    title: string,
    extra: { priority: string; dueDate: string; category: string }
  ) => {
    const newTask = {
      _id: selectedTask?._id || Date.now().toString(),
      title,
      completed: selectedTask?.completed || false,
      priority: extra.priority,
      dueDate: extra.dueDate,
      category: extra.category,
    };

    if (selectedTask) {
      setTasks(prev =>
        prev.map(t => (t._id === selectedTask._id ? newTask : t))
      );
    } else {
      setTasks(prev => [newTask, ...prev]);
    }

    setModalVisible(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = (id: string) => {
    Alert.alert('Delete Task?', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setTasks(prev => prev.filter(t => t._id !== id));
        },
      },
    ]);
  };

  const toggleComplete = (id: string) => {
    setTasks(prev =>
      prev.map(t =>
        t._id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleEdit = (id: string) => {
    const task = tasks.find(t => t._id === id);
    if (!task) return;
    setSelectedTask(task);
    setModalVisible(true);
  };

  const filteredTasks = tasks.filter(task => {
    return (
      (filter.priority ? task.priority === filter.priority : true) &&
      (filter.category ? task.category === filter.category : true)
    );
  });

  return (
    <LinearGradient
      colors={isDark ? ['#1e1e1e', '#121212'] : ['#e0eafc', '#cfdef3']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDark ? '#fff' : '#222' }]}>🧠 Smart To-Do</Text>
          <Text style={[styles.subtitle, { color: isDark ? '#ccc' : '#555' }]}>Plan. Prioritise. Win.</Text>
          <ThemeToggle />
        </View>

        {/* FILTER BAR */}
        <View style={styles.filterBar}>
          {['', 'High', 'Medium', 'Low'].map(p => (
            <TouchableOpacity key={p} onPress={() => setFilter({ priority: p, category: '' })}>
              <Text style={[styles.filterBtn, filter.priority === p && styles.activeFilter]}>
                {p || 'All'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* TASK LIST */}
        <FlatList
          data={filteredTasks}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={() => toggleComplete(item._id)}
              onLongPress={() =>
                Alert.alert(
                  'Task Options',
                  item.title,
                  [
                    { text: 'Edit', onPress: () => handleEdit(item._id) },
                    { text: 'Delete', onPress: () => handleDeleteTask(item._id), style: 'destructive' },
                    { text: 'Cancel', style: 'cancel' },
                  ],
                  { cancelable: true }
                )
              }
            />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: isDark ? '#ccc' : '#444' }]}>
              No tasks found. Add one!
            </Text>
          }
        />

        <FloatingActionButton onPress={() => setModalVisible(true)} />

        <TaskModal
          visible={isModalVisible}
          onClose={() => {
            setModalVisible(false);
            setSelectedTask(null);
          }}
          onSave={handleSaveTask}
          existingTitle={selectedTask?.title}
          existingPriority={selectedTask?.priority}
          existingDueDate={selectedTask?.dueDate}
          existingCategory={selectedTask?.category}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 40,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    fontSize: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#333',
  },
  activeFilter: {
    backgroundColor: '#00b4d8',
    color: '#fff',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 50,
  },
});
