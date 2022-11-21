import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import HeaderC from "../headers/header3";
import Text from "../AppText";
import colors from "../../config/colors";
import { color } from "react-native-reanimated";
import Button from "../Button";
import Image from "../Image";
import { useNavigation } from "@react-navigation/native";
import { POST_PAGE } from "../../navigation/routes";

const width = Dimensions.get("window").width;

function Header({ data, loading }) {
  const navigation = useNavigation();
  if (loading) return null;
  return (
    <View style={styles.container}>
      <HeaderC noBorder backIcon />
      <View style={styles.container_e}>
        <Text style={styles.header}>Event Interested</Text>
        <Text
          style={[
            styles.subheader,
            {
              color: colors.secondary,
            },
          ]}
        >
          Showing people interested in your event
        </Text>
      </View>
      <View style={styles.container_event}>
        <View>
          <Image style={styles.image} uri={data.attachments[0]} />
        </View>
        <Text
          style={[
            styles.subheader,
            {
              fontWeight: "700",
            },
          ]}
        >
          {data.eventName}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button
          onPress={() => {
            navigation.navigate(POST_PAGE, {
              post_id: data.id,
            });
          }}
          type={3}
          style={{
            paddingHorizontal: 40,
          }}
          title="Go to event"
        />
      </View>
      <View>
        <Text
          style={{
            fontWeight: "700",
            marginLeft: 12,
            marginTop: 12,
            color: colors.secondary_2,
          }}
        >
          Showing interested
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 5,
  },
  container: {
    borderBottomColor: colors.dark_opacity_2,
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
  },
  subheader: {
    marginTop: 10,
    color: colors.lighish2,
    textAlign: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  container_event: {
    marginTop: 12,
    marginLeft: 30,
    marginRight: 30,
    borderTopColor: colors.dark_opacity_2,
    borderTopWidth: 1,
    paddingHorizontal: 12,
  },
  container_e: {
    paddingHorizontal: 12,
  },
});

export default Header;
