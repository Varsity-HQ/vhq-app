import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
  MY_DISCOVER_PROFILE,
} from "../../navigation/routes";
import { initialize_discover_page } from "../../store/actions/datingActions";
import { normalizeText } from "../../util/responsivePx";

const height = Dimensions.get("window").height;

const mapStateToProps = (state) => {
  return {
    profilepic: state.core.accData.profilepic,
    discover_profile_id: state.core.accData.discover_profile_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initialize_discover_page: () => dispatch(initialize_discover_page()),
  };
};

function DatingIntroScreen({ profilepic, loading }) {
  const navigation = useNavigation();

  // if (!discover_profile_id) {
  //   useFocusEffect(
  //     React.useCallback(() => {
  //       initialize_discover_page();
  //     }, []),
  //   );
  // }
  //
  //
  if (loading) {
    return (
      <Screen style={styles.container}>
        <View style={{ width: "85%" }}>
          <View style={styles.pp_images}>
            <Image
              local
              style={styles.other_pp1}
              uri={require("../../assets/img3.jpg")}
            />
            <DatingLoader />
            <Image
              local
              style={styles.other_pp2}
              uri={require("../../assets/img1.jpg")}
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
            Hold on..
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
  //

  // if (!loading && profile.is_active) {
  //   navigation.navigate(DATING_CONTAINER);
  // }

  //
  return (
    <Screen style={styles.container}>
      <View style={{ width: "85%" }}>
        <View style={styles.pp_images}>
          <Image
            local
            style={styles.other_pp1}
            uri={require("../../assets/img2.jpg")}
          />
          <Image style={styles.my_pp} uri={profilepic} />
          <Image
            local
            style={styles.other_pp2}
            uri={require("../../assets/img4.jpg")}
          />
        </View>
        <Text style={[styles.center, styles.heading]}>
          Activate your profile
        </Text>
        <Text style={styles.subText}>
          Meet new friends, discover cool people and maybe go on dates 🙃.
          Activate your discovery profile and start connecting.
        </Text>
        <Button
          onPress={() => navigation.navigate(MY_DISCOVER_PROFILE)}
          style={[styles.center, styles.create_button]}
          title="My PROFILE"
        />
        <Text style={[styles.center, styles.text_bottom]}>v1.0.2</Text>
        {/* <TouchableOpacity onPress={() => navigation.navigate(DATING_CONTAINER)}>
        </TouchableOpacity> */}
      </View>
    </Screen>
  );
  //
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
    height: height * 0.12,
    width: height * 0.12,
    borderRadius: 100,
    // zIndex: 1,
    right: -25,
    position: "relative",
  },
  other_pp2: {
    height: height * 0.12,
    width: height * 0.12,
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
    borderWidth: 10,
    borderColor: colors.dark,
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

export default connect(mapStateToProps, mapDispatchToProps)(DatingIntroScreen);
