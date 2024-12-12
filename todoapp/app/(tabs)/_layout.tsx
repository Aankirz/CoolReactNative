import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';

// Create a context for theme management
export const ThemeContext = React.createContext({
  colorScheme: 'light' as 'light' | 'dark',
  toggleTheme: () => {},
});

export default function TabLayout() {
  const systemColorScheme = useSystemColorScheme();
  const [colorScheme, setColorScheme] = React.useState<'light' | 'dark'>(systemColorScheme ?? 'light');

  // Load saved theme preference when app starts
  React.useEffect(() => {
    async function loadTheme() {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setColorScheme(savedTheme as 'light' | 'dark');
        }
      } catch (error) {
        console.log('Error loading theme:', error);
      }
    }
    loadTheme();
  }, []);

  const toggleTheme = React.useCallback(async () => {
    const newTheme = colorScheme === 'light' ? 'dark' : 'light';
    setColorScheme(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={{ colorScheme, toggleTheme }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme].tint,
          headerShown: true,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          headerStyle: {
            backgroundColor: Colors[colorScheme].background,
          },
          headerTintColor: Colors[colorScheme].text,
          headerTitleStyle: {
            color: Colors[colorScheme].text,
          },
          headerRight: () => (
            <TouchableOpacity 
              onPress={toggleTheme} 
              style={{ marginRight: 15, padding: 8 }}
            >
              <ThemedText style={{ fontSize: 20 }}>
                {colorScheme === 'dark' ? '🌙' : '☀️'}
              </ThemedText>
            </TouchableOpacity>
          ),
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
              backgroundColor: Colors[colorScheme].background,
            },
            default: {
              backgroundColor: Colors[colorScheme].background,
            },
          }),
          tabBarItemStyle: {
            backgroundColor: Colors[colorScheme].background,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
      </Tabs>
    </ThemeContext.Provider>
  );
}
