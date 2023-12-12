import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import Background from './Background';

const ComplaintBox = ({ onComplaintSubmit, onGatePassRequest }) => {
  const [complaint, setComplaint] = useState('');
  const [adminStatus, setAdminStatus] = useState('Pending');
  const [submittedComplaints, setSubmittedComplaints] = useState([]);
  const [gatePassReason, setGatePassReason] = useState('');

  const handleComplaintSubmission = () => {
    if (complaint.trim() === '') {
      Alert.alert('Error', 'Please enter your complaint before submitting.');
    } else {
      const newComplaint = { text: complaint, status: adminStatus, sender: 'Student' };
      setSubmittedComplaints([...submittedComplaints, newComplaint]);
      setComplaint('');
      onComplaintSubmit(newComplaint); // Pass the complaint to the parent component
      Alert.alert('Success', 'Complaint submitted successfully!');
    }
  };

  const handleGatePassRequest = () => {
    if (gatePassReason.trim() === '') {
      Alert.alert('Error', 'Please enter the reason for the gate pass request.');
    } else {
      const newGatePassRequest = { reason: gatePassReason, status: 'Pending', sender: 'Student' };
      onGatePassRequest(newGatePassRequest); // Pass the gate pass request to the parent component
      setGatePassReason('');
      Alert.alert('Success', 'Gate pass request submitted successfully!');
    }
  };

  return (
    <Background>
      <View style={{ alignItems: 'center', width: 360 }}>
        <Text style={{ color: 'white', fontSize: 58, fontWeight: 'bold', marginVertical: 20 }}>
          Complaint Box
        </Text>

        {/* Student Complaint Box */}
        <View
          style={{
            backgroundColor: 'white',
            height: 300,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Student Complaint Box</Text>
          <View style={{ padding: 20 }}>
            <TextInput
              multiline
              placeholder="Enter your complaint here"
              style={{ borderWidth: 5, borderColor: '#ccc', padding: 10, marginBottom: 20, textAlignVertical: 'top' }}
              value={complaint}
              onChangeText={(text) => setComplaint(text)}
            />

            <Button title="Submit Complaint" onPress={handleComplaintSubmission} />
          </View>
        </View>

        {/* Gate Pass Request Box */}
        <View
          style={{
            backgroundColor: 'white',
            height: 300,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Gate Pass Request</Text>
          <View style={{ padding: 20 }}>
            <TextInput
              placeholder="Reason for gate pass request"
              style={{ borderWidth: 5, borderColor: '#ccc', padding: 10, marginBottom: 20 }}
              value={gatePassReason}
              onChangeText={(text) => setGatePassReason(text)}
            />

            <Button title="Submit Gate Pass Request" onPress={handleGatePassRequest} />
          </View>
        </View>
      </View>
    </Background>
  );
};

export default ComplaintBox;