// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import Btn from './Btn';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';

// const RoomAllocation = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedCategoryLabel, setSelectedCategoryLabel] = useState(null);
//   const [selectedRoomCategory, setSelectedRoomCategory] = useState(null);
//   const [selectedRoomCategoryLabel, setSelectedRoomCategoryLabel] = useState(null);
//   const [data, setData] = useState([]);
//   const [isOpenCategory, setIsOpenCategory] = useState(false);
//   const [isOpenRoomCategory, setIsOpenRoomCategory] = useState(false);
//   const navigation = useNavigation();

//   const categories = [
//     { label: 'Senior', value: 'senior' },
//     { label: 'Junior', value: 'junior' },
//   ];

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
//   }, []);

//   useEffect(() => {
//     showLogs(`Selected category: ${selectedCategoryLabel}`);
//   }, [selectedCategoryLabel]);

//   useEffect(() => {
//     showLogs(`Selected room category: ${selectedRoomCategoryLabel}`);
//   }, [selectedRoomCategoryLabel]);

//   const handleCategoryChange = (categoryItemValue) => {
//     setSelectedCategory(categoryItemValue);
//     setSelectedCategoryLabel(categories.find(category => category.value === categoryItemValue)?.label);
//     setIsOpenCategory(false);
//   };

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
//       selectedCategory,
//       selectedRoomCategory,
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Room Allotment</Text>

//       <Text style={styles.subHeading}>Select Category</Text>
//       <Picker
//         onValueChange={(categoryItemValue) => handleCategoryChange(categoryItemValue)}
//         selectedValue={selectedCategory}
//         style={styles.picker}
//       >
//         {categories.map((category, index) => (
//           <Picker.Item key={index} label={category.label} value={category.value} />
//         ))}
//       </Picker>

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

//       <View style={styles.dataSection}>
//         <Text>Data from PostgreSQL:</Text>
//         {data.map(item => (
//           <Text key={item.id} style={styles.dataItem}>
//             {item.id}
//             {item.hall}
//             {item.floor}
//             {item.roomtype}
//           </Text>
//         ))}
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
//   },
//   subHeading: {
//     fontSize: 18,
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   btnContainer: {
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
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Btn from './Btn';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RoomAllocation = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState(null);
  const [selectedRoomCategory, setSelectedRoomCategory] = useState(null);
  const [selectedRoomCategoryLabel, setSelectedRoomCategoryLabel] = useState(null);
  const [data, setData] = useState([]);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [isOpenRoomCategory, setIsOpenRoomCategory] = useState(false);
  const navigation = useNavigation();

  const categories = [
    { label: 'Senior', value: 'senior' },
    { label: 'Junior', value: 'junior' },
  ];

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
  }, []);

  useEffect(() => {
    showLogs(`Selected category: ${selectedCategoryLabel}`);
  }, [selectedCategoryLabel]);

  useEffect(() => {
    showLogs(`Selected room category: ${selectedRoomCategoryLabel}`);
  }, [selectedRoomCategoryLabel]);

  const handleCategoryChange = (categoryItemValue) => {
    setSelectedCategory(categoryItemValue);
    setSelectedCategoryLabel(categories.find(category => category.value === categoryItemValue)?.label);
    setIsOpenCategory(false);
  };

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
      selectedCategory,
      selectedRoomCategory,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Room Allotment</Text>

      <Text style={styles.subHeading}>Select Category</Text>
      <Picker
        onValueChange={(categoryItemValue) => handleCategoryChange(categoryItemValue)}
        selectedValue={selectedCategory}
        style={styles.picker}
      >
        {categories.map((category, index) => (
          <Picker.Item key={index} label={category.label} value={category.value} />
        ))}
      </Picker>

      <Text style={styles.subHeading}>Select Room Category</Text>
      <Picker
        selectedValue={selectedRoomCategory}
        style={styles.picker}
        onValueChange={(roomItemValue) => handleRoomCategoryChange(roomItemValue)}
      >
        {roomCategories.map((roomCategory, roomIndex) => (
          <Picker.Item key={roomIndex} label={roomCategory.label} value={roomCategory.value} />
        ))}
      </Picker>

      <View style={styles.btnContainer}>
        <Btn 
          bgColor="darkgreen"
          textColor="white"
          btnLabel="Proceed to Booking"
          Press={navigateToOtherScreen}
        />
      </View>

      <View style={styles.dataSection}>
        <Text>Data from PostgreSQL:</Text>
        {data.map(item => (
          <Text key={item.id} style={styles.dataItem}>
            {item.id}
            {item.hall}
            {item.floor}
            {item.roomtype}
          </Text>
        ))}
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
    marginTop : 20,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
    marginTop : 20,
  },
  btnContainer: {
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