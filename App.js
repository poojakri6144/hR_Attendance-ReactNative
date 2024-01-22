import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Importing screen components
import KeyLogin from "./auth/KeyLogin";
import LoginScreen from "./auth/LoginScreen";
import EmployeeDetail from "./screen/EmployeeDetail";
import MonthDetailList from "./screen/MonthDetailList";

// Creating a stack navigator
const Stack = createStackNavigator();

// Main App component
const App = () => {
  return (
    <NavigationContainer>
      {/* Stack navigator for managing screens */}
      <Stack.Navigator initialRouteName="Client Login">
        {/* Screen for client login */}
        <Stack.Screen name="Client Login" component={KeyLogin} />

        {/* Screen for general login */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Screen for employee attendance details */}
        <Stack.Screen name="Employee Attendance" component={EmployeeDetail} />

        {/* Screen for the list of employee attendance */}
        <Stack.Screen
          name="Employee Attendance List"
          component={MonthDetailList}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
