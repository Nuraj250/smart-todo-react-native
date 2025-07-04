import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TaskItemProps {
    task: {
        _id: string;
        title: string;
        completed: boolean;
    };
    onToggle: () => void;
    onLongPress: () => void;
}

export default function TaskItem({ task, onToggle, onLongPress }: TaskItemProps) {
    return (
        <TouchableOpacity
            onPress={onToggle}
            onLongPress={onLongPress}
            style={styles.card}
            activeOpacity={0.8}
        >
            <View style={styles.row}>
                <Ionicons
                    name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
                    size={24}
                    color={task.completed ? '#90ee90' : '#bbb'}
                    style={styles.icon}
                />
                <Text
                    style={[
                        styles.title,
                        task.completed && styles.completedText,
                    ]}
                >
                    {task.title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 12,
    },
    title: {
        fontSize: 16,
        color: 'white',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#ccc',
    },
});
