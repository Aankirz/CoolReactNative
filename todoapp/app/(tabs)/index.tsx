import { useState, useCallback } from 'react';
import { StyleSheet, TextInput, FlatList, Pressable, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Todo' | 'In Progress' | 'Done' | 'Backlog' | 'Canceled';
}

const PRIORITY_EMOJIS = {
  Low: '⬇️',
  Medium: '➡️',
  High: '⬆️'
};

const STATUS_EMOJIS = {
  Todo: '📝',
  'In Progress': '🚀',
  Done: '✅',
  Backlog: '📋',
  Canceled: '❌'
};

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const colorScheme = useColorScheme() ?? 'light';

  const addTodo = useCallback(() => {
    if (newTodo.trim()) {
      setTodos(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: newTodo.trim(),
          completed: false,
          priority: 'Medium',
          status: 'Todo'
        },
      ]);
      setNewTodo('');
    }
  }, [newTodo]);

  const updateTodoStatus = useCallback((id: string, status: Todo['status']) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, status, completed: status === 'Done' } : todo
      )
    );
  }, []);

  const updateTodoPriority = useCallback((id: string, priority: Todo['priority']) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, priority } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Welcome back! 👋</ThemedText>
        <ThemedText style={styles.subtitle}>
          Here's a list of your tasks for this month! 📅
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { color: Colors[colorScheme].text }]}
          placeholder="Add a new task..."
          placeholderTextColor={Colors[colorScheme].tabIconDefault}
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={addTodo}
        />
        <Pressable onPress={addTodo} style={styles.addButton}>
          <IconSymbol
            name="plus.circle.fill"
            size={24}
            color={Colors[colorScheme].tint}
          />
        </Pressable>
      </ThemedView>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <ThemedView style={styles.listHeader}>
            <ThemedText style={styles.headerText}>Task</ThemedText>
            <ThemedText style={styles.headerText}>Status</ThemedText>
            <ThemedText style={styles.headerText}>Priority</ThemedText>
          </ThemedView>
        }
        renderItem={({ item }) => (
          <Pressable
            style={[styles.todoItem, item.completed && styles.completedTodo]}>
            <ThemedView style={styles.todoContent}>
              <ThemedText style={styles.todoText}>
                {item.text}
              </ThemedText>
            </ThemedView>
            
            <Pressable 
              onPress={() => {
                const statuses: Todo['status'][] = ['Todo', 'In Progress', 'Done', 'Backlog', 'Canceled'];
                const currentIndex = statuses.indexOf(item.status);
                const nextStatus = statuses[(currentIndex + 1) % statuses.length];
                updateTodoStatus(item.id, nextStatus);
              }}
              style={styles.statusButton}>
              <ThemedText>{STATUS_EMOJIS[item.status]} {item.status}</ThemedText>
            </Pressable>

            <Pressable 
              onPress={() => {
                const priorities: Todo['priority'][] = ['Low', 'Medium', 'High'];
                const currentIndex = priorities.indexOf(item.priority);
                const nextPriority = priorities[(currentIndex + 1) % priorities.length];
                updateTodoPriority(item.id, nextPriority);
              }}
              style={styles.priorityButton}>
              <ThemedText>{PRIORITY_EMOJIS[item.priority]} {item.priority}</ThemedText>
            </Pressable>

            <Pressable onPress={() => deleteTodo(item.id)} style={styles.deleteButton}>
              <ThemedText>🗑️</ThemedText>
            </Pressable>
          </Pressable>
        )}
        style={styles.list}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  header: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
  },
  addButton: {
    marginLeft: 12,
    padding: 4,
  },
  list: {
    flex: 1,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128, 128, 128, 0.2)',
  },
  headerText: {
    fontWeight: '600',
    fontSize: 14,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginVertical: 4,
    borderRadius: 10,
    backgroundColor: 'rgba(128, 128, 128, 0.05)',
  },
  todoContent: {
    flex: 2,
  },
  todoText: {
    fontSize: 14,
  },
  statusButton: {
    flex: 1,
    paddingHorizontal: 8,
  },
  priorityButton: {
    flex: 1,
    paddingHorizontal: 8,
  },
  deleteButton: {
    padding: 8,
  },
  completedTodo: {
    opacity: 0.7,
  },
});
