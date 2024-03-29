import React, { useState } from "react";
import { View, Text, Button, TextInput, Alert } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Auth } from "aws-amplify";

function Verify(props) {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, code);
      props.navigation.navigate("Home");
      Alert.alert("Verified! You can now login.");
    } catch (error) {
      Alert.alert("Code is Wrong Try Again");
      console.log("error confirming sign up");
    }
  }

  async function resendConfirmationCode() {
    try {
      await Auth.resendSignUp(username);
      Alert.alert("code resent successfully");
      console.log("code resent successfully");
    } catch (err) {
      Alert.alert("Something went wrong");
      console.log("error resending code: ");
    }
  }

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={tw`text-2xl pt-10`}>Get you verfied</Text>
      <Text style={tw`text-lg p-5 text-center text-red-300`}>
        If you didnt recieve an email make sure to check your spam.
      </Text>
      <View style={tw`p-5`}>
        <Text>Username</Text>
        <TextInput
          style={tw`border-solid border-2 text-2xl`}
          onChangeText={(username) => setUsername(username)}
          value={username}
        ></TextInput>
        <Text>Verification Code</Text>
        <TextInput
          secureTextEntry={true}
          style={tw`border-solid border-2 text-2xl`}
          onChangeText={(code) => setCode(code)}
          value={code}
        ></TextInput>
      </View>
      <Button onPress={confirmSignUp} title="Verify Your Code"></Button>
      <View style={tw`p-10`}>
        <Button onPress={resendConfirmationCode} title="Resend Code"></Button>
      </View>
    </View>
  );
}

export default Verify;
