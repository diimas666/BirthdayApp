import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import LoginEmailScreen from './screens/LoginEmailScreen';
import SignUpScreen from './screens/SignUpScreen';
import loginPasswordScreen from './screens/LoginPasswordScreen';
import DashboardScreen from './screens/DashboardScreen';
import AddBirthdayScreen from './screens/AddBirthdayScreen'; // добавь этот импорт
import NotificationsScreen from './screens/NotificationsScreen'; // и этот
import UserScreen from './screens/UserScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
// импорты свг
import HomeIcon from './assets/images/House.svg';
import AddIcon from './assets/images/add_birthday.svg';
import BellIcon from './assets/images/notification.svg';
export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          if (route.name === 'Home') {
            return <HomeIcon width={24} height={24} fill={color} />;
          }

          if (route.name === 'AddBirthday') {
            return (
              <AddIcon
                width={72}
                height={72}
                fill={color}
                style={{
                  marginTop: -55,
                  alignSelf: 'center',
                }}
              />
            );
          }

          if (route.name === 'Notifications') {
            return <BellIcon width={24} height={24} fill={color} />;
          }
        },

        tabBarActiveTintColor: '#a033b3', // цвет активной иконки/текста
        tabBarInactiveTintColor: '#696868ff', // цвет неактивной иконки/текста
        tabBarShowLabel: true, // показывать ли подписи под иконками
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
        },
        tabBarStyle: {
          backgroundColor: '#ffffff', // цвет фона таб-бара
          borderTopColor: '#ccc', // граница сверху
          borderTopWidth: 1,
          height: 88, // высота таб-бара
          paddingBottom: 8, // отступ от нижней границы
          paddingTop: 14,
          position: 'absolute', // важно!
          left: 0,
          right: 0,
          bottom: 0,
        },

        headerShown: false, // скрыть заголовок экрана сверху
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="AddBirthday" component={AddBirthdayScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />

    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            // options={{ headerShown: false }}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginEmailScreen} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
          <Stack.Screen name="Login Password" component={loginPasswordScreen} />
          <Stack.Screen name="Dashboard" component={MainTabs} />
          <Stack.Screen name="UserScreen" component={UserScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // только растяжение
    backgroundColor: '#f5e8f7ff',
  },
});
