import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, Alert } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Auth } from "aws-amplify";
import DropDownPicker from "react-native-dropdown-picker";

function MakeAccount(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [open, setOpen] = useState(false);
  const [locale, setType] = useState(null);
  const [items, setItems] = useState([
    { label: "Customer (You want to order food)", value: "Customer" },
    { label: "Restaurant (You own a Restaurant)", value: "Restaurant" },
  ]);

  async function signUp() {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email, // optional
          // "custom:Type": type,
          locale,
        },
      });
      props.navigation.navigate("Verify");
      console.log(user);
    } catch (error) {
      console.log("error signing up:", error);
      Alert.alert("One or more of the fields is missing");
    }
  }

  return (
    <View style={tw`flex-1 p-5`}>
      <Text style={tw`text-2xl p-10`}>First we make an account</Text>
      <Text>Username</Text>
      <TextInput
        onChangeText={(username) => setUsername(username)}
        style={tw`border-solid border-2 text-2xl`}
      ></TextInput>
      <Text>Password (at least 8 characters)</Text>
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

      <Text>You are (Choose One):</Text>
      <DropDownPicker
        style={tw`border-solid border-2 text-2xl`}
        open={open}
        value={locale}
        items={items}
        setOpen={setOpen}
        setValue={setType}
        setItems={setItems}
      />

      <View style={tw`pt-20`}>
        <Button onPress={signUp} title="Make An Account"></Button>
      </View>
    </View>
  );
}

export default MakeAccount;
