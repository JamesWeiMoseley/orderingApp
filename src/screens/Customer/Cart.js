import React, { Component } from "react";
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

// const removeCartItem = (cart, id) => {
//     //var cartData = props.route.params.CartItems
//     console.log(cart)
//     // var index = cart.findIndex(function (o) {
//     //     return o.id === id;
//     // })
//     // if (index !== -1) cart.splice(index, 1);
// }

// const Item = ({ id, title, type }) => (
//     <View style={styles.menuItem}>
//         <Text style={tw`text-4xl text-blue-500`, styles.innerItem}>{title}</Text>
//         <Text style={tw`text-2xl`}>${type}</Text>
//         <TouchableOpacity
//         onPress={()=> removeCartItem(id)}
//         >
//             <Text>Remove</Text>
//         </TouchableOpacity>

//     </View>
// );

const getTotals = () => {
    for (var i = 0; i < props.route.params.CartItems.length(); i++) {
        console.log(props.route.params.CartItems[i])
    }
}

const Cart = (props) => {

    const removeCartItem = (cart, id, food) => {
        //props.route.params.CartItems
        // console.log(cartData)
        var index = props.route.params.CartItems.findIndex(function (o) {
            // console.log('o')
            // console.log(o.id)
            // console.log('cart')
            // console.log(cartData[0].id)
            return o.id === props.route.params.CartItems[0].id;
        })
        
        if (index !== -1) props.route.params.CartItems.splice(index, 1);
        console.log('updated cart')
        console.log(props.route.params.CartItems)
    }

    const Item = ({ id, title, type }) => (
        <View style={styles.menuItem}>
            <Text style={tw`text-4xl text-blue-500`, styles.innerItem}>{title}</Text>
            <Text style={tw`text-2xl`}>${type}</Text>
            <TouchableOpacity
            onPress={()=> removeCartItem(id)}
            >
                <Text>Remove</Text>
            </TouchableOpacity>
    
        </View>
    );

    console.log(props)
    var totalItems = 0
    var totalPrice = 0
    function getTotals() {

        for (var i = 0; i < props.route.params.CartItems.length; i++) {
            totalItems += 1
            totalPrice += props.route.params.CartItems[i].price
            console.log(props.route.params.CartItems[i])
        }
    }
    getTotals()
    return (
        <SafeAreaView style={tw`flex-1`}>
            <Text style={tw`text-4xl p-10`}>{totalItems} Items in your cart : {"$" + totalPrice}</Text>
            {/* <Text>{props.route.params.food} - {props.route.params.price.food}</Text> */}
            <FlatList
                extraData={props.route.params.CartItems}
                data={props.route.params.CartItems}
                renderItem={({ item }) => {
                    return (
                        <View >
                            <Item cart={props.route.params.CartItems} id={item.id} food={item.food} title={item.food} type={item.price} />
                        </View>
                        // <Item title={item.food} type={item.price} />

                    );
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
