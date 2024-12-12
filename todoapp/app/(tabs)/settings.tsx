import { useState } from 'react';
import { StyleSheet, Switch, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTheme } from '@/contexts/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { theme, useSystemTheme, setUseSystemTheme, toggleTheme } = useTheme();
  const [showDeadlines, setShowDeadlines] = useState(true);
  const [enableNotifications, setEnableNotifications] = useState(true);

  return (
    <ScrollView 
      style={[
        styles.container,
        { paddingTop: insets.top }
      ]}>
      <ThemedView style={styles.section}>
        <ThemedText type="title">Appearance 🎨</ThemedText>
        
        <ThemedView style={styles.setting}>
          <ThemedText>Use System Theme</ThemedText>
          <Switch
            value={useSystemTheme}
            onValueChange={setUseSystemTheme}
          />
        </ThemedView>

        <ThemedView style={styles.setting}>
          <ThemedText>Dark Mode</ThemedText>
          <Switch
            disabled={useSystemTheme}
            value={theme === 'dark'}
            onValueChange={toggleTheme}
          />
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="title">Preferences ⚙️</ThemedText>
        
        <ThemedView style={styles.setting}>
          <ThemedText>Show Deadlines</ThemedText>
          <Switch
            value={showDeadlines}
            onValueChange={setShowDeadlines}
          />
        </ThemedView>

        <ThemedView style={styles.setting}>
          <ThemedText>Enable Notifications</ThemedText>
          <Switch
            value={enableNotifications}
            onValueChange={setEnableNotifications}
          />
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 24,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(128, 128, 128, 0.2)',
  },
}); 