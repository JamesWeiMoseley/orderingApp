import React from 'react';
import { Text, Button, FlatList, TextInput, View } from 'react-native';
import { Formik } from 'formik';
import tw from "tailwind-react-native-classnames";

const RestaurantCreateMenu = props => (
  <Formik
    initialValues={{ RestaurantName: '', Type: '', Lunch: "", Dinner: "", LunchMenu: [], DinnerMenu: [] }}
    onSubmit={values => {
      console.log(values);
      alert("Menu sent to the database.");
       alert(JSON.stringify(values, null, 2));
    }}

  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View>
        <TextInput
          onChangeText={handleChange('RestaurantName')}
          onBlur={handleBlur('RestaurantName')}
          placeholder='Restaurant Name'
          value={values.RestaurantName}
        />
        <TextInput
          onChangeText={handleChange('Type')}
          onBlur={handleBlur('Type')}
          placeholder='Type'
          value={values.Type}
        />
        <TextInput
          onChangeText={handleChange('Lunch')}
          onBlur={handleBlur('Lunch')}
          placeholder='Lunch'
          value={values.Lunch}
        />
        <TextInput
          onChangeText={handleChange('Dinner')}
          onBlur={handleBlur('Dinner')}
          placeholder='Dinner'
          value={values.Dinner}
        />

        <Button onPress={() => {
            values.LunchMenu.push(values.Lunch);
            values.DinnerMenu.push(values.Dinner);
          }} title="Add Item" />
        <Button onPress={handleSubmit} title="Submit" />
        
        <Text style={tw`text-center text-2xl font-bold pt-10`}>Restaurant Name</Text>
        <Text style={tw`text-center text-2xl`}>{values.RestaurantName}</Text>

        <Text style={tw`text-center text-2xl font-bold pt-10`}>Restaurant Type</Text>
        <Text style={tw`text-center text-2xl`}>{values.Type}</Text>

        <Text style={tw`text-center text-2xl font-bold pt-10`}>Lunch Menu</Text>
        <FlatList data={values.LunchMenu} renderItem={({ item }) => (<Text style={tw`text-center text-2xl`}>{item}</Text>)}/>

        <Text style={tw`text-center text-2xl font-bold pt-10`}>Dinner Menu</Text>
        <FlatList data={values.DinnerMenu} renderItem={({ item }) => (<Text style={tw`text-center text-2xl`}>{item}</Text>)}/>
      </View>
    )}
  </Formik>
  
);

export default RestaurantCreateMenu;