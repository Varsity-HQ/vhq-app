import React from "react";
import { View, TouchableHighlight } from "react-native";
import Image from "../Image";
import Text from "../AppText";
import styles from "./styles";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import db from "../../util/fb_admin";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { __get_chatAcc_id } from "../../util/chatRoomUtils";
import SkeletonComponent from "../Skeletons/SkeletonComponent";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import colors from "../../config/colors";
import { CHAT_PAGE } from "../../navigation/routes";

function ChatSelector({ data }) {
  const navigation = useNavigation();
  const uid = __get_chatAcc_id(data);
  const accCol = collection(db, "accounts");
  const userDocRef = doc(accCol, uid);
  const [account, account_loading, err] = useDocumentData(userDocRef);
  // console.log({ account });

  if (account_loading) {
    return (
      <View style={styles.c_s_container}>
        <View style={styles.c_s_left_section}>
          {/* <Image style={styles.chat_profile_pic} /> */}
          <SkeletonComponent animationOff style={styles.chat_profile_pic} />
          <View style={{ width: "100%", flex: 1 }}>
            <SkeletonComponent animationOff style={styles.sk_c_s_name} />
            <SkeletonComponent animationOff style={styles.sk_c_s_user_time} />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            paddingRight: 10,
          }}
        ></View>
      </View>
    );
  }

  const sent_by_me = data.sent_by !== uid;

  return (
    <TouchableHighlight
      underlayColor={colors.dark_2}
      onPress={() => {
        navigation.navigate(CHAT_PAGE);
      }}
    >
      <View style={styles.c_s_container}>
        <>
          <View style={styles.c_s_left_section}>
            <Image uri={account.profilepic} style={styles.chat_profile_pic} />
            <View>
              <Text style={styles.c_s_name}>
                {account.firstname} {account.surname}
              </Text>
              <View style={styles.c_s_user_time}>
                <View>
                  <Text>
                    @{account.username}
                    <Text style={styles.c_s_dot_sptor}> •</Text>
                  </Text>
                </View>
                <View style={styles.c_s_time_stamp}>
                  <Text style={styles.c_s_time_text}>
                    {dayjs(data.last_update).format("LT")}
                  </Text>
                </View>
              </View>
              <Text>
                {sent_by_me && "me :"}
                <Text style={styles.c_s_msg_preview}>
                  {" "}
                  {data.lastMessageSent}
                </Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              paddingRight: 10,
            }}
          >
            {!sent_by_me ? (
              <View style={styles.c_s_dot} />
            ) : (
              <View style={styles.c_s_dot_them} />
            )}
          </View>
        </>
      </View>
    </TouchableHighlight>
  );
}

export default ChatSelector;
