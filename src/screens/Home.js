import React from "react";
import { View, Text, Button, TextInput } from "react-native";
import tw from "tailwind-react-native-classnames";

function HomeScreen(props) {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={tw`text-2xl pt-10`}>Home Screen</Text>
      <View style={tw`p-5`}>
        <Text>Username</Text>
        <TextInput style={tw`border-solid border-2 text-2xl`}></TextInput>
        <Text>Password</Text>
        <TextInput style={tw`border-solid border-2 text-2xl`}></TextInput>
      </View>
      <Button title="Login"></Button>
      <View style={tw`p-10`}>
        <Button
          onPress={() => props.navigation.navigate("Signup")}
          title="Signup"
        ></Button>
      </View>
    </View>
  );
}

export default HomeScreen;
