import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Modal from "react-native-modal";
import colors from "../../config/colors";
import Button from "../Button";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { POST_PAGE, PROFILE } from "../../navigation/routes";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import Text from "../AppText";
import Image from "../Image";
import { color } from "react-native-reanimated";
import dayjs from "dayjs";

const iconSize = 32;

function UserMenu({ data }) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  const navigation = useNavigation();

  const options = [
    {
      title: "Visit profile",
      onPress: () => {
        handleModal();
        navigation.navigate(PROFILE, {
          username: data.username,
        });
      },
      icon: (
        <MaterialCommunityIcons
          color={colors.secondary}
          name="account-arrow-right"
          size={iconSize}
        />
      ),
    },
  ];

  return (
    <>
      <TouchableWithoutFeedback onPress={handleModal}>
        <Ionicons color={colors.white} name="chevron-up" size={30} />
      </TouchableWithoutFeedback>
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
            <View style={styles.center}>
              <Image uri={data.profilepic} style={styles.profilepic} />
              <Text style={{ color: colors.secondary, marginBottom: 5 }}>
                @{data.username}
              </Text>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 19,
                }}
              >
                {data.firstname} {data.surname}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  marginTop: 5,
                }}
              >
                Since {dayjs(data.createdAt).format("ll")}
              </Text>
            </View>
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
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  profilepic: {
    height: 130,
    width: 130,
    borderRadius: 1000,
    borderWidth: 3,
    borderColor: colors.secondary_2,
    borderStyle: "dashed",
    marginBottom: 20,
  },
  center: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
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
  menuButton: {
    borderTopColor: colors.secondary_2,
    borderTopWidth: 1,
    marginTop: 15,
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

export default UserMenu;
