// components/OrDivider.js
import { View, Text, StyleSheet } from 'react-native';

export default function OrDivider({
  label = 'or',
  thickness = 2, // ← толщина линии
  color = 'rgba(0,0,0,0.90)', // ← цвет линии
}) {
  return (
    <View style={styles.row}>
      <View
        style={[
          styles.line,
          {
            height: thickness,
            backgroundColor: color,
            borderRadius: thickness / 2,
          },
        ]}
      />
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.line,
          {
            height: thickness,
            backgroundColor: color,
            borderRadius: thickness / 2,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 8,
    gap: 12,
  },
  line: {
    flex: 1,
  },
  label: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 18,
  },
});
