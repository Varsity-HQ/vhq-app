import React from "react";
import { View, StyleSheet, TextInput, ActivityIndicator } from "react-native";
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
          <SkeletonComponent duration={2000} style={styles.header} />
        </View>
        <Trend />
        <Trend />
      </View>
      <View style={{ padding: 20, alignSelf: "center" }}>
        <Text>Please wait</Text>
        <ActivityIndicator
          color={colors.primary}
          size="large"
          style={{ marginTop: 20 }}
        />
      </View>
    </View>
  );
}

function Trend() {
  return (
    <View style={styles.trend}>
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
          <SkeletonComponent duration={2000} style={styles.tr_t1} />
          <SkeletonComponent duration={2000} style={styles.tr_t2} />
          <SkeletonComponent duration={2000} style={styles.tr_t3} />
        </View>
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  tr_t1: {
    height: 16,
    width: "25%",
    marginBottom: 10,
    fontWeight: "700",
    color: colors.darkish2,
  },
  tr_t2: {
    height: 18,
    fontWeight: "700",
    width: "75%",
    color: colors.darkish2,
  },
  tr_t3: {
    height: 16,
    fontWeight: "500",
    width: "50%",
    marginTop: 10,
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
    height: 20,
    width: "45%",
    marginLeft: 10,
    fontWeight: "800",
    marginVertical: 20,
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
