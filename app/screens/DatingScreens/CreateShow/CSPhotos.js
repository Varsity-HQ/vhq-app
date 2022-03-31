import React from "react";
import { View, StyleSheet } from "react-native";
import Button from "../../../components/Button";
import Text from "../../../components/AppText";
import Header from "../../../components/headers/header3";
import Screen from "../../../components/Screen";
import styles from "./styles";
import DatingSetupAddPhotos from "../../../components/Dating/DatingSetupAddPhotos";
import { CS_PHOTOS } from "../../../navigation/routes";

function CSPhotos({ navigation }) {
  return (
    <Screen>
      <Header noBorder backIcon />
      <View style={[{ marginTop: "0%" }, styles.container]}>
        <View>
          <Text style={[styles.text_center, styles.header]}>
            Add photos to your profile
          </Text>
          <Text style={[styles.text_center, styles.subText]}>
            Accounts with photos are more attractive
          </Text>
        </View>
        <View style={styles.form_container}>
          <View>
            <DatingSetupAddPhotos />
          </View>
          <Text
            style={[
              styles.text_center,
              styles.subText,
              {
                marginTop: 10,
              },
            ]}
          >
            Add at least 2 photos
          </Text>
        </View>

        <View>
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

export default CSPhotos;
