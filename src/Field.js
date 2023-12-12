import React from 'react';
import {TextInput} from 'react-native';
import {darkGreen} from './Constants';

const Field = props => {
  return (
    <TextInput
      {...props}
      style={{
        borderRadius: 100,
        color: darkGreen,
        paddingHorizontal: 10,
        width: '80%',
        backgroundColor: 'rgb(220, 220, 220)',
        marginVertical: 10,
        alignSelf: 'center', // Center the component horizontally
      }}
      placeholderTextColor={darkGreen}
    />
  );
};


export default Field;
