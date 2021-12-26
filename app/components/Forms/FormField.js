import React, { useState } from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../Input";

import ErrorMessage from "../Forms/ErrorMessage";

function AppFormField({ name, width, type, ...otherProps }) {
  const {
    setFieldTouched,
    setFieldValue,
    values,
    handleChange,
    errors,
    touched,
    secureTextEntry,
  } = useFormikContext();

  const [passHide, setPassHide] = useState(true);

  return (
    <>
      <AppTextInput
        type={type}
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        {...otherProps}
        secureTextEntry={name === "password" ? passHide : false}
        password={name === "password"}
        show={!passHide}
        passShow={() => setPassHide(!passHide)}
        width={width}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
