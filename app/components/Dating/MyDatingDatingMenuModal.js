import React, { useEffect } from "react";
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
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import {
  delete_dating_profile,
  toggle_dating_active,
} from "../../store/actions/datingActions";
import { DATING_CONTAINER, HOME } from "../../navigation/routes";

const mapStateToProps = (state) => {
  return {
    profilepic: state.datingReducer.profile.profilepic,
    m_profilepic: state.core.accData.profilepic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    delete_dating_profile: () => dispatch(delete_dating_profile()),
    toggle_dating_active: (s) => dispatch(toggle_dating_active(s)),
  };
};

function MyDatingProfileModal({
  isModalVisible,
  handleModal,
  delete_dating_profile,
  toggle_dating_active,
}) {
  const navigation = useNavigation();

  const handleDelete = () => {
    delete_dating_profile();
    toggle_dating_active(false);
    setTimeout(() => {
      navigation.navigate(DATING_CONTAINER);
    }, 100);
    handleModal();
  };

  const options = [
    {
      title: "Reset dating profile",
      onPress: () => {
        Alert.alert(
          "Before you reset",
          "This action will delete your indentity, chats and your previous settings then create a new fresh profile which has a new indentity. Use this method only if you want to start over or clean up",
          [
            {
              text: "Okay, Reset",
              onPress: handleDelete,
            },
            {
              text: "Cancel",
              style: "cancel",
            },
          ],
        );
      },
    },
  ];

  return (
    <>
      <Modal
        key={"post-menu-modal"}
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
                    style={[
                      styles.menuButton,
                      {
                        backgroundColor: x.disabled
                          ? colors.dark_opacity
                          : colors.dark_opacity_2,
                      },
                    ]}
                    key={index}
                    onPress={x.onPress ? x.onPress : null}
                  >
                    <View style={styles.touchableInner}>
                      {x.icon}
                      <Text
                        style={[
                          styles.text,
                          {
                            color: x.disabled
                              ? colors.dark_opacity_2
                              : colors.secondary,
                          },
                        ]}
                      >
                        {x.title}
                      </Text>
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
    fontSize: 16,
    marginLeft: 20,
    fontWeight: "600",
  },
  menuButton: {
    borderWidth: 2,
    borderColor: colors.dark_opacity_2,
    borderRadius: 10,
    backgroundColor: colors.dark_opacity_2,
    paddingVertical: 6,
    marginBottom: 10,
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
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyDatingProfileModal);
