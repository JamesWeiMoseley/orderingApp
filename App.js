import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Restaurant from "./src/screens/restaurant";
import HomeScreen from "./src/screens/Home";
import UserScreen from "./src/screens/User";
import Signup from "./src/screens/Signup";
import RestaurantList from "./src/screens/Customer/RestaurantList";
import ViewRes from "./src/screens/Customer/ViewRes";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Online Food Ordering App" }}
        />
        {/* add new screens here */}
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen name="Restaurant" component={Restaurant} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="List" component={RestaurantList} />
        <Stack.Screen name="View" component={ViewRes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
