import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const RoomAllocation = (props) => {
  const modules = [
    { label: 'Doctor Availability', screen: 'DoctorAvailability' },
    { label: 'Online Consulting', screen: 'OnlineConsulting' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => props.navigation.navigate(item.screen)}>
      <ModuleButton label={item.label} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Module</Text>
      <FlatList
        data={modules}
        renderItem={renderItem}
        keyExtractor={(item) => item.label}
        style={styles.moduleList}
      />
    </View>
  );
};

const ModuleButton = ({ label }) => (
  <View style={styles.moduleButton}>
    <Text style={styles.buttonText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  moduleList: {
    width: '80%',
  },
  moduleButton: {
    backgroundColor: '#3498db',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RoomAllocation;
