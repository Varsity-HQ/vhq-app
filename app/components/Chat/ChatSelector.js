import React, { useEffect } from "react";
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
import OnlineIndicator from "../Dating/OnlineIndicator";
import { FontAwesome5 } from "@expo/vector-icons";

function ChatSelector({ data, is_dating, display, handle_done_loading }) {
  if (!data) return null;

  const navigation = useNavigation();
  const uid = __get_chatAcc_id(data, "d");

  if (!uid) return null;

  const accCol = is_dating
    ? collection(db, "discover_profiles")
    : collection(db, "accounts");
  const userDocRef = doc(accCol, uid);
  const [account, account_loading, err] = useDocumentData(userDocRef);

  useEffect(() => {
    // console.log({ uid, isDone: !account_loading, data: account });
    if (!account_loading || account_loading) set_done_loading();
  });

  const set_done_loading = () => {
    handle_done_loading(uid);
  };

  // if (account_loading || !display) {
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

  if (is_dating) {
    return (
      <TouchableHighlight
        underlayColor={colors.dark_2}
        onPress={() => {
          navigation.navigate(CHAT_PAGE, {
            uid: uid,
            username: account.nickname,
            dating: true,
          });
        }}
      >
        <View style={styles.c_s_container}>
          <>
            <View style={styles.c_s_left_section}>
              <View>
                <Image
                  uri={account.profilepic}
                  style={styles.chat_profile_pic}
                />
                <View style={styles.profile_side_icon_container}>
                  <FontAwesome5
                    name="user-astronaut"
                    color={colors.white}
                    size={16}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.c_s_name}>{account.nickname}</Text>
                <View style={styles.c_s_user_time}>
                  <View>
                    <OnlineIndicator online={account.is_online} />
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
              {!data.opened && !sent_by_me ? (
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

  return (
    <TouchableHighlight
      underlayColor={colors.dark_2}
      onPress={() => {
        navigation.navigate(CHAT_PAGE, {
          uid: uid,
          username: account.username,
        });
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
            {!data.opened && !sent_by_me ? (
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
