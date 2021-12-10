import React from "react";
import { Image, StyleSheet, View, ScrollView } from "react-native";

import colors from "../../config/colors";
import Text from "../AppText";
import { FontAwesome } from "@expo/vector-icons";

export default function AddPostH2({ core }) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={[styles.button, { backgroundColor: colors.darkish3 }]}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://varsityhq.imgix.net/vhq_img202130693415.jpeg",
            }}
          />
          <Text style={styles.text}>As myself</Text>
        </View>
        <Text style={[styles.text, styles.middleline]}>|</Text>
        <View style={[styles.button]}>
          <FontAwesome
            style={{ marginRight: 10 }}
            name="exchange"
            color={colors.white}
            size={16}
          />
          <Text style={styles.text}>Anonymously</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  middleline: {
    alignSelf: "center",
    marginHorizontal: 10,
  },
  text: {
    color: colors.white,
    fontWeight: "800",
    fontSize: 16,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 100,
    marginRight: 10,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: colors.dark,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    padding: 10,
  },
});
