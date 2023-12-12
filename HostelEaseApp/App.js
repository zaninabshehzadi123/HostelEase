import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home';
import Signup from './src/Signup';
import Login from './src/Login';
import MainPage from './src/MainPage';
import DoctorAvailability from './src/DoctorAvailability';
import ConsultationPage from './src/ConsultationPage';
import RoomAllocation from './src/RoomAllocation';
import RoomAllocationScreen2 from './src/RoomAllocationScreen2';
import RoomAllocationStatus from './src/RoomAllocationStatus';

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
        <Stack.Screen name="ConsultationPage" component={ConsultationPage} />
        <Stack.Screen name="RoomAllocation" component={RoomAllocation} />
        <Stack.Screen name="RoomAllocationScreen2" component={RoomAllocationScreen2} />
        <Stack.Screen name="RoomAllocationStatus" component={RoomAllocationStatus} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
