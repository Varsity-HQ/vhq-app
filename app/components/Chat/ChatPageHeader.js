import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../config/colors";
import Image from "../Image";
import Text from "../AppText";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import OnlineIndicator from "../Dating/OnlineIndicator";
import * as geofire from "geofire-common";
import DistanceIndicator from "../Dating/DistanceIndicator";

function ChatPageHeader({ loading, username, account, dating = false }) {
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
                  marginLeft: 10,
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

  if (dating) {
    return (
      <View style={styles.container}>
        <View style={styles.inner_container}>
          <View style={styles.inner_container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back-sharp"
                size={34}
                color={colors.secondary_2}
              />
            </TouchableOpacity>
            <View style={styles.inner_container}>
              <Image uri={account.profilepic} style={styles.profilepic} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.name}>{account.nickname}</Text>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <OnlineIndicator online={account.is_online} />
                  <View style={{ flexDirection: "row" }}>
                    <DistanceIndicator data={account} />
                  </View>
                </View>
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
  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <View style={[styles.inner_container]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-sharp"
              size={34}
              color={colors.secondary_2}
            />
          </TouchableOpacity>
          <View style={styles.inner_container}>
            <Image uri={account.profilepic} style={styles.profilepic} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.name}>
                {account.firstname} {account.surname}
              </Text>
              <Text style={styles.sub}>@{account.username}</Text>
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
    borderBottomColor: colors.dark_opacity_2,
    borderBottomWidth: 1,
  },
});

export default ChatPageHeader;
