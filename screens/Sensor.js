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
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

export default function App({ navigation, route }) {

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
        <Text style={styles.welcomeTitle}>Segunda tab</Text>
        <Text style={styles.welcomeSubtitle}>Aqui seria a parte do sensor</Text>
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
