import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import OrDivider from '../components/OrDivider';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [focused, setFocused] = useState(false);

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
});
