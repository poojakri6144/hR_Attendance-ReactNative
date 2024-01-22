import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "@expo/vector-icons/Feather";
import TimeInDetails from "../component/TimeInDetails";
import Header from "../component/Header";
import Detail from "../component/Detail";
import TimeOutDetails from "../component/TimeOutDetais";

const EmployeeDetail = () => {
  // State variables
  const [timeInImage, setTimeInImage] = useState(null);
  const [timeOutImage, setTimeOutImage] = useState(null);
  const [componentType, setComponentType] = useState("time-in");
  const [userData, setUserData] = useState();
  const [token, setToken] = useState();
  const [hrUserId, setHrUserId] = useState();
  const [timeData, setTimeData] = useState();
  const [text, setText] = useState("");

  // Fetch data from AsyncStorage
  const getData = async (item) => {
    try {
      const value = await AsyncStorage.getItem(item);
      if (value !== null) {
        if (item === "token") {
          setToken(value);
        } else {
          setHrUserId(value);
        }
        console.log("Data retrieved successfully:", value);
      } else {
        console.log("No data found with the specified key.");
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };
  console.log("777777777", hrUserId, "|||||||", token);
  // Fetch user details on token change
  const postData = async () => {
    try {
      const response = await axios.post(
        "https://erplead.remserp.com/api/con1/HR/GetAttendenceDetails",
        {
          hRuserId: hrUserId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        setUserData(response?.data?.data);
        console.log("userr", response);
      }
      console.log("POST Response:3333333333", response.data);
    } catch (error) {
      console.error("POST Error:", error);
    }
  };

  // Save user details on componentType change
  const saveUserDetails = async () => {
    try {
      const response = await axios.post(
        "https://erplead.remserp.com/api/con1/HR/PostAttendence",
        {
          hRuserId: hrUserId,
          remarks: text,
          location: userData?.empDetails?.employeeAddress,
          photoFormat: "jpg",
          photo:
            componentType === "time-out"
              ? timeInImage
              : componentType === "both"
              ? timeOutImage
              : null,
          loginAction:
            componentType === "time-out"
              ? "in"
              : componentType === "both"
              ? "out"
              : null,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        console.log("4444444", response?.config);
        setTimeData(response?.config?.data);
      }
    } catch (error) {
      console.error("POST Error:", error);
    }
  };

  // Fetch data on initial render
  useEffect(() => {
    getData("token");
    getData("hRuserId");
  }, []);

  // Fetch user details on token change
  useEffect(() => {
    if (token && hrUserId) {
      postData();
    }
  }, [token, hrUserId]);

  // Save user details on componentType change
  useEffect(() => {
    if (componentType === "time-out" || componentType === "both") {
      saveUserDetails();
    }
  }, [componentType]);

  // Handle image upload
  const uploadImage = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });

      if (!result.canceled) {
        if (componentType === "time-in") {
          setComponentType("time-out");
          setTimeInImage(result.assets[0].uri);
        } else {
          setTimeOutImage(result.assets[0].uri);
          setComponentType("both");
        }
      }
    } catch (error) {
      Alert.alert("Error uploading image" + error.message);
    }
  };

  return (
    <View style={{ backgroundColor: "#e6eef7", height: "100%" }}>
      <Header />
      <View style={styles.detail}>
        <Detail userData={userData} />
      </View>
      {componentType == "time-in" || componentType == "time-out" ? (
        <>
          <Text style={styles.remarks}>Remarks</Text>
          <View style={styles.textareaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Write remarks here..."
              placeholderTextColor="#888"
              multiline
              numberOfLines={4}
              value={text}
              onChangeText={(newText) => setText(newText)}
            />
          </View>
        </>
      ) : (
        <></>
      )}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 15,
          marginBottom: 10,
        }}
      >
        {componentType !== "both" ? (
          <TouchableOpacity onPress={uploadImage}>
            <View style={styles.button}>
              <Feather
                style={{ marginTop: 10, marginLeft: 25 }}
                name="camera"
                color={"#fff"}
                size={17}
              />
              <Text style={styles.buttonText}>
                {componentType === "time-in"
                  ? `Time In`
                  : componentType === "time-out"
                  ? `Time Out`
                  : null}
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
        {console.log("NNNNNNNNN", timeData)}
        {componentType === "time-out" && (
          <TimeInDetails
            image={timeInImage}
            userData={userData}
            timeData={timeData}
          />
        )}
        {componentType === "both" && (
          <TimeOutDetails
            timeInImage={timeInImage}
            timeOutImage={timeOutImage}
            timeData={timeData}
            userData={userData}
          />
        )}
      </View>
    </View>
  );
};

export default EmployeeDetail;

const styles = StyleSheet.create({
  detail: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
  },
  remarks: {
    fontWeight: "600",
    fontSize: 13,
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 4,
  },
  textareaContainer: {
    width: "95%",
    backgroundColor: "#fff",
    alignSelf: "center",
    borderColor: "#fff",
    height: "8%",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#fff",
    shadowOpacity: 0.1,
  },
  textArea: {
    padding: 8,
    width: "100%",
    maxHeight: 150,
    textAlignVertical: "top",
  },
  button: {
    width: 130,
    height: 37,
    borderRadius: 8,
    alignSelf: "center",
    backgroundColor: "#000",
    marginTop: 10,
    flexDirection: "row",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    padding: 9,
  },
});
