import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// aws stuff
import Amplify from "aws-amplify";
import awsconfig from "./src/aws-exports";
Amplify.configure(awsconfig);

// screens
import Restaurant from "./src/screens/restaurant";
import HomeScreen from "./src/screens/Home";
import UserScreen from "./src/screens/Customer";
import Signup from "./src/screens/Auth/Signup";
import RestaurantList from "./src/screens/Customer/RestaurantList";
import ViewRes from "./src/screens/Customer/ViewRes";
import Login from "./src/components/Auth/Login";
import Portal from "./src/screens/Portal";
import Verify from "./src/screens/Auth/Verify";
import RestaurantAdd from "./src/screens/Restaurant/RestaurantAdd";
import Cart from "./src/screens/Customer/Cart";
import ViewItem from "./src/screens/ViewRes";
import Orders from "./src/screens/Customer/Order";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerLeft: () => null,
            headerStyle: {
              backgroundColor: "#fecaca",
            },
            title: "Online Food Ordering App",
          }}
        />
        {/* add new screens here */}
        <Stack.Screen
          name="Portal"
          component={Portal}
          options={{
            headerLeft: (props) => null,
            headerStyle: {
              backgroundColor: "#fecaca",
            },
            title: "User Portal",
          }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Customer" component={UserScreen} />
        <Stack.Screen name="Restaurant" component={Restaurant} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen
          name="List"
          component={RestaurantList}
          options={{
            headerStyle: { backgroundColor: "#fecaca" },
            title: "Available Restaurants",
          }}
        />
        <Stack.Screen
          name="View"
          component={ViewRes}
          options={{
            headerStyle: { backgroundColor: "#fecaca" },
            title: "Menu Items",
          }}
        />
        <Stack.Screen name="ViewItem" component={ViewItem} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen
          name="RestaurantAdd"
          component={RestaurantAdd}
          options={{
            headerStyle: { backgroundColor: "#fecaca" },
            title: "Add the Information",
          }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            headerStyle: { backgroundColor: "#fecaca" },
          }}
        />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{
            headerStyle: { backgroundColor: "#fecaca" },
            title: "Your Orders",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
