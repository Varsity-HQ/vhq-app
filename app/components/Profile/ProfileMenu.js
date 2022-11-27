import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity as TouchableWithoutFeedback,
  Alert,
} from "react-native";
//
import Modal from "react-native-modal";
import colors from "../../config/colors";
import Button from "../Button";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { logOutUser } from "../../store/actions/actions";
import { connect } from "react-redux";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import { COPY_PROFILE_URL } from "../../util/toast_messages";
import { useNavigation } from "@react-navigation/native";
import {
  ADMIN_HOME,
  QCOINS_OFFERS,
  REFER_A_FRIEND,
} from "../../navigation/routes";
import ReportMenu from "../ReportMenus/ReportMenu";

const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: () => dispatch(logOutUser()),
  };
};

const mapStateToProps = (state) => {
  return {
    auth_username: state.core.accData.username,
    accountStatus: state.core.accData.accountStatus,
  };
};

const iconSize = 35;
//|
//|
//|

function ProfileMenu({
  username,
  auth_username,
  logOutUser,
  data,
  onReportSubmitted,
  onBlockSubmitted,
  accountStatus,
  admin = accountStatus === "admin" ? true : false,
}) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  const [isReportModalVisible, setIsReportModalVisible] = React.useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = React.useState(false);
  const handleReportModal = () =>
    setIsReportModalVisible(() => !isReportModalVisible);
  const handleBlockModal = () =>
    setIsBlockModalVisible(() => !isBlockModalVisible);

  const navigation = useNavigation();
  const options = [
    {
      hidden: !admin,
      // hidden: true,
      title: "Administration",
      icon: (
        <Ionicons
          color={colors.secondary}
          name="shield-outline"
          size={iconSize}
        />
      ),
      onPress: () => {
        navigation.navigate(ADMIN_HOME);
        handleModal();
      },
    },
    {
      title: "Qcoins & Offers",
      onPress: () => {
        navigation.navigate(QCOINS_OFFERS);
        handleModal();
      },
      icon: (
        <Ionicons
          color={colors.secondary}
          name="cash-outline"
          size={iconSize}
        />
      ),
    },
    {
      title: "Refer a friend",
      onPress: () => {
        navigation.navigate(REFER_A_FRIEND);
        handleModal();
      },
      icon: (
        <Ionicons
          color={colors.secondary}
          name="person-add-outline"
          size={iconSize}
        />
      ),
    },
    {
      onPress: () => copyToClipboard(),
      title: "Copy Profile link",
      icon: (
        <Ionicons
          color={colors.secondary}
          name="copy-outline"
          size={iconSize}
        />
      ),
    },
    {
      title: "Sign out",
      icon: (
        <Ionicons
          color={colors.secondary}
          name="log-out-outline"
          size={iconSize}
        />
      ),
      onPress: () => handleSignout(),
    },
  ];

  const options_2 = [
    {
      title: "Copy Profile Link",
      onPress: () => copyToClipboard(),
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
    {
      title: "Block account",
      onPress: () => {
        setIsModalVisible(false);
        setTimeout(() => setIsBlockModalVisible(true), 400);
      },
      icon: (
        <MaterialCommunityIcons
          color={colors.secondary}
          name="block-helper"
          size={iconSize}
        />
      ),
    },
  ];

  const handleSignout = () => {
    Alert.alert(
      "Confirm action",
      `${username}, are you sure you want to sign out ?. You will need to sign in again to use this app`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            // handleModal();
            logOutUser();
          },
        },
      ],
    );
  };

  const copyToClipboard = () => {
    handleModal();
    Clipboard.setString(`https://web.varsityhq.co.za/${username}`);
    Toast.show({
      type: "general",
      autoHide: true,
      ...COPY_PROFILE_URL,
    });
  };

  return (
    <>
      {/* // <View style={styles.container}> */}
      <TouchableWithoutFeedback onPress={handleModal}>
        <Feather
          style={{ paddingHorizontal: 10 }}
          color={colors.white}
          name="menu"
          size={30}
        />
      </TouchableWithoutFeedback>

      <ReportMenu
        key={"report-modal"}
        type="profile"
        node_id={data.userID}
        onReportSubmitted={onReportSubmitted}
        isReportModalVisible={isReportModalVisible}
        handleReportModal={handleReportModal}
      />
      <ReportMenu
        key={"block-modal"}
        type="profile-block"
        node_id={data.username}
        data={data}
        onReportSubmitted={onBlockSubmitted}
        isReportModalVisible={isBlockModalVisible}
        handleReportModal={handleBlockModal}
      />

      <Modal
        useNativeDriver={true}
        // animationIn={"fadeIn"}
        // animationOut={"fadeOut"}
        hideModalContentWhileAnimating={true}
        backdropColor={colors.dark_opacity_2}
        onSwipeComplete={handleModal}
        swipeDirection={["down"]}
        style={styles.modal_bg}
        onBackdropPress={handleModal}
        isVisible={isModalVisible}
        // animationOutTiming={200}
        // animationInTiming={200}
      >
        <View style={styles.content}>
          <View style={styles.notch} />
          <View style={styles.inner_content}>
            {auth_username !== username ? (
              <>
                {options_2.map((x, index) => (
                  <TouchableWithoutFeedback
                    // style={{ paddingVertical: 10 }}
                    key={index}
                    onPress={x.onPress}
                  >
                    <View
                      style={[
                        styles.touchableInner,
                        { opacity: x.disabled ? 0.5 : 1 },
                      ]}
                    >
                      {x.icon}
                      <Text style={styles.text}>{x.title}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </>
            ) : (
              <>
                {options.map((x, index) => {
                  if (x.hidden) return;
                  return (
                    <TouchableWithoutFeedback
                      // style={{ paddingVertical: 10 }}
                      key={index}
                      onPress={x.onPress}
                    >
                      <View style={styles.touchableInner}>
                        {x.icon}
                        <Text style={styles.text}>{x.title}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </>
            )}
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
    paddingVertical: 8,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    marginLeft: 20,
    fontWeight: "400",
  },
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
    zIndex: 99999,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);
