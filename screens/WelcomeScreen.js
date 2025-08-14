import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Logo.png')}
        style={{ width: 200, height: 270 }}
        resizeMode="contain"
      />

      <Text style={styles.text}>
        Never miss the important events of those you care so much about
      </Text>

      <Image
        source={require('../assets/images/WelcomeProfiles.png')}
        style={{ width: 280, height: 285, marginBottom: 50 }}
        resizeMode="contain"
      />

      {/* Кнопка на 100% ширины контейнера */}
      <Pressable
        onPress={() => {}}
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.btnWrapper,
          pressed && { opacity: 0.9 },
        ]}
      >
        <LinearGradient
          colors={['#6157FF', '#EE49FD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Get Started</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5e8f7ff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24, // чтобы у кнопки были отступы от краёв
    gap: 24,
    width: '100%',
  },
  text: {
    color: '#350F50',
    fontSize: 16,
    marginBottom: 16,
    width: 240,
    textAlign: 'center',
  },

  // обёртка Pressable — растягиваем на 100% и скругляем (для обрезки ripple/градиента)
  btnWrapper: {
    width: '100%',
    borderRadius: 28, // круглее
    overflow: 'hidden',
  },

  // сам градиент — тоже на всю ширину
  btn: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 28, // круглее
    alignItems: 'center',
    justifyContent: 'center',

    // лёгкая тень
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
