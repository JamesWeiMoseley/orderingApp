import React from "react";
import { Formik, FieldArray } from "formik";
import { Text, Button, TextInput, View } from "react-native";

const Basic = () => (
  <View>
    <Text>Menu Creation</Text>
    <Formik
      initialValues={{
        RestaurantName: "",
        Type: "",
        Lunch: "",
        Dinner: "",
        LunchMenu: [],
        DinnerMenu: [],
      }}
      validate={(values) => {
        const errors = {};
        if (!values.RestaurantName) {
          errors.RestaurantName = "Required";
        } else if (
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.RestaurantName)
        ) {
          errors.RestaurantName = "Invalid RestaurantName address";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <View onSubmit={handleSubmit}>
          <TextInput
            type="RestaurantName"
            name="RestaurantName"
            placeholder="Name"
            value={values.RestaurantName}
          />
          {/* {errors.RestaurantName && touched.RestaurantName && errors.RestaurantName} */}
          <TextInput
            type="Type"
            name="Type"
            placeholder="Type"
            value={values.Type}
          />
          <TextInput
            type="Lunch"
            name="Lunch"
            placeholder="Lunch"
            value={values.Lunch}
          />

          <TextInput
            type="Dinner"
            name="Dinner"
            placeholder="Dinner"
            value={values.Dinner}
          />

          {/* {errors.Type && touched.Type && errors.Type} */}
          <Button
            title="add"
            onClick={() => {
              values.LunchMenu.push(values.Lunch);
              values.DinnerMenu.push(values.Dinner);
            }}
          >
            <Text>Add</Text>
          </Button>
          <Button title="submit" disabled={isSubmitting}>
            <Text>Submit </Text>
          </Button>
        </View>
      )}
    </Formik>
  </View>
);

export default Basic;
