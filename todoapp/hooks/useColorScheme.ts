import { useContext } from 'react';
import { ThemeContext } from '@/app/(tabs)/_layout';

export function useColorScheme() {
  const { colorScheme } = useContext(ThemeContext);
  return colorScheme;
}
