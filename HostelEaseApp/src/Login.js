// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Alert } from 'react-native';
// import Background from './Background';
// import Btn from './Btn';
// import { darkGreen } from './Constants';
// import Field from './Field';
// import axios from 'axios';

// const Login = (props) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     console.log('handleLogin function is called.');

//     try {
//       // Send login request
//       const response = await axios.post('http://192.168.137.1:8081/api/login', {
//         email,
//         password,
//       });

//       console.log('Server response received.');

//       const result = response.data;

//       console.log('Server response:', result);

//       if (result.success) {
//         console.log('Login successful. Calling API to extract digits...');

//         try {
//           // Call the /api/extractDigits API to get the extracted value
//           const digitsResponse = await axios.get(
//             `http://192.168.137.1:8081/api/extractDigits?email=${email}`
//           );

//           const extractedDigits = digitsResponse.data.extractedDigits;

//           // Show the extracted digits in an alert
//           Alert.alert(`Your Batch is: ${extractedDigits}`);

//           // Navigate to the MainPage after successful login and API call
//           props.navigation.navigate('MainPage', { email, extractedDigits });
//         } catch (error) {
//           console.error('Error extracting digits', error);
//           Alert.alert('Error', 'An error occurred while extracting digits.');
//         }
//       } else {
//         console.log('Login failed. Showing alert...');
//         Alert.alert('Login failed', result.message);
//       }
//     } catch (error) {
//       console.error('Error during login', error);
//       Alert.alert('Error', 'An error occurred during login.');
//     }
//   };

//   return (
//     <Background>
//       <View style={{ alignItems: 'center', width: 360 }}>
//         <Text
//           style={{
//             color: 'white',
//             fontSize: 64,
//             fontWeight: 'bold',
//             marginVertical: 20,
//           }}>
//           Login
//         </Text>
//         <View
//           style={{
//             backgroundColor: 'white',
//             height: 700,
//             width: 460,
//             borderTopLeftRadius: 130,
//             paddingTop: 100,
//             alignItems: 'center',
//           }}>
//           <Text style={{ fontSize: 40, color: darkGreen, fontWeight: 'bold' }}>
//             Welcome Back
//           </Text>
//           <Text
//             style={{
//               color: 'grey',
//               fontSize: 19,
//               fontWeight: 'bold',
//               marginBottom: 20,
//             }}>
//             Login to your account
//           </Text>
//           <Field
//             placeholder="Email / Username"
//             keyboardType={'email-address'}
//             value={email}
//             onChangeText={(text) => setEmail(text)}
//           />
//           <Field
//             placeholder="Password"
//             secureTextEntry={true}
//             value={password}
//             onChangeText={(text) => setPassword(text)}
//           />
//           <View
//             style={{
//               alignItems: 'flex-end',
//               width: '78%',
//               paddingRight: 16,
//               marginBottom: 200,
//             }}>
//             <Text
//               style={{
//                 color: darkGreen,
//                 fontWeight: 'bold',
//                 fontSize: 16,
//               }}>
//               Forgot Password ?
//             </Text>
//           </View>
//           <TouchableOpacity onPress={handleLogin}>
//             <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Login</Text>
//           </TouchableOpacity>
//           <View
//             style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
//             <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Don't have an account ? </Text>
//             <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
//               <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Background>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen } from './Constants';
import Field from './Field';
import axios from 'axios';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log('handleLogin function is called.');

    try {
      // Send login request
      const response = await axios.post('http://192.168.137.1:8081/api/login', {
        email,
        password,
      });

      console.log('Server response received.');

      const result = response.data;

      console.log('Server response:', result);

      if (result.success) {
        console.log('Login successful. Calling API to extract digits...');

        try {
          // Call the /api/extractDigits API to get the extracted value
          const digitsResponse = await axios.get(
            `http://192.168.137.1:8081/api/extractDigits?email=${email}`
          );

          const extractedDigits = digitsResponse.data.extractedDigits;

          // Show the extracted digits in an alert
          Alert.alert(`Your Batch is: ${extractedDigits}`);

          // Navigate to the MainPage after successful login and API call
          props.navigation.navigate('MainPage', { email, extractedDigits });
        } catch (error) {
          console.error('Error extracting digits', error);
          Alert.alert('Error', 'An error occurred while extracting digits.');
        }
      } else {
        console.log('Login failed. Showing alert...');
        Alert.alert('Login failed', result.message);
      }
    } catch (error) {
      console.error('Error during login', error);
      Alert.alert('Error', 'An error occurred during login.');
    }
  };

  return (
    <Background>
      <View style={{ alignItems: 'center', width: 360 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginVertical: 20,
          }}>
          Login
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 100,
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 40, color: darkGreen, fontWeight: 'bold' }}>
            Welcome Back
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Login to your account
          </Text>
          <Field
            placeholder="Email / Username"
            keyboardType={'email-address'}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Field
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <View
            style={{
              alignItems: 'flex-end',
              width: '78%',
              paddingRight: 16,
              marginBottom: 200,
            }}>
            <Text
              style={{
                color: darkGreen,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Forgot Password ?
            </Text>
          </View>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Login</Text>
          </TouchableOpacity>
          <View
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Don't have an account ? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
              <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Login;
