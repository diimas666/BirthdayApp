// App.js
import { useTranslation } from 'react-i18next';
import './i18n';
import { I18nextProvider } from 'react-i18next';
import i18n, { loadStoredLanguage } from './i18n';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotificationsInitializer from './components/NotificationsInitializer';

// экраны
import WelcomeScreen from './screens/WelcomeScreen';
import LoginEmailScreen from './screens/LoginEmailScreen';
import LoginPasswordScreen from './screens/LoginPasswordScreen';
import SignUpScreen from './screens/SignUpScreen';
import DashboardScreen from './screens/DashboardScreen';
import AddBirthdayScreen from './screens/AddBirthdayScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import UserScreen from './screens/UserScreen';
import SettingsScreen from './screens/SettingsScreen';

// иконки (SVG)
import HomeIcon from './assets/images/House.svg';
import AddIcon from './assets/images/add_birthday.svg';
import BellIcon from './assets/images/notification.svg';

// Redux
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

import * as Notifications from 'expo-notifications';

// навигаторы
const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const DashboardStackNav = createNativeStackNavigator();

/** Внутренний стек вкладки Home (Dashboard) */
function DashboardStack() {
  return (
    <DashboardStackNav.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#f5e8f7ff' },
        headerTintColor: '#5b2d86',
        headerTitleStyle: { fontWeight: '700', fontSize: 20 },
      }}
    >
      <DashboardStackNav.Screen
        name="DashboardMain"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <DashboardStackNav.Screen
        name="UserScreen"
        component={UserScreen}
        options={{ headerShown: false }}
      />
      <DashboardStackNav.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          // headerTitle: 'Settings',
          title: i18n.t('settings'),
          // headerBackTitle: i18n.t('back'), // ← тут свой текст: "Back" / "Назад"
          headerBackTitleVisible: true,
        }}
      />
    </DashboardStackNav.Navigator>
  );
}

/** Табы */
function MainTabs() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          if (route.name === 'Home')
            return <HomeIcon width={24} height={24} fill={color} />;
          if (route.name === 'AddBirthday')
            return (
              <AddIcon
                width={72}
                height={72}
                fill={color}
                style={{ marginTop: -55, alignSelf: 'center' }}
              />
            );
          if (route.name === 'Notifications')
            return <BellIcon width={24} height={24} fill={color} />;
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
      <Tab.Screen
        name="Home"
        component={DashboardStack}
        options={{ tabBarLabel: t('tabs.home') }}
      />
      <Tab.Screen
        name="AddBirthday"
        component={AddBirthdayScreen}
        options={{ tabBarLabel: t('tabs.addBirthday') }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ tabBarLabel: t('tabs.notifications') }}
      />
    </Tab.Navigator>
  );
}

// уведомления
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      // 1) загружаем язык
      await loadStoredLanguage();

      // 2) уведомления
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') alert('Разрешение на уведомления не выдано!');

      setReady(true);
    })();
  }, []);

  // ⬇️ Хуки ВСЕГДА должны вызываться, даже если экран не готов
  if (!ready) {
    return null; // можно сюда поставить Splash или ActivityIndicator
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <SafeAreaProvider>
            <NavigationContainer>
              <NotificationsInitializer />
              <RootStack.Navigator screenOptions={{ headerShown: false }}>
                <RootStack.Screen name="Welcome" component={WelcomeScreen} />
                <RootStack.Screen name="Login" component={LoginEmailScreen} />
                <RootStack.Screen
                  name="LoginPassword"
                  component={LoginPasswordScreen}
                />
                <RootStack.Screen name="SignUp" component={SignUpScreen} />
                <RootStack.Screen name="Dashboard" component={MainTabs} />
              </RootStack.Navigator>
              <StatusBar style="auto" />
            </NavigationContainer>
          </SafeAreaProvider>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5e8f7ff' },
});
