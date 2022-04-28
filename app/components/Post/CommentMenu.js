import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import Modal from "react-native-modal";
import colors from "../../config/colors";
import Button from "../Button";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { HASHTAG_SCREEN, POST_PAGE, PROFILE } from "../../navigation/routes";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import {
  ANOTHER_POST_CURRENTLY_DELETING,
  COPY_POST_URL,
  POST_TO_BE_DELETED,
  COPY_HASHTAG_URL,
} from "../../util/toast_messages";
import { delete_post } from "../../store/actions/actions";

import { delete_comment } from "../../store/actions/postPage";

const mapStateToProps = (state) => {
  return {
    userID: state.core.accData.userID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    delete_post: (pid) => dispatch(delete_post(pid)),
    handleDeleteComment: (cid) => dispatch(delete_comment(cid)),
  };
};

const iconSize = 32;

function TrendMenu({
  data,
  auth_acc_id,
  delete_post,
  deleting_post,

  handleDeleteComment,
  handleReply,
  userID,
  isCommentModalVisible,
  handleCommentModal,
}) {
  const navigation = useNavigation();

  if (!data) return null;

  const handleCopyLink = () => {
    handleCommentModal();
    setTimeout(() => {
      Clipboard.setString(`vhq`);
      Toast.show({
        type: "general",
        autoHide: true,
        ...COPY_HASHTAG_URL,
      });
    }, 200);
  };

  const options = [
    {
      onPress: () => handleDeleteComment(data.comment_id),
      title: "Delete Comment",
      hide: userID !== data.comment_by,
      icon: (
        <Ionicons
          color={colors.secondary}
          name="trash-bin-outline"
          size={iconSize}
        />
      ),
    },
    {
      title: "Reply",
      onPress: () => handleReply(),
      icon: (
        <Ionicons
          color={colors.secondary}
          name="arrow-redo-sharp"
          size={iconSize}
        />
      ),
    },
    {
      title: "Report",
      hide: true,
      icon: (
        <Ionicons
          color={colors.secondary}
          name="flag-outline"
          size={iconSize}
        />
      ),
    },
  ];

  return (
    <>
      <Modal
        // animationIn={"fadeIn"}
        // animationOut={"fadeOut"}
        hideModalContentWhileAnimating={true}
        backdropColor={colors.dark_opacity_2}
        onSwipeComplete={handleCommentModal}
        swipeDirection={["down"]}
        style={styles.modal_bg}
        onBackdropPress={handleCommentModal}
        isVisible={isCommentModalVisible}
        useNativeDriver={true}
      >
        <View style={styles.content}>
          <View style={styles.notch} />
          <View style={styles.inner_content}>
            {options.map((x, index) => {
              if (!x.hide) {
                return (
                  <TouchableOpacity
                    style={styles.menuButton}
                    key={index}
                    onPress={x.onPress ? x.onPress : null}
                  >
                    <View style={styles.touchableInner}>
                      {x.icon}
                      <Text style={styles.text}>{x.title}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }
            })}
          </View>
          <Button
            type={1}
            style={{
              borderWidth: 0,
            }}
            title="Close"
            onPress={handleCommentModal}
          />
        </View>
      </Modal>
      {/* // </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  touchableInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    marginLeft: 20,
    fontWeight: "400",
  },
  menuButton: {},
  inner_content: {
    marginVertical: 20,
  },
  notch: {
    backgroundColor: colors.primary,
    height: 5,
    width: "15%",
    alignSelf: "center",
    borderRadius: 55,
  },
  content: {
    backgroundColor: colors.dark,
    padding: 10,
    paddingVertical: 20,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  modal_bg: {
    // backgroundColor: colors.white,
    margin: 0,
    justifyContent: "flex-end",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendMenu);
