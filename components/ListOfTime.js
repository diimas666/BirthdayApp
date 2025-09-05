// ListOfTime.jsx
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

export const TIME_TABS = [
  { key: 'today', label: 'today' },
  { key: 'week', label: 'week' },
  { key: 'month', label: 'month' },
  { key: 'year', label: 'year' },
];

const ListOfTime = ({ value, onChange }) => {
  const { t } = useTranslation();

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
            accessibilityLabel={t(`timeTabs.${tab.key}`)}
          >
            <Text style={[styles.text, isActive && styles.textActive]}>
              {t(`timeTabs.${tab.key}`)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default ListOfTime;
const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 3, marginTop: 16, marginBottom: 8 },
  chip: { paddingHorizontal: 20, paddingVertical: 4, borderRadius: 24 },
  chipActive: { backgroundColor: '#C850C0' },
  chipPressed: { opacity: 0.8 },
  text: { fontSize: 16, color: '#333', fontWeight: '600' },
  textActive: { color: '#fff' },
});
