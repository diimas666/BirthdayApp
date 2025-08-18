import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements'; // если экран под Stack Header
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { useState } from 'react';
import EyeOff from '../assets/images/eye-slash.svg';
import EyeOn from '../assets/images/eye-slash.svg';
export default function HomeScreen() {
  const headerHeight = useHeaderHeight(); // чтобы учесть высоту шапки навигатора
  const navigation = useNavigation();

  const [fullname, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);

  function fullnameHandler(text) {
    setFullName(text);
  }
  function passwordHandler(text) {
    setPassword(text);
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({
        ios: headerHeight,
        android: 0,
      })}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }} // чтобы центрирование не ломалось на коротких экранах
        keyboardShouldPersistTaps="handled" // можно тапнуть по следующему полю, не закрывая клаву
        keyboardDismissMode="on-drag"
      >
        <View style={styles.container}>
          <Image
            source={require('../assets/images/bg2.jpg')}
            style={styles.bg_images}
          />
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.description}>
            Looks like you don’t have an account. Let’s create a new account for
            you.
          </Text>
          <View style={{ width: '100%', marginBottom: 20 }}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              onChangeText={fullnameHandler}
              autoCapitalize="none"
              value={fullname}
              placeholderTextColor="#6E2588"
              autoCorrect={false}
              inputMode="text"
            />
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[styles.input, styles.inputPassword]}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#6E2588"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={secure} // ВАЖНО: скрытый ввод
                textContentType="password"
                autoComplete="password"
                returnKeyType="done"
              />
              <Pressable
                onPress={() => setSecure((s) => !s)}
                hitSlop={10}
                style={styles.iconBtn}
                accessibilityRole="button"
                accessibilityLabel={secure ? 'Show password' : 'Hide password'}
              >
                {secure ? (
                  <EyeOff width={24} height={24} />
                ) : (
                  <EyeOn width={24} height={24} />
                )}
              </Pressable>
            </View>
          </View>

          <View style={{ width: '100%', borderRadius: 28 }}>
            <Pressable
              style={({ pressed }) => [
                styles.continue_button,
                pressed && { opacity: 0.7 },
              ]}
            >
              <LinearGradient
                colors={['#6157FF', '#EE49FD']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.btn}
              >
                <Text style={styles.btnText}>Sign up</Text>
              </LinearGradient>
            </Pressable>
          </View>

          <Text>
            By clicking sign up, you agree to our
            <Text
              onPress={() => navigation.navigate('Terms of Service')}
              style={styles.link}
            >
              {' '}
              Terms of service
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5e8f7ff',
    paddingHorizontal: 24,
  },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 20 },
  bg_images: {
    width: '100%',
    height: 200,
    borderRadius: 28,
    marginBottom: 20,
  },

  description: {
    color: '#350F50',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#EE49FD',
    borderRadius: 28, // круглее
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 25,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  // обёртка для инпута с иконкой
  inputWithIcon: { position: 'relative', width: '100%' },

  // добавляем справа место под кнопку-глаз
  inputPassword: { paddingRight: 52 },
  iconBtn: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 20,
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  btn: {
    width: '100%',
    borderRadius: 28,
    marginBottom: 20,
  },
  btnText: {
    textAlign: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 28, // круглее
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    fontWeight: 'bold',
    // textDecorationLine: 'underline',
  },
});
