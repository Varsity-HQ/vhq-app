import React, { useState } from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import { connect } from "react-redux";
import ProfilePicChanger from "../../components/ProfilePicChanger";
import Text from "../../components/AppText";
import colors from "../../config/colors";
import Input from "../../components/Input";
import {
  UPDATE_ABOUT,
  UPDATE_FIRSTNAME,
  UPDATE_SURNAME,
  UPDATE_USERNAME,
} from "../../navigation/routes";

const mapStateToProps = (state) => {
  return {
    userData: state.core.accData,
  };
};

function UpdateProfile({ loading = false, navigation, userData }) {
  const [profilepic, setProfilePic] = useState(userData.profilepic);

  return (
    <Screen scroll>
      <Header
        loading={loading}
        backPress={() => navigation.goBack()}
        backBtnText="Done"
        buttonText="Save"
        title={`@${userData.username}`}
        //    rightPress={saveGender}
      />
      <View style={styles.container}>
        <View style={{ marginBottom: 20 }}>
          <ProfilePicChanger
            image={profilepic}
            onImgChange={(uri) => setProfilePic(uri)}
          />
          <Text
            style={{
              textAlign: "center",
              fontWeight: "700",
              color: colors.secondary,
            }}
          >
            Profile picture
          </Text>
        </View>
        <View>
          <View>
            <FieldButton
              onPress={() => navigation.navigate(UPDATE_USERNAME)}
              title="Username"
              value={`@${userData.username}`}
            />
            <FieldButton
              onPress={() => navigation.navigate(UPDATE_FIRSTNAME)}
              title="Name"
              value={userData.firstname}
            />
            <FieldButton
              onPress={() => navigation.navigate(UPDATE_SURNAME)}
              title="Surname"
              value={userData.surname}
            />
            <FieldButton
              onPress={() => navigation.navigate(UPDATE_ABOUT)}
              title="Bio / About"
              value={userData.about}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}

function FieldButton({ title, value, onPress }) {
  return (
    <TouchableHighlight underlayColor={colors.darkish2} onPress={onPress}>
      <View style={styles.fieldbtn_container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={{ color: colors.secondary }}>{value}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  fieldbtn_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomColor: colors.darkish2,
    borderBottomWidth: 1,
  },
  aboutbox: {
    marginTop: 10,
    minHeight: 100,
  },
  field_container: {
    marginBottom: 20,
  },
  divider: {
    height: 2,
    width: "100%",
    backgroundColor: colors.darkish3,
    marginVertical: 20,
  },
  container: {
    // padding: 10,
    marginTop: 20,
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
  },
});

export default connect(mapStateToProps, null)(UpdateProfile);
