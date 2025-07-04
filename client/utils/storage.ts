import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = 'SMART_TODO_TASKS';

export const saveTasksToStorage = async (tasks: any[]) => {
    try {
        await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error('Error saving tasks:', error);
    }
};

export const loadTasksFromStorage = async (): Promise<any[]> => {
    try {
        const data = await AsyncStorage.getItem(TASKS_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading tasks:', error);
        return [];
    }
};
