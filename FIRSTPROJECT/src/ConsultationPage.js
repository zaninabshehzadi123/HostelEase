import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Background from './Background';
import { darkGreen } from './Constants';

const ConsultationPage = () => {
  const [studentSymptoms, setStudentSymptoms] = useState('');
  const [doctorResponse, setDoctorResponse] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (studentSymptoms.trim() === '') return;

    // Add the student's symptoms to the messages array
    setMessages([...messages, { text: studentSymptoms, sender: 'Student' }]);
    // Clear the input field
    setStudentSymptoms('');
  };

  const handleConsult = () => {
    // Add the doctor's response to the messages array
    setMessages([...messages, { text: doctorResponse, sender: 'Doctor' }]);
    // Clear the input field
    setDoctorResponse('');
  };

  return (
    <Background>
      <View style={{ alignItems: 'center', width: 360 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 46,
            fontWeight: 'bold',
            marginVertical: 20,
          }}>
          Online Consulting
        </Text>
        <View style={styles.container}>
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
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Doctor's Response..."
              value={doctorResponse}
              onChangeText={(text) => setDoctorResponse(text)}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleConsult}>
              <Text style={{ color: 'white' }}>Consult</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: 360,
    backgroundColor: 'white',
    height: 600,
  },
  header: {
    color: 'white',
    fontSize: 46,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  chatContainer: {
    flex: 1,
    width: '100%',
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
    borderColor: 'white',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
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
