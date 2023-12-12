// HostelRegistration.js
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HostelRegistration = () => {
  const navigation = useNavigation();

  const handleSubmit = () => {
    // Perform submit logic here

    // Navigate to Login.js screen
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hostel Registration</Text>
      {/* Add your form fields for registration */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        // Add necessary onChangeText logic
      />

<TextInput
        style={styles.input}
        placeholder="rollNumber"
    
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="email"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="newPassword"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="confirmPassword"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="paymentSrNumber"
        onChangeText={(text) => setName(text)}
      />
      {/* Add other form fields */}
      
      {/* Add your submit button */}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    width: '80%',
  },
});

export default HostelRegistration;
