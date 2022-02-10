import React from "react";
import { View, Text, Button } from "react-native";
import tw from "tailwind-react-native-classnames";
import MakeAccount from "../../components/MakeAccount";

// import { withAuthenticator } from "aws-amplify-react-native";

function Signup(props) {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={tw`text-2xl pt-10`}>Lets Get Started</Text>
      <MakeAccount navigation={props.navigation} route={props.route} />
    </View>
  );
}

export default Signup;
