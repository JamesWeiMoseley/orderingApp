import React, { useState } from "react";
import { View, Text, Button, TextInput, Alert } from "react-native";
import tw from "tailwind-react-native-classnames";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";

const AddItem = ({ resName, navigation, route }) => {
  const [food, setFood] = useState("");
  const [price, setPrice] = useState("");

  const addItem = async () => {
    try {
      const newItem = await API.graphql({
        query: mutations.createItem,
        variables: {
          input: {
            food: food,
            price: parseInt(price),
            restaurant: resName,
          },
        },
      });
    } catch (e) {
      Alert.alert("Missing some fields");
    }
    navigation.navigate("Portal");
  };

  return (
    <View>
      <Text style={tw`text-2xl pt-5 text-center`}>
        Your Restaurant: {resName}
      </Text>
      <View style={tw`m-5`}>
        <Text>Menu Item</Text>
        <TextInput
          value={food}
          onChangeText={(e) => setFood(e)}
          style={tw`border-solid border-2 text-2xl`}
        ></TextInput>
        <Text>Price</Text>
        <TextInput
          value={price}
          onChangeText={(e) => setPrice(e)}
          style={tw`border-solid border-2 text-2xl`}
        ></TextInput>
      </View>
      <View style={tw`w-3/6 self-center`}>
        <Button onPress={addItem} title="Add your Items"></Button>
      </View>
      <Text style={tw`text-2xl pt-5 text-center`}>Your Current Menu Items</Text>
    </View>
  );
};

export default AddItem;