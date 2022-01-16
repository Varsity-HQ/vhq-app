import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../Button";
import { View } from "react-native";

function SubmitButton({ title, loading, type, ...props }) {
  const { handleSubmit } = useFormikContext();

  const nullPress = () => {};

  return (
    <View
      style={
        loading
          ? {
              opacity: 0.6,
            }
          : {}
      }
    >
      <AppButton
        loading={loading}
        disabled={loading ? true : false}
        title={loading ? "Please wait" : title}
        {...props}
        type={type}
        onPress={loading ? nullPress : handleSubmit}
      />
    </View>
  );
}

export default SubmitButton;
