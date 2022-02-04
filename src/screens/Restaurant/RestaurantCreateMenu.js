import React from 'react';
import { Formik } from 'formik';

const Basic = () => (
  <div>
    <h1>Menu Creation</h1>
    <Formik
      initialValues={{ RestaurantName: '', Food: '' }}
      validate={values => {
        const errors = {};
        if (!values.RestaurantName) {
          errors.RestaurantName = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.RestaurantName)
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
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.RestaurantName}
          />
          {errors.RestaurantName && touched.RestaurantName && errors.RestaurantName}
          <input
            type="Food"
            name="Food"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.Food}
          />
          {errors.Food && touched.Food && errors.Food}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  </div>
);

export default Basic;