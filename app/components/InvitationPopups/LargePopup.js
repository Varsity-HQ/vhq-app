import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Modal from "react-native-modal";
import colors from "../../config/colors";
import Button from "../Button";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { POST_PAGE, PROFILE, REFER_A_FRIEND } from "../../navigation/routes";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import Text from "../AppText";
import Image from "../Image";
import { color } from "react-native-reanimated";
import dayjs from "dayjs";
import ReferIcon from "../../assets/gold-coins400x172.png";

const iconSize = 32;

function LargePopup({ open_state, handleModal, data }) {
  const navigation = useNavigation();

  const options = [
    {
      title: "Close",
      onPress: () => {
        handleModal();
      },
      icon: (
        <MaterialCommunityIcons
          color={colors.secondary}
          name="close"
          size={iconSize}
        />
      ),
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
        isVisible={open_state}
        useNativeDriver={true}
      >
        <View style={styles.content}>
          <View style={styles.notch} />
          <View style={styles.inner_content}>
            <View style={styles.center}>
              <View style={styles.imageWrapper}>
                <Image
                  resizeMode="contain"
                  local
                  uri={ReferIcon}
                  style={styles.image}
                />
              </View>
              <Text style={styles.heading}>
                Invite a friend to VarsityHQ and earn cash rewards of up to
              </Text>
              <View style={styles.cup_container}>
                <Text style={styles.cash_up_to}>
                  R{parseFloat(data.cost_per_ref) * 10}
                </Text>
                <Text style={styles.subtext2}>Per 10 invites</Text>
              </View>
              <Text style={styles.subtext}>
                Click button below to use or get referral code. You can request
                payout for cash rewards.
              </Text>
              <View>
                <Button
                  onPress={() => {
                    navigation.navigate(REFER_A_FRIEND);
                    handleModal();
                  }}
                  style={styles.gs_btn}
                  title="Get started"
                />
              </View>
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
  gs_btn: {
    backgroundColor: "#FB1212",
    borderColor: "#F9D697",
    paddingHorizontal: 40,
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
  imageWrapper: {
    height: 150,
    width: "100%",
    padding: 20,
    marginBottom: 10,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  heading: {
    color: colors.white,
    fontSize: 20,
    marginLeft: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  subtext2: {
    color: colors.secondary_2,
    fontSize: 18,
    paddingHorizontal: 20,
    marginBottom: 10,
    fontWeight: "400",
    textAlign: "center",
  },
  subtext: {
    color: colors.secondary,
    fontSize: 16,
    paddingHorizontal: 20,
    marginBottom: 10,
    fontWeight: "400",
    textAlign: "center",
  },
  text: {
    color: colors.white,
    fontSize: 18,
    marginLeft: 20,
    fontWeight: "400",
  },
  cup_container: {
    padding: 20,
    paddingVertical: 5,
    paddingBottom: 0,
    borderColor: colors.v_st_bg_5,
    borderWidth: 2,
    borderRadius: 100,
    width: "70%",
    marginTop: 20,
    marginBottom: 20,
  },
  cash_up_to: {
    color: colors.v_st_bg_5,
    fontSize: 38,
    fontWeight: "700",
    alignSelf: "center",
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

export default LargePopup;
