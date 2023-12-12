import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { useNavigation } from '@react-navigation/native';

const RoomAllocationStatus = () => {
  const navigation = useNavigation();
  return (
      <View style={styles.container}>
        <Text style={styles.heading}>Room Allotment Status</Text>

        {/* Status Bar */}
        <View style={styles.statusContainer}>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Pending</Text>
            <Text style={styles.statusIndicator}>o</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Processing</Text>
            <Text style={styles.statusIndicator}>o</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Complete</Text>
            <Text style={styles.statusIndicator}>o</Text>
          </View>
        </View>

        {/* Allotment Details Heading */}
        <Text style={styles.subHeading}>Allotment Details</Text>

        {/* Allotment Details Container */}
        <View style={styles.detailsContainer}>
          {/* Add content for allotment details here */}
        </View>

        {/* Back Button */}
        <Btn
          bgColor="darkgreen"
          textColor="white"
          btnLabel="Back"
          Press={() => {
            navigation.navigate('RoomAllocationScreen2')
            // Handle navigation or further actions here
          }}
        />
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