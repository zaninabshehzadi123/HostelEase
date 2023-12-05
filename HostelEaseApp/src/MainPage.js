

// Dashboard.js
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Background from './Background';
import { darkGreen, green } from './Constants';

const MainPage = (props) => {
  const serviceButtons = [
    { label: 'Doctor Availability', screen: 'DoctorAvailability' },
    { label: 'Room Allocation', screen: 'RoomAllocation' },
    { label: 'Gym Registration', screen: 'GymRegistration' },
    { label: 'Mess Registration', screen: 'MessRegistration' },
    
    { label: 'Complaint Box', screen: 'ComplaintBox' },
    { label: 'Gate Pass Request', screen: 'GatePassRequest' },
    { label: 'Profile Management', screen: 'ProfileManagement' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => props.navigation.navigate(item.screen)}>
      <ServiceButton label={item.label} />
    </TouchableOpacity>
  );

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>Hostel Dashboard</Text>
        <FlatList
          data={serviceButtons}
          renderItem={renderItem}
          keyExtractor={(item) => item.label}
          style={styles.flatList}
        />
      </View>
    </Background>
  );
};

const ServiceButton = ({ label }) => (
  <View
    style={{
      backgroundColor: 'white',
      padding: 10,
      margin: 10,
      borderRadius: 20,
      alignItems: 'center',
      width: 340,
    }}>
    <Text style={{ color: darkGreen, fontSize: 18, fontWeight: 'bold' }}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    paddingTop: 100,
    marginBottom: 70,
    justifyContent: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  flatList: {
    width: '100%',
  },
});

export default MainPage;


