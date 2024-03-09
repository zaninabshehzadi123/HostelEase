// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Alert } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import Btn from './Btn';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import axios from 'axios';

// const RoomAllocation = () => {
//   const [selectedRoomCategory, setSelectedRoomCategory] = useState(null);
//   const [selectedRoomCategoryLabel, setSelectedRoomCategoryLabel] = useState(null);
//   const [data, setData] = useState([]);
//   const [isOpenRoomCategory, setIsOpenRoomCategory] = useState(false);
//   const navigation = useNavigation();
//   const route = useRoute();

//   const { email, extractedDigits } = route.params || {};

//   const roomCategories = [
//     { label: 'Single Seater', value: 'single' },
//     { label: 'Double Seater', value: 'double' },
//     { label: 'Shared Room', value: 'shared' },
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://192.168.43.185:8081/api/JinnahRooms');
//         console.log('Data fetched from the server:', response.data);
//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error.message);
//       }
//     };
//     fetchData();

//     // Check for warnings when the screen opens
//     checkForWarnings();
//   }, []);

//   useEffect(() => {
//     showLogs(`Selected room category: ${selectedRoomCategoryLabel}`);
//   }, [selectedRoomCategoryLabel]);

//   const handleRoomCategoryChange = (roomItemValue) => {
//     setSelectedRoomCategory(roomItemValue);
//     setSelectedRoomCategoryLabel(roomCategories.find(roomCategory => roomCategory.value === roomItemValue)?.label);
//     setIsOpenRoomCategory(false);
//   };

//   const showLogs = (message) => {
//     console.log(message);
//   };

//   const navigateToOtherScreen = () => {
//     navigation.navigate('RoomAllocationScreen2', {
//       email,
//       extractedDigits,
//       selectedRoomCategory,
//     });
//   };

//   const checkForWarnings = async () => {
//     try {
//       const response = await axios.post('http://192.168.43.185:8081/api/checkWarning', {
//         email,
//       });

//       if (response.data.hasWarning) {
//         // Display a warning alert
//         Alert.alert('Warning', 'You have a warning.');
//       }
//     } catch (error) {
//       console.error('Error checking warning:', error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Room Allotment</Text>

//       <Text style={styles.subHeading}>Select Room Category</Text>
//       <Picker
//         selectedValue={selectedRoomCategory}
//         style={styles.picker}
//         onValueChange={(roomItemValue) => handleRoomCategoryChange(roomItemValue)}
//       >
//         {roomCategories.map((roomCategory, roomIndex) => (
//           <Picker.Item key={roomIndex} label={roomCategory.label} value={roomCategory.value} />
//         ))}
//       </Picker>

//       <View style={styles.btnContainer}>
//         <Btn 
//           bgColor="darkgreen"
//           textColor="white"
//           btnLabel="Proceed to Booking"
//           Press={navigateToOtherScreen}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     padding: 20,
//     borderRadius: 10,
//     backgroundColor: '#f5f5f5',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: 10,
//     marginTop: 20,
//   },
//   subHeading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: 10,
//     marginTop: 20,
//   },
//   btnContainer: {
//     marginTop: 20,
//   },
//   picker: {
//     height: 40,
//     backgroundColor: '#fafafa',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     shadowRadius: 2,
//     shadowOpacity: 0.2,
//   },
// });

// export default RoomAllocation;


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Btn from './Btn';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

const RoomAllocation = () => {
  const [selectedRoomCategory, setSelectedRoomCategory] = useState('single');
  const [selectedRoomCategoryLabel, setSelectedRoomCategoryLabel] = useState(null);
  const [data, setData] = useState([]);
  const [filteredRoomCategories, setFilteredRoomCategories] = useState([]);
  const [isOpenRoomCategory, setIsOpenRoomCategory] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const { email, extractedDigits } = route.params || {};

  const roomCategories = [
    { label: 'Single Seater', value: 'single' },
    { label: 'Double Seater', value: 'double' },
    { label: 'Shared Room', value: 'shared' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.43.185:8081/api/JinnahRooms');
        console.log('Data fetched from the server:', response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();

    // Check for warnings when the screen opens
    checkForWarnings();
  }, []);

  useEffect(() => {
    showLogs(`Selected room category: ${selectedRoomCategoryLabel}`);
  }, [selectedRoomCategoryLabel]);

  const handleRoomCategoryChange = (roomItemValue) => {
    setSelectedRoomCategory(roomItemValue);
    setSelectedRoomCategoryLabel(roomCategories.find(roomCategory => roomCategory.value === roomItemValue)?.label);
    setIsOpenRoomCategory(false);
  };

  const showLogs = (message) => {
    console.log(message);
  };

  const navigateToOtherScreen = () => {
    navigation.navigate('RoomAllocationScreen2', {
      email,
      extractedDigits,
      selectedRoomCategory,
    });
  };

  const checkForWarnings = async () => {
    try {
      const response = await axios.post('http://192.168.43.185:8081/api/checkWarning', {
        email,
      });

      if (response.data.hasWarning) {
        // Display a warning alert
        // Alert.alert('Warning', 'You have a warning.');

        // Filter categories to include only 'shared' when there's a warning
        setFilteredRoomCategories(roomCategories.filter(category => category.value === 'shared'));

        // Clear selected room category
        setSelectedRoomCategory('shared');
      } else {
        // No warning, use the original categories
        setFilteredRoomCategories(roomCategories);
      }
    } catch (error) {
      console.error('Error checking warning:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Room Allotment</Text>

      <Text style={styles.subHeading}>Select Room Category</Text>
      {filteredRoomCategories.length > 0 && (
        <Picker
          selectedValue={selectedRoomCategory}
          style={styles.picker}
          onValueChange={(roomItemValue) => handleRoomCategoryChange(roomItemValue)}
        >
          {filteredRoomCategories.map((roomCategory, roomIndex) => (
            <Picker.Item key={roomIndex} label={roomCategory.label} value={roomCategory.value} />
          ))}
        </Picker>
      )}

      <View style={styles.btnContainer}>
        <Btn 
          bgColor="darkgreen"
          textColor="white"
          btnLabel="Proceed to Booking"
          Press={navigateToOtherScreen}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  btnContainer: {
    marginTop: 20,
  },
  picker: {
    height: 40,
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowRadius: 2,
    shadowOpacity: 0.2,
  },
});

export default RoomAllocation;
