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
import Search from '../components/Search'
const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.nameText}>Hi Benjamin,</Text>
          <Text style={styles.contentText}>Here are today’s update:</Text>
        </View>
        <Image
          width={50}
          height={50}
          source={require('../assets/images/profile.png')}
        />
      </View>
      {/* Поиск */}
      <Search />
    </View>
  );
};

export default DashboardScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5e8f7ff',
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 77,
    marginBottom: 20,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 2,
  },
  contentText: {
    fontWeight: 'semibold',
    fontSize: 14,
  },
});
