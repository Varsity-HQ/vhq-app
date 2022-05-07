import React from "react";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  ImageBackground,
  View,
  Linking,
} from "react-native";
import colors from "../../config/colors";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../Button";
import Text from "../AppText";
import { FontAwesome } from "@expo/vector-icons";
import { COPY_URL_IN_POST } from "../../util/toast_messages";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";

const height = Dimensions.get("window").height;

function Adverts({ ads }) {
  if (ads.length === 0) return null;
  return (
    <ScrollView horizontal style={styles.container}>
      {ads.map((x, index) => (
        <Advert x={x} />
      ))}
    </ScrollView>
  );
}

const Advert = ({ x }) => {
  const handleLink = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Clipboard.setString(url);
      Toast.show({
        type: "general",
        autoHide: true,
        ...COPY_URL_IN_POST,
      });
    }
  };

  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.ad_container}
      source={{
        uri: x.attachments[0],
      }}
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-end",
          padding: 10,
          flex: 1,
          justifyContent: "flex-end",
          zIndex: 1,
          //   justifyContent: "center",
        }}
      >
        <Button
          onPress={() => {
            handleLink(x.call_to_action_link);
          }}
          type={6}
          //   style={{ opacity: 0.1 }}
          content={
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FontAwesome
                name="external-link"
                size={16}
                color={colors.white}
              />
              {/* <Text> {x.call_to_action_button_text}</Text> */}
            </View>
          }
        />
      </View>
      <LinearGradient
        start={[0, 0]}
        end={[0, 1]}
        style={styles.grad}
        colors={[colors.transparent, colors.dark]}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  grad: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
  },
  container: {
    borderTopColor: colors.dark_opacity_2,
    borderTopWidth: 5,
    borderBottomColor: colors.circleColor,
    // borderBottomWidth: 5,
  },
  ad_container: {
    height: height * 0.18,
    width: height * 0.28,
  },
});

export default Adverts;
