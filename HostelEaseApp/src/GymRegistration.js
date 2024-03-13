// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import axios from 'axios';

// const GymRegistration = ({ route, navigation }) => {
//   const { email, rollNumber } = route.params || {};
//   const [batch, setBatch] = useState(email.substring(1, 3));

//   const handleRegister = async () => {
//     console.log('Came');
//     try {
//       const response = await axios.post('http://192.168.43.185:8081/api/gymRegistration', {
//         email,
//         rollNumber,
//         batch
//       });

//       if (response.data.success) {
//         // Navigate to MainPage if registration successful
//         navigation.navigate('MainPage');
//       } else {
//         Alert.alert('Registration Failed', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error registering for gym: ', error);
//       Alert.alert('Error', 'An error occurred while registering for gym');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Gym Registration</Text>

//       {/* Input Fields */}
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={email}
//           editable={false}
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="Roll Number"
//           value={rollNumber}
//           editable={false}
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="Batch"
//           value={batch}
//           editable={false}
//         />
//       </View>

//       {/* Register Button */}
//       <TouchableOpacity
//         style={[styles.button, { backgroundColor: 'darkgreen' }]}
//         onPress={handleRegister}
//       >
//         <Text style={[styles.buttonText, { color: 'white' }]}>Register</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   heading: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: 'black',
//     marginBottom: 20,
//   },
//   inputContainer: {
//     width: '80%',
//   },
//   input: {
//     height: 40,
//     width: '100%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   button: {
//     width: '80%',
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 5,
//   },
//   buttonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default GymRegistration;


import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const GymRegistration = ({ route, navigation }) => {
  const { email, rollNumber } = route.params || {};
  const [batch, setBatch] = useState('');

  // Update batch state when email changes
useEffect(() => {
  if (email) {
    setBatch(email.slice(1, 3));
  }
}, [email]);


  const handleRegister = async () => {
    console.log('Came');
    try {
      const response = await axios.post('http://192.168.43.185:8081/api/gymRegistration', {
        email,
        rollNumber,
        batch
      });

      if (response.data.success) {
        // Navigate to MainPage if registration successful
        navigation.navigate('MainPage', { email, batch });
      } else {
        Alert.alert('Registration Failed', response.data.message);
      }
    } catch (error) {
      console.error('Error registering for gym: ', error);
      Alert.alert('Error', 'An error occurred while registering for gym');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Gym Registration</Text>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email || ''}
          editable={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Roll Number"
          value={rollNumber || ''}
          editable={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Batch"
          value={batch}
          editable={false}
        />
      </View>

      {/* Register Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: 'darkgreen' }]}
        onPress={handleRegister}
        disabled={!email} // Disable button if email is undefined
      >
        <Text style={[styles.buttonText, { color: 'white' }]}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GymRegistration;
