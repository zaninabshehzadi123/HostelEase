import * as React from 'react';
import { AppRegistry } from 'react-native';
import App from './App'; // Import your main component
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Home from './src/Home';
import Signup from './src/Signup';
import Login from './src/Login';
import MainPage from './src/MainPage';
import GatePassRequest from './src/GatePassRequest';
import GatePassStatus from './src/GatePassStatus';
import DoctorAvailability from './src/DoctorAvailability';
import RoomAllocation from './src/RoomAllocation';
import ConsultationPage from './src/ConsultationPage';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="DoctorAvailability" component={DoctorAvailability} />
        <Stack.Screen name="RoomAllocation" component={RoomAllocation} />
        <Stack.Screen name="ConsultationPage" component={ConsultationPage} />
         <Stack.Screen name="GatePassRequest" component={GatePassRequest} />
         <Stack.Screen name="GatePassStatus" component={GatePassStatus} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;