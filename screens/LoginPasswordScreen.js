import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
export default function LoginEmailScreen() {
  const [password, setPassword] = useState('');
  const headerHeight = useHeaderHeight();

  const navigation = useNavigation();
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
          <Text style={styles.titleH1}>Login</Text>
          {/* картинка email фото */}
          <View style={styles.container_email}>
            <View>
              <Image
                width={50}
                height={50}
                source={require('../assets/images/profile.png')}
              />
            </View>
            <View style={{ gap: 5 }}>
              <Text style={styles.title}>Akobundu Benjamin</Text>
              <Text style={styles.email}>akobundupraise066@gmail.com</Text>
            </View>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={passwordHandler}
            autoCapitalize="none"
            value={password}
            placeholderTextColor="#6E2588"
            autoCorrect={false}
            inputMode="password"
          />
          <Pressable
            onPress={() => navigation.navigate('Dashboard')}
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
              <Text style={styles.btnText}>Login</Text>
            </LinearGradient>
          </Pressable>

          <Text style={styles.link}>Forgot your password?</Text>
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
  titleH1: { fontSize: 20, fontWeight: '700', marginBottom: 20 },
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
  continue_button: {
    width: '100%',
    marginBottom: 20,
  },
  btn: {
    width: '100%',
    borderRadius: 28,
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
  btnTextGoogle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  continue_buttonGoogle: {
    backgroundColor: '#F9D3FD',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 28, // круглее
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  container_email: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 40,
  },
  link: {
    fontWeight: 'bold',
    // textDecorationLine: 'underline',
  },
  bg_images: {
    width: '100%',
    height: 200,
    borderRadius: 28,
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  email: {
    fontWeight: 'semibold',
  },
});
