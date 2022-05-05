import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  HomeScreen from './screens/HomeScreen';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';

const Home = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Home.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}
      >
        <Home.Screen name="Home" component={HomeScreen} />
        <Home.Screen name="SignIn" component={SignIn} />
        <Home.Screen name="SignUp" component={SignUp} />
      </Home.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
