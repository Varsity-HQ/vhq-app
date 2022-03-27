import React from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../../../components/Screen";

import Text from "../../../components/AppText";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import styles from "./styles";
import { CS_NAME } from "../../../navigation/routes";

function CSName({ navigation }) {
  return (
    <Screen style={styles.container}>
      <View>
        <View>
          <Text style={[styles.text_center, styles.header]}>
            What name would you like to use
          </Text>
        </View>
        <View style={styles.form_container}>
          <View>
            <Input type={3} style={styles.input} placeholder="Type a name" />
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

export default CSName;
