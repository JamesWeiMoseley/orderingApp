import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { Auth, Hub } from "aws-amplify";
import tw from "tailwind-react-native-classnames";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false);

  async function signIn() {
    try {
      const user = await Auth.signIn(username, password);
      // setUsername("");
      setPassword("");
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
          style={tw`border-solid border-2 text-2xl`}
          onChangeText={(username) => setUsername(username)}
          value={username}
        ></TextInput>
        <Text>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={tw`border-solid border-2 text-2xl`}
          onChangeText={(password) => setPassword(password)}
          value={password}
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
