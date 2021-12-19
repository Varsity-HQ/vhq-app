import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import colors from "../../config/colors";

import RIcon from "react-native-remix-icon";
import Text from "../AppText";
import { Ionicons } from "@expo/vector-icons";
import SkeletonComponent from "./SkeletonComponent";

function SearchSkeleton(props) {
  return (
    <View style={styles.container}>
      <View style={styles.scontainer}>
        <View style={styles.innerContainer}>
          <TextInput
            editable={false}
            selectTextOnFocus={false}
            placeholderTextColor={colors.secondary}
            style={styles.input}
            placeholder="Preparing search.."
          />
          <View style={styles.button}>
            <RIcon name="search-2-line" size={25} color={colors.primary} />
          </View>
        </View>
      </View>
      <View style={styles.tcontainer}>
        <View>
          <Text style={styles.header}>Loading..</Text>
        </View>
        <Trend />
        <Trend />
      </View>
      <View style={{ padding: 20, alignSelf: "center" }}>
        <Text>Please wait</Text>
      </View>
    </View>
  );
}

function Trend() {
  return (
    <SkeletonComponent style={styles.trend}>
      <View>
        <Ionicons
          color={colors.darkish2}
          size={28}
          name="arrow-forward-outline"
        />
      </View>
      <View
        style={{
          marginLeft: 18,
          flex: 1,
        }}
      >
        <View>
          <Text style={styles.tr_t1}>.</Text>
          <Text style={styles.tr_t2}>#Loading..</Text>
          <Text style={styles.tr_t3}>.</Text>
        </View>
      </View>
      <View></View>
    </SkeletonComponent>
  );
}

const styles = StyleSheet.create({
  tr_t1: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.darkish2,
  },
  tr_t2: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.darkish2,
  },
  tr_t3: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.darkish2,
  },
  trend: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: colors.black,
    borderTopWidth: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "800",
    padding: 10,
    color: colors.secondary,
  },
  tcontainer: {
    backgroundColor: colors.darkish,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    height: 23,
    borderLeftColor: colors.primary,
    borderLeftWidth: 2,
    alignItems: "center",
    flexDirection: "row",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    color: colors.white,
    flex: 1,
    padding: 10,
    borderColor: "red",
    // borderWidth: 1,
    fontSize: 16,
  },
  scontainer: {
    padding: 10,
    borderBottomWidth: 3,
    borderBottomColor: colors.primary,
  },
});

export default SearchSkeleton;
