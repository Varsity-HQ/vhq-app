import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import colors from "../../config/colors";
import Button from "../Button";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { logOutUser } from "../../store/actions/actions";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: () => dispatch(logOutUser()),
  };
};

const iconSize = 35;
//|

//|

function ProfileMenu({ username, logOutUser }) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  const options = [
    {
      title: "Administration",
      icon: (
        <Ionicons
          color={colors.secondary}
          name="shield-outline"
          size={iconSize}
        />
      ),
    },
    {
      title: "Qcoins & Offers",
      icon: (
        <Ionicons
          color={colors.secondary}
          name="cash-outline"
          size={iconSize}
        />
      ),
    },
    {
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
            // console.log("logout");
          },
        },
      ],
    );
  };

  return (
    <>
      {/* // <View style={styles.container}> */}
      <TouchableWithoutFeedback onPress={handleModal}>
        <Ionicons
          style={{ paddingHorizontal: 10 }}
          color={colors.white}
          name="ios-ellipsis-horizontal-outline"
          size={30}
        />
      </TouchableWithoutFeedback>

      <Modal
        // animationIn={"fadeIn"}
        // animationOut={"fadeOut"}
        backdropColor={colors.dark_opacity_2}
        onSwipeComplete={handleModal}
        swipeDirection={["down"]}
        style={styles.modal_bg}
        onBackdropPress={handleModal}
        isVisible={isModalVisible}
      >
        <View style={styles.content}>
          <View style={styles.notch} />
          <View style={styles.inner_content}>
            {options.map((x, index) => (
              <TouchableWithoutFeedback
                style={{ paddingVertical: 10 }}
                key={index}
                onPress={x.onPress}
              >
                <View style={styles.touchableInner}>
                  {x.icon}
                  <Text style={styles.text}>{x.title}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
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
export default connect(null, mapDispatchToProps)(ProfileMenu);
