import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/home-image.png')}
      />
      <View style={styles.textView}>
        <Text style={styles.title}>
          Intelligent can monitoring.
        </Text>
        <View style={{width: 268}}>
        <Text style={styles.subtitle}>Monitor your trash cans in 
your envinroment and know 
when to take action</Text>
        </View>

      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity 
        style={[{backgroundColor: '#161518'},styles.button]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('SignIn')}
        >
            <Text style={styles.buttonText}>
                Sign in
            </Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={[{backgroundColor: "#6E45B7"},styles.button]}
        activeOpacity={0.8}
        >
            <Text style={styles.buttonText}>
                Register
            </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto"  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FF',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%',
  },
  textView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    textAlign: 'center',
    width: '100%',
  },
  button: {
    width: 150,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  buttonText: {
    fontSize: 20,
    color: '#F6F8FF',
    fontFamily: "Inter-SemiBold"
  }
});
