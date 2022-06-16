import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../../components/headers/header3";
import Screen from "../../../components/Screen";
import Text from "../../../components/AppText";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import styles from "./styles";
import RTextEditor from "../../../components/RTextEditor";
import colors from "../../../config/colors";

function CSAbout(props) {
  const handleEditorChange = () => {};

  return (
    <Screen scroll>
      <Header title="Discover about" backIcon />
      <View style={styles.container}>
        <View>
          <Text style={[styles.text_center, styles.header2]}>
            Tell others about you
          </Text>

          <Text
            style={[
              styles.text_center,
              styles.subText,
              {
                marginTop: 10,
              },
            ]}
          >
            You can write about yourself or what you're looking for or even the
            reason why you here, BUT make it interesting.
          </Text>
        </View>
        <View style={styles.form_container}>
          <View
            style={{
              borderTopWidth: 2,
              borderTopColor: colors.secondary,
              paddingTop: 10,
            }}
          >
            <RTextEditor
              placeholder="Insert catchy about here..."
              handleChange={handleEditorChange}
            />
          </View>
        </View>
        <View style={styles.bottomButtonContainer}>
          <Button onPress={null} style={styles.bottomBtn} title={"Save"} />
        </View>
      </View>
    </Screen>
  );
}

export default CSAbout;
