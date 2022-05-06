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
  // Creating state for view select
  const [selectTab, setSelectTab] = React.useState(1);

  // View for FirstName
  function FirstName() {
    return (
      <View>
        <Text styles={{ fontFamily: "Inter-Regular" }}>
          Lets start with your name!
        </Text>
        <TextInput
          style={[{ marginTop: 5 }, styles.input]}
          underlineColorAndroid="transparent"
          placeholder="First name"
          placeholderTextColor={"#918F8C"}
          selectionColor="#1a1b1f"
        />
        <TouchableOpacity
          style={[{ backgroundColor: "#6E45B7" }, styles.button]}
          activeOpacity={0.8}
          onPress={() => setSelectTab(selectTab + 1)}
        >
          <Text style={styles.buttonText}>{">"}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // View for LastName
  function LastName() {
    return (
      <View>
        <Text styles={{ fontFamily: "Inter-Regular" }}>
          Now your last name!
        </Text>
        <TextInput
          style={[{ marginTop: 5 }, styles.input]}
          placeholder="Last name"
          placeholderTextColor={"#918F8C"}
          selectionColor="#1a1b1f"
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={[{ backgroundColor: "#6E45B7" }, styles.button]}
            activeOpacity={0.8}
            onPress={() => setSelectTab(selectTab - 1)}
          >
            <Text style={styles.buttonText}>{"<"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[{ backgroundColor: "#6E45B7" }, styles.button]}
            activeOpacity={0.8}
            onPress={() => setSelectTab(selectTab + 1)}
          >
            <Text style={styles.buttonText}>{">"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // View for Email
  function Email() {
    return (
      <View>
        <Text styles={{ fontFamily: "Inter-Regular" }}>
          Now insert your e-mail!
        </Text>
        <TextInput
          style={[{ marginTop: 5 }, styles.input]}
          placeholder="E-mail"
          placeholderTextColor={"#918F8C"}
          selectionColor="#1a1b1f"
          keyboardType="email-address"
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={[{ backgroundColor: "#6E45B7" }, styles.button]}
            activeOpacity={0.8}
            onPress={() => setSelectTab(selectTab - 1)}
          >
            <Text style={styles.buttonText}>{"<"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[{ backgroundColor: "#6E45B7" }, styles.button]}
            activeOpacity={0.8}
            onPress={() => setSelectTab(selectTab + 1)}
          >
            <Text style={styles.buttonText}>{">"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // View for PhoneNumber
  function PhoneNumber() {
    return (
      <View>
        <Text styles={{ fontFamily: "Inter-Regular" }}>
          Now put your phone number!
        </Text>
        <TextInput
          style={[{ marginTop: 5 }, styles.input]}
          placeholder="Number"
          placeholderTextColor={"#918F8C"}
          selectionColor="#1a1b1f"
          keyboardType="phone-pad"
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={[{ backgroundColor: "#6E45B7" }, styles.button]}
            activeOpacity={0.8}
            onPress={() => setSelectTab(selectTab - 1)}
          >
            <Text style={styles.buttonText}>{"<"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[{ backgroundColor: "#6E45B7" }, styles.button]}
            activeOpacity={0.8}
            onPress={() => setSelectTab(selectTab + 1)}
          >
            <Text style={styles.buttonText}>{">"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // View for Password
  function Password() {
    return (
      <View>
        <Text styles={{ fontFamily: "Inter-Regular" }}>
          And to end, insert a secure password!
        </Text>
        <TextInput
          style={[{ marginTop: 5 }, styles.input]}
          placeholder="Password"
          placeholderTextColor={"#918F8C"}
          selectionColor="#1a1b1f"
          secureTextEntry={true}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={[{ backgroundColor: "#6E45B7" }, styles.button]}
            activeOpacity={0.8}
            onPress={() => setSelectTab(selectTab - 1)}
          >
            <Text style={styles.buttonText}>{"<"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[{ backgroundColor: "#6E45B7" }, styles.buttonRegister]}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Create account!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Switch for switch between views
  const selectedTab = () => {
    switch (selectTab) {
      case 1:
        return <FirstName />;
      case 2:
        return <LastName />;
      case 3:
        return <Email />;
      case 4:
        return <PhoneNumber />;
      case 5:
        return <Password />;
    }
  };

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
        <Text style={styles.welcomeTitle}>First time here?</Text>
        <Text style={styles.welcomeSubtitle}>Lets create your account!</Text>
      </View>
      <View>{selectedTab()}</View>
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
    width: 60,
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
