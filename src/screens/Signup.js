import React from "react";
import { View, Text, Button } from "react-native";
import tw from "tailwind-react-native-classnames";

function Signup(props) {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={tw`text-2xl pt-10`}>Lets Get Started</Text>
      <Text style={tw`text-2xl p-10`}>Are you a:</Text>
      <Button
        onPress={() => props.navigation.navigate("Restaurant")}
        title="Restaurant"
      ></Button>
      <Button
        onPress={() => props.navigation.navigate("Customer")}
        title="Customer"
      ></Button>
    </View>
  );
}

export default Signup;
