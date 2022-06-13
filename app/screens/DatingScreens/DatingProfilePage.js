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
            <TextArea
              header="About"
              text="Just chatting with people and meeting new friends. I have nothing to
            offer"
            />
            <Inforbox header="Main information" />
            <TextArea
              header="University/College"
              text="University of Johannesburg"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const TextArea = ({ header, text }) => (
  <View
    style={{
      marginBottom: 12,
    }}
  >
    <Text
      style={{
        fontSize: RFValue(12),
        fontWeight: "700",
        marginBottom: 10,
        color: colors.secondary_2,
      }}
    >
      {header}
    </Text>
    <View style={styles.c_area}>
      <Text style={{ color: colors.secondary }}>{text}</Text>
    </View>
  </View>
);

const Inforbox = ({ header, text }) => {
  return (
    <View
      style={{
        marginBottom: 12,
      }}
    >
      <Text
        style={{
          fontSize: RFValue(12),
          fontWeight: "700",
          marginBottom: 10,
          color: colors.secondary_2,
        }}
      >
        {header}
      </Text>
      <View
        style={[
          styles.c_area,
          styles.c_i_area,
          {
            paddingBottom: 7,
          },
        ]}
      >
        <InfoItem name="gender" text="Male" />
        <InfoItem name="star_sign" text="Sagittarius" />
        <InfoItem name="age" text="18" />
        <InfoItem name="s_orientation" text="Straight" />
        <InfoItem name="university" text="UJ" />
      </View>
    </View>
  );
};

const InfoItem = ({ name, text }) => {
  return (
    <View style={styles.info_item}>
      <View></View>
      <View>
        <Text style={{ color: colors.lighish2 }}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  c_i_area: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  info_item: {
    backgroundColor: colors.secondary_2,
    paddingHorizontal: 12,
    marginRight: 5,
    borderRadius: 30,
    paddingVertical: 8,
    marginBottom: 8,
  },
  c_area: {
    backgroundColor: colors.dark_opacity_2,
    padding: 15,
    borderRadius: 15,
  },
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
