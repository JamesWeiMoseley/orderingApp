import React, { useEffect, useState } from "react";
import { View, Text, Button, BackHandler, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Auth, Hub } from "aws-amplify";
// import Eating from "../images/undraw_Eating_together_re_us62.png";

function Portal(props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    checkUser();
    async function checkUser() {
      const user = await Auth.currentAuthenticatedUser();
      setEmail(user.attributes.email);
      setName(user.username);
      setType(user.attributes.locale);
    }
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "white" }}>
      <Image
        style={{ width: 200, height: 200 }}
        source={require("../images/undraw_Eating_together_re_ux62.png")}
      />
      <Text style={tw`text-2xl pt-5`}>Hello {name}</Text>
      <Text style={tw`text-2xl pt-5`}>{email}</Text>
      <Text style={tw`text-2xl pt-5`}>You are a {type}</Text>
      <View style={tw`p-10`}>
        <Button
          title="Back to Home"
          onPress={() => props.navigation.navigate("Home")}
        ></Button>
      </View>
      <View style={tw`p-0`}>
        <Text>For Restaurant Owners Only:</Text>
        <Button
          title="View Your Restaurant"
          onPress={() => props.navigation.navigate("RestaurantAdd", name)}
        ></Button>
        <View style={tw`pt-2`}>
          <Text>For Customers Only:</Text>
          <Button
            title="Order Your Food"
            onPress={() => props.navigation.navigate("List", name)}
          />
        </View>
      </View>
    </View>
  );
}

export default Portal;
