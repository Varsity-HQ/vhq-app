import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  ImageBackground,
  Dimensions,
} from "react-native";
import Header from "../../components/headers/header3";
import Text from "../../components/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "../../config/colors";
import Image from "../../components/Image";
import Button from "../../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import IconButton from "../../components/IconButton";
import FindsMatchPercentage from "../../components/Dating/FindsMatchPercentage";
import FindsMotive from "../../components/Dating/FindsMotive";
import InfoTextArea from "../../components/Dating/InfoText";
import InforBox from "../../components/Dating/InforBox";

const height = Dimensions.get("window").height;

function DatingProfilePage(props) {
  const inserts = useSafeAreaInsets();
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 45);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 45],
    outputRange: [0, -45],
  });

  return (
    <ScrollView scroll style={[styles.container]}>
      <ImageBackground
        source={require("../../assets/background-pattern.png")}
        style={[
          styles.top_section,
          {
            paddingTop: inserts.top,
          },
        ]}
      >
        <Header
          noBorder
          backIcon
          noBg
          buttonText="ellipsis"
          rightPress={() => console.log("pressed")}
        />
      </ImageBackground>
      <View style={styles.container}>
        <View style={styles.inner_container}>
          <View style={styles.profilepic_container}>
            <Image
              uri="https://varsityhq.imgix.net/vhq_img202145455255.jpeg"
              style={styles.profilepic}
            />
          </View>
          <View style={styles.meta_container}>
            <Text style={styles.name}>hector</Text>
            <Text
              style={[
                styles.text,
                {
                  fontSize: RFValue(12),
                },
              ]}
            >
              Seen 12,432
            </Text>
            <Text
              style={[
                styles.text,
                {
                  marginTop: 5,
                },
              ]}
            >
              2nd Year Student,{" "}
              <Text
                style={{
                  fontWeight: "700",
                }}
              >
                UJ
              </Text>
            </Text>
            <View
              style={{
                paddingVertical: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <IconButton
                icon={
                  <MaterialCommunityIcons
                    name="laser-pointer"
                    size={30}
                    color={colors.secondary}
                  />
                }
                text="Poke"
                textStyle={styles.btnText}
              />
              <IconButton
                icon={
                  <MaterialCommunityIcons
                    name="chat"
                    size={30}
                    color={colors.secondary}
                  />
                }
                style={{
                  marginHorizontal: 30,
                }}
                text="Message"
                textStyle={styles.btnText}
              />
              <IconButton
                icon={
                  <MaterialCommunityIcons
                    name="flag"
                    size={30}
                    color={colors.secondary}
                  />
                }
                text="Report"
                textStyle={styles.btnText}
              />
            </View>
          </View>
          <View
            style={{
              borderTopColor: colors.dark_opacity_2,
              borderTopWidth: 1,
              marginHorizontal: 15,
              marginTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <FindsMotive />
              <View style={{ paddingHorizontal: 5 }} />
              <FindsMatchPercentage />
              <Text style={{ marginLeft: 10 }}>Great match !</Text>
            </View>
            <InfoTextArea
              header="About"
              text="Just chatting with people and meeting new friends. I have nothing to
            offer"
            />
            <InforBox header="Main information" />
            <InfoTextArea
              header="University/College"
              text="University of Johannesburg"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  btnText: {
    color: colors.secondary,
    fontSize: 14,
  },
  meta_container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.secondary,
  },
  name: {
    fontWeight: "700",
    fontSize: RFValue(18),
    marginTop: 14,
    marginBottom: 8,
  },
  profilepic_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  profilepic: {
    borderRadius: 1000,
    height: height * 0.17,
    width: height * 0.17,
    borderWidth: 4,
    borderColor: colors.secondary,
  },
  inner_container: {
    top: -(height * 0.08),
  },
  container: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // backgroundColor: colors.dark,
  },
  top_section: {
    backgroundColor: colors.secondary_2,
    height: height * 0.25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default DatingProfilePage;
