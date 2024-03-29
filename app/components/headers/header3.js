import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../config/colors";
import AppText from "../AppText";
import { connect } from "react-redux";
import Image from "../Image";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

const height = Dimensions.get("window").height;

const mapStateToProps = (state) => {
  return {
    account: state.core.accData,
  };
};

function header3({
  account,
  showAccount,
  bgActive,
  backBtnText = "Cancel",
  backPress,
  rightPress,
  title,
  buttonText,
  loading = false,
  backIcon,
  style,
  noBorder,
  noBg,
}) {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (backPress) {
      backPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <>
      {/* <StatusBar animated={true} backgroundColor={colors.primary} /> */}
      <View
        style={[
          styles.container,
          style,
          noBorder && {
            borderBottomWidth: 0,
          },
          bgActive && {
            backgroundColor: colors.primary,
            borderBottomWidth: 0,
          },
          noBg && {
            backgroundColor: colors.transparent,
            borderBottomWidth: 0,
          },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.w33}>
            <TouchableOpacity
              disabled={loading}
              onPress={handleBackPress}
              style={[
                styles.button,
                {
                  paddingVertical: backIcon ? 0 : 8,
                  backgroundColor: bgActive ? colors.primary : colors.dark,
                },
                noBg && {
                  backgroundColor: colors.transparent,
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

                {showAccount && (
                  <View>
                    <View style={styles.row}>
                      <Image
                        style={styles.profilepic}
                        uri={account.profilepic}
                      />
                      <View style={{ marginLeft: 10 }}>
                        <AppText style={[styles.name]}>
                          {account.firstname}&nbsp;{account.surname.charAt(0)}
                        </AppText>
                        <AppText
                          style={[styles.text, { color: colors.secondary }]}
                        >
                          {backBtnText}
                        </AppText>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.center_container}>
            <AppText
              style={[styles.text, { marginLeft: 10, fontWeight: "700" }]}
            >
              {title}
            </AppText>
          </View>
          <View style={[styles.w33, { alignItems: "flex-end" }]}>
            <TouchableOpacity
              disabled={loading}
              onPress={rightPress}
              style={[
                styles.button,
                {
                  paddingRight: 20,
                  backgroundColor: bgActive ? colors.primary : colors.dark,
                },
                noBg && {
                  backgroundColor: colors.transparent,
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
                <ActivityIndicator
                  animating={loading}
                  size="small"
                  color={colors.secondary}
                  style={{ marginRight: 10 }}
                />
                {buttonText === "ellipsis" ? (
                  <Ionicons
                    name="ellipsis-vertical"
                    size={24}
                    color={colors.white}
                  />
                ) : (
                  <AppText
                    style={[
                      styles.text,
                      { color: colors.secondary, fontWeight: "700" },
                    ]}
                  >
                    {buttonText}
                  </AppText>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  name: {
    fontWeight: "700",
    fontSize: RFValue(16),
    marginBottom: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilepic: {
    height: height * 0.058,
    width: height * 0.058,
    borderRadius: 100,
  },
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
    borderBottomColor: colors.dark_opacity_2,
    borderBottomWidth: 1,
  },
});

export default connect(mapStateToProps, null)(header3);
