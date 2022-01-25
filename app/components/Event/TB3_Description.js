import React from "react";
import { View } from "react-native";
import Text from "../AppText";
import Button from "../Button";
import RTextEditor from "../RTextEditor";
import styles from "./styles";

function TB3_Description({ handleEditorChange, postHtmlText, handleNext }) {
  return (
    <View style={[styles.tab_container, styles.et_container]}>
      <View style={styles.exp_container}>
        <Text style={styles.text_exp}>
          Provide more information about this event so that people can better
          understand it.
        </Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={[styles.input_title, styles.marginbottom20]}>
          Description
        </Text>
        <RTextEditor
          initialInput={postHtmlText}
          placeholder="About event"
          stylePreset={2}
          handleChange={handleEditorChange}
        />
      </View>
      <View
        style={{
          opacity: postHtmlText ? 1 : 0.5,
        }}
      >
        <Button
          disabled={!postHtmlText ? true : false}
          onPress={handleNext}
          style={{ marginTop: 40 }}
          type={4}
          title="Next"
        />
      </View>
    </View>
  );
}

export default TB3_Description;
