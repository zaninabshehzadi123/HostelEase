import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import the appropriate icons
import Background from './Background';
import Btn from './Btn';

const GatePassStatus = () => {
  const [gatePassStatus, setGatePassStatus] = useState('Pending'); // Set an initial status

  const handleStatusChange = (status) => {
    setGatePassStatus(status);
  };

  return (
    <Background>
      <View style={{ alignItems: 'center', width: 360 }}>
        <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold', marginTop: 20 }}>
          Gatepass Status
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 500,
            width: 300,
            borderRadius: 20,
            padding: 20,
            alignItems: 'center',
          }}>
          <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
            Status
          </Text>
          <TouchableOpacity onPress={() => handleStatusChange('Pending')}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <FontAwesome
                name={gatePassStatus === 'Pending' ? 'circle' : 'circle-o'}
                size={24}
                color={gatePassStatus === 'Pending' ? 'green' : 'black'}
              />
              <Text style={{ marginLeft: 10 }}>Pending</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleStatusChange('In Process')}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <FontAwesome
                name={gatePassStatus === 'In Process' ? 'circle' : 'circle-o'}
                size={24}
                color={gatePassStatus === 'In Process' ? 'green' : 'black'}
              />
              <Text style={{ marginLeft: 10 }}>In Process</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleStatusChange('Cancelled')}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <FontAwesome
                name={gatePassStatus === 'Cancelled' ? 'circle' : 'circle-o'}
                size={24}
                color={gatePassStatus === 'Cancelled' ? 'green' : 'black'}
              />
              <Text style={{ marginLeft: 10 }}>Cancelled</Text>
            </View>
          </TouchableOpacity>
          <Btn
            bgColor="#4CAF50"
            textColor="white"
            btnLabel="Go Back"
            Press={() => {
              // Implement navigation to go back to the previous screen
              alert('Go Back Button Pressed');
            }}
          />
        </View>
      </View>
    </Background>
  );
};

export default GatePassStatus;
