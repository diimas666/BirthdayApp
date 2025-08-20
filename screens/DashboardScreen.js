import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Search from '../components/Search';
import ListOfTime from '../components/ListOfTime';
import { useState, useMemo } from 'react';
import { getRange } from '../utils/getRange';

const DashboardScreen = () => {
  const [period, setPeriod] = useState('today');

  const { start, end } = useMemo(() => getRange(period), [period]);
  // TODO: использовать start/end для запроса данных

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.nameText}>Hi Benjamin,</Text>
          <Text style={styles.contentText}>Here are today’s update:</Text>
        </View>
        <Image
          source={require('../assets/images/profile.png')}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
      </View>

      <Search />

      <ListOfTime value={period} onChange={setPeriod} />
    </ScrollView>
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
    fontWeight: '600', // <-- было 'semibold'
    fontSize: 14,
  },
});
