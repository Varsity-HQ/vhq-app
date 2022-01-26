import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";
import Modal from "react-native-modal";
import colors from "../../config/colors";
import Button from "../Button";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { POST_PAGE, PROFILE } from "../../navigation/routes";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import {
  ANOTHER_POST_CURRENTLY_DELETING,
  COPY_POST_URL,
  POST_TO_BE_DELETED,
} from "../../util/toast_messages";
import { delete_post } from "../../store/actions/actions";
import { save_post_user } from "../../store/actions/profile";

const mapStateToProps = (state) => {
  return {
    auth_acc_id: state.core.accData.userID,
    deleting_post: state.core.deleting_post,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    delete_post: (pid) => dispatch(delete_post(pid)),
    save_post_user: (post) => dispatch(save_post_user(post)),
  };
};

const iconSize = 32;

function PostMenu({
  data,
  auth_acc_id,
  delete_post,
  deleting_post,
  post_page,
  save_post_user,
}) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  const navigation = useNavigation();

  if (!data) return null;

  const handleCopyLink = () => {
    handleModal();
    setTimeout(() => {
      Clipboard.setString(`https://varsityhq.co.za/p/${data.id}`);
      Toast.show({
        type: "general",
        autoHide: true,
        ...COPY_POST_URL,
      });
    }, 200);
  };

  const handleDeletePost = () => {
    if (deleting_post) {
      return Toast.show({
        type: "general",
        autoHide: false,
        ...ANOTHER_POST_CURRENTLY_DELETING,
      });
    }

    if (data.posted_by === auth_acc_id && !deleting_post) {
      delete_post(data.id);
      handleModal();
      return Toast.show({
        type: "general",
        autoHide: false,
        ...POST_TO_BE_DELETED,
      });
    }
  };

  const options = [
    {
      onPress: () => handleDeletePost(),
      hide: data.posted_by !== auth_acc_id,
      title: "Delete Post",
      icon: (
        <Ionicons
          color={colors.secondary}
          name="trash-bin-outline"
          size={iconSize}
        />
      ),
    },
    {
      onPress: () => {
        handleModal();
        navigation.navigate(POST_PAGE, {
          post_id: data.id,
        });
      },
      title: "Go to post",
      hide: post_page || data.anonymous_post,
      icon: (
        <Ionicons
          color={colors.secondary}
          name="arrow-forward-outline"
          size={iconSize}
        />
      ),
    },
    {
      onPress: () => {
        save_post_user(data);
        handleModal();
        navigation.navigate(PROFILE, {
          username: data.username,
        });
      },
      title: "See profile",
      icon: (
        <Ionicons color={colors.secondary} name="eye-outline" size={iconSize} />
      ),
    },
    {
      onPress: () => handleCopyLink(),
      title: "Copy post",
      icon: (
        <Ionicons
          color={colors.secondary}
          name="copy-outline"
          size={iconSize}
        />
      ),
    },
    {
      title: "Report",
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
      {/* // <View style={styles.container}> */}
      <TouchableWithoutFeedback onPress={handleModal}>
        <Ionicons
          color={colors.white}
          name="ios-ellipsis-horizontal-outline"
          size={30}
        />
      </TouchableWithoutFeedback>

      <Modal
        // animationIn={"fadeIn"}
        // animationOut={"fadeOut"}
        hideModalContentWhileAnimating={true}
        backdropColor={colors.dark_opacity_2}
        onSwipeComplete={handleModal}
        swipeDirection={["down"]}
        style={styles.modal_bg}
        onBackdropPress={handleModal}
        isVisible={isModalVisible}
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
            onPress={handleModal}
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

export default connect(mapStateToProps, mapDispatchToProps)(PostMenu);
