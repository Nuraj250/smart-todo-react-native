import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Platform,
    KeyboardAvoidingView,
    Pressable,
} from 'react-native';
import { BlurView } from 'expo-blur';
import DateTimePicker from '@react-native-community/datetimepicker';

const priorities = ['High', 'Medium', 'Low'];

interface TaskModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (title: string, extra: { priority: string; dueDate: string; category: string }) => void;
    existingTitle?: string;
    existingPriority?: string;
    existingDueDate?: string;
    existingCategory?: string;
}

export default function TaskModal({
    visible,
    onClose,
    onSave,
    existingTitle = '',
    existingPriority = 'Medium',
    existingDueDate = '',
    existingCategory = '',
}: TaskModalProps) {
    const [title, setTitle] = useState(existingTitle);
    const [priority, setPriority] = useState(existingPriority);
    const [category, setCategory] = useState(existingCategory);
    const [dueDate, setDueDate] = useState(existingDueDate || new Date().toISOString().split('T')[0]);
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        setTitle(existingTitle);
        setPriority(existingPriority);
        setDueDate(existingDueDate || new Date().toISOString().split('T')[0]);
        setCategory(existingCategory);
    }, [existingTitle, existingPriority, existingDueDate, existingCategory]);

    const handleSave = () => {
        if (!title.trim()) return;
        onSave(title.trim(), { priority, dueDate, category });
        setTitle('');
        setCategory('');
        setPriority('Medium');
        setDueDate(new Date().toISOString().split('T')[0]);
    };

    return (
        <Modal animationType="fade" transparent visible={visible}>
            <BlurView intensity={100} tint="dark" style={styles.overlay}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <Text style={styles.title}>📝 {existingTitle ? 'Edit Task' : 'New Task'}</Text>

                        <TextInput
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Task title..."
                            placeholderTextColor="#ccc"
                            style={styles.input}
                        />

                        {/* Category Input */}
                        <TextInput
                            value={category}
                            onChangeText={setCategory}
                            placeholder="Category (e.g., Personal, Work)"
                            placeholderTextColor="#ccc"
                            style={styles.input}
                        />

                        {/* Priority Dropdown */}
                        <View style={styles.dropdown}>
                            {priorities.map((p) => (
                                <TouchableOpacity
                                    key={p}
                                    style={[styles.priorityBtn, priority === p && styles.activePriority]}
                                    onPress={() => setPriority(p)}
                                >
                                    <Text style={[styles.priorityText, priority === p && styles.activePriorityText]}>{p}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Due Date Picker */}
                        <Pressable onPress={() => setShowDatePicker(true)}>
                            <Text style={styles.dateText}>📅 Due: {dueDate}</Text>
                        </Pressable>

                        {showDatePicker && (
                            <DateTimePicker
                                value={new Date(dueDate)}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    setShowDatePicker(false);
                                    if (selectedDate) {
                                        setDueDate(selectedDate.toISOString().split('T')[0]);
                                    }
                                }}
                            />
                        )}

                        {/* Buttons */}
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.saveBtn, { opacity: title.trim() ? 1 : 0.5 }]}
                                onPress={handleSave}
                                disabled={!title.trim()}
                            >
                                <Text style={styles.saveText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </BlurView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        maxWidth: 400,
    },
    modal: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    title: {
        fontSize: 20,
        color: 'white',
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 12,
        borderRadius: 12,
        color: 'white',
        fontSize: 16,
        marginBottom: 12,
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    priorityBtn: {
        flex: 1,
        marginHorizontal: 4,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
    },
    activePriority: {
        backgroundColor: '#00b4d8',
        borderColor: '#00b4d8',
    },
    priorityText: {
        color: '#ccc',
    },
    activePriorityText: {
        color: 'white',
        fontWeight: '600',
    },
    dateText: {
        fontSize: 16,
        color: '#eee',
        textAlign: 'center',
        marginBottom: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelBtn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    cancelText: {
        color: '#ccc',
        fontSize: 16,
    },
    saveBtn: {
        backgroundColor: '#00b4d8',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    saveText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
