# ✨ React Native Todo App

A modern, feature-rich Todo application built with React Native, Expo, and TypeScript. Features a beautiful UI with dark mode support and smooth animations.

## 🚀 Features

- ✅ Create, edit, and delete tasks
- 🎯 Priority levels (Low, Medium, High)
- 📊 Task statistics dashboard
- 🌓 Dark/Light theme support
- ⌨️ Smart keyboard management
- 📱 Responsive design
- 🎨 Modern, Notion-inspired UI

## 🛠 Tech Stack

- React Native
- Expo
- TypeScript
- React Navigation

## 📱 Screenshots

[Add your app screenshots here]

## 🏗 Setup Instructions

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac users) or Android Studio (for Android development)

### Installation Steps

1. Clone the repository:

```bash
npm install
```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## 🎮 Usage

1. **Adding a Task**
   - Type your task in the input field
   - Select priority level (Low/Medium/High)
   - Press the add button or hit enter

2. **Editing a Task**
   - Tap the edit (✏️) icon on any task
   - Modify the text or priority
   - Save changes

3. **Completing a Task**
   - Tap the checkbox next to any task
   - Task will be marked as complete

4. **Deleting a Task**
   - Tap the delete (🗑️) icon to remove a task

5. **Switching Themes**
   - Tap the theme toggle (🌙/☀️) in the header
   - App will switch between light and dark modes

## 📝 Project Structure

```
src/
├── app/                  # Main app screens
├── components/          # Reusable components
├── constants/          # Theme and configuration
├── contexts/          # Global state management
├── hooks/            # Custom React hooks
└── types/           # TypeScript definitions
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Inspired by Notion's UI/UX
- Built with Expo's excellent tooling
- Icons from @expo/vector-icons
