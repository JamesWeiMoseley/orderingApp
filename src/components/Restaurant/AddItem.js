import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";

const AddItem = ({ username, resName, navigation, route }) => {
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

  const handleDelete = async () => {
    await API.graphql({
      query: mutations.deleteRestaurants,
      variables: { input: { id: username } },
    });
    navigation.navigate("Portal");
  };

  return (
    <View>
      <View
        style={tw`border-solid mx-2 my-2 border-gray-200 border-2 rounded-md`}
      >
        <Text style={tw`text-2xl pt-5 text-center`}>
          Your Restaurant: {resName}{" "}
        </Text>
        <TouchableOpacity
          onPress={() => handleDelete()}
          style={tw`m-2 px-5 bg-red-400 self-center text-center mb-2 rounded-md`}
        >
          <Text style={tw`text-center`}>Delete Restaurant</Text>
        </TouchableOpacity>

        <Text style={tw`mt-5 text-xl text-center`}>Add Your Menu Items: </Text>
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
        <View style={tw`w-3/6 self-center mb-5`}>
          <Button onPress={addItem} title="Add your Items"></Button>
        </View>
      </View>
    </View>
  );
};

export default AddItem;
