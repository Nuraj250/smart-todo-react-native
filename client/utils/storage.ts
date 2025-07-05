import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = '@smart_todo_tasks';

export const saveTasksToStorage = async (tasks: any[]) => {
  try {
    const json = JSON.stringify(tasks);
    await AsyncStorage.setItem(TASKS_KEY, json);
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

export const loadTasksFromStorage = async (): Promise<any[]> => {
  try {
    const json = await AsyncStorage.getItem(TASKS_KEY);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
};
