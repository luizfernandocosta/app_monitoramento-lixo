import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Animated } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Dash from "./screens/Dash";
import Sensor from "./screens/Sensor";
import ForgotPassword from "./screens/ForgotPassword";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMicrochip, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

// Creating a Stack Navigator
const Home = createNativeStackNavigator();

// Creating a tab navigator
const Tab = createBottomTabNavigator();

// Creating a TabNavigation component
const TabNavigation = () => (

  <Tab.Navigator
    initialRouteName="Dash"
    screenOptions={
      { 
        "headerShown": false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#F6F8FF",
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          borderRadius: 10,
          height: 60,
          shadowColor: "#000",
          shadowOffset: {
            width: 10,
            height: 10,
          },
          shadowOpacity: 0.37,
          shadowRadius: 7.49,
          elevation: 12,
        }
      }
    }
  >
    <Tab.Screen name="Dash" component={Dash} initialParams={""} options={{
      tabBarIcon: ({ focused }) => (
        <Animated.View
          style={{
            width: '100%',
            height: '100%',
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderTopWidth: focused ? 2 : 2,
            borderTopColor: focused ? "#6E45B7" : "#F6F8FF",
            borderRadius: 10,


          }}
        >
          <FontAwesomeIcon
            icon={faTrashAlt}
            size={20}
            color={focused ? "#6E45B7" : "#1A1B1F"}
          />
          <Text
            style={{
              fontFamily: focused ? "Inter-Medium" : "Inter-Light",
              color: focused ? "#6E45B7" : "#1A1B1F",
              fontSize: 12
            }}
          >
            BINS
          </Text>
        </Animated.View>
      )
    }} />
    <Tab.Screen name="Sensor" component={Sensor} initialParams={""} options={{
      tabBarIcon: ({ focused }) => (
        <Animated.View
          style={{
            width: '100%',
            height: '100%',
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderTopWidth: focused ? 2 : 2,
            borderTopColor: focused ? "#6E45B7" : "#F6F8FF",
            borderRadius: 10,
 
          }}
        >
          <FontAwesomeIcon
            icon={faMicrochip}
            size={20}
            color={focused ? "#6E45B7" : "#1A1B1F"}
          />
          <Text
            style={{
              fontFamily: focused ? "Inter-Medium" : "Inter-Light",
              color: focused ? "#6E45B7" : "#1A1B1F",
              fontSize: 12
            }}
          >
            SENSORS
          </Text>
        </Animated.View>
      )
    }} />
  </Tab.Navigator>
);

export default function App() {

  let [fontsLoaded] = useFonts({
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-Thin": require("./assets/fonts/Inter-Thin.ttf"),
    "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

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
        <Home.Screen name="Tab" component={TabNavigation} />
        <Home.Screen name="ForgotPassword" component={ForgotPassword} />
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
