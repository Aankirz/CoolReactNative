import { useState, useCallback } from 'react';
import { StyleSheet, TextInput, FlatList, Pressable, Platform, Animated, ScrollView, Modal } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Todo' | 'In Progress' | 'Done' | 'Backlog' | 'Canceled';
  deadline?: Date;
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

const DEADLINE_EMOJI = '📅';

interface TodoStats {
  completed: number;
  inProgress: number;
  total: number;
  efficiency: number;
}

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const colorScheme = useColorScheme() ?? 'light';
  const insets = useSafeAreaInsets();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedDeadline, setSelectedDeadline] = useState<Date | undefined>();

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

  const calculateStats = useCallback((): TodoStats => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.status === 'Done').length;
    const inProgress = todos.filter(todo => todo.status === 'In Progress').length;
    const efficiency = total ? (completed / total) * 100 : 0;
    
    return {
      completed,
      inProgress,
      total,
      efficiency: Math.round(efficiency)
    };
  }, [todos]);

  return (
    <ThemedView style={styles.container}>
      {/* Sleek Header */}
      <ThemedView style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <ThemedView style={styles.headerTop}>
          <ThemedView>
            <ThemedText style={styles.greeting}>Hello 👋</ThemedText>
            <ThemedText style={styles.date}>
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </ThemedText>
          </ThemedView>
          <Pressable onPress={() => {/* TODO: Add profile action */}}>
            <ThemedView style={styles.avatar}>
              <ThemedText style={styles.avatarText}>👤</ThemedText>
            </ThemedView>
          </Pressable>
        </ThemedView>

        {/* Stats Cards */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.statsScroll}>
          <ThemedView style={styles.statCard}>
            <ThemedText style={styles.statNumber}>{calculateStats().total}</ThemedText>
            <ThemedText style={styles.statLabel}>Total Tasks</ThemedText>
          </ThemedView>
          <ThemedView style={[styles.statCard, { backgroundColor: '#4CAF50' }]}>
            <ThemedText style={[styles.statNumber, { color: '#FFF' }]}>
              {calculateStats().completed}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: '#FFF' }]}>Completed</ThemedText>
          </ThemedView>
          <ThemedView style={styles.statCard}>
            <ThemedText style={styles.statNumber}>{calculateStats().efficiency}%</ThemedText>
            <ThemedText style={styles.statLabel}>Efficiency</ThemedText>
          </ThemedView>
        </ScrollView>
      </ThemedView>

      {/* Task List */}
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
              {item.deadline && (
                <ThemedText style={styles.deadline}>
                  {DEADLINE_EMOJI} {item.deadline.toLocaleDateString()}
                </ThemedText>
              )}
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

      {/* Add Task Modal */}
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsAddModalVisible(false)}>
        <BlurView intensity={90} style={styles.modalOverlay}>
          <ThemedView style={styles.modalContent}>
            {/* Modal content here */}
          </ThemedView>
        </BlurView>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    opacity: 0.7,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
  },
  statsScroll: {
    marginTop: 20,
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  statCard: {
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    minWidth: 120,
  },
  deadline: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors[colorScheme ?? 'light'].background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: insets.bottom + 20,
    minHeight: '50%',
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
    marginBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(128, 128, 128, 0.2)',
  },
  headerText: {
    fontSize: 13,
    fontWeight: '600',
    opacity: 0.7,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
  },
  todoContent: {
    flex: 1,
    marginRight: 8,
  },
  todoText: {
    fontSize: 14,
    flexWrap: 'wrap',
  },
  statusButton: {
    minWidth: 100,
    paddingHorizontal: 8,
  },
  priorityButton: {
    minWidth: 80,
    paddingHorizontal: 8,
  },
  deleteButton: {
    padding: 8,
  },
  completedTodo: {
    opacity: 0.7,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
});
