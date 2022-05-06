import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

export default function App({ navigation }) {
  let [fontsLoaded] = useFonts({
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.welcomeView}>
        <Text style={styles.welcomeTitle}>Welcome back!</Text>
        <Text style={styles.welcomeSubtitle}>Sign in to your account</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Username, phone or e-mail"
          placeholderTextColor={"#918F8C"}
          selectionColor="#1a1b1f"
        />
        <TextInput
          style={[{ marginTop: 20 }, styles.input]}
          placeholder="Password"
          placeholderTextColor={"#918F8C"}
          secureTextEntry={true}
          selectionColor="#1a1b1f"
        />
        <Text style={{ marginTop: 20 }}>or</Text>
        <View style={styles.alternateView}>
          <TouchableOpacity>
            <Image source={require("../assets/logos/google.png")} />
          </TouchableOpacity>
          <View style={{ width: 65 }}></View>
          <TouchableOpacity>
            <Image source={require("../assets/logos/facebook.png")} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <View style={styles.buttonRegister}>
          <Text style={styles.buttonInfo}>Don't have an account?</Text>
          <Text
            style={[
              { marginLeft: 2, fontFamily: "Inter-SemiBold" },
              styles.buttonInfo,
            ]}
          >
            Register here!
          </Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

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
    width: 340,
    height: 60,
    backgroundColor: "#161518",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Inter-SemiBold",
    fontSize: 20,
  },
  buttonRegister: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
});
