import React from "react";
import { View, StyleSheet, Image } from "react-native";
import colors from "../config/colors";
import Text from "./AppText";

function AppToast({ text1, text2 }) {
  if (!text2) return null;
  //   if (!text1) return null;

  return (
    <View
      style={{
        width: "100%",
        padding: 10,
      }}
    >
      <View
        style={{
          borderWidth: 2,
          borderColor: colors.primary,
          backgroundColor: colors.darkish3,
          padding: 10,
          borderRadius: 10,
          // borderLeftColor: colors.primary,
          borderLeftWidth: 6,
          borderRightWidth: 6,
          shadowColor: colors.black,
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.37,
          shadowRadius: 7.49,
          elevation: 12,
        }}
      >
        {/* <Text>F</Text> */}

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View>
            <Image
              style={{
                height: 25,
                width: 25,
                marginRight: 7,
              }}
              source={require("../assets/vhqcat-small.png")}
            />
          </View>
          <View>
            <Text
              style={[
                { fontWeight: "700" },
                text1 !== "" && {
                  height: 0,
                },
              ]}
            >
              {text1 !== "" ? text1 : ""}
            </Text>

            <Text style={{ fontWeight: "600" }}>
              {text2 !== "" ? text2 : "VarsityHQ says Hi !"}
            </Text>

            <Text
              style={{
                fontSize: 10,
                marginTop: 5,
              }}
            >
              Swipe up to close
            </Text>
          </View>
        </View>

        {/* <Text>{props.uuid}</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppToast;
