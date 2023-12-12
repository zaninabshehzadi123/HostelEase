import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Background from './Background';
import Btn from './Btn';

const GatePassStatus = () => {
  const [gatePassStatus, setGatePassStatus] = useState('Pending');

  const handleStatusChange = (status) => {
    setGatePassStatus(status);
  };

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>Gatepass Status</Text>
        <View style={styles.content}>
          <View style={styles.statusContainer}>
            <Text style={styles.label}>Status</Text>
            <TouchableOpacity onPress={() => handleStatusChange('Pending')}>
              <View style={styles.statusOption}>
                <FontAwesome
                  name={gatePassStatus === 'Pending' ? 'circle' : 'circle-o'}
                  size={24}
                  color={gatePassStatus === 'Pending' ? '#4CAF50' : 'black'}
                />
                <Text style={[styles.statusText, { color: gatePassStatus === 'Pending' ? '#4CAF50' : 'black' }]}>
                  Pending
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleStatusChange('In Process')}>
              <View style={styles.statusOption}>
                <FontAwesome
                  name={gatePassStatus === 'In Process' ? 'circle' : 'circle-o'}
                  size={24}
                  color={gatePassStatus === 'In Process' ? '#4CAF50' : 'black'}
                />
                <Text style={[styles.statusText, { color: gatePassStatus === 'In Process' ? '#4CAF50' : 'black' }]}>
                  In Process
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleStatusChange('Cancelled')}>
              <View style={styles.statusOption}>
                <FontAwesome
                  name={gatePassStatus === 'Cancelled' ? 'circle' : 'circle-o'}
                  size={24}
                  color={gatePassStatus === 'Cancelled' ? '#4CAF50' : 'black'}
                />
                <Text style={[styles.statusText, { color: gatePassStatus === 'Cancelled' ? '#4CAF50' : 'black' }]}>
                  Cancelled
                </Text>
              </View>
            </TouchableOpacity>
          </View>
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

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft:35,
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:70,
  },
  content: {
    flex: 1,
    justifyContent: 'center', // Centered content vertically
    width: '100%',
    marginTop: '20%',
    paddingHorizontal: 20,
  },
  statusContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  label: {
    color: '#4CAF50',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statusOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  
};

export default GatePassStatus;
