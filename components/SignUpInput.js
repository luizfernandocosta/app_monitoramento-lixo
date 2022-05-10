import * as React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from "react-native";

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
  isLoading
}) {


  const [borderColor, setBorderColor] = React.useState("#F6F8FF");
  const [borderWidth, setBorderWidth] = React.useState(1);

  const [error, setError] = React.useState(false);

  const validateInput = (input) => {

    if (regex.test(input))
    {
      setBorderColor("#00A376");
      setBorderWidth(1);
      setValue(input)
      setError(false)
      return true;
    }
    else
    {
      setBorderColor("#A32400");
      setBorderWidth(1);
      setValue(input)
      setError(true);
      return false;
    }
  }

  return (
    <View>
      <Text styles={{ fontFamily: "Inter-Regular" }}>{description}</Text>
      <TextInput
        style={[
          {
            marginTop: 5,
            borderColor: borderColor,
            borderWidth: borderWidth,
          },
          styles.input,
        ]}
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        placeholderTextColor={"#918F8C"}
        selectionColor="#1a1b1f"
        autoCapitalize={autoCapitalize}
        onChangeText={(text) => validateInput(text)}
        value={currentValue}
        defaultValue={currentValue}
        secureTextEntry={secureTextEntry}
      />
      <Text styles={{ fontFamily: "Inter-Regular" }}>{error && errorMessage}</Text>
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
              
              if (validateInput(currentValue))
              {
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
            onPress={handleSignUp}
          >
            <Text style={styles.buttonText}>{ !isLoading ? "Create account!" : <ActivityIndicator size="large" color="#F6F8FF" /> }</Text>
          </TouchableOpacity>
        )}
      </View>
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
