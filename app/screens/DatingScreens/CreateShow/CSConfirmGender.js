import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import Text from "../../../components/AppText";
import Button from "../../../components/Button";
import OptionSelector from "../../../components/OptionSelector";
import Screen from "../../../components/Screen";
import { CS_NAME } from "../../../navigation/routes";
import styles from "./styles";

const options = [
  {
    title: "Male",
    value: "male",
  },
  {
    title: "Female",
    value: "female",
  },
];

function CSConfirmGender({ navigation }) {
  const [active, setActive] = useState("");

  const handleChange = (i) => {
    setActive(i);
  };

  return (
    <Screen style={styles.container}>
      <View>
        <View>
          <Text style={[styles.text_center, styles.header]}>
            Confirm Gender
          </Text>
        </View>
        <View style={styles.form_container}>
          <View>
            <OptionSelector
              onChange={handleChange}
              active={active}
              options={options}
            />
          </View>
        </View>
        <View style={styles.bottomButtonContainer}>
          <Button
            style={styles.bottomBtn}
            onPress={() => {
              navigation.navigate(CS_NAME);
            }}
            title={"Continue"}
          />
        </View>
      </View>
    </Screen>
  );
}

export default CSConfirmGender;
