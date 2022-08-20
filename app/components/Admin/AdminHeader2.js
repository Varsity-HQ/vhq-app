import React from "react";
import { View, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../../config/colors";
import Text from "../AppText";
import Button from "../Button";
import { LinearGradient } from "expo-linear-gradient";
import Header3 from "../headers/header3";

function AdminHeader2({ heading, text1, text2, btn1Text, btn2Text, text3 }) {
  return (
    <View>
      <Header3 backIcon noBorder />
      <View style={styles.container}>
        <Text style={styles.heading}>{heading}</Text>
        {text1 ? <Text style={styles.subText}>{text1}</Text> : null}
        {text2 ? <Text style={styles.subText}>{text2}</Text> : null}
        <View
          style={[
            styles.row,
            {
              marginTop: 5,
            },
          ]}
        >
          <Button style={styles.button1} type={6} title={btn1Text} />

          {btn2Text ? (
            <Button
              type={5}
              textStyle={{ color: colors.redish_2 }}
              title={btn2Text}
            />
          ) : null}
        </View>
      </View>
      <View style={{ position: "relative" }}>
        <LinearGradient
          style={styles.gradient}
          colors={["#1160af", "#9e7b9b"]}
          start={[0, 0]}
          end={[1, 0]}
        />
        <View style={styles.gradient_area_container}>
          <Text style={styles.text3}>{text3}</Text>
          <View style={styles.line} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text3: {
    fontWeight: "700",
  },
  line: {
    height: 2,
    backgroundColor: colors.white,
    width: "100%",
    flex: 1,
    marginLeft: 10,
  },
  gradient_area_container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  button1: {
    borderRadius: 100,
    paddingVertical: 8,
  },
  gradient: {
    position: "absolute",
    height: "100%",
    // borderRadius: 100,
    width: "100%",
  },
  row: {
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  container: {
    padding: 10,
  },
  heading: {
    fontSize: RFValue(23),
    fontWeight: "700",
    marginBottom: 5,
    textTransform: "capitalize",
  },
  subText: {
    fontSize: RFValue(12.2),
    color: colors.secondary,
  },
});

export default AdminHeader2;
