import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Background from './Background';
import Btn from './Btn';
import { useNavigation } from '@react-navigation/native';

const RoomAllocation = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const navigation = useNavigation();

  const items = [
    { label: 'Item 1', value: 'item1' },
    { label: 'Item 2', value: 'item2' },
    { label: 'Item 3', value: 'item3' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Room Allotment</Text>
      <Text style={styles.subHeading}>Select Category</Text>
      <DropDownPicker
        items={items}
        defaultValue={selectedValue}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: '#fafafa' }}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={(item) => setSelectedValue(item.value)}
        placeholder="Select an item"
      />
       <Text style={styles.subHeading}>Select Room Category</Text>
       <DropDownPicker
        items={items}
        defaultValue={selectedValue}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: '#fafafa' }}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={(item) => setSelectedValue(item.value)}
        placeholder="Select an item"
      />
      <View style={styles.marginTop=20}>
      <Btn 
          bgColor="darkgreen"
          textColor="white"
          marginTop='20'
          btnLabel="Proceed to Booking"
          Press={() => {
            navigation.navigate('RoomAllocationScreen2');
            // Handle confirmation logic here
            // You may want to navigate to another screen or perform further actions
          }}
        />
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
  Btn: {
    marginTop: 20,
  }
});

export default RoomAllocation;