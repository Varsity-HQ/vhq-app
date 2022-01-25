import React from "react";
import { View } from "react-native";
import Text from "../AppText";
import styles from "./styles";

function TB2_EventTarget(props) {
  return (
    <View style={[styles.tab_container, styles.et_container]}>
      <View style={styles.exp_container}>
        <Text style={styles.text_exp}>
          Choose who must see this event. Only people selected below will be
          able to see this event.
        </Text>
      </View>
    </View>
  );
}

export default TB2_EventTarget;
