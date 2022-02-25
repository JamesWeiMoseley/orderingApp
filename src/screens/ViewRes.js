import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as queries from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

const ViewRes = (props) => {
  const [posts, setPosts] = useState([]);
  let pollo = "Pollo Loco";

  // get request
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResult = await API.graphql(
          graphqlOperation(queries.listItems)
        );
        setPosts(postsResult.data.listItems.items);
        console.log(postsResult.data.listItems.items);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPosts();
  }, []);

  return (
    <View>
      <Text>View ITems</Text>
      {posts.map((data) => {
        if (data.restaurant == props.route.params)
          return (
            <View key={data.id}>
              <Text>{data.food}</Text>
              <Text>{data.price}</Text>
              <Text>{data.restaurant}</Text>
            </View>
          );
      })}
    </View>
  );
};

export default ViewRes;
