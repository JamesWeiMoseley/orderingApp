import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { listRestaurants } from "../../graphql/queries";
import { Auth, API, graphqlOperation } from "aws-amplify";

const Item = ({ title, type }) => (
  <View style={tw`p-5 border-solid border-2 mx-3 rounded-md my-1`}>
    <Text style={tw`text-4xl text-blue-400`}>{title}</Text>
    <Text style={tw`text-2xl`}>{type}</Text>
  </View>
);

const RestaurantList = (props) => {
  const [posts, setPosts] = useState([]);
  const username = props.route.params;

  // get request
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResult = await API.graphql(
          graphqlOperation(listRestaurants)
        );
        setPosts(postsResult.data.listRestaurants.items);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPosts();
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Image
        style={{ width: "100%", height: 180 }}
        source={require("../../images/undraw_Street.png")}
      />
      {/* <Text style={tw`text-3xl px-8 text-red-400`}>
        Where would you like to order from:
      </Text> */}
      {posts.length > 1 ? (
        <FlatList
          data={posts}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("View", item, username)
                }
              >
                <Item title={item.title} type={item.type} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        ></FlatList>
      ) : (
        <View>
          <Text>Loading...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default RestaurantList;
