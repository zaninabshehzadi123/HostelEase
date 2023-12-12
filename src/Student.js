// Student.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Student = () => {
  const navigation = useNavigation();

  const handleHostelRegistrationPress = () => {
    // Navigate to HostelRegistration.js screen
    navigation.navigate('HostelRegistration');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to HostelEase</Text>
      {/* Add your Hostel Registration module here */}
      <TouchableOpacity onPress={handleHostelRegistrationPress}>
        <Text style={styles.hostelRegistrationButton}>Hostel Registration</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  hostelRegistrationButton: {
    fontSize: 18,
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default Student;




