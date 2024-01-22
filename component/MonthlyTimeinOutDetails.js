import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Collapsible from "react-native-collapsible";

const MonthlyTimeinOutDetails = ({ monthlyData }) => {
  const [isCollapsed, setIsCollapsed] = useState([]);

  const toggleCollapse = (index) => {
    console.log("<<<<<<<1111111", isCollapsed);
    let collapse = isCollapsed;
    collapse[index] = true;
    console.log("<<<<<<<2222", collapse);

    setIsCollapsed(collapse);
  };

  useEffect(() => {
    if (monthlyData) {
      let collpseLength = monthlyData.map((e, index) => false);
      setIsCollapsed(collpseLength);
    }
  }, [monthlyData]);

  const renderTimeDetails = (month, title, time, photo, location, remarks) => (
    <View style={{ width: "49%", marginTop: 20 }}>
      <Text
        style={{
          textAlign: "center",
          margin: 5,
          marginBottom: -8,
          color: title === "Time in" ? "#4aa6e8" : "red",
          fontWeight: "500",
        }}
      >
        {title}:{time}
      </Text>
      <View style={{ borderColor: "#ccc", width: "95%", alignSelf: "center" }}>
        <Image
          source={{ uri: photo }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 3,
            alignSelf: "center",
            margin: 20,
          }}
        />
        <Text style={{ textAlign: "center", fontWeight: "500", marginTop: -5 }}>
          {`${title} Location`}
        </Text>
        <Text style={{ color: "grey", textAlign: "center" }}>{location}</Text>
        <Text style={{ textAlign: "center", fontWeight: "500", marginTop: 5 }}>
          Remarks
        </Text>
        <Text style={{ color: "grey", textAlign: "center", marginBottom: 15 }}>
          {remarks}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {monthlyData?.map((month, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{`Date:${month?.loginDate}`}</Text>
              <View style={styles.timeCompletedContainer}>
                <Text style={styles.timeCompletedText}>
                  Time Completed:
                  <Text style={{ color: "#000" }}>
                    {` ${month?.workingTimeCompleted} `}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.detailsContainer}>
              {renderTimeDetails(
                month,
                "Time in",
                month?.loginTime,
                month?.loginPhoto,
                month?.loginLocation,
                month?.loginRemarks
              )}
              <View style={styles.verticalSeparator} />
              {renderTimeDetails(
                month,
                "Time out",
                month?.logoutTime,
                month?.logoutPhoto,
                month?.logoutLocation,
                month?.logoutRemarks
              )}
            </View>
          </View>
        ))}
      </ScrollView>
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
    height: "100%",
    alignSelf: "center",
    marginBottom: 10,
  },
  dateContainer: {
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
    borderColor: "#fff",
    margin: 2,
  },
  timeCompletedText: {
    marginRight: 10,
    color: "#4aa6e8",
    fontWeight: "400",
  },
  separator: {
    height: 0.8,
    width: "100%",
    backgroundColor: "#e9ecf2",
    marginTop: 2,
    marginBottom: 2,
  },
  detailsContainer: {
    flexDirection: "row",
    borderRadius: 5,
    shadowOpacity: 0.2,
    borderWidth: 0.5,
    width: "95%",
    alignSelf: "center",
    borderColor: "#ccc",
    marginTop: 5,
  },
  verticalSeparator: {
    backgroundColor: "#ccc",
    width: 0.6,
    height: 160,
    marginTop: 10,
  },
});

export default MonthlyTimeinOutDetails;
