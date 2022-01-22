import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { Auth, Hub } from "aws-amplify";
import tw from "tailwind-react-native-classnames";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function signIn() {
    try {
      console.log(username);
      const user = await Auth.signIn(username, password);
      props.navigation.navigate("Portal");
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  return (
    <View>
      <View style={tw`p-5`}>
        <Text>Username</Text>
        <TextInput
          onChangeText={(username) => setUsername(username)}
          style={tw`border-solid border-2 text-2xl`}
        ></TextInput>
        <Text>Password</Text>
        <TextInput
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          style={tw`border-solid border-2 text-2xl`}
        ></TextInput>
      </View>
      <Button onPress={signIn} title="Login"></Button>
      <View style={tw`p-10`}>
        <Button
          onPress={() => props.navigation.navigate("Signup")}
          title="Signup"
        ></Button>
      </View>
    </View>
  );
}

export default Login;
