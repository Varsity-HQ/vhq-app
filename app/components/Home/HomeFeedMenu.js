import React from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import colors from "../../config/colors";
import Button from "../Button";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { showFilteredPosts } from "../../store/actions/actions";
import { RFValue } from "react-native-responsive-fontsize";
import Text from "../AppText";
import universityShortName from "../../util/universityShortName";

const mapStateToProps = (state) => {
  return {
    auth_acc_id: state.core.accData.userID,
    deleting_post: state.core.deleting_post,
    university: state.core.accData.university,
    isShowingUnfilteredPosts: state.core.accData.isShowingUnfilteredPosts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showFilteredPosts: (filter) => dispatch(showFilteredPosts(filter)),
  };
};

const iconSize = 32;

function PostMenu({
  university,
  isShowingUnfilteredPosts,
  showFilteredPosts,
  tab_index,
}) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  return (
    <>
      <Button
        onPress={handleModal}
        style={{
          backgroundColor: colors.transparent,
          borderRadius: 30,
          borderColor: colors.secondary,
          borderWidth: 1,
          // borderStyle: "dotted",
          overflow: "hidden",
          paddingVertical: 8,
          zIndex: 100,
        }}
        content={
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                zIndex: 1,
              }}
            >
              <FontAwesome name="exchange" size={20} color={colors.secondary} />
              {/* <Text
                        style={{
                          fontWeight: "600",
                          marginLeft: 5,
                        }}
                      >
                        Toggle
                      </Text> */}
            </View>
          </View>
        }
        type={4}
        title=""
      />
      <Modal
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
          <View
            style={{
              marginTop: 20,
              flexDirection: "column",
              alignItems: "center",
              paddingBottom: 20,
              borderBottomWidth: 1,
              borderBottomColor: colors.dark_opacity_2,
            }}
          >
            <Text style={styles.header}>Control your Timeline</Text>
            <Text
              style={{
                textAlign: "center",
                color: colors.secondary,
                marginTop: 10,
              }}
            >
              Choose to see either posts created at{" "}
              {universityShortName(university)} or posts from people at other
              institutions
            </Text>
          </View>
          <View style={styles.inner_content}>
            {isShowingUnfilteredPosts ? (
              <TouchableOpacity
                onPress={() => {
                  showFilteredPosts({ set_filter: true, tab: tab_index });
                  handleModal();
                }}
                style={styles.menuButton}
              >
                <View style={styles.touchableInner}>
                  <View>
                    <FontAwesome
                      name="exchange"
                      size={24}
                      color={colors.secondary}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <Text style={styles.htext}>
                      Show me posts from {universityShortName(university)}
                    </Text>
                    <Text style={styles.text2}>
                      We'll only display posts that where posted at your
                      institution
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  showFilteredPosts({ set_filter: false, tab: tab_index });
                  handleModal();
                }}
                style={styles.menuButton}
              >
                <View style={styles.touchableInner}>
                  <View>
                    <FontAwesome
                      name="exchange"
                      size={24}
                      color={colors.secondary}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <Text style={styles.htext}>Show me everything</Text>
                    <Text style={styles.text2}>
                      You'll be able to see posts from all institutions
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
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
  header: {
    fontSize: RFValue(20),
    fontWeight: "700",
  },
  touchableInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  htext: {
    color: colors.white,
    fontSize: 18,
    marginLeft: 20,
    fontWeight: "700",
  },
  text: {
    color: colors.white,
    fontSize: 18,
    marginLeft: 20,
    fontWeight: "400",
  },
  text2: {
    color: colors.secondary,
    fontSize: 16,
    marginLeft: 20,
    fontWeight: "400",
    marginTop: 5,
  },
  menuButton: {},
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

export default connect(mapStateToProps, mapDispatchToProps)(PostMenu);
