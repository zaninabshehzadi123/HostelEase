
// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import axios from 'axios';

// const DayMenu = ({ route, navigation }) => {
//   const { email, day } = route.params;
//   const rollNumber = email.substring(0, 7);
//   console.log('Roll number: ', rollNumber);
//   const [selectedMeals, setSelectedMeals] = useState([]);
//   const [menu, setMenu] = useState({
//     Breakfast: '',
//     Lunch: '',
//     Dinner: '',
//   });
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMenu = async () => {
//       try {
//         const response = await axios.get(`http://192.168.137.1:8081/api/meals/${day}`);
//         const { breakfast, lunch, dinner } = response.data.meals[0];
//         setMenu({ Breakfast: breakfast, Lunch: lunch, Dinner: dinner });
//       } catch (error) {
//         console.error('Error fetching menu:', error);
//         setError('Error fetching menu');
//       }
//     };

//     fetchMenu();
//   }, [day]);

//   const handleMealSelect = (meal) => {
//     const mealIndex = selectedMeals.indexOf(meal);
//     if (mealIndex === -1) {
//       setSelectedMeals([...selectedMeals, meal]);
//     } else {
//       const updatedMeals = [...selectedMeals];
//       updatedMeals.splice(mealIndex, 1);
//       setSelectedMeals(updatedMeals);
//     }
//   };

//   const isMealSelected = (meal) => {
//     return selectedMeals.includes(meal);
//   };

//   const handleBooking = async () => {
//     try {
//       const bookingData = {
//         rollNumber,
//         day: route.params.day,
//         breakfast: isMealSelected('Breakfast'),
//         lunch: isMealSelected('Lunch'),
//         dinner: isMealSelected('Dinner')
//       };
//       console.log('Roll number is: ', bookingData.rollNumber)

//       await axios.post('http://192.168.137.1:8081/api/book-meal', bookingData);

//       navigation.goBack({ bookedDay: route.params.day });
//     } catch (error) {
//       console.error('Error booking meal:', error);
//       setError('Error booking meal');
//     }
//   };

//   const handleUnbooking = async () => {
//     try {
//       await axios.delete(`http://192.168.137.1:8081/api/unbook-meal/${rollNumber}/${day}`);
//       setSelectedMeals([]); // Clear selected meals after unbooking
//       alert('Meal unbooked successfully');
//     } catch (error) {
//       console.error('Error unbooking meal:', error);
//       setError('Error unbooking meal');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{day}</Text>
//       {error && <Text style={styles.error}>{error}</Text>}
//       <View style={styles.mealContainer}>
//         <TouchableOpacity
//           style={[styles.mealOption, isMealSelected('Breakfast') && styles.selectedMeal]}
//           onPress={() => handleMealSelect('Breakfast')}>
//           <Text style={styles.mealText}>Breakfast</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.mealOption, isMealSelected('Lunch') && styles.selectedMeal]}
//           onPress={() => handleMealSelect('Lunch')}>
//           <Text style={styles.mealText}>Lunch</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.mealOption, isMealSelected('Dinner') && styles.selectedMeal]}
//           onPress={() => handleMealSelect('Dinner')}>
//           <Text style={styles.mealText}>Dinner</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.menuContainer}>
//         {Object.entries(menu).map(([mealType, mealItems]) => (
//           <View key={mealType}>
//             <Text style={styles.menuTitle}>{mealType}</Text>
//             <Text style={styles.menuItems}>{mealItems}</Text>
//           </View>
//         ))}
//       </View>
//       <TouchableOpacity
//         style={[styles.bookingButton, selectedMeals.length === 0 && styles.disabledButton]}
//         onPress={handleBooking}
//         disabled={selectedMeals.length === 0}>
//         <Text style={styles.bookingText}>Book</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.unbookingButton]}
//         onPress={handleUnbooking}>
//         <Text style={styles.unbookingText}>Unbook</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   mealContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   mealOption: {
//     backgroundColor: '#3498db',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   selectedMeal: {
//     backgroundColor: '#2ecc71',
//   },
//   mealText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//     textAlign: 'center',
//   },
//   menuContainer: {
//     marginBottom: 20,
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 8,
//     width: '100%',
//   },
//   menuTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   menuItems: {
//     fontSize: 16,
//   },
//   bookingButton: {
//     backgroundColor: '#2ecc71',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   unbookingButton: {
//     backgroundColor: '#e74c3c', // Red color
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   disabledButton: {
//     backgroundColor: '#95a5a6',
//   },
//   bookingText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   unbookingText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   error: {
//     color: 'red',
//     marginBottom: 10,
//   },
// });

// export default DayMenu;

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const DayMenu = ({ route, navigation }) => {
  const { email, day } = route.params;
  const rollNumber = email.substring(0, 7);
  console.log('Roll number: ', rollNumber);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [menu, setMenu] = useState({
    Breakfast: '',
    Lunch: '',
    Dinner: '',
  });
  const [error, setError] = useState(null);
  const [bookedMeals, setBookedMeals] = useState({
    Breakfast: '',
    Lunch: '',
    Dinner: '',
  });

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`http://192.168.137.1:8081/api/meals/${day}`);
        const { breakfast, lunch, dinner } = response.data.meals[0];
        setMenu({ Breakfast: breakfast, Lunch: lunch, Dinner: dinner });
      } catch (error) {
        console.error('Error fetching menu:', error);
        setError('Error fetching menu');
      }
    };

    fetchMenu();
  }, [day]);

  useEffect(() => {
    console.log('Entered in frontend')
    const fetchBookedMeals = async () => {
      try {
        const response = await axios.get(`http://192.168.137.1:8081/api/check-booked-meals/${rollNumber}/${day}`);
        console.log('Rabia');
        // console.log(response.data.bookedMeals.breakfast);
        if (response.data.success) {
          const { breakfast, lunch, dinner } = response.data.bookedMeals || {};
          setBookedMeals({ Breakfast: breakfast, Lunch: lunch, Dinner: dinner });
          
          console.log('Kuch b');
          console.log(bookedMeals.Breakfast);
        }
        else
        {
          console.log('No entry Recorded Yet');
        }
      } catch (error) {
        console.error('Error fetching booked meals:', error);
        setError('Error fetching booked meals');
      }
    };

    fetchBookedMeals();
  }, [rollNumber, day]);

  useEffect(() => {
    // Combine all booked meals into one array
    const meals = Object.keys(bookedMeals).filter(meal => bookedMeals[meal]);
    setSelectedMeals(meals);
  }, [bookedMeals]);

  const handleMealSelect = (meal) => {
    const mealIndex = selectedMeals.indexOf(meal);
    if (mealIndex === -1) {
      setSelectedMeals([...selectedMeals, meal]);
    } else {
      const updatedMeals = [...selectedMeals];
      updatedMeals.splice(mealIndex, 1);
      setSelectedMeals(updatedMeals);
    }
  };

  const isMealSelected = (meal) => {
    return selectedMeals.includes(meal);
  };

  const isMealBooked = (meal) => {
    return bookedMeals[meal];
  };

  const handleBooking = async () => {
    try {
      const bookingData = {
        rollNumber,
        day: route.params.day,
        breakfast: isMealSelected('Breakfast'),
        lunch: isMealSelected('Lunch'),
        dinner: isMealSelected('Dinner')
      };

      await axios.post('http://192.168.137.1:8081/api/book-meal', bookingData);
      alert('Meal updated successfully');
      navigation.goBack({ bookedDay: route.params.day, shouldRefresh: true });
    } catch (error) {
      console.error('Error booking meal:', error);
      setError('Error booking meal');
    }
  };

  const handleUnbooking = async () => {
    try {
      await axios.delete(`http://192.168.137.1:8081/api/unbook-meal/${rollNumber}/${day}`);
      setSelectedMeals([]); // Clear selected meals after unbooking
      alert('Meal unbooked successfully');
      navigation.goBack({ bookedDay: route.params.day, shouldRefresh: true });
    } catch (error) { 
      console.error('Error unbooking meal:', error);
      setError('Error unbooking meal');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{day}</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.mealContainer}>
        <TouchableOpacity
          style={[
            styles.mealOption,
            isMealSelected('Breakfast') && styles.selectedMeal
          ]}
          onPress={() => {
            if (isMealSelected('Breakfast')) {
              setSelectedMeals(prevSelectedMeals => prevSelectedMeals.filter(selectedMeal => selectedMeal !== 'Breakfast'));
            } else {
              setSelectedMeals(prevSelectedMeals => [...prevSelectedMeals, 'Breakfast']);
            }
          }}>
          <Text style={styles.mealText}>Breakfast</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.mealOption,
            isMealSelected('Lunch') && styles.selectedMeal
          ]}
          onPress={() => {
            if (isMealSelected('Lunch')) {
              setSelectedMeals(prevSelectedMeals => prevSelectedMeals.filter(selectedMeal => selectedMeal !== 'Lunch'));
            } else {
              setSelectedMeals(prevSelectedMeals => [...prevSelectedMeals, 'Lunch']);
            }
          }}>
          <Text style={styles.mealText}>Lunch</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.mealOption,
            isMealSelected('Dinner') && styles.selectedMeal
          ]}
          onPress={() => {
            if (isMealSelected('Dinner')) {
              setSelectedMeals(prevSelectedMeals => prevSelectedMeals.filter(selectedMeal => selectedMeal !== 'Dinner'));
            } else {
              setSelectedMeals(prevSelectedMeals => [...prevSelectedMeals, 'Dinner']);
            }
          }}>
          <Text style={styles.mealText}>Dinner</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuContainer}>
        {Object.entries(menu).map(([mealType, mealItems]) => (
          <View key={mealType}>
            <Text style={styles.menuTitle}>{mealType}</Text>
            <Text style={styles.menuItems}>{mealItems}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.bookingButton, selectedMeals.length === 0 && styles.disabledButton]}
        onPress={handleBooking}
        disabled={selectedMeals.length === 0}>
        <Text style={styles.bookingText}>Book</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.unbookingButton]}
        onPress={handleUnbooking}>
        <Text style={styles.unbookingText}>Unbook</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  mealContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  mealOption: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  selectedMeal: {
    backgroundColor: '#2ecc71',
  },
  mealText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  menuContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '100%',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuItems: {
    fontSize: 16,
  },
  bookingButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  unbookingButton: {
    backgroundColor: '#e74c3c', // Red color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#95a5a6',
  },
  bookingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  unbookingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default DayMenu;