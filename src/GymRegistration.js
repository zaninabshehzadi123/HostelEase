// GymRegistration.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Btn from './Btn';

const GymRegistration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);

  const gymTimes = [
    { label: 'Morning', value: 'morning' },
    { label: 'Afternoon', value: 'afternoon' },
    { label: 'Evening', value: 'evening' },
  ];

  const handleRegister = () => {
    // Handle the registration logic here
    // You can send the data to the server or perform any other actions
    console.log('Registering for the gym:', { name, email, phoneNumber, selectedTime });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Gym Registration</Text>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          keyboardType="phone-pad"
        />

        {/* Gym Time Dropdown */}
        <DropDownPicker
          items={gymTimes}
          placeholder="Select Gym Time"
          containerStyle={styles.dropdownContainer}
          onChangeItem={(item) => setSelectedTime(item.value)}
        />
      </View>

      {/* Register Button */}
      <Btn
        bgColor="darkgreen"
        textColor="white"
        btnLabel="Register"
        Press={handleRegister}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  dropdownContainer: {
    height: 40,
    width: '100%',
    marginBottom: 20,
  },
});

export default GymRegistration;
