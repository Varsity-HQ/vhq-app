import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../../../components/Screen";

import Text from "../../../components/AppText";
import Header from "../../../components/headers/header3";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import styles from "./styles";
import { CS_LOOKING_FOR } from "../../../navigation/routes";
import { connect } from "react-redux";
import { save_dating_nickname } from "../../../store/actions/datingActions";

const mapStateToProps = (state) => {
  return {
    nickname: state.datingReducer.profile.nickname,
    saving_nickname: state.datingReducer.profile.saving_nickname,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    save_dating_nickname: (n) => dispatch(save_dating_nickname(n)),
  };
};

function CSName({
  nickname,
  save_dating_nickname,
  saving_nickname,
  navigation,
}) {
  const [s_nickname, set_nickname] = useState(nickname);

  const handle_save_nickname = () => {
    if (nickname == s_nickname) return;
    save_dating_nickname(s_nickname);
    navigation.goBack();
  };

  return (
    <Screen>
      <Header
        title="Nickname"
        backIcon
        // buttonText="Save"
        loading={saving_nickname}
      />
      <View style={styles.container}>
        <View>
          <Text style={[styles.text_center, styles.header2]}>
            Discovery nickname
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
            This name will appear on your discover profile and only in
            Discovery. This name is NOT your VarsityHQ username or name.
          </Text>
        </View>
        <View style={styles.form_container}>
          <View>
            <Input
              type={2}
              value={s_nickname}
              onChangeText={(x) => set_nickname(x)}
              style={styles.input}
              placeholder="Type your nickname"
            />
          </View>
        </View>
        <View style={styles.bottomButtonContainer}>
          <Button
            loading={saving_nickname}
            onPress={handle_save_nickname}
            style={styles.bottomBtn}
            title={"Update"}
          />
        </View>
      </View>
    </Screen>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CSName);
