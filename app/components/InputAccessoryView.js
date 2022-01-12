import React from "react";
import {
  View,
  StyleSheet,
  InputAccessoryView as InputAV,
  Platform,
} from "react-native";

function InputAccessoryView({ children }) {
  return (
    <>
      {Platform.OS === "ios" ? (
        <InputAV backgroundColor="#000">{children}</InputAV>
      ) : (
        <>{children}</>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default InputAccessoryView;
