import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Picker from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";

// Constants
const monthNames = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

// Header Component
const Header = () => {
  // Hooks
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthsData, setMonthsData] = useState([]);

  // Toggle modal visibility
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // Generate a list of month names based on the selected year
  useEffect(() => {
    const currentMonthIndex = new Date().getMonth(); // 0-based index
    const monthsList = Array.from(
      {
        length:
          selectedYear == new Date().getFullYear() ? currentMonthIndex + 1 : 12,
      },
      (_, index) => ({
        month: getMonthName(index),
      })
    );

    setMonthsData(monthsList);
  }, [selectedYear]);

  // Get the month name based on the index
  const getMonthName = (index) => {
    return monthNames[index];
  };

  // Generate year options for the Picker
  const yearOptions = Array.from(
    { length: new Date().getFullYear() - 2000 + 1 },
    (_, index) => ({
      label: `${2000 + index}`,
      value: `${2000 + index}`,
    })
  );

  // Handle click on a month item
  const handleClick = (year, index) => {
    setSelectedMonth(index + 1); // Month index is 0-based, so add 1
    toggleModal(); // Close the modal

    // Navigate to another component with the selected year and month
    navigation.navigate("Employee Attendance List", {
      selectedYear,
      selectedMonth: index + 1,
    });
  };

  // JSX
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.heading}> Employee Attendance </Text>

        <TouchableOpacity onPress={toggleModal}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="dots-vertical-circle"
            size={38}
            color={"#a6cff7"}
          />
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <AntDesign name="bars" color={"grey"} size={20} />
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 15,
                    color: "#000",
                    fontWeight: "500",
                  }}
                >
                  Employee Attendance List
                </Text>
              </View>
              <TouchableOpacity onPress={toggleModal}>
                <AntDesign name="close" color={"red"} size={22} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "105%",
                alignSelf: "center",
                height: 1,
                backgroundColor: "#ccc",
                marginBottom: 20,
                marginTop: 10,
              }}
            />
            <Text style={{ marginBottom: 5, fontWeight: "500", fontSize: 15 }}>
              Select an Year to see the Attendance list
            </Text>
            {/* Year Picker */}
            <Picker
              items={yearOptions}
              onValueChange={(value) => setSelectedYear(value)}
              value={selectedYear}
              style={pickerSelectStyles}
              placeholder={{ label: "Select an Year" }}
              Icon={() => {
                return (
                  <AntDesign
                    style={{ marginTop: 15, marginRight: 5 }}
                    name="down"
                    size={22}
                    color="blue" // Customize the icon color
                  />
                );
              }}
            />

            {/* List of Months */}
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
              <Text
                style={{ marginRight: 25, color: "grey", fontWeight: "500" }}
              >
                Sr.No.
              </Text>
              <Text style={{ color: "grey", fontWeight: "500" }}>
                Month, Year
              </Text>
            </View>
            <FlatList
              data={monthsData}
              keyExtractor={(item, index) => `${item.month}-${index}`}
              renderItem={({ item, index }) => (
                <View style={styles.monthItem}>
                  <TouchableOpacity
                    onPress={(e) => handleClick(selectedYear, index)}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <Text style={{ marginRight: 30 }}>{index + 1}</Text>
                        <Text style={{ marginLeft: 22 }}>
                          {item.month}, {selectedYear}
                        </Text>
                      </View>
                      <AntDesign
                        name="right"
                        size={16}
                        color="grey"
                        style={{ marginLeft: 10 }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default Header;
const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 15,
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
  },
  icon: {
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    // bottom: 200,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    // height: 700,
    width: "96%",
  },
  closeButton: {
    marginTop: 10,
    color: "blue",
    textAlign: "center",
  },
  monthItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "#000",
    paddingRight: 30,
    marginBottom: 10,
    backgroundColor: "#ccc",
  },
  inputAndroid: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "#000",
    paddingRight: 30,
    marginBottom: 10,
  },
});
