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
//           response = await axios.get('http://192.168.137.1:8081/api/singleSeaterRoom');
//         } else {
//           response = await axios.get(
//             selectedRoomCategory === 'double'
//               ? 'http://192.168.137.1:8081/api/twoSeaterRoom'
//               : 'http://192.168.137.1:8081/api/sharedrooms'
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
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Btn from './Btn';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const RoomAllocationScreen2 = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [data, setData] = useState([]);
  const route = useRoute();
  const { selectedRoomCategory, selectedCategory } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (selectedRoomCategory === 'single') {
          response = await axios.get('http://192.168.137.1:8081/api/singleSeaterRoom');
        } else {
          response = await axios.get(
            selectedRoomCategory === 'double'
              ? 'http://192.168.137.1:8081/api/twoSeaterRoom'
              : 'http://192.168.137.1:8081/api/sharedrooms'
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

  const navigateToOtherScreen = () => {
    navigation.navigate('RoomAllocationStatus', {
      selectedCategory,
      selectedRoomCategory,
    });
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
        btnLabel="Submit"
        Press={navigateToOtherScreen}
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
  Btn: {
    marginTop: 20,
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
