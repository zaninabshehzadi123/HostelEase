import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute
import axios from 'axios'; // Import axios module

const RoomAllocationStatus = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Use useRoute hook to access route object
  const [allotmentDetails, setAllotmentDetails] = useState([]);
  const { rollNumber } = route.params || {};

  useEffect(() => {
    fetchAllotmentDetails();
  }, []);

  const fetchAllotmentDetails = async () => {
    try {
      const response = await axios.get(`http://192.168.137.1:8081/api/getAllotmentDetails/${rollNumber}`);
      // Extract member names from response data
      const members = Object.values(response.data).filter(value => typeof value === 'string');
      setAllotmentDetails(members);
    } catch (error) {
      console.error('Error fetching allotment details:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Room Allotment Status</Text>


      {/* Allotment Details Heading */}
      <Text style={styles.subHeading}>Room Members</Text>

      {/* Allotment Details Container */}
      <View style={styles.detailsContainer}>
        {allotmentDetails.map((member, index) => (
          <Text key={index}>{member}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  statusItem: {
    alignItems: 'center',
  },
  statusLabel: {
    color: 'green',
  },
  statusIndicator: {
    color: 'green',
    fontSize: 30,
  },
  detailsContainer: {
    backgroundColor: 'grey',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    minHeight: 200, // Adjust as needed
    marginTop: 10,
    marginBottom: 20,
  },
});

export default RoomAllocationStatus;
