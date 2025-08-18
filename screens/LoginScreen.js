import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import OrDivider from '../components/OrDivider';
import { useNavigation } from '@react-navigation/native';

// svg
import Google from '../assets/images/logos_google-icon.svg';
import FaceBook from '../assets/images/logos_facebook.svg';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [focused, setFocused] = useState(false);
  const navigation = useNavigation();
  function emailHandler(text) {
    setEmail(text);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={emailHandler}
        autoCapitalize="none"
        value={email}
        placeholderTextColor="#6E2588"
        autoCorrect={false}
        inputMode="email"
      />
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
          <Text style={styles.btnText}>Continue</Text>
        </LinearGradient>
      </Pressable>

      <OrDivider label="or" />
      {/* кнопки  */}
      <View style={{ gap: 20, width: '100%', marginBottom: 20 }}>
        <Pressable
          onPress={console.log('google press')}
          style={({ pressed }) => [
            styles.continue_buttonGoogle,
            pressed && { opacity: 0.7 },
          ]}
        >
          <FaceBook width={24} height={24} />
          <Text style={styles.btnTextGoogle}>Continue with Facebook</Text>
        </Pressable>
        <Pressable
          onPress={console.log('google press')}
          style={({ pressed }) => [
            styles.continue_buttonGoogle,
            pressed && { opacity: 0.7 },
          ]}
        >
          <Google width={24} height={24} />
          <Text style={styles.btnTextGoogle}>Continue with Google</Text>
        </Pressable>
      </View>
      <Text style={styles.note_link}>
        Don’t have an account?
        <Text
          onPress={() => navigation.navigate('Sign Up')}
          style={styles.link}
          accessibilityRole="link"
          accessibilityHint="Go to the Sign up screen"
        >
          {' '}
          Sign up
        </Text>
      </Text>
    </View>
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
  },
  btn: {
    width: '100%',
    marginBottom: 20,
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
  link: {
    fontWeight: 'bold',
    // textDecorationLine: 'underline',
  },
});
