import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import colors from "../../config/colors";
import Button from "../Button";
import Text from "../AppText";

function ReportPostMenu({ isReportModalVisible, handleReportModal }) {
  const options = [
    {
      title: "I'm just not interested in this post",
    },
    {
      title: "It's a suspicious post or spam",
    },
    {
      title: "It's abusive or harmful",
    },
    {
      title: "It expresses intentions of self-harm or suicide",
    },
    {
      title: "Something else",
    },
  ];

  return (
    <Modal
      hideModalContentWhileAnimating={true}
      backdropColor={colors.dark_opacity_2}
      onSwipeComplete={handleReportModal}
      swipeDirection={["down"]}
      style={styles.modal_bg}
      onBackdropPress={handleReportModal}
      isVisible={isReportModalVisible}
      useNativeDriver={true}
    >
      <View style={styles.content}>
        <View style={styles.notch} />
        <View>
          <Text style={styles.header_text}>Report</Text>
          <View
            style={{
              borderBottomColor: colors.secondary,
              borderBottomWidth: 1,
              paddingBottom: 20,
            }}
          />
          <Text style={styles.bold_text}>
            Help us understand why you are reporting this post
          </Text>
          <Text style={styles.report_text}>
            Your report will be anonymous and our support team will go through
            it as soon as possible
          </Text>
        </View>
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
          onPress={handleReportModal}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  touchableInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  header_text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
    alignSelf: "center",
  },
  bold_text: {
    color: colors.secondary,
    fontSize: 18,
    marginLeft: 20,
    fontWeight: "700",
    marginTop: 20,
  },
  report_text: {
    color: colors.secondary,
    fontSize: 15,
    marginLeft: 20,
    fontWeight: "400",
    marginTop: 20,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    marginLeft: 20,
    fontWeight: "400",
  },
  menuButton: {
    borderTopWidth: 1,
    borderTopColor: colors.secondary_2,
    paddingVertical: 10,
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

export default ReportPostMenu;
