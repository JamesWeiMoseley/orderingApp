import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Auth, Hub } from "aws-amplify";

// import { withAuthenticator } from "aws-amplify-react-native";

function Portal(props) {
  const [name, setName] = useState("");

  useEffect(() => {
    checkUser();
    async function checkUser() {
      const user = await Auth.currentAuthenticatedUser();
      console.log({ user });
      setName(user.username);
    }
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={tw`text-2xl pt-10`}>Hello {name}</Text>
    </View>
  );
}

export default Portal;
