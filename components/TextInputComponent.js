import React from 'react';
import { TextInput } from "react-native";

export const TextInputComponent = ({ value, onChange, placeholder, secureTextEntry }) => {
    return (
      <TextInput
      style={{
        padding: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        margin: 8,
        width: 250,
        height: 50,
        backgroundColor: "#EEF5FF",
        borderWidth: 3,
        borderColor: "#000000",
        borderRadius: 15,
      }}
      placeholder={placeholder}
      onChangeText={onChange}
      value={value}
      secureTextEntry={secureTextEntry}
      />
    );  
}; 