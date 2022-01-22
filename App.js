import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// aws stuff
import Amplify from "aws-amplify";
import awsconfig from "./src/aws-exports";
Amplify.configure(awsconfig);
// import { withAuthenticator } from "aws-amplify-react-native";

// screens
import Restaurant from "./src/screens/restaurant";
import HomeScreen from "./src/screens/Home";
import UserScreen from "./src/screens/User";
import Signup from "./src/screens/Signup";
import RestaurantList from "./src/screens/Customer/RestaurantList";
import ViewRes from "./src/screens/Customer/ViewRes";
import Login from "./src/components/Login";
import Portal from "./src/screens/Portal";

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
        <Stack.Screen name="Portal" component={Portal} />
        <Stack.Screen name="Login" component={Login} />
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
