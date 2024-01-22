import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import MonthlyTimeinOutDetails from "../component/MonthlyTimeinOutDetails";

const MonthDetailList = () => {
  // Extracting route parameters
  const route = useRoute();
  const { selectedYear, selectedMonth } = route.params || {};

  // State variables
  const [token, setToken] = useState();
  const [hrUserId, setHrUserId] = useState();
  const [monthlyData, setMonthlyData] = useState([]);

  // Function to get data from AsyncStorage
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

  // Fetch data on component mount
  useEffect(() => {
    getData("token");
    getData("hRuserId");
  }, []);
  console.log("################", hrUserId, token, selectedMonth, selectedYear);
  // Function to post data to the server
  const postData = async () => {
    try {
      const response = await axios.post(
        "https://erplead.remserp.com/api/con1/HR/GetAttendenceReport",
        {
          hRuserId: hrUserId,
          month: selectedMonth,
          year: selectedYear,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            // Add other headers as needed
          },
        }
      );

      if (response) {
        setMonthlyData(response?.data?.data?.attendenceList);
      }

      console.log(
        "POST Response:1111111",
        response?.data?.data?.attendenceList
      );
    } catch (error) {
      console.error("POST Error:", error);
    }
  };

  // Fetch data when the token changes
  useEffect(() => {
    if (token && hrUserId && selectedMonth && selectedYear) {
      postData();
    }
  }, [token, hrUserId, selectedMonth, selectedYear]);

  // Render MonthlyTimeinOutDetails component with monthly data
  return (
    <View style={{ width: "96%", alignSelf: "center" }}>
      {monthlyData && <MonthlyTimeinOutDetails monthlyData={monthlyData} />}
    </View>
  );
};

export default MonthDetailList;

const styles = StyleSheet.create({});
