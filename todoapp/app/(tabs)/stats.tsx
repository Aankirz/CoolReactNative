import { useState } from 'react';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function StatsScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Your Progress 📊</ThemedText>
      </ThemedView>

      <ThemedView style={styles.calendarContainer}>
        {/* TODO: Implement calendar component */}
      </ThemedView>

      <ThemedView style={styles.statsGrid}>
        <ThemedView style={styles.statCard}>
          <ThemedText style={styles.statTitle}>Weekly Tasks</ThemedText>
          <ThemedText style={styles.statValue}>23</ThemedText>
          <ThemedText style={styles.statChange}>↑ 15%</ThemedText>
        </ThemedView>

        <ThemedView style={styles.statCard}>
          <ThemedText style={styles.statTitle}>Completion Rate</ThemedText>
          <ThemedText style={styles.statValue}>87%</ThemedText>
          <ThemedText style={styles.statChange}>↑ 5%</ThemedText>
        </ThemedView>

        <ThemedView style={styles.statCard}>
          <ThemedText style={styles.statTitle}>Avg. Time</ThemedText>
          <ThemedText style={styles.statValue}>2.3h</ThemedText>
          <ThemedText style={styles.statChange}>↓ 12%</ThemedText>
        </ThemedView>

        <ThemedView style={styles.statCard}>
          <ThemedText style={styles.statTitle}>On Time</ThemedText>
          <ThemedText style={styles.statValue}>92%</ThemedText>
          <ThemedText style={styles.statChange}>↑ 3%</ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  calendarContainer: {
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10,
  },
  statCard: {
    width: (Dimensions.get('window').width - 40) / 2,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  statTitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  statChange: {
    fontSize: 12,
    color: '#4CAF50',
  },
}); 