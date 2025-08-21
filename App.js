// App.js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotificationsInitializer from './components/NotificationsInitializer';

// экраны
import WelcomeScreen from './screens/WelcomeScreen';
import LoginEmailScreen from './screens/LoginEmailScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginPasswordScreen from './screens/LoginPasswordScreen';
import DashboardScreen from './screens/DashboardScreen';
import AddBirthdayScreen from './screens/AddBirthdayScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import UserScreen from './screens/UserScreen';

// иконки (SVG)
import HomeIcon from './assets/images/House.svg';
import AddIcon from './assets/images/add_birthday.svg';
import BellIcon from './assets/images/notification.svg';

// навигаторы
const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const DashboardStackNav = createNativeStackNavigator();
// 👉 NEW: Redux
import { Provider } from 'react-redux';
import { store, persistor } from './store/index';
import { PersistGate } from 'redux-persist/integration/react';

import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

AsyncStorage.clear();
/**
 * 👇 Внутренний стек для Dashboard:
 * тут хранятся главный экран + UserScreen
 */
function DashboardStack() {
  return (
    <DashboardStackNav.Navigator screenOptions={{ headerShown: false }}>
      <DashboardStackNav.Screen
        name="DashboardMain"
        component={DashboardScreen}
      />
      <DashboardStackNav.Screen name="UserScreen" component={UserScreen} />
    </DashboardStackNav.Navigator>
  );
}

/**
 * 👇 Табы приложения
 */
export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          if (route.name === 'Home') {
            return <HomeIcon width={24} height={24} fill={color} />;
          }
          if (route.name === 'AddBirthday') {
            return (
              <AddIcon
                width={72}
                height={72}
                fill={color}
                style={{ marginTop: -55, alignSelf: 'center' }}
              />
            );
          }
          if (route.name === 'Notifications') {
            return <BellIcon width={24} height={24} fill={color} />;
          }
          return null;
        },
        tabBarActiveTintColor: '#a033b3',
        tabBarInactiveTintColor: '#696868ff',
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#ccc',
          borderTopWidth: 1,
          height: 88,
          paddingBottom: 8,
          paddingTop: 14,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        },
        headerShown: false,
      })}
    >
      {/* 👇 Вкладка Home теперь открывает DashboardStack */}
      <Tab.Screen name="Home" component={DashboardStack} />
      <Tab.Screen name="AddBirthday" component={AddBirthdayScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
  );
}

// чтобы уведомления показывались, даже если приложение открыто
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
/**
 * 👇 Корневой стек приложения
 */
export default function App() {
  useEffect(() => {
    // Запрос разрешения
    async function registerForPushNotificationsAsync() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Разрешение на уведомления не выдано!');
      }
    }
    registerForPushNotificationsAsync();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <NotificationsInitializer />
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
              <RootStack.Screen name="Welcome" component={WelcomeScreen} />
              <RootStack.Screen name="Login" component={LoginEmailScreen} />
              <RootStack.Screen name="Sign Up" component={SignUpScreen} />
              <RootStack.Screen
                name="Login Password"
                component={LoginPasswordScreen}
              />

              {/* 👇 Тут теперь MainTabs */}
              <RootStack.Screen name="Dashboard" component={MainTabs} />
            </RootStack.Navigator>
          </NavigationContainer>

          <StatusBar style="auto" />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5e8f7ff',
  },
});
