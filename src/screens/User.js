import React from "react";
import { Text, View, Button } from "react-native";

function UserScreen(props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>You are a User</Text>
      <Button
        onPress={() => props.navigation.navigate("List")}
        title="View Restaurants"
      />
    </View>
  );
}

export default UserScreen;
