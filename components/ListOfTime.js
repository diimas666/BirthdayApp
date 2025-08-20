import { View, Text, Pressable, StyleSheet } from 'react-native';

export const TIME_TABS = [
  { key: 'today', label: 'Today' },
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'year', label: 'Year' },
];

const ListOfTime = ({ value, onChange }) => {
  return (
    <View style={styles.row}>
      {TIME_TABS.map((tab) => {
        const isActive = tab.key === value;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={({ pressed }) => [
              styles.chip,
              isActive && styles.chipActive,
              pressed && !isActive && styles.chipPressed,
            ]}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`Filter by ${tab.label}`}
          >
            <Text style={[styles.text, isActive && styles.textActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default ListOfTime;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 24,
  },
  chipActive: {
    backgroundColor: '#C850C0', // фиолетовая как на макете
  },
  chipPressed: {
    opacity: 0.8,
  },
  text: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  textActive: {
    color: '#fff',
  },
});
