import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";

// Creating a Stack Navigator
const Home = createNativeStackNavigator();

export default function App() {
  return (
    // Creating a Stack Navigator
    // The first screen is the HomeScreen
    // The second screen is the SignInScreen
    // The third screen is the SignUpScreen
    <NavigationContainer>
      <Home.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Home.Screen name="Home" component={HomeScreen} />
        <Home.Screen name="SignIn" component={SignIn} />
        <Home.Screen name="SignUp" component={SignUp} />
      </Home.Navigator>
    </NavigationContainer>
  );
}

// StyleSheet for components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FF",
    alignItems: "center",
    justifyContent: "center",
  },
});
