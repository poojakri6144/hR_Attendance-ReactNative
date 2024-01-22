import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

// Detail component receives userData as a prop
const Detail = ({ userData }) => {
  // State to manage data sections and additional data sections
  const [dataSections, setDataSections] = useState();
  const [additionalDataSections, setAdditionalDataSections] = useState();

  // Logging employee details from userData
  console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^", userData?.empDetails);

  // useEffect to update dataSections and additionalDataSections when userData changes
  useEffect(() => {
    if (userData && userData?.empDetails) {
      const { empDetails } = userData;

      // Updating dataSections with basic employee details
      setDataSections([
        { title: "Employee Name", value: empDetails?.employeeName },
        { title: "Department", value: empDetails?.employeeDept },
        { title: "Location", value: empDetails?.employeeAddress },
        { title: "Batch Timing", value: empDetails?.batchTiming },
      ]);

      // Updating additionalDataSections with more details
      setAdditionalDataSections([
        { title: "Date", value: empDetails?.currentDateTime },
        { title: "Designation", value: empDetails?.employeeDesignation },
        { title: "Employee Code", value: empDetails?.employeeCode },
        { title: "Total Time", value: empDetails?.totalTime },
      ]);
    }
  }, [userData]);

  // Function to render a section of data
  const renderSection = (sections) => (
    <View>
      {sections.map((section, index) => (
        <View style={styles.itemContainer} key={index}>
          <Text style={styles.title}>{section.title}</Text>
          <Text style={styles.value}>{section.value}</Text>
        </View>
      ))}
    </View>
  );

  // Logging dataSections and additionalDataSections
  console.log("SSSSSSS", dataSections);
  console.log("SSSSSSS2222222", additionalDataSections);

  // Render the component
  return (
    <View style={styles.container}>
      {dataSections && renderSection(dataSections)}
      {additionalDataSections && renderSection(additionalDataSections)}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    width: "95%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "#fff",
    backgroundColor: "#fff",
    shadowOpacity: 0.1,
  },
  itemContainer: {
    padding: 7,
    marginLeft: -20,
  },
  title: {
    fontWeight: "500",
    fontSize: 13,
  },
  value: {
    fontSize: 12,
    color: "grey",
    marginTop: 4,
    fontWeight: "500",
  },
});

// Exporting the Detail component as the default export
export default Detail;
