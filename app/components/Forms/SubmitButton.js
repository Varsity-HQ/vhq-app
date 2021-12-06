import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../Button";

function SubmitButton({ title, loading, type, ...props }) {
  const { handleSubmit } = useFormikContext();

  return (
    <AppButton
      disabled={loading ? true : false}
      title={loading ? "Please wait" : title}
      {...props}
      type={type}
      style={
        loading
          ? {
              opacity: 0.5,
            }
          : {}
      }
      onPress={handleSubmit}
    />
  );
}

export default SubmitButton;
