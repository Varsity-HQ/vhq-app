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
  import_vhq_profile_to_dating,
  remove_dating_profile_picture,
  upload_dating_profile_picture,
} from "../../store/actions/datingActions";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

const mapStateToProps = (state) => {
  return {
    profilepic: state.datingReducer.profile.profilepic,
    m_profilepic: state.core.accData.profilepic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    import_vhq_profile_to_dating: () =>
      dispatch(import_vhq_profile_to_dating()),
    remove_dating_profile_picture: () =>
      dispatch(remove_dating_profile_picture()),
    upload_profile_picture: (image) =>
      dispatch(upload_dating_profile_picture(image)),
  };
};

function DatingProfilePicModal({
  isModalVisible,
  handleModal,
  setIsModalVisible,
  profilepic,
  m_profilepic,
  import_vhq_profile_to_dating,
  remove_dating_profile_picture,
  upload_profile_picture,
}) {
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted)
      alert(
        "You need to enable permission to access the library in order to save your profile picture",
      );
  };

  const process_image = async (uri) => {
    const manipResult = await manipulateAsync(
      uri,
      [{ resize: { height: 300, width: 300 } }],
      { compress: 0.4, format: SaveFormat.JPEG },
    );
    upload_profile_picture(manipResult.uri);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
        aspect: [1, 1],
        presentationStyle: 0,
        allowsEditing: true,
        // base64: true,
      });
      //
      if (!result.cancelled) {
        process_image(result.uri);
      }
    } catch (error) {
      console.error("Error reading image");
    }
  };

  const options = [
    {
      disabled: !m_profilepic ? true : false,
      title: "Use VaristyHQ profile picture",
      onPress: !m_profilepic
        ? null
        : () => {
            import_vhq_profile_to_dating();
            handleModal();
          },
    },
    {
      disabled: false,
      title: "Choose from Gallery",
      onPress: () => {
        selectImage();
        // handleModal();
      },
    },
    {
      disabled: !profilepic ? true : false,
      title: "Remove picture",
      onPress: !profilepic
        ? null
        : () => {
            remove_dating_profile_picture();
            handleModal();
          },
    },
  ];

  console.log({ m_profilepic });

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
)(DatingProfilePicModal);
