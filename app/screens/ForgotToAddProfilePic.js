import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import ProfilePicChanger from "../components/ProfilePicChanger";
import Screen from "../components/Screen";
import Text from "../components/AppText";
import { normalizeText } from "../util/responsivePx";
import colors from "../config/colors";
import AppButton from "../components/Button";
import { update_profile_pic } from "../store/actions/actions";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
  return {
    update_profile_pic: (uri) => dispatch(update_profile_pic(uri)),
  };
};

const mapStateToProps = (state) => {
  return {
    username: state.core.accData.username,
    loading: state.core.saving_profile_pic_settings,
  };
};

function ForgotToAddProfilePic({ loading, update_profile_pic, username }) {
  const [puri, setPuri] = useState("");

  const setProfilePic = (uri) => {
    setPuri(uri);
  };

  const handleUpload = () => {
    if (!puri)
      return Alert.alert(
        `@${username}`,
        "Please upload a profile picture first before continuing",
      );
    update_profile_pic(puri);
  };

  return (
    <Screen style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          borderBottomWidth: 5,
          paddingBottom: 15,
          marginBottom: 40,
          marginTop: 10,
          borderColor: colors.primary,
        }}
      >
        <Text style={{ fontSize: normalizeText(20), fontWeight: "700" }}>
          Add a Profile Picture
        </Text>
      </View>
      <ProfilePicChanger
        image={puri}
        onImgChange={(uri) => {
          setProfilePic(uri);
        }}
      />

      <Text
        style={{
          fontSize: normalizeText(16),
          fontWeight: "700",
          alignSelf: "center",
        }}
      >
        Tap to select
      </Text>
      <Text
        style={{
          fontSize: normalizeText(15),
          alignSelf: "center",
          marginTop: 20,
          color: colors.secondary,
          textAlign: "center",
        }}
      >
        Accounts with profile pictures are more appealing on Varsity
        Headquarters. Make sure you have one before we continue.
      </Text>

      <AppButton
        loading={loading}
        style={{
          marginTop: 40,
          width: "75%",
          alignSelf: "center",
        }}
        title="Upload"
        onPress={handleUpload}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotToAddProfilePic);
