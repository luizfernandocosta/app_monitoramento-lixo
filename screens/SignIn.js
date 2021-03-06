import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator
} from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import axios from "axios";
import aws4, { sign } from "react-native-aws4";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

export default function App({ navigation }) {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignIn = async () => {

    setIsLoading(true);

    let request = {
      method: 'POST',
      host: process.env.AMAZON_API_HOST,
      path: process.env.AMAZON_API_AUTH_PATH,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
      url: process.env.AMAZON_API_URL,
      data: {
        email: email,
        password: password
      }
    }
    
    let signedRequest = aws4.sign(request,{
      accessKeyId: process.env.AMAZON_API_ACCESS_KEY_ID,
      secretAccessKey: process.env.AMAZON_API_SECRET_ACCESS_KEY
    });

    await axios(signedRequest)
    .then(response => {
      console.log(response.data)
      setIsLoading(false)
      switch (response.data)
      {
        case "auth/invalid-email":
          Alert.alert("Email inválido", "Por favor, insira um email válido.");
          break;
        case "auth/user-disabled":
          Alert.alert("Usuário desabilitado", "Por favor, contate o administrador do sistema.");
          break;
        case "auth/user-not-found":
          Alert.alert("Usuário não encontrado", "Por favor, verifique os dados e tente novamente.");
          break;
        case "auth/wrong-password":
          Alert.alert("Senha incorreta", "Por favor, verifique os dados e tente novamente.");
          break;
        case "auth/missing-email":
          Alert.alert("Email não informado", "Por favor, verifique os dados e tente novamente.");
          break;
        case "auth/missing-password":
          Alert.alert("Senha não informada", "Por favor, verifique os dados e tente novamente.");
          break;
        case "auth/internal-error":
          Alert.alert("Erro interno", "Por favor, tente novamente mais tarde.");
          break;
        default:
          navigation.navigate("Tab", {
            screen: "Dash",
            params: {
              screen: "Sensor",
              response: response.data
            }
          });
          break;          
      }
    })
    .catch(error => {
      Alert.alert("Erro", "Por favor, verifique os dados e tente novamente.");
    });
  }

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
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
        />
        <TextInput
          style={[{ marginTop: 20 }, styles.input]}
          placeholder="Password"
          placeholderTextColor={"#918F8C"}
          secureTextEntry={true}
          selectionColor="#1a1b1f"
          value={password}
          onChangeText={text => setPassword(text)}
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
        <TouchableOpacity 
        style={[{ flexDirection: 'row'},styles.button]} 
        activeOpacity={0.8}
        onPress={handleSignIn}
        >

        { !isLoading ? 
          (<View
            style={{
              width: '100%',
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={[{alignSelf: 'center'},styles.buttonText]}>Sign In</Text>
            
          </View>
             
         ) : 
          <ActivityIndicator size="large" color="#F6F8FF" /> 
         }
        </TouchableOpacity>
        <View style={styles.buttonRegister}>
          <Text style={styles.buttonInfo}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text
              style={[
                { marginLeft: 2, fontFamily: "Inter-SemiBold" },
                styles.buttonInfo,
              ]}
            >
              Register here!
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRegister}>
          <Text style={styles.buttonInfo}>Forgot password?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text
              style={[
                { marginLeft: 2, fontFamily: "Inter-SemiBold" },
                styles.buttonInfo,
              ]}
            >
              Click here!
            </Text>
          </TouchableOpacity>
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
