import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Text from "../AppText";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../config/colors";
const height = Dimensions.get("window").height;

function ItemAbout({ data }) {
  const [readMore, setReadMore] = React.useState(false);
  const handleRead = () => setReadMore(!readMore);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Description</Text>
        <Text numberOfLines={readMore ? null : 4} ellipsizeMode={"tail"}>
          Here at self fix we aim to help you help yourself hence the name “Self
          fix” all we do is assist/guide you through whatever it is you’re going
          through or need help with. Our goal is to avail affordable exceptional
          mental health care to everyone and to make people realise that they
          can help themselves become better people and even happier people if
          they put in the work and seek the help necessary. Check out our
          website to see the services we offer and to book. Hope to hear from
          you soon :)
        </Text>
        <TouchableOpacity onPress={handleRead} style={styles.read_more}>
          <LinearGradient
            style={styles.gradient}
            colors={[colors.darkish, colors.transparent]}
            // colors={["red", "white"]}
            start={[0, 0]}
            end={[0, 10]}
          />
          <View style={styles.read_more_inner}>
            <Text
              style={{
                color: colors.secondary,
              }}
            >
              {readMore ? "Hide description" : "Continue reading"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  read_more_inner: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  gradient: {
    position: "absolute",
    height: "100%",
    width: "100%",
    borderRadius: 10,
    zIndex: -1,
  },
  heading: {
    fontWeight: "600",
    fontSize: RFValue(13),
    marginBottom: 10,
    color: colors.secondary,
  },
  container: {
    padding: 10,
  },
  read_more: {
    marginTop: 10,
  },
});

export default ItemAbout;
