import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import IconMenuItem from "../../components/Settings/IconMenuItem";
import Text from "../../components/AppText";
import colors from "../../config/colors";
import { connect } from "react-redux";
import {
  UPDATE_BIRTHDAY,
  UPDATE_GENDER,
  UPDATE_RELATIONSHIP_STATUS,
  UPDATE_SO_STATUS,
  UPDATE_S_TARGET,
  UPDATE_UNIVERSITY,
} from "../../navigation/routes";

const mapStateToProps = (state) => {
  return {
    account: state.core.accData,
  };
};

function PreferencesScreen({ navigation, account }) {
  return (
    <Screen scroll>
      <Header
        bgActive
        backPress={() => navigation.goBack()}
        backIcon
        title="Preferences"
      />
      <View style={styles.container}>
        <View style={{ backgroundColor: colors.darkish }}>
          <View style={styles.sec_h_container}>
            <Text style={styles.sec_h_text}>Basic Preferences</Text>
          </View>
          <IconMenuItem
            required
            mMessage="Your birthday hasn't been set"
            onPress={() => navigation.navigate(UPDATE_BIRTHDAY)}
            title="Birthday"
            descColor={colors.secondary}
            desc={account.dob}
          />
          <IconMenuItem
            required
            mMessage="Your gender hasn't been set"
            onPress={() => navigation.navigate(UPDATE_GENDER)}
            title="My Gender"
            descColor={colors.secondary}
            desc={account.gender}
          />
          <IconMenuItem
            onPress={() => navigation.navigate(UPDATE_UNIVERSITY)}
            title="University"
            descColor={colors.secondary}
            desc={account.university}
          />
        </View>
        <View style={{ backgroundColor: colors.darkish, marginTop: 10 }}>
          <View style={styles.sec_h_container}>
            <Text style={styles.sec_h_text}>Member Preferences</Text>
          </View>
          <IconMenuItem
            onPress={() => navigation.navigate(UPDATE_RELATIONSHIP_STATUS)}
            title="Relationship Status"
            descColor={colors.secondary}
            descCapitalize
            desc={account.relationshipStatus}
          />
          <IconMenuItem
            required
            mMessage="Please set your sexual orientation"
            onPress={() => navigation.navigate(UPDATE_SO_STATUS)}
            title="Sexual Orientation"
            descColor={colors.secondary}
            desc={account.s_orientation}
          />
          {account.s_target ? (
            <IconMenuItem
              onPress={() => navigation.navigate(UPDATE_S_TARGET)}
              title="Interested In"
              descColor={colors.secondary}
              desc={account.s_target}
            />
          ) : null}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  sec_h_text: {
    fontWeight: "700",
    fontSize: 18,
    color: colors.secondary,
  },
  sec_h_container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    // marginBottom: 5,
    marginTop: 10,
    borderBottomColor: colors.darkish2,
    borderBottomWidth: 2,
  },
  container: {
    // paddingHorizontal: 10,
  },
});

export default connect(mapStateToProps, null)(PreferencesScreen);
