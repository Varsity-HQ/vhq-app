import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import colors from "../../config/colors";
import AppText from "../AppText";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

function header3({
  backBtnText = "Cancel",
  backPress,
  rightPress,
  title,
  buttonText,
  loading = false,
  backIcon,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.w33}>
          <TouchableOpacity
            disabled={loading}
            onPress={backPress}
            style={[
              styles.button,
              {
                paddingVertical: backIcon ? 0 : 8,
              },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                opacity: loading ? 0.5 : 1,
              }}
            >
              {backIcon ? (
                <Ionicons
                  name="chevron-back-outline"
                  color={colors.white}
                  size={35}
                />
              ) : (
                <AppText style={[styles.text]}>{backBtnText}</AppText>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.center_container}>
          <AppText style={[styles.text, { marginLeft: 10, fontWeight: "700" }]}>
            {title}
          </AppText>
        </View>
        <View style={[styles.w33, { alignItems: "flex-end" }]}>
          <TouchableOpacity
            disabled={loading}
            onPress={rightPress}
            style={[styles.button, { paddingRight: 20 }]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                opacity: loading ? 0.5 : 1,
              }}
            >
              <ActivityIndicator
                animating={loading}
                size="small"
                color={colors.secondary}
                style={{ marginRight: 10 }}
              />
              <AppText
                style={[
                  styles.text,
                  { color: colors.secondary, fontWeight: "700" },
                ]}
              >
                {buttonText}
              </AppText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  w33: {
    // width: "33%",
    //   flex: 1,
  },
  grandient: {},
  button: {
    backgroundColor: colors.dark,
    paddingHorizontal: 10,
    // paddingVertical: 8,
    borderRadius: 5,
  },
  center_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // width: "33%",
    flex: 1,
  },
  text: {
    // fontWeight: "700",
    fontSize: 18,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    // paddingHorizontal: 10,
  },
  grandient: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  container: {
    backgroundColor: colors.dark,
    borderBottomColor: colors.secondary,
    borderBottomWidth: 1,
  },
});

export default header3;
