import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const KeyLogin = () => {
  const navigation = useNavigation();

  // State variables
  const [logo, setLogo] = useState("");
  const [eKey, setEkey] = useState("");
  const [mKey, setMkey] = useState("4QT@M");
  const defaultLogo = require("../assets/logo.jpg");

  // Function to fetch eKey from the API
  const getEkey = async () => {
    try {
      const response = await axios.get(
        `https://erplead.remserp.com/api/v1/validatekey?mKey=${mKey}`
      );
      setEkey(response?.data?.data?.ekey);
      setLogo(response?.data?.data?.logo);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    if (eKey) {
      saveKey(eKey);
    }
  }, [eKey]);

  // Function to save the key to AsyncStorage
  const saveKey = async (key) => {
    try {
      if (key) {
        // Check if key is not null or undefined
        await AsyncStorage.setItem("eKey", key);
        console.log("Data saved successfully!");
      } else {
        console.log("Key is null or undefined. No data saved.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      await getEkey(); // Wait for the eKey to be fetched
      Alert.alert("Client login Successful!");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={defaultLogo} // Use default logo if logo is not available
        />
      </View>
      <View style={styles.formView}>
        <Text style={styles.heading}>Login with key for Client</Text>

        <TextInput
          style={styles.input}
          value={mKey}
          disabled={true}
          left={
            <TextInput.Icon
              style={{ marginRight: 20 }}
              size={22}
              icon="lock-outline"
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

export default KeyLogin;
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
    height: "23%",
    alignSelf: "center",
    marginTop: 50,
  },
  heading: {
    fontSize: 19,
    fontWeight: "500",
    marginBottom: 30,
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
