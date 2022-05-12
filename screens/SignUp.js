import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { SignUpInput } from "../components/SignUpInput";
import axios from "axios";
import aws4, { sign } from "react-native-aws4";
import { faUser, faAt, faKey } from "@fortawesome/free-solid-svg-icons";

export default function App({ navigation }) {
  // Creating state for view select
  const [selectTab, setSelectTab] = React.useState(1);

  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignUp = async () => {
    setIsLoading(true);

    let request = {
      method: "POST",
      host: process.env.AMAZON_API_HOST,
      path: process.env.AMAZON_API_CREATE_PATH,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: `${name} ${lastName}`,
      }),
      url: process.env.AMAZON_API_CREATE_URL,
      data: {
        email: email,
        password: password,
        name: `${name} ${lastName}`,
      },
    };

    let signedRequest = aws4.sign(request, {
      accessKeyId: process.env.AMAZON_API_CREATE_ACCESS_KEY_ID,
      secretAccessKey: process.env.AMAZON_API_CREATE_SECRET_ACCESS_KEY,
    });

    await axios(signedRequest)
      .then((response) => {
        setIsLoading(false);
        switch (response.data) {
          case "auth/email-already-in-use":
            Alert.alert("Email em uso", "Este e-mail já está em uso!");
            break;
          default:
            navigation.navigate("Tab", {
              screen: "Dash",
              params: {
                screen: "Sensor",
                response: response.data,
              },
            });
            break;
        }
      })
      .catch((error) => {
        Alert.alert("Erro", "Por favor, verifique os dados e tente novamente.");
      });
  };

  const moveToPreviousPage = () => {
    setSelectTab(selectTab - 1);
  };

  const moveToNextPage = () => {
    setSelectTab(selectTab + 1);
  };

  // Switch for switch between views
  const selectedTab = () => {
    switch (selectTab) {
      case 1:
        return (
          <SignUpInput
            moveToNextPage={moveToNextPage}
            selectTab={selectTab}
            currentValue={name}
            setValue={setName}
            description="Lets start with your name!"
            placeholder="First name"
            regex={/[a-zA-Z]{3,}/g}
            autoCapitalize="words"
            secureTextEntry={false}
            errorMessage="Names should have characters only!"
            icon={faUser}
          />
        );
      case 2:
        return (
          <SignUpInput
            moveToPreviousPage={moveToPreviousPage}
            selectTab={selectTab}
            moveToNextPage={moveToNextPage}
            currentValue={lastName}
            setValue={setLastName}
            description="Now your last name! (this one is optional)"
            placeholder="Last name"
            autoCapitalize="words"
            secureTextEntry={false}
            regex={/[a-zA-Z]{3,}/g}
            errorMessage="Names should have characters only!"
            icon={faUser}
          />
        );
      case 3:
        return (
          <SignUpInput
            moveToPreviousPage={moveToPreviousPage}
            selectTab={selectTab}
            moveToNextPage={moveToNextPage}
            currentValue={email}
            setValue={setEmail}
            description="Now insert your e-mail!"
            placeholder="E-mail"
            autoCapitalize="none"
            secureTextEntry={false}
            regex={
              /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
            }
            errorMessage="Please, insert a valid e-mail!"
            icon={faAt}
          />
        );
      case 4:
        return (
          <SignUpInput
            moveToPreviousPage={moveToPreviousPage}
            selectTab={selectTab}
            moveToNextPage={moveToNextPage}
            currentValue={password}
            setValue={setPassword}
            description="Now insert a secure password!"
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            regex={/[a-zA-Z0-9]{8,}/g}
            errorMessage="Password should have at least 8 characters!"
            isLoading={isLoading}
            icon={faKey}
          />
        );
      case 5:
        return (
          <SignUpInput
            moveToPreviousPage={moveToPreviousPage}
            selectTab={selectTab}
            moveToNextPage={moveToNextPage}
            currentValue={confirmPassword}
            setValue={setConfirmPassword}
            password={password}
            description="Now confirm your password!"
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            lastStep={true}
            handleSignUp={handleSignUp}
            regex={/[a-zA-Z0-9]{8,}/g}
            errorMessage="Passwords do not match!"
            isLoading={isLoading}
            icon={faKey}
          />
        );
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
      {selectedTab()}
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
