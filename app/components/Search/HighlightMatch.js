import React from "react";
import { connectHighlight } from "react-instantsearch-native";
import { StyleSheet, View, Dimensions } from "react-native";
import colors from "../../config/colors";
import Text from "../AppText";
import Image from "../Image";

const height = Dimensions.get("window").height;

const HighlightMatch = ({ attribute, hit, highlight }) => {
  //   const highlights = highlight({
  //     highlightProperty: "_highlightResult",
  //     attribute,
  //     hit,
  //   });

  console.log({ hit: hit.degree });

  if (!hit.firstname || !hit.username) return null;
  return (
    <View style={styles.res_container}>
      <Image uri={hit.profilepic} style={styles.profilepic} />
      <View>
        <View>
          <Text style={styles.name}>{hit.firstname}</Text>
        </View>
        <View>
          <Text style={styles.username}>@{hit.username}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  username: {
    color: colors.secondary,
  },
  name: {
    fontWeight: "700",
  },
  res_container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  profilepic: {
    height: height * 0.06,
    width: height * 0.06,
    borderRadius: 100,
    backgroundColor: colors.darkish,
    marginRight: 10,
  },
});

export default connectHighlight(HighlightMatch);
