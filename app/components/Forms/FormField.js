import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../Input";

import ErrorMessage from "../Forms/ErrorMessage";

function AppFormField({ name, width, ...otherProps }) {
  const {
    setFieldTouched,
    setFieldValue,
    values,
    handleChange,
    errors,
    touched,
  } = useFormikContext();

  return (
    <>
      <AppTextInput
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        {...otherProps}
        width={width}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
