import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  TextInput
} from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { SignUpInput } from "../components/SignUpInput";
import axios from "axios";
import aws4, { sign } from "react-native-aws4";

export default function App({ navigation }) {
  
  const [email, setEmail] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);

  const [borderColor, setBorderColor] = React.useState("#F6F8FF");
  const [borderWidth, setBorderWidth] = React.useState(1);

  const [error, setError] = React.useState(false);

  const validateInput = (input) => {

    let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g

    if (regex.test(input))
    {
      setBorderColor("#00A376");
      setBorderWidth(1);
      setEmail(input)
      setError(false);
      return true;
    }
    else
    {
      setBorderColor("#A32400");
      setBorderWidth(1);
      setEmail(input)
      setError(true)
      return false;
    }
  }

  const handleForgotPassword = async () => {

    setIsLoading(true);

    let request = {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      url: process.env.AMAZON_API_RESETPASSWORD_URL,
      data: {
        email: email
      }
    }

    await axios(request)
    .then(response => {
      setIsLoading(false)
      switch (response.data)
      {
        case "auth/invalid-email":
          Alert.alert("Invalid email", "Please enter a valid email address.");
          break;
        case "auth/user-not-found":
            Alert.alert("User not found", "Please enter a valid email address.");
            break;
        case "auth/missing-email":
            Alert.alert("Missing email", "Please enter a valid email address.");
            break;
        case "auth/email-sent":
            Alert.alert("Email sent", "Please check your email to reset your password.");
            navigation.navigate("Home");
            break;          
      }
    })
    .catch(error => {
      Alert.alert("Error", "Please, verify your data and try again.");
    });

  }

  // Loading fonts
  let [fontsLoaded] = useFonts({
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
  });

  // If font is loaded, render the app
  // If not, render the loading screen
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.welcomeView}>
        <Text style={styles.welcomeTitle}>Forgot password?</Text>
        <Text style={styles.welcomeSubtitle}>Insert your e-mail!</Text>
      </View>
      <View
        style={styles.contentView}
      >
          <TextInput 
            style={[
                {
                    marginTop: 5,
                    borderColor: borderColor,
                    borderWidth: borderWidth,
                },
                styles.input,
                ]}
            placeholder="E-mail"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={(text) => {validateInput(text)}}
            keyboardType="email-address"
          />
          <Text styles={{ fontFamily: "Inter-Regular" }}>{error && "Please, insert a valid e-mail!"}</Text>
          <TouchableOpacity
            style={[{ backgroundColor: "#6E45B7" }, styles.button]}
            activeOpacity={0.8}
            disabled={error}
            onPress={handleForgotPassword}

          >
            <Text style={styles.buttonText}>{ !isLoading ? "Send" :  <ActivityIndicator size="large" color="#F6F8FF" /> }</Text>

          </TouchableOpacity>
      </View>
      <View></View>
      <StatusBar style="auto" />
    </View>
  );
}

// StyleSheet for component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FF",
    alignItems: "center",
    justifyContent: "space-around",
  },
  welcomeView: {
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  welcomeTitle: {
    fontSize: 36,
    fontFamily: "Inter-Bold",
  },
  welcomeSubtitle: {
    fontSize: 24,
    fontFamily: "Inter-Regular",
  },
  inputView: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 300,
    height: 60,
    borderRadius: 10,
    padding: 10,
    fontFamily: "Inter-Regular",
    color: "#161518",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    backgroundColor: "#fff",
  },
  alternateView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonView: {},
  button: {
    width: 300,
    height: 60,
    backgroundColor: "#161518",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "flex-end",
    marginTop: 55,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Inter-SemiBold",
    fontSize: 20,
  },
  buttonRegister: {
    width: 200,
    height: 60,
    backgroundColor: "#161518",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "flex-end",
    marginTop: 55,
  },
});
