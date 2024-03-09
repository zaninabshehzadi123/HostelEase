// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import Btn from './Btn';
// import axios from 'axios';
// import { useRoute } from '@react-navigation/native';
// import { useNavigation } from '@react-navigation/native';

// const RoomAllocationScreen2 = () => {
//   const [selectedValue, setSelectedValue] = useState(null);
//   const [data, setData] = useState([]);
//   const route = useRoute();
//   const { selectedRoomCategory, selectedCategory } = route.params;
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let response;
//         if (selectedRoomCategory === 'single') {
//           response = await axios.get('http://192.168.43.185:8081/api/singleSeaterRoom');
//         } else {
//           response = await axios.get(
//             selectedRoomCategory === 'double'
//               ? 'http://192.168.43.185:8081/api/twoSeaterRoom'
//               : 'http://192.168.43.185:8081/api/sharedrooms'
//           );
//         }
//         console.log('Data fetched from the server:', response.data);
//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error.message);
//       }
//     };
//     fetchData();
//   }, [selectedRoomCategory]);

//   const selectedRoom = Array.isArray(data) && data.find((item) => item?.id.toString() === selectedValue);

//   const navigateToOtherScreen = () => {
//     navigation.navigate('RoomAllocationStatus', {
//       selectedCategory,
//       selectedRoomCategory,
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>
//         {selectedCategory === 'senior' ? 'Jinnah Hall' : 'Iqbal Hall'}
//       </Text>
//       <Text style={styles.subHeading}>Rooms</Text>
//       <Picker
//         selectedValue={selectedValue}
//         onValueChange={(itemValue) => setSelectedValue(itemValue)}
//         style={{ height: 40, backgroundColor: '#fafafa' }}
//       >
//         {data.map((item) => (
//           <Picker.Item key={item.id} label={item.id.toString()} value={item.id.toString()} />
//         ))}
//       </Picker>

//       <Btn
//         bgColor="darkgreen"
//         textColor="white"
//         btnLabel="Submit"
//         Press={navigateToOtherScreen}
//       />

//       <View style={styles.dataSection}>
//         <Text style={styles.subHeading}>Room Members:</Text>
//         {selectedRoom && (
//           <Text style={styles.dataItem}>
//             {'Room number ' + selectedRoom.id + '\n'}
//             {'Member1: ' + selectedRoom.member1 + '\n'}
//             {'Member2: ' + selectedRoom.member2 + '\n'}
//             {selectedRoomCategory === 'double' ? null : 'Member3: ' + selectedRoom.member3 + '\n'}
//             {selectedRoomCategory === 'double' ? null : 'Member4: ' + selectedRoom.member4 + '\n'}
//             {selectedRoomCategory === 'double' ? null : 'Member5: ' + selectedRoom.member5 + '\n'}
//             {selectedRoomCategory === 'double' ? null : 'Member6: ' + selectedRoom.member6}
//           </Text>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     paddingHorizontal: 16,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 50,
//     textAlign: 'center',
//     marginBottom: 10,
//     color: 'red',
//   },
//   subHeading: {
//     fontSize: 24,
//     marginTop: 10,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   Btn: {
//     marginTop: 20,
//   },
//   dataSection: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding: 10,
//     marginTop: 20,
//   },
//   dataItem: {
//     fontSize: 14,
//   },
// });

// export default RoomAllocationScreen2;
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Btn from './Btn';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const RoomAllocationScreen2 = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [data, setData] = useState([]);
  const route = useRoute();
  const { selectedRoomCategory, selectedCategory, email } = route.params;
  const navigation = useNavigation();

  // Extract the first 7 digits of the email as "rollNumber"
  const rollNumber = email ? email.substring(0, 7) : null;

  useEffect(() => {
    // Alert the rollNumber when the screen opens
    Alert.alert('Roll Number Alert', `Roll Number: ${rollNumber}`);
  }, [rollNumber]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (selectedRoomCategory === 'single') {
          response = await axios.get('http://192.168.43.185:8081/api/singleSeaterRoom');
        } else {
          response = await axios.get(
            selectedRoomCategory === 'double'
              ? 'http://192.168.43.185:8081/api/twoSeaterRoom'
              : 'http://192.168.43.185:8081/api/sharedrooms'
          );
        }
        console.log('Data fetched from the server:', response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  }, [selectedRoomCategory]);

  const selectedRoom = Array.isArray(data) && data.find((item) => item?.id.toString() === selectedValue);

  // const applyForBooking = async () => {
  //   try {
  //     const response = await axios.post('http://192.168.43.185:8081/api/applyForBooking', {
  //       roomId: parseInt(selectedValue), // Assuming selectedValue is the room ID
  //       selectedRoomCategory,
  //     });

  //     // Handle the response as needed
  //     Alert.alert('Application Status', response.data.message);

  //     // Reload data after applying for booking
  //     fetchData();
  //   } catch (error) {
  //     console.error('Error applying for booking:', error.message);
  //   }
  // };

  const applyForBooking = async () => {
    try {
      const responseApply = await axios.post('http://192.168.43.185:8081/api/applyForBooking', {
        roomId: parseInt(selectedValue),
        selectedRoomCategory,
      });

      // Handle the response for applyForBooking API
      Alert.alert('Application Status', responseApply.data.message);

      const responseStore = await axios.post('http://192.168.43.185:8081/api/storeRoomAllocationApplication', {
        rollNumber,
        selectedRoomCategory,
        roomId: parseInt(selectedValue),
      });

      // Handle the response for storeRoomAllocationApplication API
      Alert.alert('Application Status', responseStore.data.message);

      // Reload data after applying for booking
      fetchData();
    } catch (error) {
      console.error('Error applying for booking:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {selectedCategory === 'senior' ? 'Jinnah Hall' : 'Iqbal Hall'}
      </Text>
      <Text style={styles.subHeading}>Rooms</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
        style={{ height: 40, backgroundColor: '#fafafa' }}
      >
        {data.map((item) => (
          <Picker.Item key={item.id} label={item.id.toString()} value={item.id.toString()} />
        ))}
      </Picker>

      <Btn
        bgColor="darkgreen"
        textColor="white"
        btnLabel="Apply For Booking"
        Press={applyForBooking}
      />

      <View style={styles.dataSection}>
        <Text style={styles.subHeading}>Room Members:</Text>
        {selectedRoom && (
          <Text style={styles.dataItem}>
            {'Room number ' + selectedRoom.id + '\n'}
            {'Member1: ' + selectedRoom.member1 + '\n'}
            {selectedRoomCategory === 'single' ? null : 'Member2: ' + selectedRoom.member2 + '\n'}
            {selectedRoomCategory === 'shared' ? 'Member3: ' + selectedRoom.member3 + '\n' : null}
            {selectedRoomCategory === 'shared' ? 'Member4: ' + selectedRoom.member4 + '\n' : null}
            {selectedRoomCategory === 'shared' ? 'Member5: ' + selectedRoom.member5 + '\n' : null}
            {selectedRoomCategory === 'shared' ? 'Member6: ' + selectedRoom.member6 : null}
          </Text>
        )}
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
  dataSection: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginTop: 20,
  },
  dataItem: {
    fontSize: 14,
  },
});

export default RoomAllocationScreen2;
