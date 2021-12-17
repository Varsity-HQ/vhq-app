import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import Modal from "react-native-modal";
import colors from "../../config/colors";
import Button from "../Button";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const iconSize = 28;

const options = [
  {
    title: "Delete Post",
    icon: (
      <MaterialCommunityIcons
        color={colors.secondary}
        name="trash-can-outline"
        size={iconSize}
      />
    ),
  },
  {
    title: "Go to post",
    icon: (
      <MaterialCommunityIcons
        color={colors.secondary}
        name="arrow-right-bold-outline"
        size={iconSize}
      />
    ),
  },
  {
    title: "See profile",
    icon: (
      <MaterialCommunityIcons
        color={colors.secondary}
        name="eye-outline"
        size={iconSize}
      />
    ),
  },
  {
    title: "Copy Link",
    icon: (
      <MaterialCommunityIcons
        color={colors.secondary}
        name="clipboard-file-outline"
        size={iconSize}
      />
    ),
  },
  {
    title: "Report",
    icon: (
      <MaterialCommunityIcons
        color={colors.secondary}
        name="flag-outline"
        size={iconSize}
      />
    ),
  },
];

function PostMenu() {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

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
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
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
                onPress={() => console.log("clicked")}
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
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PostMenu;