import * as React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// View for FirstName
export function SignUpInput({
  selectTab,
  moveToPreviousPage,
  moveToNextPage,
  currentValue,
  setValue,
  description,
  placeholder,
  regex,
  autoCapitalize,
  secureTextEntry,
  lastStep,
  handleSignUp,
  errorMessage,
  isLoading,
  icon,
  password
}) {
  const [borderColor, setBorderColor] = React.useState("#F6F8FF");
  const [borderWidth, setBorderWidth] = React.useState(1);

  const [error, setError] = React.useState(false);

  const [passwordVisible, setPasswordVisible] = React.useState(true);

  const [passwordIcon, setPasswordIcon] = React.useState(faEye);

  const validateInput = (input) => {
    if (regex.test(input)) {
      setBorderColor("#00A376");
      setBorderWidth(1);
      setValue(input);
      setError(false);
      return true;
    } else {
      setBorderColor("#A32400");
      setBorderWidth(1);
      setValue(input);
      setError(true);
      return false;
    }
  };

  const validatePassword = (input) => {
    if (input === password) {
      setBorderColor("#00A376");
      setBorderWidth(1);
      setError(false);
      setValue(input)
      return true;
    } else {
      setBorderColor("#A32400");
      setBorderWidth(1);
      setError(true);
      setValue(input);
      return false;
    }
  }

  return (
    <View>
      <Text styles={{ fontFamily: "Inter-Regular" }}>{description}</Text>
      <View
        style={[
          {
            borderColor: borderColor,
            borderWidth: borderWidth,
          },
          styles.inputView,
        ]}
      >
        <TextInput
          style={[{}, styles.input]}
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          placeholderTextColor={"#918F8C"}
          selectionColor="#1a1b1f"
          autoCapitalize={autoCapitalize}
          onChangeText={(text) => lastStep ? validatePassword(text) : validateInput(text)}
          value={currentValue}
          defaultValue={currentValue}
          secureTextEntry={secureTextEntry ? passwordVisible : secureTextEntry}
        />
        {!secureTextEntry ? (
          <FontAwesomeIcon icon={icon} size={25} color="#161518" />
        ) : (
          <Pressable
            onPressIn={() => {
              setPasswordIcon(faEyeSlash);
              setPasswordVisible(false);
            }}
            onPressOut={() => {
              setPasswordIcon(faEye);
              setPasswordVisible(true);
            }}
          >
            <FontAwesomeIcon icon={passwordIcon} size={25} color="#161518" />
          </Pressable>
        )}
      </View>
      <Text styles={{ fontFamily: "Inter-Regular" }}>
        {error && errorMessage}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: selectTab > 1 ? "space-between" : "flex-end",
        }}
      >
        {selectTab > 1 && (
          <TouchableOpacity
            style={[{ backgroundColor: "#6E45B7" }, styles.button]}
            activeOpacity={0.8}
            onPress={() => {
              moveToPreviousPage();
            }}
          >
            <Text style={styles.buttonText}>{"<"}</Text>
          </TouchableOpacity>
        )}

        {!lastStep && (
          <TouchableOpacity
            style={[{ backgroundColor: "#6E45B7" }, styles.button]}
            activeOpacity={0.8}
            disabled={error}
            onPress={() => {
              if (validateInput(currentValue)) {
                moveToNextPage();
                setBorderColor("transparent");
              }
            }}
          >
            <Text style={styles.buttonText}>{">"}</Text>
          </TouchableOpacity>
        )}

        {lastStep && (
          <TouchableOpacity
            style={[{ backgroundColor: "#6E45B7" }, styles.buttonRegister]}
            activeOpacity={0.8}
            disabled={error}
            onPress={() => {
              if (validatePassword(currentValue)) {
                handleSignUp();
                setBorderColor("transparent");
              }
            }}
          >
            <Text style={styles.buttonText}>
              {!isLoading ? (
                "Create account!"
              ) : (
                <ActivityIndicator size="large" color="#F6F8FF" />
              )}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// StyleSheet for component
const styles = StyleSheet.create({
  inputView: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: 300,
    height: 60,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    borderRadius: 10,
  },
  input: {
    width: "80%",
    padding: 10,
    fontFamily: "Inter-Regular",
    color: "#161518",
    borderRadius: 10,
  },
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
