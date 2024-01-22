import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Sample user data for testing
const sample = {
  userName: "rajeev.gupta",
  password: "changed@@123",
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const defaultLogo = require("../assets/logo.jpg");

  // State variables
  const [password, setPassword] = useState("");
  const [name, setName] = useState();
  const [token, setToken] = useState();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [eKey, setEKey] = useState();

  // Function to save token in AsyncStorage
  const saveKey = async (key) => {
    try {
      await AsyncStorage.setItem("token", key);
      navigation.navigate("Employee Attendance");
      console.log("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Function to save HR user ID in AsyncStorage
  const saveHrUserId = async (key) => {
    try {
      await AsyncStorage.setItem("hRuserId", `${key}`);
      Alert.alert("Login Successful!");
      console.log("hRuserId Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Function to retrieve data from AsyncStorage
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("eKey");
      if (value !== null) {
        setEKey(value);
        console.log("Data retrieved successfully:", value);
      } else {
        console.log("No data found with the specified key.");
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  // useEffect hook to save token in AsyncStorage when it changes
  useEffect(() => {
    if (token) {
      saveKey(token);
    }
  }, [token]);

  // useEffect hook to retrieve data from AsyncStorage on component mount
  useEffect(() => {
    getData();
  }, []);

  // Function to send login data to the server
  const postData = async () => {
    try {
      const response = await axios.post(
        `https://erplead.remserp.com/api/v1/login?=${eKey}`,
        {
          userName: "rajeev.gupta",
          password: "changed@@123",
          deviceType: "string",
          fcmToken: "string",
          ipAddress: "string",
          location: "string",
        },
        {
          headers: {
            "Content-Type": "application/json",
            ekey: eKey,
          },
        }
      );

      // If login is successful, update state and save HR user ID
      if (response) {
        console.log("User Details:", response.data.data?.userDetails);
        setToken(response?.data?.data?.token);
        saveHrUserId(response?.data?.data?.userDetails?.hRuserId);
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("POST Error:", error);
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (eKey) {
      postData();
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.logo} source={defaultLogo} />
      </View>
      <View style={styles.formView}>
        <Text style={styles.heading}>Login</Text>

        <TextInput
          style={styles.input}
          onChange={(text) => setName(text)}
          label="Username"
          value={sample.userName}
          left={
            <TextInput.Icon
              style={{ marginRight: 20 }}
              size={22}
              icon="account-outline"
            />
          }
        />

        <TextInput
          label="Password"
          style={styles.input}
          secureTextEntry={!isPasswordVisible}
          value={sample.password}
          onChangeText={(text) => setPassword(text)}
          left={
            <TextInput.Icon
              style={{ marginRight: 20 }}
              size={22}
              icon="lock-outline"
            />
          }
          right={
            <TextInput.Icon
              name={() => (
                <Icon
                  name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                  size={24}
                  color="#000"
                />
              )}
              onPress={togglePasswordVisibility}
            />
          }
        />
        <TouchableOpacity onPress={handleSubmit}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>Powered By : 4QT</Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
  logo: {
    width: 130,
    height: 120,
    marginTop: 170,
    alignSelf: "center",
    marginBottom: 40,
  },
  formView: {
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1.5,
    width: "90%",
    height: "28%",
    alignSelf: "center",
    marginTop: 50,
  },
  heading: {
    fontSize: 19,
    fontWeight: "500",
    marginBottom: 20,
    color: "#000",
    textAlign: "center",
    marginTop: 20,
  },
  input: {
    width: "90%",
    height: 40,
    marginBottom: 10,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingLeft: 10,
  },
  button: {
    width: "90%",
    height: 37,
    borderRadius: 8,
    alignSelf: "center",
    backgroundColor: "#000",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    padding: 9,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 40,
  },
  bottomText: {
    fontSize: 18,
    textAlign: "center",
    color: "grey",
  },
});
