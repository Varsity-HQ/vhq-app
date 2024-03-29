import React, { useState } from "react";
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

import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "../../config/colors";
import Image from "../../components/Image";
import Button from "../../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import InfoTextArea from "../../components/Dating/InfoText";
import InforBox from "../../components/Dating/InforBox";
import DatingVisibility from "../../components/Dating/DatingVisibility";
import { Ionicons } from "@expo/vector-icons";
import DatingProfilePicModal from "../../components/Dating/DatingProfilePicModal";
import { FontAwesome5 } from "@expo/vector-icons";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  CS_ABOUT,
  CS_INTERESTED_IN,
  CS_LOOKING_FOR,
  CS_NAME,
  DATING_HDIL,
  PREFERENCES,
  UPDATE_UNIVERSITY,
} from "../../navigation/routes";
import FancyButton from "../../components/FancyButton";
import universityShortName from "../../util/universityShortName";
import MyDatingDatingMenuModal from "../../components/Dating/MyDatingDatingMenuModal";

const height = Dimensions.get("window").height;

const mapStateToProps = (state) => {
  return {
    uploading_profilepic: state.datingReducer.profile.uploading_profilepic,
    profilepic: state.datingReducer.profile.profilepic,
    profile: state.datingReducer.profile,
  };
};

function MyDiscoverProfile({ uploading_profilepic, profilepic, profile }) {
  const inserts = useSafeAreaInsets();
  const navigation = useNavigation();

  //profile pic modal
  const [isPPModalVisible, setIsPPModalVisible] = useState(false);
  const handlePPModal = () => setIsPPModalVisible(() => !isPPModalVisible);

  //menu modal
  const [isMModalVisible, setIsMModalVisible] = useState(false);
  const handleMModal = () => setIsMModalVisible(() => !isMModalVisible);

  return (
    <ScrollView scroll style={[styles.container]}>
      <DatingProfilePicModal
        isModalVisible={isPPModalVisible}
        handleModal={handlePPModal}
        setIsModalVisible={setIsPPModalVisible}
      />
      <MyDatingDatingMenuModal
        isModalVisible={isMModalVisible}
        handleModal={handleMModal}
        setIsModalVisible={setIsMModalVisible}
      />
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
          rightPress={handleMModal}
        />
      </ImageBackground>
      <View style={styles.container}>
        <View style={styles.inner_container}>
          <View style={styles.profilepic_container}>
            <View style={styles.profile_changer_container}>
              <Image uri={profilepic} style={styles.profilepic} />
              <Button
                onPress={uploading_profilepic ? null : handlePPModal}
                style={[
                  styles.profile_image_overflow_item,
                  {
                    padding: 0,
                    top: -(height * 0.012),
                    margin: 0,
                  },
                ]}
                type={3}
                content={
                  <View style={styles.profile_image_overflow_item}>
                    <Ionicons
                      name="ios-camera-reverse-outline"
                      size={34}
                      color={colors.white}
                    />
                    {uploading_profilepic && (
                      <Text style={{ fontSize: 14 }}>Working..</Text>
                    )}
                  </View>
                }
              />
            </View>
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
                onPress={() => navigation.navigate(CS_NAME)}
                style={{
                  padding: 0,
                  backgroundColor: colors.transparent,
                }}
                content={
                  <>
                    <Text style={styles.name}>
                      {profile.nickname ? profile.nickname : "- - - - - -"}
                    </Text>
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
                Seen {profile.seen_count}
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
              paddingTop: 20,
            }}
          >
            <FancyButton
              style={[
                !profile.purpose && {
                  borderWidth: 1,
                  borderColor: colors.redish_2,
                },
              ]}
              icon={
                <FontAwesome5
                  name="user-friends"
                  size={18}
                  color={colors.secondary}
                />
              }
              onPress={() => navigation.navigate(CS_LOOKING_FOR)}
              header="What are you interested in"
              subText={`"I'm here ${profile.purpose.replace(/_/g, " ")}"`}
            />
            <FancyButton
              onPress={() => navigation.navigate(CS_INTERESTED_IN)}
              icon={
                <FontAwesome5
                  name="person-booth"
                  size={18}
                  color={colors.secondary}
                />
              }
              header="Control who you see"
              subText={`Show me ${
                profile.show_me.length === 2 ? " both " : " only "
              } ${JSON.stringify(profile.show_me)
                .replace(/le/g, "les")
                .replace(/","/g, " and ")
                .slice(2)
                .slice(0, -2)
                .trim()
                .toLowerCase()}`}
            />
            <Button
              type={2}
              onPress={() => navigation.navigate(DATING_HDIL)}
              title="How do i look"
              style={styles.hdil_button}
            />
            <InfoTextArea
              header="About"
              text={profile.about}
              html={true}
              actionButton={() => navigation.navigate(CS_ABOUT)}
            />
            <InforBox
              header="Main information"
              style={[
                !profile.gender || !profile.age || !profile.sexual_orientation
                  ? {
                      borderWidth: 1,
                      borderColor: colors.redish_2,
                    }
                  : null,
              ]}
              data={[
                {
                  title: "gender",
                  text: profile.gender,
                  hide: !profile.gender,
                },
                {
                  title: "star_sign",
                  text: profile.star_sign,
                  hide: !profile.star_sign,
                },
                {
                  title: "age",
                  text: profile.age,
                  hide: !profile.age,
                },
                {
                  title: "s_orientation",
                  text: profile.sexual_orientation,
                  hide: !profile.sexual_orientation,
                },
                {
                  title: "yearOfStudy",
                  text:
                    profile.yearOfStudy !== "postgraduates"
                      ? profile.yearOfStudy + " year"
                      : "Postgraduate",
                  hide: !profile.yearOfStudy,
                },
                {
                  title: "university",
                  text: universityShortName(profile.university),
                  hide: !profile.university,
                },
              ]}
              actionButton={() => navigation.navigate(PREFERENCES)}
            />
            <InfoTextArea
              header="University/College"
              text={profile.university}
              actionButton={() => navigation.navigate(UPDATE_UNIVERSITY)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hdil_button: {
    backgroundColor: "#3c4a60",
    marginBottom: 30,
    borderColor: colors.darkish3,
    borderWidth: 1,
  },
  profile_image_overflow_item: {
    position: "absolute",
    top: 1,
    backgroundColor: colors.dark_opacity,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  profile_changer_container: {
    backgroundColor: colors.dark_opacity_2,
    zIndex: 1,
    borderRadius: 1000,
    position: "relative",
    overflow: "hidden",
  },
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

export default connect(mapStateToProps, null)(MyDiscoverProfile);
