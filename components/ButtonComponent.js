import React from 'react';
import { Text, TouchableHighlight} from 'react-native';
import { buttonStyles } from '../styles/buttonStyles';

export const ButtonComponent = ({ text, onPress}) => (
    <TouchableHighlight underlayColor="#EEEEEE" style={buttonStyles.mainButton} onPress={onPress}>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>{text}</Text>
    </TouchableHighlight>
);