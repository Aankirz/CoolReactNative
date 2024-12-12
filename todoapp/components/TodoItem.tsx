import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from './ThemedText';
import { Todo, TodoPriority } from '@/types/todo';
import { useTodo } from '@/contexts/TodoContext';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { priorityColors } from '@/constants/todoStyles';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
} as const;

export function TodoItem({ todo, onEdit }: TodoItemProps) {
  const { dispatch } = useTodo();
  const colorScheme = useColorScheme() ?? 'light';
  const iconColor = Colors[colorScheme].text;

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: Colors[colorScheme].cardBackground,
        borderColor: Colors[colorScheme].border,
      }
    ]}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}>
        <Ionicons
          name={todo.completed ? 'checkbox' : 'square-outline'}
          size={24}
          color={iconColor}
        />
      </TouchableOpacity>
      
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <ThemedText
            style={[
              styles.title,
              todo.completed && styles.completedText,
            ]}>
            {todo.title}
          </ThemedText>
          <View
            style={[
              styles.priorityLabel,
              {
                backgroundColor: priorityColors[todo.priority].bg,
                borderColor: priorityColors[todo.priority].border,
              },
            ]}>
            <ThemedText style={[
              styles.priorityText,
              { color: priorityColors[todo.priority].text }
            ]}>
              {todo.priority}
            </ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          onPress={() => onEdit(todo)} 
          style={[
            styles.actionButton,
            styles.editButton,
            {
              backgroundColor: Colors[colorScheme].background,
              borderColor: Colors[colorScheme].border,
            }
          ]}>
          <ThemedText style={styles.actionEmoji}>✏️</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
          style={[
            styles.actionButton,
            styles.deleteButton,
            {
              backgroundColor: Colors[colorScheme].background,
              borderColor: Colors[colorScheme].border,
            }
          ]}>
          <ThemedText style={styles.actionEmoji}>🗑️</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginVertical: 4,
    borderWidth: 1,
  },
  checkbox: {
    marginRight: 12,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
    marginLeft: 12,
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
  },
  editButton: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 0, 0.2)',
  },
  actionEmoji: {
    fontSize: 16,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priorityLabel: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 50,
    alignItems: 'center',
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  statEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
}); 