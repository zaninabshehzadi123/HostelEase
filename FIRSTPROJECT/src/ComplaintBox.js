import React, { useState } from 'react';
import Background from './Background';
import { View, Text, TextInput, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';

const ComplaintBox = () => {
  const [complaint, setComplaint] = useState('');
  const [adminStatus, setAdminStatus] = useState('Pending'); // Default status is 'Pending'
  const [submittedComplaints, setSubmittedComplaints] = useState([]);

  const handleComplaintSubmission = () => {
    if (complaint.trim() === '') {
      Alert.alert('Error', 'Please enter your complaint before submitting.');
    } else {
      // In a real application, you would typically send the complaint and status to a server
      // and update the database. Here, we'll just show an alert to simulate the submission.
      Alert.alert('Success', 'Complaint submitted successfully!');
      const newComplaint = { text: complaint, status: adminStatus };
      setSubmittedComplaints([...submittedComplaints, newComplaint]);
      setComplaint('');
    }
  };

  const handleStatusUpdate = (status) => {
    // In a real application, you would typically send the updated status to a server
    // and update the database. Here, we'll just show an alert to simulate the update.
    Alert.alert('Success', `Status updated to ${status} successfully!`);
    setAdminStatus(status);
  };

  return (
    <Background>
      <View style={{ alignItems: 'center', width: 360 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 58,
            fontWeight: 'bold',
            marginVertical: 20,
          }}>
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

        {/* Admin Notification Box */}
        <View
          style={{
            backgroundColor: 'white',
            height: 300,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Admin Notification</Text>

          {/* Display radio buttons for admin status options */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
            <TouchableOpacity onPress={() => handleStatusUpdate('Pending')}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 18 }}>Pending</Text>
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: '#000',
                    marginLeft: 5,
                    backgroundColor: adminStatus === 'Pending' ? '#000' : 'transparent',
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleStatusUpdate('Processing')}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 18 }}>Processing</Text>
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: '#000',
                    marginLeft: 5,
                    backgroundColor: adminStatus === 'Processing' ? '#000' : 'transparent',
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleStatusUpdate('Complete')}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 18 }}>Complete</Text>
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: '#000',
                    marginLeft: 5,
                    backgroundColor: adminStatus === 'Complete' ? '#000' : 'transparent',
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default ComplaintBox;
