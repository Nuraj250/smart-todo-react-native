// client/App.tsx
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from './screens/HomeScreen';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={{ flex: 1 }}>
                    <HomeScreen />
                </SafeAreaView>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
}
