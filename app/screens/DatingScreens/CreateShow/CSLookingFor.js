import React from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../../../components/Screen";

import Text from "../../../components/AppText";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import styles from "./styles";
import { CS_NAME } from "../../../navigation/routes";
import OptionSelector from "../../../components/OptionSelector";

function CSLookingFor({ navigation }) {
  return (
    <Screen style={styles.container}>
      <View>
        <View>
          <Text style={[styles.text_center, styles.header2]}>
            Nice to meet you Harmony ! Care to tell people why are you here ?
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
            Choose an option that best describes what you looking for. Be honest
            and don't be shy.
          </Text>
        </View>
        <View style={styles.form_container}>
          <View>
            <OptionSelector
              type={3}
              // onChange={handleChange}
              // active={active}
              // options={options}
            />
          </View>
        </View>
        <View style={styles.bottomButtonContainer}>
          <Button
            onPress={() => {
              navigation.navigate(CS_NAME);
            }}
            style={styles.bottomBtn}
            title={"Continue"}
          />
        </View>
      </View>
    </Screen>
  );
}

export default CSLookingFor;
