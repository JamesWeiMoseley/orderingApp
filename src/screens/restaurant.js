import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput, FlatList } from "react-native";
import tw from "tailwind-react-native-classnames";
import { listRestaurants } from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import { Auth } from "aws-amplify";

function Restaurant() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    checkUser();
    async function checkUser() {
      const user = await Auth.currentAuthenticatedUser();
      setUsername(user.username);
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResult = await API.graphql(
          graphqlOperation(listRestaurants)
        );
        console.log(listRestaurants.length);
        setPosts(postsResult.data.listRestaurants.items);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPosts();
  }, []);

  const Item = ({ title, type }) => (
    <View style={tw`p-5 border-solid border-2`}>
      <Text style={tw`text-3xl text-blue-500`}>{title}</Text>
      <Text style={tw`text-2xl`}>{type}</Text>
    </View>
  );

  const RestaurantPost = {
    username: username,
    title: title,
    type: type,
  };

  const handleSubmit = async () => {
    try {
      const newRestaurant = await API.graphql({
        query: mutations.createRestaurants,
        variables: { input: RestaurantPost },
      });
      console.log(`${title} and ${type}`);
      setTitle("");
      setType("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={tw`bg-gray-400 h-full`}>
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
      <Text style={tw`text-4xl`}>List of restaurants</Text>
      <FlatList
        data={posts}
        renderItem={({ item }) => {
          return <Item title={item.title} type={item.type} />;
        }}
      ></FlatList>
    </View>
  );
}

export default Restaurant;
