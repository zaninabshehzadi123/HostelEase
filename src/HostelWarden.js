import React from 'react';
import { View, Text, ScrollView, Button, Alert } from 'react-native';

const HostelWarden = ({ submittedComplaints, gatePassRequests, onAcceptGatePass, onRejectGatePass }) => {

  const handleAcceptGatePass = (request) => {
    // Implement logic for accepting gate pass request
    onAcceptGatePass(request);
    Alert.alert('Success', 'Gate pass request accepted!');
  };

  const handleRejectGatePass = (request) => {
    // Implement logic for rejecting gate pass request
    onRejectGatePass(request);
    Alert.alert('Success', 'Gate pass request rejected!');
  };

  return (
    <View>
      <Text>Hostel Warden</Text>

      {/* Display submitted complaints */}
      <ScrollView>
        {submittedComplaints && submittedComplaints.length > 0 ? (
          submittedComplaints.map((complaint, index) => (
            <View key={index}>
              <Text>{`Complaint from ${complaint.sender}: ${complaint.text}`}</Text>
            </View>
          ))
        ) : (
          <Text>No complaints available</Text>
        )}
      </ScrollView>

      {/* Display gate pass requests */}
      <ScrollView>
        {gatePassRequests && gatePassRequests.length > 0 ? (
          gatePassRequests.map((request, index) => (
            <View key={index}>
              <Text>{`Gate Pass Request from ${request.sender}: ${request.reason}`}</Text>
              <Button title="Accept" onPress={() => handleAcceptGatePass(request)} />
              <Button title="Reject" onPress={() => handleRejectGatePass(request)} />
            </View>
          ))
        ) : (
          <Text>No gate pass requests available</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default HostelWarden;
