import * as React from 'react';
import { View, Text, Image } from 'react-native';
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home';
import Signup from './src/Signup';
import Login from './src/Login';
import MainPage from './src/MainPage';
import DoctorAvailability from './src/DoctorAvailability';
import ConsultationPage from './src/ConsultationPage';
import GatePassRequest from './src/GatePassRequest';
import GatePassStatus from './src/GatePassStatus';
import RoomAllocation from './src/RoomAllocation';
import RoomAllocationScreen2 from './src/RoomAllocationScreen2';
import RoomAllocationStatus from './src/RoomAllocationStatus';
import ProfileManagement from './src/ProfileManagement';
import ComplaintBox from './src/ComplaintBox';
import GymRegistration from './src/GymRegistration';
import hostel from './assets/hostel.jpeg';
import Student from './src/Student';
import HostelRegistration from './src/HostelRegistration';
import DoctorScreen from './src/DoctorScreen';
import { MessageProvider } from './src/MessageContext';
import HostelWarden from './src/HostelWarden';
import MessRegistration from './src/MessRegistration';
import DayMenu from './src/DayMenu';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <View
              style={{
                height: 200,
                width: '100%',
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "#f4f4f4",
                borderBottomWidth: 1
              }}
            >
              <Image
                source={hostel}
                style={{
                  height: 130,
                  width: 130,
                  borderRadius: 65
                }}
              />
              <Text
                style={{
                  fontSize: 22,
                  marginVertical: 6,
                  fontWeight: "bold",
                  color: "#111"
                }}
              >HostelEase</Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#111"
                }}
              >Your Smart Hostel Companion</Text>
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        )
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#fff",
          width: 250
        },
        headerStyle: {
          backgroundColor: "#006400",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold"
        },
        drawerLabelStyle: {
          color: "#111"
        }
      }}
    >
      <Drawer.Screen
        name="Home"
        options={{
          drawerLabel: "Home",
          title: "Home",
          drawerIcon: () => (
            <SimpleLineIcons name="home" size={20} color="#808080" />
          )
        }}
        component={Home}
      />

      <Drawer.Screen
        name="Student"
        options={{
        drawerLabel: "Student",
        title: "Student",
        drawerIcon: () => (
       <FontAwesome name="user" size={20} color="#808080" />
       )
        }}
        component={Student}
      />

      <Drawer.Screen
        name="Doctor"
        options={{
        drawerLabel: "Doctor",
        title: "Doctor",
        drawerIcon: () => (
        <MaterialIcons name="local-hospital" size={20} color="#808080" />
         )
         }}
        component={DoctorScreen}
      />

      <Drawer.Screen
        name="HostelWarden"
        options={{
          drawerLabel: "Hostel Warden",
          title: "Hostel Warden",
          drawerIcon: () => (
            <MaterialIcons name="account-balance" size={20} color="#808080" />
          )
         }}
        component={HostelWarden}
      />
   

      {/* Add other Drawer.Screen components here */}
    </Drawer.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer>
      <MessageProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="MainPage" component={MainPage} />
          <Stack.Screen name="DoctorAvailability" component={DoctorAvailability} />
          <Stack.Screen name="ConsultationPage" component={ConsultationPage} />
          <Stack.Screen name="GatePassRequest" component={GatePassRequest} />
          <Stack.Screen name="GatePassStatus" component={GatePassStatus} />
          <Stack.Screen name="RoomAllocation" component={RoomAllocation} />
          <Stack.Screen name="RoomAllocationScreen2" component={RoomAllocationScreen2} />
          <Stack.Screen name="RoomAllocationStatus" component={RoomAllocationStatus} />
          <Stack.Screen name="ProfileManagement" component={ProfileManagement} />
          <Stack.Screen name="ComplaintBox" component={ComplaintBox} />
          <Stack.Screen name="GymRegistration" component={GymRegistration} />
          <Stack.Screen name="HostelRegistration" component={HostelRegistration} />
          <Stack.Screen name="DoctorScreen" component={DoctorScreen} />
          <Stack.Screen name="HostelWarden" component={HostelWarden} />
          <Stack.Screen name="MessRegistration" component={MessRegistration} options={{ title: 'Mess Registration' }} />
          <Stack.Screen name="DayMenu" component={DayMenu} options={{ title: 'Day Menu' }} />

        </Stack.Navigator>
      </MessageProvider>
    </NavigationContainer>
  );
}

export default App;