import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Btn from './Btn';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RoomAllocation = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRoomCategory, setSelectedRoomCategory] = useState(null);
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const categories = [
    { label: 'Item 1', value: 'item1' },
    { label: 'Item 2', value: 'item2' },
    { label: 'Item 3', value: 'item3' },
  ];

  const roomCategories = [
    { label: 'Room 1', value: 'room1' },
    { label: 'Room 2', value: 'room2' },
    { label: 'Room 3', value: 'room3' },
  ];

  useEffect(() => {
    // Use the IP address of your machine where the Express server is running
    const machineIp = '192.168.43.185';

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${machineIp}:5432/api/test2`);
        setData(response.data);
        console.log('Data fetched from the server:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Room Allotment</Text>

      <Text style={styles.subHeading}>Select Category</Text>
      <DropDownPicker
        items={categories}
        defaultValue={selectedCategory}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: '#fafafa' }}
        itemStyle={{ justifyContent: 'flex-start' }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={(item) => setSelectedCategory(item.value)}
        placeholder="Select a category"
      />

      <Text style={styles.subHeading}>Select Room Category</Text>
      <DropDownPicker
        items={roomCategories}
        defaultValue={selectedRoomCategory}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: '#fafafa' }}
        itemStyle={{ justifyContent: 'flex-start' }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={(item) => setSelectedRoomCategory(item.value)}
        placeholder="Select a room category"
      />

      <View style={{ marginTop: 20 }}>
        <Btn 
          bgColor="darkgreen"
          textColor="white"
          btnLabel="Proceed to Booking"
          Press={() => {
            navigation.navigate('RoomAllocationScreen2');
            // Handle confirmation logic here
            // You may want to navigate to another screen or perform further actions
          }}
        />
      </View>

      <View>
        <Text>Data from PostgreSQL:</Text>
        {data.map(item => (
          <Text key={item.id}>{item.name}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
    textAlign: 'center',
    marginBottom: 10,
    color: 'red',
  },
  subHeading: {
    fontSize: 24,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default RoomAllocation;
