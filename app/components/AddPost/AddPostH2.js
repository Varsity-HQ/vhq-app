import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  Modal,
} from "react-native";
import colors from "../../config/colors";
import Text from "../AppText";
import { FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import Image from "../Image";
import emojis from "../../util/emojis";
import Input from "../Input";
import {
  initializePostAnonData,
  toggle_temp_post_anonymous,
  update_temp_anon_emoji,
  update_temp_anon_name,
} from "../../store/actions/actions";
import Popover from "react-native-popover-view";
import { RFValue } from "react-native-responsive-fontsize";

const mapStateToProps = (state) => {
  return {
    account: state.core.accData,
    post_anonymously: state.core.post_anonymously,
    new_post: state.data.new_post,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update_temp_anon_emoji: (value) => dispatch(update_temp_anon_emoji(value)),
    update_temp_anon_name: (value) => dispatch(update_temp_anon_name(value)),
    toggle_temp_post_anonymous: (value) =>
      dispatch(toggle_temp_post_anonymous(value)),
    initializePostAnonData: () => dispatch(initializePostAnonData()),
  };
};

function AddPostH2({
  core,
  account,
  post_anonymously,
  initializePostAnonData,
  new_post,
  toggle_temp_post_anonymous,
  update_temp_anon_name,
  update_temp_anon_emoji,
}) {
  const touchable = useRef();
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    initializePostAnonData();
  }, []);

  const handlePickEmoji = (index) => {
    update_temp_anon_emoji(index);
    setShowPopover(false);
  };

  const seIsAnonymous = (isSet) => {
    toggle_temp_post_anonymous(isSet);
  };

  const asMe = () => {
    return (
      <>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.darkish3 }]}
        >
          <Image uri={account.profilepic} style={styles.avatar} />
          <Text style={styles.text}>As myself</Text>
        </TouchableOpacity>
        <Text style={[styles.text, styles.middleline]}>|</Text>
        <TouchableOpacity
          onPress={() => seIsAnonymous(true)}
          style={[styles.button]}
        >
          <FontAwesome
            style={{ marginRight: 10 }}
            name="exchange"
            color={colors.white}
            size={16}
          />
          <Text style={styles.text}>Anonymously</Text>
        </TouchableOpacity>
      </>
    );
  };

  const asAnon = () => {
    return (
      <>
        <TouchableOpacity
          style={[
            styles.button,
            { borderColor: colors.secondary_2, borderWidth: 1 },
          ]}
          onPress={() => seIsAnonymous(false)}
        >
          <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
            <Text style={styles.text}>As myself</Text>
          </View>
          {/* <View style={styles.avatar} /> */}
          {/* <Text style={styles.text}>As myself</Text> */}
        </TouchableOpacity>
        <Text style={[styles.text, styles.middleline]}>|</Text>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: colors.darkish3, paddingHorizontal: 20 },
          ]}
        >
          <FontAwesome
            style={{ marginRight: 10 }}
            name="exchange"
            color={colors.white}
            size={16}
          />
          <Text style={styles.text}>Anonymously</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <Popover
        animationConfig={{
          duration: 150,
          delay: 0,
        }}
        from={touchable}
        isVisible={showPopover}
        onRequestClose={() => setShowPopover(false)}
        arrowStyle={{
          backgroundColor: colors.primary,
        }}
      >
        <View
          style={{
            backgroundColor: colors.dark_2,
            borderColor: colors.primary,
            borderWidth: 2,
            padding: 10,
          }}
        >
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 17,
                alignSelf: "center",
              }}
            >
              Pick your mood
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {emojis.map((x, index) => (
              <View
                key={index}
                style={{
                  margin: 5,
                }}
              >
                <TouchableOpacity onPress={() => handlePickEmoji(index)}>
                  <Image style={styles.emoji_pic} local uri={{ uri: x }} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </Popover>

      {/* <Modal>
        <Text>es</Text>
      </Modal> */}

      <Animated.View style={styles.container}>
        <ScrollView horizontal>
          {new_post.anonymous ? asAnon() : asMe()}
        </ScrollView>

        {new_post.anonymous && (
          <View
            style={{
              marginTop: 13,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ alignSelf: "center" }}>
              <TouchableOpacity
                ref={touchable}
                onPress={() => setShowPopover(true)}
              >
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    marginRight: 10,
                  }} 
                >
                  <Image
                    local
                    uri={{ uri: emojis[new_post.anonymous_emoji_index] }}
                    style={[styles.emojipp]}
                  />
                  <Text
                    style={{
                      color: colors.secondary_2,
                      marginTop: 3,
                      fontSize: 12,
                      fontWeight: "600",
                    }}
                  >
                    Change
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Input
                value={new_post.anonymous_name}
                onChangeText={(txt) => update_temp_anon_name(txt)}
                type={2}
                placeholder="Your anonymous name here"
              />
            </View>
          </View>
        )}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  middleline: {
    alignSelf: "center",
    marginHorizontal: 10,
  },
  text: {
    color: colors.white,
    fontWeight: "800",
    fontSize: RFValue(13),
  },
  emoji_pic: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: colors.darkish3,
  },
  emojipp: {
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: colors.darkish3,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 100,
    marginRight: 10,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: colors.dark,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    padding: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPostH2);
