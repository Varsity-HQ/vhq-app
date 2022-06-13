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
import DatingVisibility from "../../components/Dating/DatingVisibility";
import { Ionicons } from "@expo/vector-icons";

const height = Dimensions.get("window").height;

function MyDiscoverProfile(props) {
  const inserts = useSafeAreaInsets();
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
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                type={3}
                style={{
                  padding: 0,
                  backgroundColor: colors.transparent,
                }}
                content={
                  <>
                    <Text style={styles.name}>hector_shies</Text>
                    <View
                      style={[
                        styles.row,
                        {
                          marginBottom: 8,
                        },
                      ]}
                    >
                      <Text style={styles.name_change_text}>tap to change</Text>
                      <Ionicons
                        name="pencil"
                        size={14}
                        color={colors.secondary}
                      />
                    </View>
                  </>
                }
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="ios-eye" size={20} color={colors.secondary} />
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: RFValue(12),
                    marginLeft: 5,
                  },
                ]}
              >
                Seen 12,432
              </Text>
            </View>
          </View>
          <DatingVisibility />
          <View
            style={{
              borderTopColor: colors.dark_opacity_2,
              borderTopWidth: 1,
              marginHorizontal: 15,
              marginTop: 20,
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: colors.secondary,
    fontSize: 14,
  },
  meta_container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    color: colors.secondary,
  },
  name: {
    fontWeight: "700",
    fontSize: RFValue(18),
    marginTop: 14,
  },
  name_change_text: {
    fontSize: RFValue(12),
    marginRight: 5,
    color: colors.secondary,
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

export default MyDiscoverProfile;
