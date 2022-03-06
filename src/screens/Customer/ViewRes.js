import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ListItem,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { SafeAreaView } from "react-native-safe-area-context";
import cartImage from "../Images/cart.jpg";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { listItems } from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";

const Item = ({ lunch, price }) => (
  <View style={tw`p-5 border-solid border-2 rounded-md`}>
    <Text style={tw`text-4xl text-blue-400`}>{lunch}</Text>
    <Text style={tw`text-2xl`}>{"$" + price}</Text>
  </View>
);

const ViewRes = (props) => {
  const [posts, setPosts] = useState([]);
  const username = props.route.params.username;
  const resName = props.route.params.title;

  // Get the food items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const postsResult = await API.graphql(graphqlOperation(listItems));
        setPosts(postsResult.data.listItems.items);
      } catch (e) {
        console.log(e);
      }
    };
    fetchItems();
  }, []);

  const [vis, setVisible] = useState(false);
  var [currItem, setCurrItem] = useState("");

  const toggleOverlay = (name) => {
    setCurrItem(name);
    setVisible(!vis);
    setTimeout(() => {
      setVisible(false);
    }, 1000);
  };

  //Add item to cart
  const pushToCart = async (id, foodItem, itemPrice, itemRestaurant) => {
    await API.graphql({
      query: mutations.createCart,
      variables: {
        input: {
          id: Date.now(),
          username: username,
          restaurant: itemRestaurant,
          food: foodItem,
          price: itemPrice,
        },
      },
    });
  };

  function showLunch() {
    return (
      <FlatList
        nestedScrollEnabled
        data={posts}
        renderItem={({ item }) => {
          if (item.restaurant === resName) {
            return (
              <TouchableOpacity
                onPress={() => {
                  pushToCart(item.id, item.food, item.price, item.restaurant);
                  toggleOverlay(item.food);
                }}
              >
                <Item lunch={item.food} price={item.price} />
                <Text />
              </TouchableOpacity>
            );
          }
        }}
        keyExtractor={(item) => item.id}
      ></FlatList>
    );
  }

  return (
    <SafeAreaView style={[tw`p-5 bg-white`, styles.container]}>
      <View style={styles.header}>
        <View>
          <Text style={tw`text-red-400 text-3xl`}>
            {props.route.params.title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Cart", props.route.params)}
        >
          <Image style={styles.cartImage} source={cartImage} alt="cart"></Image>
          <Text style={tw`text-center`}>Cart</Text>
        </TouchableOpacity>
      </View>

      {/* PopUp */}

      {vis && (
        <Modal transparent={true}>
          <View style={styles.popUp}>
            <View style={styles.innerModal}>
              <Text style={tw`text-red-500 text-2xl text-center`}>
                {currItem}
              </Text>
              <Text style={tw`text-red-500 text-2xl text-center`}>
                Added to your cart
              </Text>
            </View>
          </View>
        </Modal>
      )}

      {/* Lunch Menu Section */}
      <View style={styles.menuItem}>
        <Text />
        <Text style={tw`text-red-400 text-2xl text-center`}>
          Click to Add to Cart
        </Text>
        <Text />
        {posts.length > 1 ? showLunch() : <Text>Loading...</Text>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuItem: {
    flex: 3,
    flexDirection: "column",
  },
  menuItem2: {
    flex: 3,
    flexDirection: "column",
  },
  cartImage: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
  popUp: {
    width: 250,
    textAlign: "center",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "column",
  },
  innerModal: {
    height: 150,
    backgroundColor: "white",
    alignContent: "center",
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
});

export default ViewRes;
