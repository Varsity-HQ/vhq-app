import React, { useEffect, useRef, useState } from "react";
import { Alert, FlatList } from "react-native";
import { Image, ScrollView } from "react-native";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AppText from "../../components/AppText";
import Text from "../../components/AppText";
import AppButton from "../../components/Button";
import Header3 from "../../components/headers/header3";
import AppTextInput from "../../components/Input";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import emoji from "../../util/emojis";
import { connect } from "react-redux";
import {
  set_anon_emoji_index,
  update_anonymous_name,
  switch_to_anonymous,
  turn_off_anonymous,
} from "../../store/actions/actions";

const mapStateToProps = (state) => {
  return {
    account: state.core.accData,
    loading: state.core.saving_anon_settings,
  };
};

const width = Dimensions.get("window");

const mapDispatchToProps = (dispatch) => {
  return {
    set_anon_emoji_index: (n) => dispatch(set_anon_emoji_index(n)),
    update_anonymous_name: (name) => dispatch(update_anonymous_name(name)),
    switch_to_anonymous: (name, index) =>
      dispatch(switch_to_anonymous(name, index)),
    turn_off_anonymous: () => dispatch(turn_off_anonymous()),
  };
};

function AnonymousSettingsScreen({
  navigation,
  account,
  turn_off_anonymous,
  set_anon_emoji_index,
  update_anonymous_name,
  switch_to_anonymous,
  loading,
}) {
  const [show_notes, setShowNotes] = useState(false);
  const flatListRef = useRef();
  const [anonymous_name, set_anonymous_name] = useState(account.anonymous_name);
  const [anonymous_emoji_index, set_anonymous_emoji_index] = useState(
    account.anonymous_emoji_index,
  );

  const changeEmoIndex = (index) => {
    set_anonymous_emoji_index(index);
    flatListRef.current.scrollToIndex({
      animated: true,
      index: index,
      viewPosition: 0.5,
    });
  };
  //
  //
  //
  const handleSave = () => {
    set_anon_emoji_index(anonymous_emoji_index);
    update_anonymous_name(anonymous_name);
    switch_to_anonymous(anonymous_name, anonymous_emoji_index);
  };

  return (
    <Screen avoidkeyboard scroll={true}>
      <Header3
        loading={loading}
        backPress={() => navigation.goBack()}
        rightPress={handleSave}
        title="Anonymous"
        buttonText="Save"
      />
      <View style={styles.container}>
        <View>
          <>
            <View style={styles.dp_container}>
              <Image
                style={styles.emojidp}
                source={{ uri: emoji[anonymous_emoji_index] }}
              />
            </View>
            <AppText
              style={{
                paddingHorizontal: 20,
                fontWeight: "700",
                fontSize: 18,
                alignSelf: "center",
              }}
            >
              Pick your mood
            </AppText>
            <FlatList
              horizontal
              ref={flatListRef}
              style={styles.emojiscroll}
              data={emoji}
              keyExtractor={(index) => index}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => changeEmoIndex(index)}
                  key={index}
                >
                  {index === anonymous_emoji_index ? (
                    <View style={styles.ind} />
                  ) : (
                    <Text style={styles.ind_text}>{index + 1}</Text>
                  )}

                  <Image style={styles.emojitosl} source={{ uri: item }} />
                  <View style={styles.selected_indicator}>
                    <Text style={styles.act_text}>
                      {index === anonymous_emoji_index && "Active"}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </>
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: 10,
        }}
      >
        <View>
          <Text style={{ fontWeight: "700" }}>Anonymous Name</Text>
          <Text style={{ color: colors.secondary, fontSize: 14 }}>
            Name to be shown on your posts, for example "Overseas"
          </Text>
          <AppTextInput
            onChangeText={(e) => set_anonymous_name(e)}
            placeholder="Anonymous"
            value={anonymous_name}
            style={{ marginTop: 15 }}
            type={2}
          />

          <TouchableOpacity onPress={() => setShowNotes(!show_notes)}>
            <Text style={{ fontWeight: "700", marginTop: 25 }}>
              How does this work ?
            </Text>
          </TouchableOpacity>
          <View>
            {show_notes && (
              <Text
                style={{
                  color: colors.secondary,
                  fontSize: 14,
                  marginTop: 5,
                }}
              >
                This setting will only applies when you create new posts and
                comment on peoples posts. People will still be able to visit
                your normal profile page but they won't be able to trace your
                anonymous activity back to your normal profile and your old
                posts will remain public.
              </Text>
            )}
          </View>
          <View
            style={{
              alignItems: "center",
              marginTop: 20,
              paddingVertical: 20,
              borderTopWidth: 1,
              borderTopColor: colors.darkish2,
            }}
          >
            <Text>
              {account.anonymous_profile
                ? "Your account is currently anonymous"
                : "Your account is not anonymous"}
            </Text>
            {account.anonymous_profile && (
              <AppButton
                onPress={() => turn_off_anonymous()}
                style={{ borderRadius: 100, paddingHorizontal: 40 }}
                type={6}
                title="Turn off"
              />
            )}
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  ind_text: {
    height: 10,
    marginBottom: 10,
    alignSelf: "center",
    fontSize: 10,
    color: colors.secondary,
  },
  ind: {
    height: 10,
    width: 10,
    backgroundColor: colors.primary,
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  act_text: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: "700",
  },
  selected_indicator: {
    // height: 10,
    // width: 10,
    // backgroundColor: colors.primary,
    alignSelf: "center",
  },
  emojiscroll: {
    borderTopColor: colors.dark_opacity_2,
    // borderTopWidth: 2,
    borderBottomColor: colors.dark_opacity_2,
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingRight: 20,
    marginTop: 10,
    backgroundColor: colors.darkish,
  },
  emojitosl: {
    height: 50,
    width: 50,
    marginHorizontal: 10,
    // marginRight: 20,
    alignSelf: "center",
    shadowColor: colors.black,
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 0.97,
  },
  dp_container: {
    alignSelf: "center",
    borderColor: colors.secondary,
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: colors.dark_opacity_2,
    marginBottom: 20,
  },
  emojidp: {
    height: 60,
    width: 60,
  },
  container: {
    paddingVertical: 20,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnonymousSettingsScreen);
