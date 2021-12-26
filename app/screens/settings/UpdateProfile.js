import React, { useState } from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import { connect } from "react-redux";
import ProfilePicChanger from "../../components/ProfilePicChanger";
import Text from "../../components/AppText";
import colors from "../../config/colors";
import Input from "../../components/Input";

const mapStateToProps = (state) => {
  return {
    acc_data: state.core.accData,
  };
};

function UpdateProfile({ loading = false, navigation, acc_data }) {
  const [profilepic, setProfilePic] = useState(acc_data.profilepic);
  const [userData, setUserData] = useState({
    username: "",
    firstname: "",
    surname: "",
    about: "",
    ...acc_data,
  });

  console.log({ userData });
  return (
    <Screen scroll>
      <Header
        loading={loading}
        backPress={() => navigation.goBack()}
        backBtnText="Done"
        buttonText="Save"
        title={`@${acc_data.username}`}
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
            <FieldButton title="Username" value={`@${userData.username}`} />
            <FieldButton title="Name" value={userData.firstname} />
            <FieldButton title="Surname" value={userData.surname} />
            <FieldButton title="Bio / About" value={userData.about} />
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
