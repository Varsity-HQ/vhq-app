import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import Text from "../AppText";
import TabNavigator from "../TabNavigator";
import Image from "../Image";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { PROFILE } from "../../navigation/routes";

const chat_tabs = [
  {
    title: "Chats",
    index: 1,
    icon: <MaterialCommunityIcons color={colors.white} size={18} name="chat" />,
  },
  {
    title: "Unwanted (2)",
    index: 2,
    icon: <FontAwesome color={colors.white} size={16} name="life-ring" />,
  },
  {
    title: "Accounts",
    index: 3,
    icon: <FontAwesome color={colors.white} size={16} name="user-circle-o" />,
  },
];

const mapStateToProps = (state) => {
  return {
    user_data: state.core.accData,
  };
};

function ChatHeader({ navigation, user_data }) {
  const [index, setTab] = useState(1);

  return (
    <View style={styles.header_container}>
      <View style={styles.header}>
        <View
          style={{
            paddingHorizontal: 10,
          }}
        >
          <Text allowFontScaling={false} style={styles.vhq_title}>
            Chatroom
          </Text>
        </View>
        <View style={styles.header_uni_container}>
          <TouchableOpacity
            onPress={() => navigation.navigate(NOTIFICATIONS)}
            style={styles.header_uni_wrapper}
          >
            <Ionicons
              color={colors.white}
              name="ios-ellipsis-horizontal-outline"
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tabbar_container}>
        <TabNavigator
          active={index}
          onPress={(i) => setTab(i)}
          items={chat_tabs}
        />
      </View>
    </View>
  );
}

export default connect(mapStateToProps, null)(ChatHeader);
