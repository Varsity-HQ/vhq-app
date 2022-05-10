import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import Header from "../../../components/headers/header3";
import Text from "../../../components/AppText";
import Button from "../../../components/Button";
import OptionSelector from "../../../components/OptionSelector";
import Screen from "../../../components/Screen";
import colors from "../../../config/colors";
import { CS_NAME, CS_PHOTOS } from "../../../navigation/routes";
import styles from "./styles";

const options = [
  {
    title: "Males",
    value: "male",
  },
  {
    title: "Females",
    value: "female",
  },
  // {
  //   title: "Both",
  //   value: "both",
  // },
];

function CSInterestedIn({ navigation }) {
  const [active, setActive] = useState("");

  const handleChange = (i) => {
    setActive(i);
  };

  return (
    <Screen>
      <Header noBorder backIcon />
      <View style={[{ marginTop: "0%" }, styles.container]}>
        <View>
          <Text style={[styles.text_center, styles.header]}>
            Who should we show
          </Text>
          <Text style={[styles.text_center, styles.subText]}>
            You can change this setting later
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
              navigation.navigate(CS_PHOTOS);
            }}
            title={"Continue"}
          />
        </View>
      </View>
    </Screen>
  );
}

export default CSInterestedIn;
