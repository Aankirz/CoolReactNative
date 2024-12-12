React Native is an **open-source framework** created by **Meta (formerly Facebook)** for building mobile applications using **JavaScript** and **React**. It allows developers to create **cross-platform apps** (iOS, Android, and others) using a single codebase while providing a **native-like experience**.

### Key Features:
1. **Cross-Platform Development**: Write once, run on multiple platforms (iOS, Android).
2. **Reusable Components**: Build UI elements that are reusable across platforms.
3. **Native Performance**: Uses native components under the hood for better performance.
4. **Hot Reloading**: See real-time changes in the app during development.
5. **Access to Native Modules**: Allows integration of native code (Java, Swift, Objective-C) when needed.

### How React Native Works:
React Native uses a **JavaScript bridge** to communicate with native modules. While the UI is rendered using native components, the app logic is written in JavaScript.

### Practical Code Example
Here’s a simple React Native app that displays a "Hello World" message:

```javascript
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    color: '#333',
  },
});

export default App;
```

