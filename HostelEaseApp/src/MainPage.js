// // Dashboard.js
// import React from 'react';
// import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
// import Background from './Background';
// import { darkGreen } from './Constants';

// const MainPage = (props) => {
//   const serviceButtons = [
//     { label: 'Doctor Availability', screen: 'DoctorAvailability' },
//     { label: 'Room Allocation', screen: 'RoomAllocation' },
//     { label: 'Gym Registration', screen: 'GymRegistration' },
//     { label: 'Mess Registration', screen: 'MessRegistration' },
//     { label: 'Complaint Box', screen: 'ComplaintBox' },
//     { label: 'Gate Pass Request', screen: 'GatePassRequest' },
//     { label: 'Profile Management', screen: 'ProfileManagement' },
//   ];

//   // Retrieve the extractedDigits parameter from the route
//   const { extractedDigits } = route.params;

//   const renderItem = ({ item }) => (
//     <TouchableOpacity onPress={() => props.navigation.navigate(item.screen)}>
//       <ServiceButton label={item.label} />
//     </TouchableOpacity>
//   );

//   return (
//     <Background>
//       <View style={styles.container}>
//         <Text style={styles.title}>Hostel Dashboard Here </Text>
//         <FlatList
//           data={serviceButtons}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.label}
//           style={styles.flatList}
//         />
//       </View>
//     </Background>
//   );
// };

// const ServiceButton = ({ label }) => (
//   <View style={styles.serviceButton}>
//     <Text style={styles.buttonText}>{label}</Text>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 40,
//     paddingTop: 100,
//     marginBottom: 30,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   flatList: {
//     width: '100%',
//   },
//   serviceButton: {
//     backgroundColor: 'white',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     marginVertical: 10,
//     borderRadius: 20,
//     alignItems: 'center',
//     width: 340,
//   },
//   buttonText: {
//     color: darkGreen,
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default MainPage;


import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Background from './Background';
import { darkGreen } from './Constants';
import axios from 'axios';


const MainPage = ({ route, navigation }) => {
  const { email, extractedDigits } = route.params || {};
  const rollNumber = email.substring(0, 7);

  const serviceButtons = [
    { label: 'Doctor Availability', screen: 'DoctorAvailability' },
    { label: 'Room Allocation', screen: 'RoomAllocation' },
    { label: 'Gym Registration', screen: 'GymRegistration' },
    { label: 'Mess Registration', screen: 'MessRegistration' },
    { label: 'Complaint Box', screen: 'ComplaintBox' },
    { label: 'Gate Pass Request', screen: 'GatePassRequest' },
    { label: 'Profile Management', screen: 'ProfileManagement' },
  ];

  const [allocationChecked, setAllocationChecked] = React.useState(false);
  useEffect(() => {
    checkRoomAllocation();
  }, [rollNumber]); // Run checkRoomAllocation only when rollNumber changes
  const checkRoomAllocation = async () => {
    try {
      const response = await axios.get('http://192.168.43.185:8081/api/checkRoomAllocation', {
        params: { rollNumber },
      });
      console.log('Came inside checkRoomAllocation');
      const responseData = response.data;

      if (responseData && responseData.message) {
        alert(responseData.message);
      } else if (responseData && responseData.toString().length === 7) {
        // If response is a 7-digit string, don't open the screen
        console.log('Response is 7 digits, not opening Room Allocation screen');
      } else {
        setAllocationChecked(true); // Allow navigation if response is empty or not 7 digits
      }
    } catch (error) {
      setAllocationChecked(true);
    }
  };

  const navigateToRoomAllocationScreen = () => {
    navigation.navigate('RoomAllocation', {
      email,
      extractedDigits,
    });
  };

  const handleModulePress = (screen) => {
    if (screen === 'RoomAllocation') {
      if (allocationChecked) {
        navigateToRoomAllocationScreen();
      } else {
        checkRoomAllocation(); // Trigger API call within handleModulePress
      }
    } else {
      navigation.navigate(screen);
    }
  };
  
  

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleModulePress(item.screen)}>
      <ServiceButton label={item.label} />
    </TouchableOpacity>
  );

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>Hostel Dashboard Here</Text>
        <Text style={styles.emailText}>{email}</Text>
        <Text style={styles.emailText}>{`Roll Number: ${rollNumber}`}</Text>
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
  <View style={styles.serviceButton}>
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
    fontSize: 40,
    paddingTop: 100,
    marginBottom: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  emailText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  flatList: {
    width: '100%',
  },
  serviceButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    width: 340,
  },
  buttonText: {
    color: darkGreen,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MainPage;
