import React, { useEffect, useState } from "react";
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

function ChatSelector({ data, is_dating }) {
  if (!data) return null;

  const navigation = useNavigation();
  const uid = __get_chatAcc_id(data, "d");

  if (!uid) return null;

  const accCol = is_dating
    ? collection(db, "discover_profiles")
    : collection(db, "accounts");
  const userDocRef = doc(accCol, uid);
  const [account, account_loading, err] = useDocumentData(userDocRef);
  const [has_chat_headers, set_has_chat_headers] = useState(false);
  const [chat_header_data, set_chat_header_data] = useState(null);

  useEffect(() => {
    let chi = data.members_chat_heads;

    if (Array.isArray(chi)) {
      if (chi.length == 2) {
        let c_h_data = {};
        chi.forEach((x) => {
          if (x.uid === uid) {
            c_h_data = x;
          }
        });
        set_has_chat_headers(true);
        set_chat_header_data(c_h_data);
      } else {
        set_has_chat_headers(false);
        set_chat_header_data(null);
      }
    }
  }, []);

  // if (account_loading || !display) {
  if (account_loading && !has_chat_headers) {
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
    let header_data = has_chat_headers ? chat_header_data : account;
    if (!header_data) return null;
    return (
      <TouchableHighlight
        underlayColor={colors.dark_2}
        onPress={() => {
          navigation.navigate(CHAT_PAGE, {
            uid: uid,
            username: header_data.nickname,
            dating: true,
          });
        }}
      >
        <View style={styles.c_s_container}>
          <>
            <View style={styles.c_s_left_section}>
              <View>
                <Image
                  uri={header_data.profilepic}
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
                <Text style={styles.c_s_name}>{header_data.nickname}</Text>
                <View style={styles.c_s_user_time}>
                  <View>
                    <OnlineIndicator online={account?.is_online} />
                  </View>
                  <View style={styles.c_s_time_stamp}>
                    <Text style={styles.c_s_time_text}>
                      {dayjs(data.last_update).format("LT")}
                    </Text>
                  </View>
                </View>
                <Text ellipsizeMode="tail" numberOfLines={1}>
                  {sent_by_me && "me :"}
                  <Text numberOfLines={1} style={styles.c_s_msg_preview}>
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

  let header_data = has_chat_headers ? chat_header_data : account;
  if (!header_data) return null;
  return (
    <TouchableHighlight
      underlayColor={colors.dark_2}
      onPress={() => {
        navigation.navigate(CHAT_PAGE, {
          uid: uid,
          username: header_data.username,
        });
      }}
    >
      <View style={styles.c_s_container}>
        <>
          <View style={styles.c_s_left_section}>
            <Image
              uri={header_data.profilepic}
              style={styles.chat_profile_pic}
            />
            <View>
              <Text style={styles.c_s_name}>
                {header_data.firstname} {header_data.surname}
              </Text>
              <View style={styles.c_s_user_time}>
                <View>
                  <Text>
                    @{header_data.username}
                    <Text style={styles.c_s_dot_sptor}> •</Text>
                  </Text>
                </View>
                <View style={styles.c_s_time_stamp}>
                  <Text style={styles.c_s_time_text}>
                    {dayjs(data.last_update).format("LT")}
                  </Text>
                </View>
              </View>
              <Text ellipsizeMode="tail" numberOfLines={1}>
                {sent_by_me && "me :"}
                <Text numberOfLines={1} style={styles.c_s_msg_preview}>
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
