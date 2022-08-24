import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
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
import { connect } from "react-redux";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { __get_chatAcc_id } from "../../util/chatRoomUtils";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";

const mapStateToProps = (state) => {
  return {
    acc_data: state.core.accData,
    chatPage: state.chatPage,
  };
};

const ChatRoomHome = ({ acc_data }) => {
  const chat_ref = collection(db, "chats");
  const query_ = query(
    chat_ref,
    where("members", "array-contains-any", [
      acc_data.userID,
      acc_data.discover_profile_id,
    ]),
    // where("lastMessageSent", "!=", "Say hi"),
    orderBy("lastMessageSent"),
    orderBy("last_update", "desc"),
  );

  const [chats, chats_loading, error] = useCollectionData(query_);
  const [h, setH] = useState([]);

  let final_list = [];

  const handle_set_header = () => {
    setH("e");
  };

  if (!chats_loading) {
    chats.forEach(async (x) => {
      const uid = __get_chatAcc_id(x, x.is_dating_chat ? "d" : null);
      const accCol = x.is_dating_chat
        ? collection(db, "discover_profiles")
        : collection(db, "accounts");
      const userDocRef = doc(accCol, uid);

      handle_set_header();

      const data = await getDoc(userDocRef);
      if (data.exists) {
        const rel_data = x.is_dating_chat
          ? data.data()
          : {
              profilepic: data.data().profilepic,
              username: data.data().username,
              surname: data.data().surname,
              firstname: data.data().firstname,
            };
        const head_data = { ...x, ...rel_data };

        console.log({ head_data });
        return final_list.push(head_data);
      }
    });

    console.log({ final_list });
  }

  //   console.log({ query1Resp });

  return (
    <Screen style={styles.container}>
      <AppText>{final_list.length}</AppText>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default connect(mapStateToProps, null)(ChatRoomHome);
