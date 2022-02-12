import React from "react";
import { View } from "react-native";
import Image from "../Image";
import Text from "../AppText";
import styles from "./styles";

function ChatSelector({ data }) {
  console.log({ data });
  return (
    <View style={styles.c_s_container}>
      <View style={styles.c_s_left_section}>
        <Image style={styles.chat_profile_pic} />
        <View>
          <Text style={styles.c_s_name}>Hector Shivambu</Text>
          <View style={styles.c_s_user_time}>
            <View>
              <Text>
                @hector shovambu_<Text style={styles.c_s_dot_sptor}> •</Text>
              </Text>
            </View>
            <View style={styles.c_s_time_stamp}>
              <Text style={styles.c_s_time_text}>7:31 PM</Text>
            </View>
          </View>
          <Text>
            me :<Text style={styles.c_s_msg_preview}> Say hi</Text>
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          paddingRight: 10,
        }}
      >
        <View style={styles.c_s_dot} />
      </View>
    </View>
  );
}

export default ChatSelector;
