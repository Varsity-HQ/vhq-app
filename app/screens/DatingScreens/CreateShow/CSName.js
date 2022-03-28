import React from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../../../components/Screen";

import Text from "../../../components/AppText";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import styles from "./styles";
import { CS_LOOKING_FOR } from "../../../navigation/routes";

function CSName({ navigation }) {
  return (
    <Screen style={styles.container}>
      <View>
        <View>
          <Text style={[styles.text_center, styles.header2]}>
            Alright, what name would you like to use for your profile ?
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
            This name will appear on your profile
          </Text>
        </View>
        <View style={styles.form_container}>
          <View>
            <Input type={2} style={styles.input} placeholder="Type your name" />
          </View>
        </View>
        <View style={styles.bottomButtonContainer}>
          <Button
            onPress={() => {
              navigation.navigate(CS_LOOKING_FOR);
            }}
            style={styles.bottomBtn}
            title={"Continue"}
          />
        </View>
      </View>
    </Screen>
  );
}

export default CSName;
