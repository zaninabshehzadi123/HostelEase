// Doctor.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { darkGreen, primaryColor, whiteColor } from './Constants'; // Assume you have color constants defined
import { useMessageContext } from './MessageContext';
const DoctorScreen = () => {
  const { messages, addMessage } = useMessageContext();
  const [doctorMessage, setDoctorMessage] = useState('');

  const handleSendDoctorMessage = () => {
    if (doctorMessage.trim() === '') return;
    const message = { text: doctorMessage, sender: 'Doctor' };
    addMessage(message);
    setDoctorMessage('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Doctor's Status and Chat</Text>
      {/* On/Off button for doctor's status */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Doctor's Status:</Text>
        <TouchableOpacity
          style={[styles.statusButton, { backgroundColor: 'green' }]}
          onPress={() => {/* Add logic to handle on/off status */}}>
          <Text style={{ color: whiteColor, fontWeight: 'bold' }}>On</Text>
        </TouchableOpacity>
      </View>
      {/* Chat container for displaying messages */}
      <ScrollView style={styles.chatContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.message,
              {
                alignSelf: message.sender === 'Student' ? 'flex-start' : 'flex-end',
                backgroundColor: message.sender === 'Student' ? primaryColor : darkGreen,
              },
            ]}>
            <Text style={{ color: whiteColor }}>{`${message.sender}: ${message.text}`}</Text>
          </View>
        ))}
      </ScrollView>
      {/* Input field and button for sending messages as the doctor */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={doctorMessage}
          onChangeText={(text) => setDoctorMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendDoctorMessage}>
          <Text style={{ color: whiteColor, fontWeight: 'bold' }}>Send Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: whiteColor,
    padding: 20,
  },
  header: {
    color: darkGreen,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusLabel: {
    color: darkGreen,
    fontSize: 18,
    marginRight: 10,
  },
  statusButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
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
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: darkGreen,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
    paddingHorizontal: 10,
    color: darkGreen,
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

export default DoctorScreen;
