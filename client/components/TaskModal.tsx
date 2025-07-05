import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  task: Task | null;
}

const TaskModal: React.FC<Props> = ({ visible, onClose, onSave, task }) => {
  const { theme } = useTheme();
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
    } else {
      setTitle('');
    }
  }, [task]);

  const handleSave = () => {
    if (!title.trim()) return;

    const newTask: Task = task
      ? { ...task, title }
      : { id: uuidv4(), title, completed: false };

    onSave(newTask);
    setTitle('');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.wrapper}
      >
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: theme === 'dark' ? '#1c1c1e' : '#fff' },
          ]}
        >
          <Text
            style={[
              styles.modalTitle,
              { color: theme === 'dark' ? '#fff' : '#000' },
            ]}
          >
            {task ? 'Edit Task' : 'New Task'}
          </Text>

          <TextInput
            placeholder="Task title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor={theme === 'dark' ? '#aaa' : '#666'}
            style={[
              styles.input,
              {
                color: theme === 'dark' ? '#fff' : '#000',
                borderColor: theme === 'dark' ? '#555' : '#ccc',
              },
            ]}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={[styles.button, styles.cancel]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={[styles.button, styles.save]}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 24,
  },
  modalContainer: {
    borderRadius: 16,
    padding: 20,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginLeft: 10,
  },
  cancel: {
    backgroundColor: '#aaa',
  },
  save: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default TaskModal;
