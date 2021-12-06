import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../Button";

function SubmitButton({ title, type, ...props }) {
  const { handleSubmit } = useFormikContext();

  return (
    <AppButton title={title} {...props} type={type} onPress={handleSubmit} />
  );
}

export default SubmitButton;
