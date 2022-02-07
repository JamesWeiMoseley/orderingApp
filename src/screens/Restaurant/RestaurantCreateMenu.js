import React from 'react';
import { Formik, FieldArray } from 'formik';

const Basic = () => (
  <div>
    <h1>Menu Creation</h1>
    <Formik
      initialValues={{ RestaurantName: '', Type: '', Lunch: "", Dinner: "", LunchMenu: [], DinnerMenu: [] }}
      validate={values => {
        const errors = {};
        if (!values.RestaurantName) {
          errors.RestaurantName = 'Required';
        } else if (
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.RestaurantName)
        ) {
          errors.RestaurantName = 'Invalid RestaurantName address';
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
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <input
            type="RestaurantName"
            name="RestaurantName"
            placeholder='Name'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.RestaurantName}
          />
          {/* {errors.RestaurantName && touched.RestaurantName && errors.RestaurantName} */}
          <input 
            type="Type"
            name="Type"
            placeholder='Type'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.Type}
          />
          <input
            type="Lunch"
            name="Lunch"
            placeholder='Lunch'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.Lunch}
          />

          <input
            type="Dinner"
            name="Dinner"
            placeholder='Dinner'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.Dinner}
          />
          
          {/* {errors.Type && touched.Type && errors.Type} */}
          <button type="add" onClick={() => {
            values.LunchMenu.push(values.Lunch);
            values.DinnerMenu.push(values.Dinner);
          }}>
            Add
          </button>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  </div>
);

export default Basic;