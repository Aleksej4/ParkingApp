import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DataContextProvider } from './data_context/DataContext';
import { LogInScreen } from './screens/LogInScreen';
import { ActiveParkingsScreen } from './screens/ActiveParkingsScreen';
import { QRCodeScannerScreen } from './screens/QRCodeScannerScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <DataContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='LogInScreen' screenOptions={{headerStyle:{backgroundColor: '#EEF5FF'}}}>
          <Stack.Screen name='LogInScreen' component={LogInScreen} options={{headerShown: false}}/>
          <Stack.Screen name='ActiveParkingsScreen' component={ActiveParkingsScreen} options={{headerTitle: 'My Parkings'}}/>
          <Stack.Screen name='QRCodeScannerScreen' component={QRCodeScannerScreen} options={{headerTitle: 'New parking'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </DataContextProvider>
  );
}