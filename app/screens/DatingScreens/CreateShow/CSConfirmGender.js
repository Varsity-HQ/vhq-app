import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import Text from "../../../components/AppText";
import Button from "../../../components/Button";
import OptionSelector from "../../../components/OptionSelector";
import Screen from "../../../components/Screen";
import colors from "../../../config/colors";
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
    // navigation.navigate(CS_NAME);
  };

  return (
    <Screen style={styles.container}>
      <View style={{ marginTop: "30%" }}>
        <View>
          <Text style={[styles.text_center, styles.header]}>
            Let's set you up
          </Text>
          <Text style={[styles.text_center, styles.subText]}>
            Before we start, how do you identify ?
          </Text>
        </View>
        <View style={styles.form_container}>
          <View>
            <OptionSelector
              type={2}
              onChange={handleChange}
              active={active}
              options={options}
            />
          </View>
        </View>
        <Text
          style={[
            styles.text_center,
            styles.subText,
            {
              color: colors.primary,
            },
          ]}
        >
          Coming soon
          {/* Another gender */}
        </Text>
        {/* <View style={styles.bottomButtonContainer}>
          <Button
            style={styles.bottomBtn}
            onPress={() => {
              navigation.navigate(CS_NAME);
            }}
            title={"Continue"}
          />
        </View> */}
      </View>
    </Screen>
  );
}

export default CSConfirmGender;
