import React, { useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { View, StyleSheet, FlatList } from "react-native";
import Text from "../../components/AppText";
import Screen from "../../components/Screen";
import db from "../../util/fb_admin";
import ChatHeader from "../../components/Chat/ChatHeader";
import { connect } from "react-redux";
import styles from "../../components/Chat/styles";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatRoomFooter from "../../components/Chat/ChatRoomFooter";
import { __get_chatAcc_id } from "../../util/chatRoomUtils";
import ChatSelector from "../../components/Chat/ChatSelector";

const mapStateToProps = (state) => {
  return {
    acc_data: state.core.accData,
  };
};

function ChatHome({ acc_data }) {
  const [userAccountsModal, set_modal_state] = useState(false);
  const [activetab, setactivetab] = useState(0);
  const chat_ref = collection(db, "chats");

  const [pageIndex, setPageIndex] = useState(0);

  const query_ = query(
    chat_ref,
    where("members", "array-contains", acc_data.userID),
    orderBy("last_update", "desc"),
  );

  const [chats, chats_loading] = useCollectionData(query_);
  const [chat_global_loader, set_chat_global_loader] = useState(false);

  let accounts_in_chat = [];

  if (!chats_loading) {
    chats.forEach((x) => {
      x.members.forEach((m) => {
        if (m !== acc_data.userID) {
          accounts_in_chat.push(m);
        }
      });
    });

    function getAcc() {
      let ua_promises = [];
      accounts_in_chat.forEach((x) => {
        const acc_ref = doc(db, "accounts", x);

        ua_promises.push(getDoc(acc_ref));
      });
      return Promise.all(ua_promises);
    }

    const set_array_to_state = (n) => {
      // console.log("fire");
      // console.log({ n });
      // set_parsed_acc({ n });
    };

    // getAcc()
    //   .then((x) => {
    //     let accounts_parsed_local = [];
    //     x.forEach((p) => {
    //       accounts_parsed_local.push(p.data());
    //     });

    //     set_array_to_state(accounts_parsed_local);
    //     // console.log(accounts_parsed_local);

    //     set_accounts_loading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  return (
    <Screen>
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(x) => __get_chatAcc_id(x)}
        ListHeaderComponent={<ChatHeader />}
        ListFooterComponent={
          <ChatRoomFooter
            loading={chats_loading}
            tab={pageIndex}
            data={chats}
          />
        }
      />
    </Screen>
  );
}

const renderItem = ({ item }) => {
  return <ChatSelector data={item} />;
};

export default connect(mapStateToProps, null)(ChatHome);
