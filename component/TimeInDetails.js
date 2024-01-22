import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const TimeInDetails = ({ image, userData, timeData }) => {
  console.log(timeData, "MMMMMMMM");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dateText}>
          Date: {userData?.loginDetails?.logDate}
        </Text>
        <View style={styles.timeCompletedContainer}>
          <Text style={styles.timeCompletedText}>Time Completed: </Text>
          <Text style={styles.timeText}>
            {userData?.loginDetails?.workingTimeCompleted}
          </Text>
        </View>
      </View>

      <View style={styles.separator} />

      <Text style={styles.timeInHeaderText}>
        Time in: {userData?.loginDetails?.loginTime}
      </Text>

      <View style={styles.locationContainer}>
        <Image
          // source={{ uri: userData?.loginDetails?.loginPhoto }}
          source={{ uri: image }}
          style={styles.image}
        />
        <Text style={styles.locationHeaderText}>Time in Location</Text>
        <Text style={styles.locationText}>
          {userData?.loginDetails?.loginLocation}
        </Text>
        <Text style={styles.remarksHeaderText}>Remarks</Text>
        <Text style={styles.remarksText}>
          {timeData?.loginDetails?.loginRemarks}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderRadius: 5,
    width: "92%",
    marginTop: 10,
    backgroundColor: "#fff",
    shadowOpacity: 0.1,
    borderColor: "#fff",
    height: 228,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#e6eef7",
    paddingHorizontal: 10,
  },
  dateText: {
    marginLeft: 10,
  },
  timeCompletedContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 3,
    backgroundColor: "#fff",
    borderColor: "#fff",
    margin: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  timeCompletedText: {
    marginRight: 10,
    color: "#4aa6e8",
    fontWeight: "400",
  },
  timeText: {
    color: "#000",
  },
  separator: {
    height: 0.8,
    width: "100%",
    backgroundColor: "#e9ecf2",
    marginVertical: 2,
  },
  timeInHeaderText: {
    textAlign: "center",
    margin: 5,
    marginBottom: -8,
    color: "#4aa6e8",
    fontWeight: "500",
  },
  locationContainer: {
    borderWidth: 0.5,
    borderColor: "#ccc",
    width: "95%",
    alignSelf: "center",
    borderRadius: 5,
    shadowOpacity: 0.3,
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 3,
    alignSelf: "center",
    margin: 20,
  },
  locationHeaderText: {
    textAlign: "center",
    fontWeight: "500",
    marginTop: -5,
  },
  locationText: {
    color: "grey",
    textAlign: "center",
  },
  remarksHeaderText: {
    textAlign: "center",
    fontWeight: "500",
    marginTop: 5,
  },
  remarksText: {
    color: "grey",
    textAlign: "center",
    marginBottom: 15,
  },
});

export default TimeInDetails;
