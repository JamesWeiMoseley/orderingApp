import React, { useState } from "react";
import { View, Text, Button, TextInput, Alert } from "react-native";
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
      Alert.alert("One or more of the fields is missing");
      console.log("error signing in");
    }
  }

  return (
    <View>
      <View style={tw`pb-5`}>
        <Text>Username</Text>
        <TextInput
          style={tw`border-solid border-2 text-2xl w-full`}
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
      <View style={tw`pt-10 pb-5`}>
        <Button
          onPress={() => props.navigation.navigate("Signup")}
          title="Signup"
        ></Button>
      </View>
      <View>
        <Button
          onPress={() => props.navigation.navigate("Verify")}
          title="Verify an Account"
        ></Button>
      </View>
    </View>
  );
}

export default Login;
