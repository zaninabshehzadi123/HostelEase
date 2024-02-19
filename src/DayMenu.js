// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// const DayMenu = ({ route, navigation }) => {
//   const { day } = route.params;
//   const [selectedMeals, setSelectedMeals] = useState([]);
//   const [menu, setMenu] = useState({
//     Breakfast: 'Naan Channy, Dahi, Salad',
//     Lunch: 'Paratha, Chicken Salan, Naan',
//     Dinner: 'Pizza, Burger, Fries',
//   });

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

//   const handleBooking = () => {
//     console.log('Selected meals:', selectedMeals);
//     navigation.navigate('MessRegistration', { day: day });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{day}</Text>

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
//         {selectedMeals.map((meal) => (
//           <View key={meal}>
//             <Text style={styles.menuTitle}>Menu for {meal}</Text>
//             <Text style={styles.menuItems}>{menu[meal]}</Text>
//           </View>
//         ))}
//       </View>

//       <TouchableOpacity
//         style={[styles.bookingButton, selectedMeals.length === 0 && styles.disabledButton]}
//         onPress={handleBooking}
//         disabled={selectedMeals.length === 0}>
//         <Text style={styles.bookingText}>Book</Text>
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
//   disabledButton: {
//     backgroundColor: '#95a5a6',
//   },
//   bookingText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

// export default DayMenu;


import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const DayMenu = ({ route, navigation }) => {
  const { day } = route.params;
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [menu, setMenu] = useState({
    Breakfast: '',
    Lunch: '',
    Dinner: '',
  });

  useEffect(() => {
    // Function to fetch menu for the selected day from the server
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`http://10.54.9.25:8081/api/meals/${day}`);
        const { breakfast, lunch, dinner } = response.data.meals[0];
        setMenu({ Breakfast: breakfast, Lunch: lunch, Dinner: dinner });
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    fetchMenu(); // Call the fetchMenu function when component mounts or when 'day' changes
  }, [day]);

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

  const handleBooking = () => {
    console.log('Selected meals:', selectedMeals);
    navigation.navigate('MessRegistration', { day: day });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{day}</Text>

      <View style={styles.mealContainer}>
        <TouchableOpacity
          style={[styles.mealOption, isMealSelected('Breakfast') && styles.selectedMeal]}
          onPress={() => handleMealSelect('Breakfast')}>
          <Text style={styles.mealText}>Breakfast</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.mealOption, isMealSelected('Lunch') && styles.selectedMeal]}
          onPress={() => handleMealSelect('Lunch')}>
          <Text style={styles.mealText}>Lunch</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.mealOption, isMealSelected('Dinner') && styles.selectedMeal]}
          onPress={() => handleMealSelect('Dinner')}>
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
  disabledButton: {
    backgroundColor: '#95a5a6',
  },
  bookingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DayMenu;
