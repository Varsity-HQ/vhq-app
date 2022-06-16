import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../../../components/Screen";

import Text from "../../../components/AppText";
import Header from "../../../components/headers/header3";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import styles from "./styles";
import { CS_INTERESTED_IN, CS_NAME } from "../../../navigation/routes";
import OptionSelector from "../../../components/OptionSelector";

const options = [
  {
    icon: require("../../../assets/heart.png"),
    title: "To date",
    desc: "I'm looking for a relationship or something that lasts",
    value: "to_date",
  },
  {
    icon: require("../../../assets/friends.png"),
    title: "To find friends",
    desc: "I'm here to find friends and meet new people",
    value: "to_find_friends",
  },
  {
    icon: require("../../../assets/winking-face.png"),
    title: "For vibes",
    sub: " & the streets",
    desc: "I'm open to anything other than a relationship",
    value: "to_have_fun",
  },
];

function CSLookingFor({ navigation }) {
  const [active, setActive] = useState("");

  return (
    <Screen scroll>
      <Header noBorder backIcon />
      <View style={styles.container}>
        <View>
          <Text style={[styles.text_center, styles.header2]}>
            Tell people why are you here.
          </Text>

          <Text
            style={[
              styles.text_center,
              styles.subText,
              {
                marginTop: 10,
                paddingHorizontal: 10,
              },
            ]}
          >
            Choose an option that best describes what you looking for. Be honest
          </Text>
        </View>
        <View style={styles.form_container}>
          <View>
            <OptionSelector
              type={3}
              onChange={setActive}
              active={active}
              options={options}
            />
          </View>
        </View>
        <View style={styles.bottomButtonContainer}>
          <Button
            onPress={() => {
              navigation.navigate(CS_INTERESTED_IN);
            }}
            style={styles.bottomBtn}
            title={"Save"}
          />
        </View>
      </View>
    </Screen>
  );
}

export default CSLookingFor;
