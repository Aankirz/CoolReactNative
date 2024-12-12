import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, ScrollView, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { TodoProvider, useTodo } from '@/contexts/TodoContext';
import { TodoItem } from '@/components/TodoItem';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Todo, TodoPriority } from '@/types/todo';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { priorityColors } from '@/constants/todoStyles';

function TodoList() {
  const { state, dispatch } = useTodo();
  const [newTodo, setNewTodo] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<TodoPriority>('medium');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const colorScheme = useColorScheme() ?? 'light';

  // Add stats calculations back
  const totalTasks = state.todos.length;
  const completedTasks = state.todos.filter(todo => todo.completed).length;
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;

    if (editingTodo) {
      dispatch({
        type: 'EDIT_TODO',
        payload: {
          id: editingTodo.id,
          title: newTodo,
          priority: selectedPriority,
        },
      });
      setEditingTodo(null);
    } else {
      dispatch({
        type: 'ADD_TODO',
        payload: {
          title: newTodo,
          completed: false,
          priority: selectedPriority,
        },
      });
    }
    setNewTodo('');
    setSelectedPriority('medium');
    Keyboard.dismiss();
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setNewTodo(todo.title);
    setSelectedPriority(todo.priority);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Add input ref
  const inputRef = React.useRef<TextInput>(null);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        ✨ My Tasks
      </ThemedText>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { 
          backgroundColor: Colors[colorScheme].cardBackground,
          borderColor: Colors[colorScheme].border 
        }]}>
          <ThemedText style={styles.statEmoji}>📝</ThemedText>
          <ThemedText style={styles.statValue}>{totalTasks}</ThemedText>
          <ThemedText style={styles.statLabel}>Total Tasks</ThemedText>
        </View>
        <View style={[styles.statCard, { 
          backgroundColor: Colors[colorScheme].cardBackground,
          borderColor: Colors[colorScheme].border 
        }]}>
          <ThemedText style={styles.statEmoji}>✅</ThemedText>
          <ThemedText style={styles.statValue}>{completedTasks}</ThemedText>
          <ThemedText style={styles.statLabel}>Completed</ThemedText>
        </View>
        <View style={[styles.statCard, { 
          backgroundColor: Colors[colorScheme].cardBackground,
          borderColor: Colors[colorScheme].border 
        }]}>
          <ThemedText style={styles.statEmoji}>🎯</ThemedText>
          <ThemedText style={styles.statValue}>{completionRate}%</ThemedText>
          <ThemedText style={styles.statLabel}>Success Rate</ThemedText>
        </View>
      </View>

      <View style={styles.inputSection}>
        <View style={[styles.inputContainer, {
          backgroundColor: Colors[colorScheme].cardBackground,
          borderColor: Colors[colorScheme].border
        }]}>
          <ThemedText style={styles.inputEmoji}>✍️</ThemedText>
          <TextInput
            ref={inputRef}
            style={[
              styles.input,
              { color: Colors[colorScheme].text },
            ]}
            value={newTodo}
            onChangeText={setNewTodo}
            placeholder="Add a new task..."
            placeholderTextColor={Colors[colorScheme].tabIconDefault}
          />
          <TouchableOpacity
            onPress={handleAddTodo}
            style={styles.addButton}
            disabled={!newTodo.trim()}>
            <Ionicons
              name="add"
              size={24}
              color={
                newTodo.trim()
                  ? Colors[colorScheme].tint
                  : Colors[colorScheme].tabIconDefault
              }
            />
          </TouchableOpacity>
        </View>

        <View style={styles.priorityContainer}>
          {(['low', 'medium', 'high'] as TodoPriority[]).map((priority) => (
            <TouchableOpacity
              key={priority}
              style={[
                styles.priorityButton,
                selectedPriority === priority && styles.selectedPriority,
                {
                  backgroundColor: Colors[colorScheme].cardBackground,
                  borderColor: Colors[colorScheme].border,
                },
              ]}
              onPress={() => setSelectedPriority(priority)}>
              <ThemedText
                style={[
                  styles.priorityButtonText,
                  { color: priorityColors[priority].text },
                ]}>
                {priority}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.todoList}>
        {state.todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onEdit={handleEdit} />
        ))}
      </ScrollView>
    </ThemedView>
  );
}

export default function HomeScreen() {
  return (
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 28,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  statEmoji: {
    fontSize: 20,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 4,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    borderWidth: 1,
  },
  inputEmoji: {
    marginRight: 8,
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  addButton: {
    padding: 4,
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  selectedPriority: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  todoList: {
    flex: 1,
  },
  inputSection: {
    gap: 12,
    marginBottom: 20,
  },
});

