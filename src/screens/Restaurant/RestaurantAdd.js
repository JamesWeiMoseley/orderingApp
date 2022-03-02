import React, { useState, useEffect } from "react";
import { Text, Button, TextInput, View, Image } from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import AddRes from "../../components/Restaurant/AddRes";
import * as queries from "../../graphql/queries";
import AddItem from "../../components/Restaurant/AddItem";
import DisplayItem from "../../components/Restaurant/DisplayItem";

const RestaurantAdd = (props) => {
  const name = props.route.params;
  const [resName, setResName] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const findRes = async () => {
      try {
        const res = await API.graphql(
          graphqlOperation(queries.getRestaurants, { id: name })
        );
        setResName(res.data.getRestaurants.title);
      } catch (e) {
        console.log(e);
      }
    };
    findRes();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResult = await API.graphql(
          graphqlOperation(queries.listItems)
        );
        setItems(postsResult.data.listItems.items);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPosts();
  }, []);

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Image
        style={{
          width: "100%",
          height: 200,
          marginTop: 8,
          alignContent: "center",
        }}
        source={require("../../images/undraw_Tasting.png")}
      />
      {resName.length < 1 ? (
        <AddRes
          username={name}
          navigation={props.navigation}
          route={props.route}
        />
      ) : (
        <AddItem
          resName={resName}
          username={name}
          navigation={props.navigation}
          route={props.route}
        />
      )}
      {resName.length > 1 ? (
        <DisplayItem
          items={items}
          resName={resName}
          route={props.route}
          navigation={props.navigation}
        ></DisplayItem>
      ) : null}
    </View>
  );
};

export default RestaurantAdd;
