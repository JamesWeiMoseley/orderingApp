import React, { useEffect, useState } from "react";
import { View, Text, Button, BackHandler } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Auth, Hub } from "aws-amplify";

// import { withAuthenticator } from "aws-amplify-react-native";

function Portal(props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    checkUser();
    async function checkUser() {
      const user = await Auth.currentAuthenticatedUser();
      // console.log({ user });
      setEmail(user.attributes.email);
      setName(user.username);
      setType(user.attributes.locale);
    }
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={tw`text-2xl pt-10`}>Hello {name}</Text>
      <Text style={tw`text-2xl pt-10`}>{email}</Text>
      <Text style={tw`text-2xl pt-10`}>You are a {type}</Text>
      <View style={tw`p-10`}>
        <Button
          title="Back to Home"
          onPress={() => props.navigation.navigate("Home")}
        ></Button>
      </View>
      <View style={tw`p-0`}>
        <Button
          title="Restaurant Form"
          onPress={() => props.navigation.navigate("RestaurantCreateMenu")}
        ></Button>
      </View>
    </View>
  );
}

export default Portal;
