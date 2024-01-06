import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import { LogInScreen } from './screens/LogInScreen';
import { DataContextProvider } from './data_context/DataContext';
import { ParkingsScreen } from './screens/ParkingsScreen';
import { CreateParkingScreen } from './screens/CreateParkingScreen';
import { ParkingScreen } from './screens/ParkingScreen';
import { QRScreen } from './screens/QRScreen';
import { RegisterScreen } from './screens/RegisterScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <DataContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='LogInScreen' screenOptions={{headerStyle:{backgroundColor: '#EEF5FF'}}}>
            <Stack.Screen name="LogInScreen" component={LogInScreen} options={{headerShown: false}}/>
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown: false}}/>
            <Stack.Screen name="ParkingsScreen" component={ParkingsScreen} options={{headerTitle: 'My Parkings'}}/>
            <Stack.Screen name="CreateParkingScreen" component={CreateParkingScreen}  options={{headerTitle: 'Create Parking'}}/>
            <Stack.Screen name="ParkingScreen" component={ParkingScreen} options={{headerTitle: 'Parking'}}/>
            <Stack.Screen name="QRScreen" component={QRScreen} options={{headerTitle: 'QR'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </DataContextProvider>
  );
}
