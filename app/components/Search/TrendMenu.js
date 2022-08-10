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
import ReportMenu from "../ReportMenus/ReportMenu";

const mapStateToProps = (state) => {
  return {
    auth_acc_id: state.core.accData.userID,
    deleting_post: state.core.deleting_post,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    delete_post: (pid) => dispatch(delete_post(pid)),
  };
};

const iconSize = 32;

function TrendMenu({
  data,
  auth_acc_id,
  delete_post,
  deleting_post,
  post_page,
  onReportSubmitted,
}) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  const [isReportModalVisible, setIsReportModalVisible] = React.useState(false);
  const handleReportModal = () =>
    setIsReportModalVisible(() => !isReportModalVisible);

  const navigation = useNavigation();

  if (!data) return null;

  const handleCopyLink = () => {
    handleModal();
    setTimeout(() => {
      Clipboard.setString(
        `https://web.varsityhq.co.za/explore/topics/${data.hashtag_name.replace(
          /#/g,
          "",
        )}`,
      );
      Toast.show({
        type: "general",
        autoHide: true,
        ...COPY_HASHTAG_URL,
      });
    }, 200);
  };

  const options = [
    {
      onPress: () => {
        handleModal();
        navigation.navigate(HASHTAG_SCREEN, {
          hashtag: data.hashtag_name.replace(/#/g, ""),
        });
      },
      title: "See posts",
      hide: post_page,
      icon: (
        <Ionicons
          color={colors.secondary}
          name="arrow-forward-outline"
          size={iconSize}
        />
      ),
    },
    {
      onPress: () => handleCopyLink(),
      title: "Copy trend",
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
      onPress: () => {
        setIsModalVisible(false);
        setTimeout(() => setIsReportModalVisible(true), 400);
      },
      icon: (
        <Ionicons
          color={colors.secondary}
          name="flag-outline"
          size={iconSize}
        />
      ),
    },
  ];

  console.log({ data });

  return (
    <>
      {/* // <View style={styles.container}> */}
      <TouchableOpacity onPress={handleModal}>
        <Ionicons
          color={colors.white}
          name="ios-ellipsis-horizontal-outline"
          size={30}
        />
      </TouchableOpacity>

      <ReportMenu
        key={"report-modal"}
        type="trend"
        node_id={data.hashtag_name}
        onReportSubmitted={onReportSubmitted}
        isReportModalVisible={isReportModalVisible}
        handleReportModal={handleReportModal}
      />

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

export default connect(mapStateToProps, mapDispatchToProps)(TrendMenu);
