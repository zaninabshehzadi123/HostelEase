import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen, blue } from './Constants';

const Home = (props) => {
  return (
    <Background>
      <View style={styles.container}>
        <Text style={{ color: 'white', fontSize: 50, marginBottom: 70,justifyContent: 'center', fontWeight: 'bold', }}>HOSTELEASE</Text>
        <Btn bgColor={blue} textColor='white' btnLabel="Login" Press={() => props.navigation.navigate("Login")} />
        <Btn bgColor='white' textColor={darkGreen} btnLabel="Signup" Press={() => props.navigation.navigate("Signup")} />
      </View>

    </Background>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    marginVertical: 120,
  },
});

export default Home;