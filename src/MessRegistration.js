import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MessRegistration = ({ navigation }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mess Registration</Text>
      <View style={styles.daysContainer}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={styles.dayButton}
            onPress={() => navigation.navigate('DayMenu', { day: day })}>
            <Text style={styles.dayText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  daysContainer: {
    width: '100%',
    alignItems: 'center',
  },
  dayButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default MessRegistration;




