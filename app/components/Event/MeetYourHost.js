import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import colors from "../../config/colors";
import Image from "../Image";
import Text from "../AppText";
import Button from "../Button";
import { useNavigation } from "@react-navigation/native";
import { CHAT_PAGE } from "../../navigation/routes";

const width = Dimensions.get("window").width;

function MeetYourHost({ data }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Host</Text>
      <Image style={styles.pp} uri={data.profilepic} />
      <Text
        style={[
          styles.text,
          {
            fontWeight: "700",
            marginBottom: 5,
          },
        ]}
      >
        {data.firstname} {data.surname}
      </Text>
      <Text style={styles.text}>@{data.username}</Text>
      <Button
        onPress={() => {
          navigation.navigate(CHAT_PAGE, {
            uid: data.userID,
            username: data.username,
          });
        }}
        type={3}
        style={{ marginTop: 15 }}
        title="Message"
      />
      <Text style={styles.text2}>{data.university}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text2: {
    textAlign: "center",
    color: colors.secondary_2,
    fontSize: 16,
    marginTop: 10,
  },
  text: {
    textAlign: "center",
    color: colors.secondary,
    fontSize: 18,
  },
  heading: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 30,
    color: colors.secondary_2,
  },
  pp: {
    height: width * 0.3,
    width: width * 0.3,
    alignSelf: "center",
    borderRadius: 1000,
    marginBottom: 15,
  },
  container: {
    borderWidth: 1,
    borderColor: colors.secondary_2,
    margin: 12,
    padding: 20,
    borderRadius: 10,
  },
});

export default MeetYourHost;
