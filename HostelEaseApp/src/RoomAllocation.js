// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import Btn from './Btn';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';

// const RoomAllocation = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedRoomCategory, setSelectedRoomCategory] = useState(null);
//   const [data, setData] = useState([]);
//   const navigation = useNavigation();

//   const categories = [
//     { label: 'Item 1', value: 'item1' },
//     { label: 'Item 2', value: 'item2' },
//     { label: 'Item 3', value: 'item3' },
//   ];

//   const roomCategories = [
//     { label: 'Room 1', value: 'room1' },
//     { label: 'Room 2', value: 'room2' },
//     { label: 'Room 3', value: 'room3' },
//   ];

//   useEffect(() => {
//     const machineIp = '192.168.43.185';
//     // Fetch data from the server
//     const fetchData = async () => {
//       try {
//         console.log('try');
//         const response = await axios.get('http://192.168.43.185:8081/api/test2');
//         console.log('try2');
//         setData(response.data);
//         console.log('Data fetched from the server:', response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error.message);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Room Allotment</Text>

//       <Text style={styles.subHeading}>Select Category</Text>
//       <DropDownPicker
//         items={categories}
//         defaultValue={selectedCategory}
//         containerStyle={{ height: 40 }}
//         style={{ backgroundColor: '#fafafa' }}
//         itemStyle={{ justifyContent: 'flex-start' }}
//         dropDownStyle={{ backgroundColor: '#fafafa' }}
//         onChangeItem={(item) => setSelectedCategory(item.value)}
//         placeholder="Select a category"
//       />

//       <Text style={styles.subHeading}>Select Room Category</Text>
//       <DropDownPicker
//         items={roomCategories}
//         defaultValue={selectedRoomCategory}
//         containerStyle={{ height: 40 }}
//         style={{ backgroundColor: '#fafafa' }}
//         itemStyle={{ justifyContent: 'flex-start' }}
//         dropDownStyle={{ backgroundColor: '#fafafa' }}
//         onChangeItem={(item) => setSelectedRoomCategory(item.value)}
//         placeholder="Select a room category"
//       />

//       <View style={{ marginTop: 20 }}>
//         <Btn 
//           bgColor="darkgreen"
//           textColor="white"
//           btnLabel="Proceed to Booking"
//           Press={() => {
//             navigation.navigate('RoomAllocationScreen2');
//             // Handle confirmation logic here
//             // You may want to navigate to another screen or perform further actions
//           }}
//         />
//       </View>

//       <View>
//         <Text>Data from PostgreSQL:</Text>
//         {data.map(item => (
//           <Text key={item.id}>{item.name}</Text>
//         ))}
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
// });

// export default RoomAllocation;




















import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Btn from './Btn';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RoomAllocation = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState(null); // Added missing state
  const [selectedRoomCategory, setSelectedRoomCategory] = useState(null);
  const [selectedRoomCategoryLabel, setSelectedRoomCategoryLabel] = useState(null); // Added missing state
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
        const response = await axios.get('http://192.168.43.185:8081/api/test2');
        console.log('Data fetched from the server:', response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (item) => {
    setSelectedCategory(item.value);
    setSelectedCategoryLabel(item.label); // Set the label for the selected category
    setIsOpenCategory(false);
    showLogs(`Selected category: ${item.label}`);
    console.log(item.label);
  };

  const handleRoomCategoryChange = (item) => {
    setSelectedRoomCategory(item.value);
    setSelectedRoomCategoryLabel(item.label); // Set the label for the selected room category
    setIsOpenRoomCategory(false);
    showLogs(`Selected room category: ${item.label}`);
  };

  const showLogs = (message) => {
    console.log(message);
    // You can customize this function to display logs as needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Room Allotment</Text>

      <Text style={styles.subHeading}>Select Category</Text>
      <DropDownPicker
  items={categories}
  defaultValue={selectedCategory} // Use state variable for initial display
  containerStyle={[styles.dropDownPicker, { zIndex: isOpenCategory ? 1 : 0 }]}
  style={[styles.dropDownPicker, { zIndex: isOpenCategory ? 1 : 0 }]}
  itemStyle={styles.itemStyle}
  dropDownStyle={[styles.dropDownPicker, { zIndex: isOpenCategory ? 1 : 0 }]}
  open={isOpenCategory}
  onOpen={() => setIsOpenCategory(true)}
  onClose={() => setIsOpenCategory(false)}
  onChangeItem={(item) => handleCategoryChange(item)}
  placeholder="Select a category"
  placeholderStyle={styles.placeholderStyle}
/>

<Text style={styles.subHeading}>Select Room Category</Text>
<DropDownPicker
  items={roomCategories}
  defaultValue={selectedRoomCategory} // Use state variable for initial display
  containerStyle={[styles.dropDownPicker, { zIndex: isOpenRoomCategory ? 1 : 0 }]}
  style={[styles.dropDownPicker, { zIndex: isOpenRoomCategory ? 1 : 0 }]}
  itemStyle={styles.itemStyle}
  dropDownStyle={[styles.dropDownPicker, { zIndex: isOpenRoomCategory ? 1 : 0 }]}
  open={isOpenRoomCategory}
  onOpen={() => setIsOpenRoomCategory(true)}
  onClose={() => setIsOpenRoomCategory(false)}
  onChangeItem={(item) => handleRoomCategoryChange(item)}

  placeholder="Select a room category"
  placeholderStyle={styles.placeholderStyle}
/>


      <View style={styles.btnContainer}>
        <Btn 
          bgColor="darkgreen"
          textColor="white"
          btnLabel="Proceed to Booking"
          Press={() => {
            navigation.navigate('RoomAllocationScreen2');
          }}
        />
      </View>

      <View style={styles.dataSection}>
        <Text>Data from PostgreSQL:</Text>
        {data.map(item => (
          <Text key={item.id} style={styles.dataItem}>
            {item.id}
            {item.name}
            {item.new_column1}
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
  },
  subHeading: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  dropDownPicker: {
    height: 40,
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowRadius: 2,
    shadowOpacity: 0.2,
  },
  placeholderStyle: {
    color: '#999',
  },
  itemStyle: {
    fontSize: 16,
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
});

export default RoomAllocation;