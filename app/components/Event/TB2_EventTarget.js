import React from "react";
import { Switch, View } from "react-native";
import colors from "../../config/colors";
import Text from "../AppText";
import Button from "../Button";
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
      <View style={{ marginTop: 20 }}>
        <Switchption />
        <Text style={[styles.input_title, styles.marginbottom20]}>
          Undergraduates
        </Text>
        <Switchption />
        <Switchption />
        <Switchption />
        <Switchption />
        <View style={styles.border} />
        <Text
          style={[
            styles.input_title,
            styles.marginTop20,
            styles.marginbottom20,
          ]}
        >
          Postgraduates
        </Text>
        <Switchption />
      </View>
      <Button type={4} title="Next" />
    </View>
  );
}

const Switchption = () => {
  return (
    <View style={styles.option}>
      <Switch
        style={styles.switcher}
        trackColor={{ false: colors.secondary, true: colors.primary }}
        ios_backgroundColor={colors.dark_opacity_2}
        // onValueChange={toggleSwitch}
        value={true}
      />
      <Text>Everyone can see this event</Text>
    </View>
  );
};

export default TB2_EventTarget;
