import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../../components/headers/header3";
import Screen from "../../../components/Screen";
import Text from "../../../components/AppText";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import styles from "./styles";
import RTextEditor from "../../../components/RTextEditor";
import colors from "../../../config/colors";
import { connect } from "react-redux";
import { update_dating_about } from "../../../store/actions/datingActions";

const mapStateToProps = (state) => {
  return {
    about: state.datingReducer.profile.about,
    saving_about: state.datingReducer.profile.saving_about,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update_dating_about: (i) => dispatch(update_dating_about(i)),
  };
};

function CSAbout({ about, update_dating_about, saving_about }) {
  const [typedText, setTypedText] = React.useState(about);

  const handleEditorChange = (t) => {
    setTypedText(t);
  };

  const handleUpdate = () => {
    update_dating_about(typedText);
  };

  return (
    <Screen scroll>
      <Header
        rightPress={handleUpdate}
        buttonText="Update"
        loading={saving_about}
        backIcon
      />
      <View style={styles.container}>
        <View>
          <Text style={[styles.text_center, styles.header2]}>
            Tell others about you
          </Text>

          <Text
            style={[
              styles.text_center,
              styles.subText,
              {
                marginTop: 10,
              },
            ]}
          >
            You can write about yourself or what you're looking for or even the
            reason why you here, BUT make it interesting.
          </Text>
        </View>
        <View style={styles.form_container}>
          <View
            style={{
              borderTopWidth: 2,
              borderTopColor: colors.secondary,
              paddingTop: 10,
            }}
          >
            <RTextEditor
              initialInput={typedText}
              placeholder="Insert catchy about here..."
              handleChange={handleEditorChange}
            />
          </View>
        </View>
        <View style={styles.bottomButtonContainer}>
          <Button
            onPress={handleUpdate}
            style={styles.bottomBtn}
            title={"Update"}
            loading={saving_about}
          />
        </View>
      </View>
    </Screen>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CSAbout);
