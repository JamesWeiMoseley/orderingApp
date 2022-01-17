import React from "react";
import { View, Text, Button, TextInput } from "react-native";
import tw from "tailwind-react-native-classnames";

function Restaurant() {
  return (
    <View style={tw`bg-gray-400 h-full`}>
      <Text style={tw`text-center pt-10`}>Sign in Below</Text>
      <View style={tw`p-10`}>
        <Text>Username</Text>
        <TextInput style={tw`border-solid border-2 text-2xl`}></TextInput>
        <Text>Password</Text>
        <TextInput style={tw`border-solid border-2 text-2xl`}></TextInput>
      </View>
      <Button title="Sign up" />
    </View>
  );
}

export default Restaurant;
