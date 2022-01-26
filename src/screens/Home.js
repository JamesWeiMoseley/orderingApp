import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Auth, Hub } from "aws-amplify";
import Login from "../components/Login";
import { SafeAreaView } from "react-native-safe-area-context";

function HomeScreen(props) {
  const [name, setName] = useState("");
  // const [haveUser, setHaveUser] = useState(false);

  useEffect(() => {
    checkUser();
    async function checkUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setName(user.username);
      } catch (error) {
        console.log("no user");
      }
    }
  }, []);

  async function signOut() {
    try {
      await Auth.signOut();
      setName("");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
  return (
    <View style={tw`bg-white h-full w-full`}>
      <Text>{name}</Text>
      <SafeAreaView style={tw`items-center`}>
        <Text style={tw`text-2xl p-10`}>Home Screen </Text>
        {name ? <Text style={tw`text-xl`}>Welcome in {name}</Text> : null}
        {!name ? (
          <Login navigation={props.navigation} route={props.route}></Login>
        ) : null}
        <View style={tw`p-10`}>
          {name ? (
            <Button
              title="Navigate to User Portal"
              onPress={() => props.navigation.navigate("Portal")}
            />
          ) : null}
        </View>
        <View>
          {name ? <Button onPress={signOut} title="Log Out"></Button> : null}
        </View>
      </SafeAreaView>
    </View>
  );
}

export default HomeScreen;
