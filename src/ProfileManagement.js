import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ProfileManagement = () => {
  const [changeType, setChangeType] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleChangeType = (type) => {
    setChangeType(type);
  };

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleSave = () => {
    // Handle the save logic based on changeType and inputValue
    console.log(`Saving ${changeType}: ${inputValue}`);
    console.log("checking Duebugging here")
    // Add your logic here to save the entered data
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile Management</Text>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={() => handleChangeType('Change Number')} style={styles.option}>
          <View style={styles.optionCircle} />
          <Text style={styles.optionText}>Change Number</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleChangeType('Change Password')} style={styles.option}>
          <View style={styles.optionCircle} />
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleChangeType('Change Name')} style={styles.option}>
          <View style={styles.optionCircle} />
          <Text style={styles.optionText}>Change Name</Text>
        </TouchableOpacity>
      </View>

      {/* Input Field */}
      {changeType && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={`Enter ${changeType}`}
            value={inputValue}
            onChangeText={handleInputChange}
          />
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  optionsContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  optionCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#3498db',
    marginRight: 10,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#3498db',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProfileManagement;
