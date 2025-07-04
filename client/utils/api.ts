import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api/tasks', // Change to your IP for physical phone testing
});

export const fetchTasks = () => API.get('/');
export const createTask = (title: string) => API.post('/', { title });
export const updateTask = (id: string, data: any) => API.put(`/${id}`, data);
export const deleteTask = (id: string) => API.delete(`/${id}`);
