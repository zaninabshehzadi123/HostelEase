// ConsultationPage.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { darkGreen } from './Constants';
import { useMessageContext } from './MessageContext';

const ConsultationPage = () => {
  const { messages, addMessage } = useMessageContext();
  const [studentSymptoms, setStudentSymptoms] = useState('');
  const [doctorResponse, setDoctorResponse] = useState('');

  const handleSend = () => {
    if (studentSymptoms.trim() === '') return;
    const message = { text: studentSymptoms, sender: 'Student' };
    addMessage(message);
    setStudentSymptoms('');
  };

  const handleConsult = () => {
    if (doctorResponse.trim() === '') return;
    const message = { text: doctorResponse, sender: 'Doctor' };
    addMessage(message);
    setDoctorResponse('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Online Consulting</Text>
      <ScrollView style={styles.chatContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.message,
              {
                alignSelf: message.sender === 'Student' ? 'flex-start' : 'flex-end',
                backgroundColor: message.sender === 'Student' ? '#3498db' : darkGreen,
              },
            ]}>
            <Text style={{ color: 'white' }}>{`${message.sender}: ${message.text}`}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your symptoms..."
          value={studentSymptoms}
          onChangeText={(text) => setStudentSymptoms(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={{ color: 'white' }}>Send Symptoms</Text>
        </TouchableOpacity>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: 360,
    backgroundColor: '#f8f8f8', // Change background color
    paddingVertical: 20,
  },
  header: {
    color: darkGreen,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chatContainer: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  message: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    maxWidth: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: darkGreen,
    padding: 10,
    backgroundColor: 'white', // Change background color
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: darkGreen,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
    paddingHorizontal: 10,
    color: 'black',
  },
  sendButton: {
    backgroundColor: darkGreen,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ConsultationPage;
