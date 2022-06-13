import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import Text from "../../components/AppText";
import Button from "../../components/Button";
import Image from "../../components/Image";
import DatingLoader from "../../components/Loaders/HomeUploading";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import {
  CREATE_SHOW,
  DATING_CONTAINER,
  DATING_ENCOUNTERS,
} from "../../navigation/routes";
import { normalizeText } from "../../util/responsivePx";

const height = Dimensions.get("window").height;

const mapStateToProps = (state) => {
  return {
    profilepic: state.core.accData.profilepic,
  };
};

function DatingIntroScreen({ profilepic, navigation }) {
  if (false) {
    return (
      <Screen style={styles.container}>
        <View style={{ width: "85%" }}>
          <View style={styles.pp_images}>
            <Image
              local
              style={styles.other_pp1}
              uri={{
                uri: "https://image.shutterstock.com/image-photo/women-beauty-health-wellness-make-600w-731113330.jpg",
              }}
            />
            <DatingLoader />
            <Image
              local
              style={styles.other_pp2}
              uri={{
                uri: "https://image.shutterstock.com/image-photo/women-beauty-health-wellness-make-600w-731113330.jpg",
              }}
            />
          </View>
          <Text
            style={[
              styles.center,
              styles.heading,
              {
                marginBottom: 30,
              },
            ]}
          >
            Wait..
          </Text>
          <View style={styles.hContainer}>
            <Text style={[styles.center, styles.subText]}>
              Make new friends
            </Text>
          </View>
          <View style={styles.hContainer}>
            <Text style={[styles.center, styles.subText]}>
              Chat with new people
            </Text>
          </View>
          <View style={styles.hContainer}>
            <Text style={[styles.center, styles.subText]}>
              Discover encounters
            </Text>
          </View>
          <Text style={styles.subText}></Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen style={styles.container}>
      <View style={{ width: "85%" }}>
        <View style={styles.pp_images}>
          <Image
            local
            style={styles.other_pp1}
            uri={{
              uri: "https://image.shutterstock.com/image-photo/close-beauty-portrait-young-charming-600w-1931216711.jpg",
            }}
          />
          <Image style={styles.my_pp} uri={profilepic} />
          <Image
            local
            style={styles.other_pp2}
            uri={{
              uri: "https://image.shutterstock.com/image-photo/close-portrait-beautiful-girl-black-600w-2158289069.jpg",
            }}
          />
        </View>
        <Text style={[styles.center, styles.heading]}>Set up your profile</Text>
        <Text style={styles.subText}>
          Meet new friends, discover cool people and maybe go on dates 🙃. Get
          started by setting up your discovery profile and meet friends
        </Text>
        <Button
          onPress={() => navigation.navigate(CREATE_SHOW)}
          style={[styles.center, styles.create_button]}
          title="GET STARTED"
        />
        <TouchableOpacity onPress={() => navigation.navigate(DATING_CONTAINER)}>
          <Text style={[styles.center, styles.text_bottom]}>Take a peek</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  create_button: {
    borderWidth: 1,
  },
  hContainer: {
    backgroundColor: colors.dark_opacity_2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    borderTopEndRadius: 30,
    borderBottomLeftRadius: 30,
    marginBottom: 10,
  },
  other_pp1: {
    height: height * 0.13,
    width: height * 0.13,
    borderRadius: 100,
    // zIndex: 1,
    right: -25,
    position: "relative",
  },
  other_pp2: {
    height: height * 0.13,
    width: height * 0.13,
    borderRadius: 100,
    zIndex: -1,
    position: "relative",
    left: -25,
  },
  pp_images: {
    marginBottom: 20,

    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
    // elevation: 50,
  },
  my_pp: {
    height: height * 0.16,
    width: height * 0.16,
    // aspectRatio: 9 / 16,
    // height: "100%",
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors.secondary,
  },
  heading: {
    fontSize: RFValue(17),
    fontWeight: "700",
    marginBottom: 10,
  },
  subText: {
    color: colors.secondary_2,
    fontSize: RFValue(13),
    textAlign: "center",
    marginBottom: 10,
  },
  text_bottom: {
    color: colors.secondary_2,
    marginTop: 10,
  },
  center: {
    alignSelf: "center",
  },
  container: {
    // padding: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default connect(mapStateToProps, null)(DatingIntroScreen);
