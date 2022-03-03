import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    FlatList,
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import Data from "../../dummyData.json";
import tw from "tailwind-react-native-classnames";
import { listRestaurants, listItems, getCart, listCarts } from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import { Auth, API, graphqlOperation } from "aws-amplify";


const Cart = (props) => {

    const [posts, setPosts] = useState([]);
    const [cart, setCart] = useState({});
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [email, setEmail] = useState("");
    const [total, setTotal] = useState("");
    const [cost, setCost] = useState("");

    var userName = ''
    useEffect(() => {
        checkUser();
        async function checkUser() {
            const user = await Auth.currentAuthenticatedUser();

            setEmail(user.attributes.email);
            setName(user.username);
            setType(user.attributes.locale);

            userName = user.username
            console.log('user' + userName);

        }
    }, []);

    // get request
    var itemsInCart = []
    var totalItems = 0
    var totalPrice = 0

    const fetchItems = async () => {
        console.log('listing carts')
        try {
            const postsResult = await API.graphql(
                graphqlOperation(listCarts)
            );
            console.log('cart')
            setPosts(postsResult.data.listCarts.items);
            itemsInCart = postsResult.data.listCarts.items

            for (var i = 0; i < itemsInCart.length; i++) {
                console.log('itemsInCart')
                console.log(userName)
                if (itemsInCart[i].username === userName) {
                    totalItems += 1
                    totalPrice += itemsInCart[i].price
                }
            }
            console.log('totalItems' + totalItems)

            // ********** use state for totals
            setTotal(totalItems)
            setCost(totalPrice)
            // console.log('items in cart')
            // console.log(itemsInCart)
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        fetchItems();
    }, []);


    const removeCart = async (id) => {
        console.log('removing cart cart')
        try {
            const postsResult = await API.graphql({
                query: mutations.deleteCart,
                variables: { input: { id: id } },
                //graphqlOperation(getCart('Cart - MYUz28n_5krX8FQ05mDa6'}))
            });
            setTimeout(() => {
                fetchItems();
            }, 1000);
            
        } catch (e) {
            console.log(e);
        }
    };


    const Item = ({ id, title, type, restuarant }) => (
        <View style={styles.menuItem}>
            <Text style={tw`text-2xl`}> ${type}</Text>
            <Text style={tw`text-4xl text-blue-500`, styles.innerItem}>{restuarant + ': ' + title}</Text>
            <TouchableOpacity
                onPress={() => removeCart(id)}
            >
                <Text>Remove</Text>
            </TouchableOpacity>

        </View>
    );





    return (
        <SafeAreaView style={tw`flex-1`}>
            <View style={styles.header}>
                <Text style={tw`text-4xl p-10`}>{total} Items in your cart : {"$" + cost}</Text>
                {/* <Text>{props.route.params.food} - {props.route.params.price.food}</Text> */}
                <Text style={tw`text-4xl p-10`}>Checkout</Text>
            </View>
            <FlatList
                //extraData={props.route.params.CartItems}
                data={posts}
                renderItem={({ item }) => {
                    if (item.username === name) {
                        return (
                            <View >
                                <Item id={item.id} title={item.food} type={item.price} restuarant={item.restaurant} />
                            </View>
                        );
                    }
                }}
                keyExtractor={(item) => item.id}
            ></FlatList>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    menuItem: {
        height: 100,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: "black",
        borderWidth: 2,
        marginVertical: 5,
        alignItems: "center"
    },
    header: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    innerItem: {
        marginLeft: 10,
        fontSize: 25,
        color: "#3b82f6"
    }
});


export default Cart;


// class Cart extends Component {

//     //     constructor() {
//     //     super()
//     //     this.state = {
//     //       pigeons: []
//     //     }
//     //   }
//     state = {
//         cartItems: [],
//     }

//     increaseState = ()=> {
//         console.log('increased state')
//     }

//     // function to update state which is used by view restaurant
//     // need an alert to say 'added to cart'

//     renderItem = ({ item }) => {

//         let items = [];

//         if (item.newRow && item.id === 1) {
//             items = item.newRow.map(row => {
//                 return <Text>{row.text}</Text>
//             })
//         }

//         return (
//             <View>

//                 {items}

//             </View>
//         )
//     }


//     render() {
//         return (
//             <View style={styles.container}>
//                 <FlatList
//                     style={styles.container}
//                     data={rows}
//                     renderItem={this.renderItem}
//                     keyExtractor={extractKey}
//                 />
//             </View>
//         );
//     }
// }

// export default Cart;
