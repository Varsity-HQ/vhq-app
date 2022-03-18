import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../config/colors";
import Image from "../Image";
import Text from "../AppText";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

function ChatPageHeader({ loading, username }) {
  const navigation = useNavigation();

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.inner_container}>
          <View style={styles.inner_container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back-sharp"
                size={34}
                color={colors.white}
              />
            </TouchableOpacity>
            <View style={styles.inner_container}>
              <View
                style={{
                  marginLeft: "40%",
                }}
              >
                <Text style={[styles.name]}>{username}</Text>
              </View>
            </View>
          </View>
          <View></View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <View style={styles.inner_container}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-sharp" size={34} color={colors.white} />
          </TouchableOpacity>
          <View style={styles.inner_container}>
            <Image
              uri={
                "https://varsityhq.imgix.net/vhq_781bd74f-10c2-40a6-b2bc-832494da7067.jpeg"
              }
              style={styles.profilepic}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.name}>Harmony Chikari</Text>
              <Text style={styles.sub}>@chikx_12</Text>
            </View>
          </View>
        </View>
        <View>
          <Ionicons
            name="ellipsis-horizontal-outline"
            size={34}
            color={colors.white}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontWeight: "700",
    fontSize: RFValue(16),
    marginBottom: 3,
  },
  sub: {
    color: colors.secondary,
  },
  profilepic: {
    height: 45,
    width: 45,
    borderRadius: 100,
    marginLeft: 10,
  },
  inner_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    padding: 10,
    borderBottomColor: colors.secondary_2,
    borderBottomWidth: 1,
  },
});

export default ChatPageHeader;
