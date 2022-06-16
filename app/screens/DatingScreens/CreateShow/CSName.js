import React from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../../../components/Screen";

import Text from "../../../components/AppText";
import Header from "../../../components/headers/header3";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import styles from "./styles";
import { CS_LOOKING_FOR } from "../../../navigation/routes";

function CSName({ navigation }) {
  return (
    <Screen>
      <Header title="Nickname" backIcon />
      <View style={styles.container}>
        <View>
          <Text style={[styles.text_center, styles.header2]}>
            Discovery nickname
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
            This name will appear on your discover profile and only in
            Discovery. This name is NOT your VarsityHQ username or name.
          </Text>
        </View>
        <View style={styles.form_container}>
          <View>
            <Input
              type={2}
              style={styles.input}
              placeholder="Type your nickname"
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

export default CSName;
