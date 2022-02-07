import React, { Component } from "react";
import {
    SafeAreaView,
    FlatList,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import Data from "../../dummyData.json";
import tw from "tailwind-react-native-classnames";

const Item = ({ title, type }) => (
    <View style={tw`p-5 border-solid border-2`}>
        <Text style={tw`text-4xl text-blue-500`}>{title}</Text>
        <Text style={tw`text-2xl`}>{type}</Text>
    </View>
);

const getTotals = () => {
    for (var i = 0; i < props.route.params.CartItems.length(); i++) {
        console.log(props.route.params.CartItems[i])
    }
}

const Cart = (props) => {
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
                data={props.route.params.CartItems}
                renderItem={({ item }) => {
                    return (
                        <Item title={item.food} type={item.price} />
                        // <Item title={item.food} type={item.price} />

                    );
                }}
                keyExtractor={(item) => item.id}
            ></FlatList>
        </SafeAreaView>
    );
};

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
