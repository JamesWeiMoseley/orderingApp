import React, { useState, useEffect } from "react";
import { Text, Button, TextInput, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";

const AddRes = (props) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async () => {
    try {
      const newRestaurant = await API.graphql({
        query: mutations.createRestaurants,
        variables: { input: RestaurantPost },
      });
      console.log(`${title} and ${type}`);
      props.navigation.navigate("Portal");
    } catch (e) {
      console.log(e);
    }
  };

  const RestaurantPost = {
    id: props.username,
    username: props.username,
    title: title,
    type: type,
  };

  return (
    <View>
      <View style={tw`mb-5`}>
        <Text style={tw`text-center pt-10`}>Add Restaurant</Text>
        <View style={tw`p-10`}>
          <Text>Title</Text>
          <TextInput
            onChangeText={(e) => setTitle(e)}
            value={title}
            style={tw`border-solid border-2 text-2xl`}
          ></TextInput>
          <Text>Type</Text>
          <TextInput
            value={type}
            onChangeText={(type) => setType(type)}
            style={tw`border-solid border-2 text-2xl`}
          ></TextInput>
        </View>
        <Button title="Add new Restaurant" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default AddRes;