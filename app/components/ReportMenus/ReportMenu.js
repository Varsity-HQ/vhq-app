import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import colors from "../../config/colors";
import Button from "../Button";
import Input from "../Input";
import Text from "../AppText";
import report_options from "./options.json";
import { submit_report } from "../../store/actions/actions";
import { connect } from "react-redux";
import Toast from "react-native-toast-message";
import axios from "axios";

import {
  block_profile_by_id,
  report_content_id,
} from "../../store/actions/filterActions";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    submit_report: () => dispatch(submit_report()),
    report_content_id: (id) => dispatch(report_content_id(id)),
    block_profile_by_id: (id) => dispatch(block_profile_by_id(id)),
  };
};

function ReportMenu({
  isReportModalVisible,
  handleReportModal,
  report_content_id,
  block_profile_by_id,
  type = "post",
  submit_report,
  onReportSubmitted,
  node_id,
  preventDefault,
}) {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [sub_options_heading, set_sub_options_heading] = useState(null);
  const [selectedSubOption, setSubSelectedOption] = useState("");
  const [subOptions, setSubOptions] = useState([]);
  const [text, setText] = useState(false);
  const [readyToSubmit, setReadToSubmit] = useState(false);
  const [reportingFor, setReportingFor] = useState("");

  const [page, setPage] = useState(0);

  const [submited, setSubmitted] = useState(false);
  const [reporting, setReporting] = useState(false);

  useEffect(() => {
    initializeOptions();
  }, []);

  const initializeOptions = () => {
    if (type === "post") {
      setReportingFor("post");
      return setOptions(report_options.post_options);
    }
    if (type === "profile") {
      setReportingFor("account");
      return setOptions(report_options.account_options);
    }
    if (type === "trend") {
      setReportingFor("trend or hashtag");
      return setOptions(report_options.trend_options);
    }
    if (type === "comment") {
      setReportingFor("comment");
      return setOptions(report_options.comment_options);
    }
    if (type === "profile-block") {
      setReportingFor("profile");
      return setOptions(report_options.block_profile_options);
    }
    if (type === "dating-profile") {
      setReportingFor("profile");
      return setOptions(report_options.dating_profile_options);
    }
    if (type === "marketplace_ad") {
      setReportingFor("ad");
      return setOptions(report_options.marketplace_ad_options);
    }

    setReportingFor("");
    return setOptions([]);
  };

  const handleSubOptionPress = (x) => {
    setSubSelectedOption(x.title);
    setReadToSubmit(true);
    set_sub_options_heading(null);
  };

  const handleBlockAccount = () => {
    console.log("block this account", node_id);
    block_profile_by_id(node_id);

    if (onReportSubmitted) return onReportSubmitted();
  };

  const handleOptionPress = (x) => {
    if (x.title === report_options.block_profile_options[0].title) {
      return handleBlockAccount();
    }

    setSelectedOption(x.title);

    if (x.sub_options && x.sub_options !== "text" && x.sub_options_heading) {
      setText(false);
      setReadToSubmit(false);
      set_sub_options_heading(x.sub_options_heading);
      setSubOptions(x.sub_options);
      setPage(1);
      return;
    }
    if (x.sub_options && x.sub_options !== "text") {
      setText(false);
      setReadToSubmit(false);
      set_sub_options_heading(null);
      return setSubOptions(x.sub_options);
    }

    if (!x.sub_options) {
      setText(false);
      set_sub_options_heading(null);
      setReadToSubmit(true);
      return setSubOptions([]);
    }

    if (x.sub_options === "text") {
      setReadToSubmit(false);
      set_sub_options_heading(null);
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
      setReporting(false);
      set_sub_options_heading(null);
    }, 100);
  };

  const handle_submit_report = () => {
    // submit_report();

    setReporting(true);
    const reported_obj = {
      node_id: node_id,
      contentType: type,
      reason: selectedOption,
      sub_reason: selectedSubOption,
    };

    // console.log({ reported_obj });

    setTimeout(() => {
      if (onReportSubmitted) return onReportSubmitted();
      handleBeforeModalStateChange();
      handleReportModal();
    }, 300);

    report_content_id(node_id);

    axios
      .post("/report", reported_obj)
      .then(() => {
        console.log("reported");
        setReporting(false);
        Toast.show({
          type: "general",
          autoHide: true,
          text1: undefined,
          text2: `Your report has been submitted`,
        });
        if (onReportSubmitted) return onReportSubmitted();
        handleBeforeModalStateChange();
        handleReportModal();
      })
      .catch((err) => {
        console.log(err);
        setReporting(false);
      });
  };

  const renderComponent = () => {
    if (submited) return submitedPage();

    if (readyToSubmit) return readyToSubmitPage();

    switch (page) {
      case 0:
        return renderFirstPage();
      case 1:
        return renderSecondPage();
      default:
        return null;
    }
  };

  const renderFirstPage = () => {
    if (type !== "profile-block") {
      return (
        <>
          <Text style={styles.bold_text}>
            Help us understand why you are reporting this {reportingFor}
          </Text>
          <Text style={styles.report_text}>
            Your report will be anonymous and our support team will go through
            it as soon as possible
          </Text>
          <View style={styles.inner_content}>
            {options.map((x, index) => {
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
        </>
      );
    } else {
      return (
        <>
          <Text style={styles.report_text}>
            Warning : You won't see posts or content from this account after you
            block this profile
          </Text>
          <View style={styles.inner_content}>
            {options.map((x, index) => {
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
        </>
      );
    }
  };

  const renderSecondPage = () => {
    return (
      <>
        {!sub_options_heading && (
          <>
            <Text style={styles.bold_text}>
              Please choose an option that is suitable or relavant for this
              report
            </Text>
            <Text style={styles.report_text}>
              Your report will be anonymous and our support team will go through
              it as soon as possible
            </Text>
          </>
        )}
        {sub_options_heading && (
          <>
            <Text style={styles.bold_text}>{sub_options_heading.heading}</Text>
            <Text style={styles.report_text}>
              {sub_options_heading.subHeading}
            </Text>
          </>
        )}

        <View style={styles.inner_content}>
          {subOptions.map((x, index) => {
            if (!x.hide) {
              return (
                <TouchableOpacity
                  style={styles.menuButton}
                  key={index}
                  onPress={() => handleSubOptionPress(x)}
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
      </>
    );
  };

  const readyToSubmitPage = () => {
    return (
      <>
        <Text
          style={[
            styles.bold_text,
            {
              textAlign: "center",
            },
          ]}
        >
          Your report helps VHQ
        </Text>
        <Text
          style={[
            styles.report_text,
            {
              textAlign: "center",
              paddingBottom: 10,
            },
          ]}
        >
          Your report will help keep the VarsityHQ community safe. Once you
          submit your report, our support team will review it and take action.
        </Text>
        <View>
          <Text
            style={[
              styles.report_text,
              {
                fontWeight: "700",
              },
            ]}
          >
            After you report
          </Text>
          <Text style={[styles.report_text]}>
            - You won't be able to see this {reportingFor} anymore
          </Text>
          <Text
            style={[
              styles.report_text,
              {
                paddingBottom: 150,
              },
            ]}
          >
            - Our support team will review the report and take action
          </Text>
        </View>

        <Button
          type={3}
          style={{
            borderWidth: 0,
          }}
          title={reporting ? "Submitting report.." : "Submit report"}
          onPress={handle_submit_report}
        />
      </>
    );
  };

  const submitedPage = () => {
    return (
      <>
        {!readyToSubmit && !sub_options_heading && (
          <>
            <Text style={styles.bold_text}>
              Help us understand why you are reporting this {reportingFor}
            </Text>
            <Text style={styles.report_text}>
              Your report will be anonymous and our support team will go through
              it as soon as possible
            </Text>
          </>
        )}
        {sub_options_heading && (
          <>
            <Text style={styles.bold_text}>{sub_options_heading.heading}</Text>
            <Text style={styles.report_text}>
              {sub_options_heading.subHeading}
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
              Your report helps VHQ
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
              Your report will help keep the VarsityHQ community safe. Once you
              submit your report, our support team will review it and take
              action.
            </Text>
            <View></View>
          </>
        )}

        <View style={styles.inner_content}>
          {!readyToSubmit &&
            subOptions.map((x, index) => {
              if (!x.hide) {
                return (
                  <TouchableOpacity
                    style={styles.menuButton}
                    key={index}
                    onPress={() => handleSubOptionPress(x)}
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
      </>
    );
  };

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
        <View
          style={{
            paddingBottom: 50,
          }}
        >
          {type === "profile-block" ? (
            <Text style={styles.header_text}>Block {reportingFor}</Text>
          ) : (
            <Text style={styles.header_text}>Report {reportingFor}</Text>
          )}

          <View
            style={{
              borderBottomColor: colors.secondary,
              borderBottomWidth: 1,
              paddingBottom: 20,
              // marginBottom: 50,
            }}
          />
          {renderComponent()}
        </View>
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
    marginTop: 10,
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

export default connect(mapStateToProps, mapDispatchToProps)(ReportMenu);
