import React from "react";
import { View, Text, Button } from "react-native";

function HomeScreen(props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Text>Are you a:</Text>
      <Button
        onPress={() => props.navigation.navigate("Restaurant")}
        title="Restaurant"
      ></Button>
      <Button
        onPress={() => props.navigation.navigate("User")}
        title="User"
      ></Button>
    </View>
  );
}

export default HomeScreen;
