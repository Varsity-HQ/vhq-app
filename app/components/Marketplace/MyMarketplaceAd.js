import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import colors from "../../config/colors";
import Image from "../Image";
import Button from "../Button";
import Text from "../AppText";

const width = Dimensions.get("window").width;

function MyMarketplaceAd(props) {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} />
      </View>
      <View style={styles.center_section}>
        <Text numberOfLines={1} ellipsizeMode={"tail"} style={styles.title}>
          This is the title u8h88h8h87h8h7h87 8h887
        </Text>
        <Text
          style={{
            marginTop: 5,
            color: colors.white,
            fontSize: 14,
            marginBottom: 4,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: 14,
              marginRight: 4,
            }}
          >
            Service{" "}
          </Text>
          | 2 Views
        </Text>

        <Text style={{ marginTop: 5, color: colors.secondary, fontSize: 13 }}>
          Created 2 hours ago
        </Text>
        <View style={styles.row}>
          <Button
            type={3}
            style={{ marginRight: 10, flex: 1 }}
            title="Edit Ad"
          />
          {/* <Button type={3} title="Delete" /> */}
          <Button
            type={5}
            style={{ marginRight: 0, flex: 1 }}
            title="Open ad"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontWeight: "700",
  },
  image: {
    height: width * 0.2,
    width: width * 0.2,
  },
  center_section: {
    marginLeft: 10,
    flex: 1,
  },
  container: {
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.secondary_2,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: "row",
  },
});

export default MyMarketplaceAd;
