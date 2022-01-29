import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, Alert } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Auth } from "aws-amplify";

function MakeAccount(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone] = useState("");

  async function signUp() {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email, // optional
          phone_number, // optional - E.164 number convention
          // other custom attributes
        },
      });
      props.navigation.navigate("Verify");
      console.log(user);
    } catch (error) {
      //   console.log("error signing up:");
      Alert.alert("One or more of the fields is missing");
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={tw`text-2xl p-10`}>First we make an account</Text>
      <Text>Username</Text>
      <TextInput
        onChangeText={(username) => setUsername(username)}
        style={tw`border-solid border-2 text-2xl`}
      ></TextInput>
      <Text>Password</Text>
      <TextInput
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        style={tw`border-solid border-2 text-2xl `}
      ></TextInput>
      <Text>Email</Text>
      <TextInput
        onChangeText={(email) => setEmail(email)}
        style={tw`border-solid border-2 text-2xl`}
      ></TextInput>
      <Text>Phone (Optional)</Text>
      <TextInput
        onChangeText={(phone_number) => setPhone(phone_number)}
        style={tw`border-solid border-2 text-2xl`}
      ></TextInput>
      <View style={tw`p-10`}>
        <Button onPress={signUp} title="Make An Account"></Button>
      </View>
    </View>
  );
}

export default MakeAccount;
