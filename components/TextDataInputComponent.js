import { TextInput, View } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';

export const TextDataInputComponent = ({value, onChange, placeholder, iconName, keyboardType}) => {
    return(
        <View style = {{
            height: 50,
            width: 200,
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            paddingTop: 15,
            margin: 15,
            flexDirection: 'row'
        }}>
            <Icon style={{paddingEnd: 10}} name={iconName} size={20} color="black"/>
            <TextInput 
                style={{
                    width: 170
                }}
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                keyboardType={keyboardType || 'default'}
            />
        </View>
    )
}