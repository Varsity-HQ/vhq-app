import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../Button";
import { View } from "react-native";

function SubmitButton({ title, loading, type, ...props }) {
  const { handleSubmit } = useFormikContext();

  return (
    <View
      style={
        loading
          ? {
              opacity: 0.5,
            }
          : {}
      }
    >
      <AppButton
        disabled={loading ? true : false}
        title={loading ? "Please wait" : title}
        {...props}
        type={type}
        onPress={loading ? null : handleSubmit}
      />
    </View>
  );
}

export default SubmitButton;
