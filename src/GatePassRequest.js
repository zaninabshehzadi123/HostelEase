import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Background from './Background';
import Btn from './Btn';
import Field from './Field';

const GatePassRequest = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [gatePassDetail, setGatePassDetail] = useState('');
  const [amPm, setAmPm] = useState('AM');
  const [endTime, setEndTime] = useState(new Date());
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleTimeChange = (event, time) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (time) {
      setSelectedTime(time);
      setAmPm(time.getHours() >= 12 ? 'PM' : 'AM');
    }
  };

  const handleEndTimeChange = (event, time) => {
    setShowEndTimePicker(Platform.OS === 'ios');
    if (time) {
      setEndTime(time);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
    setSelectedTime(new Date());
    setAmPm('AM');
  };

  const handleSubmit = () => {
    alert('Gate Pass Request Submitted');
  };

  const handleCheckStatus = () => {
    navigation.navigate('GatePassStatus');
  };

  const showEndTimepicker = () => {
    setShowEndTimePicker(true);
  };

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 20,
    },
    title: {
      color: 'white',
      fontSize: 40,
      fontWeight: 'bold',
      marginTop: 20,
    },
    formContainer: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      marginTop: 20,
      width: '100%',
    },
    label: {
      color: 'black',
      fontSize: 20,
      marginTop: 10,
      fontWeight: 'bold',
    },
    fieldContainer: {
      width: '100%',
      marginBottom: 20,
    },
    fieldButton: {
      width: '80%',
      justifyContent: 'center',
      alignItems: 'flex-start',
      borderBottomWidth: 1,
      borderBottomColor: '#2196F3',
      paddingVertical: 10,
    },
    fieldButtonText: {
      fontSize: 18,
      color: '#2196F3',
    },
    textInput: {
      height: 100,
      width: '80%',
      borderColor: '#2196F3',
      borderWidth: 1,
      borderRadius: 10,
      marginTop: 5,
      paddingHorizontal: 10,
    },
  });

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>Gate Pass Request</Text>
        <View style={styles.formContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Select Date</Text>
            <TouchableOpacity style={styles.fieldButton} onPress={showDatepicker}>
              <Field placeholder="Select Date" value={selectedDate.toDateString()} editable={false} />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Start Time</Text>
            <TouchableOpacity style={styles.fieldButton} onPress={showTimepicker}>
              <Field
                placeholder="Start Time"
                value={
                  selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
                  ' ' +
                  amPm
                }
                editable={false}
              />
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={selectedTime}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>End Time</Text>
            <TouchableOpacity style={styles.fieldButton} onPress={showEndTimepicker}>
              <Field
                placeholder="End Time"
                value={
                  endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
                  ' ' +
                  (endTime.getHours() >= 12 ? 'PM' : 'AM')
                }
                editable={false}
              />
            </TouchableOpacity>
            {showEndTimePicker && (
              <DateTimePicker
                value={endTime}
                mode="time"
                display="default"
                onChange={handleEndTimeChange}
              />
            )}
          </View>

          <Text style={styles.label}>Gatepass Reason</Text>
          <TextInput
            style={styles.textInput}
            multiline
            placeholder="Write details here..."
            onChangeText={setGatePassDetail}
            value={gatePassDetail}
          />
          <Btn bgColor="#2196F3" textColor="white" btnLabel="Submit" Press={handleSubmit} />
          <Btn
            bgColor="#4CAF50"
            textColor="white"
            btnLabel="Check Status"
            Press={handleCheckStatus}
          />
        </View>
      </View>
    </Background>
  );
};

export default GatePassRequest;
