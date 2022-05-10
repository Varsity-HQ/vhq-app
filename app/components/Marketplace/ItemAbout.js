import React from "react";
import { View, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Text from "../AppText";

function ItemAbout(props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Description</Text>
        <Text>
          Here at self fix we aim to help you help yourself hence the name “Self
          fix” all we do is assist/guide you through whatever it is you’re going
          through or need help with. Our goal is to avail affordable exceptional
          mental health care to everyone and to make people realise that they
          can help themselves become better people and even happier people if
          they put in the work and seek the help necessary. Check out our
          website to see the services we offer and to book. Hope to hear from
          you soon :)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: "700",
    fontSize: RFValue(16),
    marginBottom: 15,
  },
  container: {
    padding: 10,
  },
});

export default ItemAbout;
