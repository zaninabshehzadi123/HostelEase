



// // import React, { useState, useEffect } from 'react';
// // import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// // const MessRegistration = ({ navigation, route }) => {
// //   const [bookedDays, setBookedDays] = useState([]);

// //   useEffect(() => {
// //     if (route.params && route.params.bookedDay) {
// //       setBookedDays([...bookedDays, route.params.bookedDay]);
// //     }
// //     if (route.params && route.params.unbookedDay) {
// //       setBookedDays(bookedDays.filter(day => day !== route.params.unbookedDay));
// //     }
// //   }, [route.params]);

// //   const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// //   const isDayBooked = (day) => {
// //     return bookedDays.includes(day);
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Mess Registration</Text>
// //       <View style={styles.daysContainer}>
// //         {days.map((day) => (
// //           <TouchableOpacity
// //             key={day}
// //             style={[styles.dayButton, isDayBooked(day) && styles.bookedDay]}
// //             onPress={() => navigation.navigate('DayMenu', { day: day })}>
// //             <Text style={styles.dayText}>{day}</Text>
// //           </TouchableOpacity>
// //         ))}
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     paddingHorizontal: 20,
// //     backgroundColor: '#f5f5f5',
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 20,
// //   },
// //   daysContainer: {
// //     width: '100%',
// //     alignItems: 'center',
// //   },
// //   dayButton: {
// //     backgroundColor: '#3498db',
// //     paddingVertical: 15,
// //     paddingHorizontal: 30,
// //     marginBottom: 10,
// //     marginHorizontal: 10,
// //     borderRadius: 10,
// //     alignItems: 'center',
// //     width: '250',
// //   },
// //   bookedDay: {
// //     backgroundColor: '#2ecc71', // Green color indicating booked day
// //   },
// //   dayText: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     color: 'white',
// //   },
// // });

// // export default MessRegistration;




// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// const MessRegistration = ({ navigation, route }) => {
//   const [bookedDays, setBookedDays] = useState([]);

//   useEffect(() => {
//     if (route.params && route.params.bookedDay) {
//       setBookedDays([...bookedDays, { day: route.params.bookedDay, bookingTime: route.params.bookingTime }]);
//     }
//     if (route.params && route.params.unbookedDay) {
//       setBookedDays(bookedDays.filter(day => day.day !== route.params.unbookedDay));
//     }
//   }, [route.params]);

//   const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//   const isDayBooked = (day) => {
//     return bookedDays.some(({ day: bookedDay }) => bookedDay === day);
//   };

//   const getBookingTimeForDay = (day) => {
//     const booking = bookedDays.find(({ day: bookedDay }) => bookedDay === day);
//     return booking ? booking.bookingTime : null;
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Mess Registration</Text>
//       <View style={styles.daysContainer}>
//         {days.map((day) => (
//           <TouchableOpacity
//             key={day}
//             style={[styles.dayButton, isDayBooked(day) && styles.bookedDay]}
//             onPress={() => navigation.navigate('DayMenu', { day: day, bookingTime: getBookingTimeForDay(day) })}>
//             <Text style={styles.dayText}>{day}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
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
//   daysContainer: {
//     width: '100%',
//     alignItems: 'center',
//   },
//   dayButton: {
//     backgroundColor: '#3498db',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     marginBottom: 10,
//     marginHorizontal: 10,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   bookedDay: {
//     backgroundColor: '#2ecc71', // Green color indicating booked day
//   },
//   dayText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//   },
// });

// export default MessRegistration;


import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const MessRegistration = ({ navigation, route }) => {
  const [bookedDays, setBookedDays] = useState([]);
  const { email } = route.params || {}; 
  const rollNumber = email.substring(0, 7);
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const currentDay = currentDate.substring(0, currentDate.indexOf(','));
 

  const fetchBookedDays = async () => {
    try {
      console.log('Fetching');
      const response = await axios.get(`http://192.168.137.1:8081/booked-days/${rollNumber}`);
      setBookedDays(response.data);
      console.log(response.data); 
    } catch (error) {
      console.error('Error fetching booked days:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBookedDays();
    }, [rollNumber])
  );
 
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const isDayBooked = (day) => {
    return bookedDays.includes(day);
  };

  const isCurrentDay = (day) => {
    return day === currentDay;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mess Registration</Text>
      <View style={styles.daysContainer}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            // style={[styles.dayButton, isDayBooked(day) && styles.bookedDay]}
            // style={[styles.dayButton, isDayBooked(day) ? styles.bookedDay : styles.defaultDay]}
            style={[
              styles.dayButton,
              isDayBooked(day) ? styles.bookedDay : styles.defaultDay,
              isCurrentDay(day) && styles.disabledButton 
            ]}
            disabled={isCurrentDay(day)}
            onPress={() => navigation.navigate('DayMenu', { day, email })}>
              
            <Text style={styles.dayText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  daysContainer: {
    width: '100%',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#d3d3d3', 
  },
  dayButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center', 
  },
  defaultDay: {
    backgroundColor: '#3498db', // Blue color for unbooked days
  },
  bookedDay: {
    backgroundColor: '#2ecc71', // Green color for booked days
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default MessRegistration;
