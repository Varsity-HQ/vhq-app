import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import colors from "../../config/colors";
import Button from "../Button";
import Text from "../AppText";
import report_options from "./options.json";

function ReportPostMenu({
  isReportModalVisible,
  handleReportModal,
  type = "post",
}) {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedSubOption, setSubSelectedOption] = useState("");
  const [subOptions, setSubOptions] = useState([]);
  const [text, setText] = useState(false);
  const [readyToSubmit, setReadToSubmit] = useState(false);

  useEffect(() => {
    initializeOptions();
  }, []);

  const initializeOptions = () => {
    if (type === "post") {
      setOptions(report_options.post_options);
    }
  };

  const handleOptionPress = (x) => {
    setSelectedOption(x.title);

    if (x.sub_options && x.sub_options !== "text") {
      setText(false);
      setReadToSubmit(false);
      return setSubOptions(x.sub_options);
    }

    if (!x.sub_options) {
      setText(false);
      setReadToSubmit(true);
      return setSubOptions([]);
    }

    if (x.sub_options === "text") {
      setText(false);
      setReadToSubmit(false);
      return setText(true);
    }
  };

  const handleBeforeModalStateChange = () => {
    handleReportModal();
    setTimeout(() => {
      initializeOptions();
      setSelectedOption("");
      setSubSelectedOption("");
      setSubOptions([]);
      setText("");
      setReadToSubmit(false);
    }, 100);
  };

  console.log({ selectedOption });
  console.log({ subOptions });
  console.log({ text });

  return (
    <Modal
      hideModalContentWhileAnimating={true}
      backdropColor={colors.dark_opacity_2}
      onSwipeComplete={handleBeforeModalStateChange}
      swipeDirection={["down"]}
      style={styles.modal_bg}
      onBackdropPress={handleBeforeModalStateChange}
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

          {!readyToSubmit && (
            <>
              <Text style={styles.bold_text}>
                Help us understand why you are reporting this post
              </Text>
              <Text style={styles.report_text}>
                Your report will be anonymous and our support team will go
                through it as soon as possible
              </Text>
            </>
          )}
          {readyToSubmit && (
            <>
              <Text
                style={[
                  styles.bold_text,
                  {
                    textAlign: "center",
                  },
                ]}
              >
                Thanks for letting us know
              </Text>
              <Text
                style={[
                  styles.report_text,
                  {
                    textAlign: "center",
                    paddingBottom: 150,
                  },
                ]}
              >
                Your feedback will help keep the VarsityHQ community safe.
                Submit your report and decide if you want to block or unfollow
                account
              </Text>
              <View></View>
            </>
          )}
        </View>

        <View style={styles.inner_content}>
          {!readyToSubmit &&
            subOptions.map((x, index) => {
              if (!x.hide) {
                return (
                  <TouchableOpacity
                    style={styles.menuButton}
                    key={index}
                    onPress={() => handleOptionPress(x)}
                  >
                    <View style={styles.touchableInner}>
                      {x.icon}
                      <Text style={styles.text}>{x.title}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }
            })}
          {subOptions.length === 0 &&
            !readyToSubmit &&
            options.map((x, index) => {
              if (!x.hide) {
                return (
                  <TouchableOpacity
                    style={styles.menuButton}
                    key={index}
                    onPress={() => handleOptionPress(x)}
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
        {readyToSubmit && <View></View>}
        {readyToSubmit && (
          <Button
            type={1}
            style={{
              borderWidth: 0,
            }}
            title="Submit Report"
            // onPress={handleReportModal}
          />
        )}
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
