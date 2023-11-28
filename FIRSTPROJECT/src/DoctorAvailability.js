import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import Background from './Background';
import { darkGreen } from './Constants';

const DoctorAvailability = (props) => {
  const [isAvailable, setAvailable] = useState(true);

  const toggleAvailability = () => {
    setAvailable(!isAvailable);
  };

  return (
    <Background>
      <View style={{ alignItems: 'center', width: 360 }}>
        <Text style={{ color: 'white', fontSize: 50, fontWeight: 'bold', marginVertical: 15 }}>
          Doctor Availability
        </Text>
        <View style={styles.cardContainer}>
          <Text style={{ marginTop: 5,fontSize: 35, color: darkGreen, fontWeight: 'bold' }}>Dr. John Doe</Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 14,
              fontWeight: 'bold',
              marginBottom: 10,
               marginTop: 10,
              textAlign: 'center',
            }}>
           Welcome to my profile. {'\n'} I am a specialist in internal medicine {'\n\t\t'} with several years of experience.
          </Text>

          {/* Display Doctor Timing in Card View */}
          <View style={styles.card}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: darkGreen }}>Doctor Timing:</Text>
            <Text style={{ fontSize: 16, color: 'grey' }}>
              Monday - Friday: 9:00 AM - 5:00 PM{'\n'}Saturday: 10:00 AM - 2:00 PM
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: darkGreen }}>Availability Status:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <Switch value={isAvailable} onValueChange={toggleAvailability} style={{ marginRight: 10 }} />
              <Text style={{ fontSize: 16, color: 'grey' }}>
                {isAvailable ? 'Available' : 'Not Available'}
              </Text>
            </View>
          </View>

          {/* Online Consulting Chatbox */}
          
          <TouchableOpacity
            style={styles.chatBox}
            onPress={() => props.navigation.navigate('ConsultationPage')}>
            <Text style={styles.chatText}>Chat for Online Consulting</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    height: 700,
    width: 300,
    borderTopLeftRadius: 130,
    paddingTop: 100,
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: darkGreen,
    padding: 15,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  chatBox: {
    backgroundColor:'darkgreen',
    //backgroundColor: 'Green',
    padding: 13,
    borderRadius: 10,
    marginTop: 20,
  },
  chatText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DoctorAvailability;
