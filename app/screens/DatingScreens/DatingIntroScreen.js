import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import Text from "../../components/AppText";
import Button from "../../components/Button";
import Image from "../../components/Image";
import DatingLoader from "../../components/Loaders/DatingLoader";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import { CREATE_SHOW, DATING_ENCOUNTERS } from "../../navigation/routes";
import { normalizeText } from "../../util/responsivePx";

const height = Dimensions.get("window").height;

const mapStateToProps = (state) => {
  return {
    profilepic: state.core.accData.profilepic,
  };
};

function DatingIntroScreen({ profilepic, navigation }) {
  if (true) {
    return (
      <Screen style={styles.container}>
        <View style={{ width: "85%" }}>
          <View style={styles.pp_images}>
            <Image
              style={styles.other_pp1}
              uri={
                "https://image.shutterstock.com/image-photo/close-beauty-portrait-young-charming-600w-1931216711.jpg"
              }
            />
            <DatingLoader />
            <Image
              style={styles.other_pp2}
              uri={
                "https://image.shutterstock.com/image-photo/portrait-beautiful-african-american-female-600w-721419679.jpg"
              }
            />
          </View>
          <Text style={[styles.center, styles.heading]}>Hold on</Text>
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
            style={styles.other_pp1}
            uri={
              "https://image.shutterstock.com/image-photo/close-beauty-portrait-young-charming-600w-1931216711.jpg"
            }
          />
          <Image style={styles.my_pp} uri={profilepic} />
          <Image
            style={styles.other_pp2}
            uri={
              "https://image.shutterstock.com/image-photo/portrait-beautiful-african-american-female-600w-721419679.jpg"
            }
          />
        </View>
        <Text style={[styles.center, styles.heading]}>
          Ready to meet someone ?
        </Text>
        <Text style={styles.subText}>
          Create a show to meet and chat to more encounters around your
          university. We actually show you people that are looking for an
          encounter and no dead profiles
        </Text>
        <Button
          onPress={() => navigation.navigate(CREATE_SHOW)}
          style={[styles.center]}
          title="Create Show"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate(DATING_ENCOUNTERS)}
        >
          <Text style={[styles.center, styles.text_bottom]}>
            See encounters
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  other_pp1: {
    height: height * 0.15,
    width: height * 0.15,
    borderRadius: 100,
    // zIndex: 1,
    right: -15,
    position: "relative",
  },
  other_pp2: {
    height: height * 0.15,
    width: height * 0.15,
    borderRadius: 100,
    zIndex: -1,
    position: "relative",
    left: -15,
  },
  pp_images: {
    marginBottom: 20,
    // borderWidth: 1,
    // borderColor: "red",
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
    // elevation: 50,
  },
  my_pp: {
    height: height * 0.19,
    width: height * 0.19,
    // aspectRatio: 9 / 16,
    // height: "100%",
    borderRadius: 100,
  },
  heading: {
    fontSize: RFValue(22),
    fontWeight: "700",
    marginBottom: 10,
  },
  subText: {
    color: colors.secondary,
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
