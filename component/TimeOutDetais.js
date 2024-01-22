import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";

// TimeOutDetails component receives timeInImage and timeOutImage as props
const TimeOutDetails = ({ timeInImage, timeOutImage, timeData, userData }) => {
  console.log("PPPPPPPPPPPPPP", userData);
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.dateText}>
          Date: {userData?.loginDetails?.logDate}{" "}
        </Text>
        <View style={styles.timeCompletedContainer}>
          <Text style={styles.timeCompletedText}>
            Time Completed:
            <Text style={styles.timeText}>
              {userData?.loginDetails?.workingTimeCompleted}
            </Text>
          </Text>
        </View>
      </View>

      {/* Divider Line */}
      <View style={styles.divider} />

      {/* Time In and Time Out Sections */}
      <View style={styles.timeInOutContainer}>
        {/* Time In Section */}
        <View style={styles.timeSection}>
          <Text style={styles.timeInSectionTitle}>
            Time in: {userData?.loginDetails?.loginTime}
          </Text>
          <View style={styles.imageContainer}>
            <Image source={{ uri: timeInImage }} style={styles.imageStyle} />
            <Text style={styles.locationText}>Time in Location</Text>
            <Text style={styles.grayText}>
              {userData?.loginDetails?.loginLocation}
            </Text>
            <Text style={styles.remarksText}>Remarks</Text>
            <Text style={styles.grayText}>
              {userData?.loginDetails?.loginRemarks}
            </Text>
          </View>
        </View>

        {/* Divider Line */}
        <View style={styles.verticalDivider} />

        {/* Time Out Section */}
        <View style={styles.timeSection}>
          <Text style={styles.timeOutSectionTitle}>
            Time out: {userData?.loginDetails?.logoutTime}
          </Text>
          <View style={styles.imageContainer}>
            <Image source={{ uri: timeOutImage }} style={styles.imageStyle} />
            <Text style={styles.locationText}>Time out Location</Text>
            <Text style={styles.grayText}>
              {userData?.loginDetails?.logoutLocation}
            </Text>
            <Text style={styles.remarksText}>Remarks</Text>
            <Text style={styles.grayText}>
              {userData?.loginDetails?.logoutRemarks}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderRadius: 5,
    width: "92%",
    marginTop: 10,
    backgroundColor: "#fff",
    shadowOpacity: 0.1,
    borderColor: "#fff",
    height: 235,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#e6eef7",
  },
  dateText: {
    marginLeft: 10,
  },
  timeCompletedContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 3,
    backgroundColor: "#fff",
    margin: 2,
  },
  timeCompletedText: {
    marginRight: 10,
    color: "#4aa6e8",
    fontWeight: "400",
  },
  timeText: {
    color: "#000",
  },
  divider: {
    height: 0.8,
    width: "100%",
    backgroundColor: "#e9ecf2",
    marginTop: 2,
    marginBottom: 2,
  },
  timeInOutContainer: {
    flexDirection: "row",
    borderRadius: 5,
    shadowOpacity: 0.2,
    borderWidth: 0.5,
    width: "95%",
    alignSelf: "center",
    borderColor: "#ccc",
    marginTop: 10,
    height: 180,
  },
  timeSection: {
    width: "49%",
  },
  timeInSectionTitle: {
    textAlign: "center",
    margin: 5,
    marginBottom: -8,
    fontWeight: "500",
    color: "blue",
    marginTop: -7,
  },
  timeOutSectionTitle: {
    textAlign: "center",
    margin: 5,
    marginBottom: -8,
    fontWeight: "500",
    color: "red",
    marginTop: -7,
  },
  imageContainer: {
    borderColor: "#ccc",
    width: "95%",
    alignSelf: "center",
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 3,
    alignSelf: "center",
    margin: 20,
  },
  locationText: {
    textAlign: "center",
    fontWeight: "500",
    marginTop: -5,
  },
  grayText: {
    color: "grey",
    textAlign: "center",
  },
  remarksText: {
    textAlign: "center",
    fontWeight: "500",
    marginTop: 5,
  },
  verticalDivider: {
    backgroundColor: "#ccc",
    width: 0.6,
    height: 160,
    marginTop: 10,
  },
});

export default TimeOutDetails;
