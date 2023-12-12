import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'; // Import the library
import Background from './Background';
import Btn from './Btn';
import { useNavigation } from '@react-navigation/native';

const RoomAllocationScreen2 = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const navigation = useNavigation();


  const items = [
    { label: 'Item 1', value: 'item1' },
    { label: 'Item 2', value: 'item2' },
    { label: 'Item 3', value: 'item3' },
  ];



  return (
      <View style={styles.container}>
        <Text style={styles.heading}>Jinnah Hall</Text>
        <Text style={styles.subHeading}>Rooms</Text>
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
        placeholder=" "
      />


        {/* Check Status Button */}
        <Btn
          bgColor="darkgreen"
          textColor="white"
          btnLabel="Submit"
          Press={() => {
            // Handle check status logic here
            // You may want to navigate to another screen or perform further actions
            navigation.navigate('RoomAllocationStatus'); // Navigate to RoomAllocationStatus.js
         }}
        />
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
export default RoomAllocationScreen2;