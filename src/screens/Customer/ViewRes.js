import React from "react";
import { Text, View, Button } from "react-native";
import tw from "tailwind-react-native-classnames";

const ViewRes = (props) => {
  console.log(props.route.params);
  return (
    <View style={tw`p-10`}>
      <Text style={tw`text-red-500 text-2xl`}>{props.route.params.title}</Text>
      <Text>{props.route.params.type}</Text>
    </View>
  );
};

export default ViewRes;
