import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import colors from "../../config/colors";
import Button from "../Button";
import { Ionicons } from "@expo/vector-icons";
import Text from "../AppText";
import { RFValue } from "react-native-responsive-fontsize";
import AppTextInput from "../Input";
import { TyphoonLine } from "react-native-remix-icon/src/icons";
import { connect } from "react-redux";

const height = Dimensions.get("window").height;

const mapStateToProps = (state) => {
  return {
    userID: state.core.accData.userID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

function ItemActions({ data, posted_by, userID }) {
  if (userID === posted_by) {
    return (
      <View style={styles.container}>
        <View
          style={{
            paddingBottom: 5,
            paddingTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode={"tail"}
              style={{ color: colors.secondary_2 }}
            >
              Easily manage or delete your ad from here
            </Text>
          </View>
        </View>
        <View style={[styles.row]}>
          <Button
            disabled
            style={{
              flex: 1,
            }}
            type={3}
            title="Edit Ad"
          />
          <Button
            disabled
            style={{
              flex: 1,
              marginLeft: 10,
              backgroundColor: colors.redish,
            }}
            type={3}
            title="Delete Ad"
          />
        </View>
      </View>
    );
  }
  return (
    <View
      style={[
        styles.container,
        {
          opacity: 0.3,
        },
      ]}
    >
      <View
        style={{
          paddingBottom: 5,
          paddingTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="chatbox"
            color={colors.secondary_2}
            size={14}
            style={{ marginRight: 4 }}
          />
          <Text
            numberOfLines={1}
            ellipsizeMode={"tail"}
            style={{ color: colors.secondary_2 }}
          >
            Send a message to ~{data.username}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.row,
          {
            opacity: 0.4,
          },
        ]}
      >
        <AppTextInput
          editable={false}
          width="75%"
          style={{
            flex: 1,
            borderWidth: 0,
            borderRightWidth: 0,
            borderLeftWidth: 0,
            backgroundColor: colors.dark_opacity_2,
          }}
          type={2 ? 2 : 2}
          placeholder="I'm interested.."
        />
        {/* 
        
        this.state= {
          nus : {
            moda : null;
          },
        };
        
        */}
        <Button
          disabled
          style={{
            width: "20%",
            marginLeft: 10,
          }}
          type={3}
          title="Send"
        />
      </View>

      {/* <View style={styles.bottom_icons}>
        <IconButton icon="heart" title="Like" />
        <IconButton icon="bookmark" title="Bookmark" />
        <IconButton icon="envelope" title="Message" />
        <IconButton icon="flag" title="Report" />
      </View> */}
    </View>
  );
}

const IconButton = ({ title, icon }) => {
  return (
    <View style={styles.btn_container}>
      <Button
        style={styles.icon_button}
        content={
          <View>
            <FontAwesome size={24} color={colors.white} name={icon} />
          </View>
        }
        type={3}
        title="button"
      />
      <Text
        style={{
          fontWeight: "bold",
          fontSize: RFValue(12),
          color: colors.secondary_2,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  btn_container: {
    alignItems: "center",
  },
  icon_button: {
    borderRadius: 100,
    height: height * 0.06,
    width: height * 0.06,
  },
  bottom_icons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    // opacity: 0.3,

    margin: 10,

    borderTopWidth: 1,
    borderBottomWidth: 1,

    backgroundColor: colors.dark_opacity_2,
    borderRadius: 10,

    borderColor: colors.dark_opacity_2,
    padding: 15,
    paddingBottom: 5,
    paddingTop: 5,

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemActions);
