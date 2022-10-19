import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import Header from "../../components/Chat/ChatPageHeader";
import Screen from "../../components/Screen";
import InputAccessoryView from "../../components/InputAccessoryView";
import MsgInputContainer from "../../components/Chat/MsgInputContainer";
import ChatBubble from "../../components/Chat/ChatBubble";
import colors from "../../config/colors";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  Composer,
  Avatar,
} from "react-native-gifted-chat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Image from "../../components/Image";
import Text from "../../components/AppText";
import LoadingChat from "../../components/Chat/LoadingChat";
import { useRoute } from "@react-navigation/native";
import db from "../../util/fb_admin";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  getDoc,
  limit,
  addDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { connect } from "react-redux";
import { v4 } from "uuid";
import axios from "axios";

import { _chat_head_data } from "../../util/chatRoomUtils";
import { sendPushNotification } from "../../util/sendPushNotification";

const mapStateToProps = (state) => {
  return {
    account: state.core.accData,
  };
};

function ChatPage({ account }) {
  const [textMessage, onInputTextChanged] = useState("");
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [chat_id, set_chat_id] = useState("id");
  const [user_id, set_uid] = useState(null);
  const route = useRoute();
  const isDatingChat = route.params.dating ? true : false;
  const isMarketplaceChat = false;
  const chat_acc_id = isDatingChat
    ? account.discover_profile_id
    : account.userID;

  /** get chats */
  const msgColRef = collection(db, "chatMessages");
  const queryRef = query(
    msgColRef,
    where("chat_id", "==", chat_id),
    orderBy("sent_date", "desc"),
    limit(25),
  );
  const [messages_list, msg_loading, meerror] = useCollectionData(queryRef);
  /** get user */

  const accDocRef = isDatingChat
    ? doc(db, "discover_profiles", route.params.uid)
    : doc(db, "accounts", route.params.uid);
  const [userData, user_loading, error] = useDocumentData(accDocRef);
  let messages_processed = [];

  if (userData && !user_loading && messages_list && !msg_loading) {
    messages_list.forEach((x) => {
      messages_processed.push({
        _id: x.id,
        text: x.message,
        createdAt: x.sent_date,
        user: {
          _id: x.sent_by,
          name:
            account.userID === route.params.uid
              ? account.firstname
              : userData.firstname,
          avatar:
            account.userID === route.params.uid
              ? account.profilepic
              : userData.profilepic,
        },
        received: true,
      });
    });
  }

  useEffect(() => {
    setUsername(route.params.username);
    set_uid(route.params.uid);
    process_chat_id(route.params.uid);
  }, []);

  const process_chat_id = async (other_u_uid) => {
    let __chat_id = "";
    let __no_chats = false;

    const chatsRef = collection(db, "chats");
    const queryChats = query(
      chatsRef,
      where("members", "array-contains", chat_acc_id),
    );

    let chat_data = null;

    await getDocs(queryChats)
      .then((data) => {
        if (data.size === 0) {
          __no_chats = true;
        }

        data.forEach((x) => {
          x.data().members.forEach((m) => {
            if (m === other_u_uid) {
              chat_data = x.data();
              return (__chat_id = x.id);
            }
          });
        });
        if (!__chat_id) {
          __no_chats = true;
        }
      })
      .then(() => {
        const docRef = doc(db, "chats", __chat_id);
        if (chat_data?.sent_by !== chat_acc_id) {
          return updateDoc(docRef, {
            opened: true,
          });
        } else {
          return;
        }
      })
      .catch((err) => {});

    if (__no_chats && __chat_id === "") {
      let user_account = {};

      await getDoc(accDocRef)
        .then(async (data) => {
          user_account = data.data();

          let new_chat_head = {
            lastMessageSent: "v72wA14Hj4%2SDDR",
            last_update: new Date().toISOString(),
            members: [chat_acc_id, other_u_uid],
            members_chat_heads: _chat_head_data(user_account, isDatingChat),
            sent_by: chat_acc_id,
            opened: true,
            is_dating_chat: isDatingChat,
            is_marketplace_chat: isMarketplaceChat,
          };

          await addDoc(chatsRef, new_chat_head)
            .then((cdata) => {
              __chat_id = cdata.id;
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });

      //   const accDocRef = isDatingChat
      // ? doc(db, "discover_profiles", route.params.uid)
      // : doc(db, "accounts", route.params.uid);
    }

    if (__chat_id) {
      set_chat_id(__chat_id);
    }
  };

  const onSend = async (messages = []) => {
    const chatmessagesRef = collection(db, "chatMessages");
    await addDoc(chatmessagesRef, {
      message: messages[0].text,
      sent_date: new Date().toISOString(),
      sent_by: chat_acc_id,
      read: "false",
      id: v4(),
      chat_id: chat_id,
    })
      .then((data) => {
        const messageRef = doc(db, "chatMessages", data.id);
        return updateDoc(messageRef, {
          id: data.id,
        });
      })
      .then(() => {
        let chatRef = doc(db, "chats", chat_id);
        return updateDoc(chatRef, {
          lastMessageSent: messages[0].text,
          last_update: new Date().toISOString(),
          sent_by: chat_acc_id,
          opened: false,
        });
      })
      .then(async () => {
        let receiver_id = route.params.uid;
        const userRef = isDatingChat
          ? doc(db, "discover_profiles", receiver_id)
          : doc(db, "accounts", receiver_id);

        let proceed, user_data, notificationToken;

        await getDoc(userRef)
          .then(async (data) => {
            if (!isDatingChat) {
              notificationToken = data.data().notificationToken;
            } else {
              let accRef = doc(db, "accounts", data.data().parentID);
              return getDoc(accRef);
            }
          })
          .then((dis_data) => {
            if (isDatingChat) {
              notificationToken = dis_data.data().notificationToken;
            }

            if (notificationToken) {
              return sendPushNotification(notificationToken, {
                title: "[chikx] sent you a message",
                body: messages[0].text,
                username: route.params.username,
                user_id: route.params.uid,
                isDatingChat: isDatingChat,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });

        // return axios.post("/chat/handle/sentmsg", {
        //   send_to: isDatingChat ? userData.id : userData.userID,
        //   sent_by: chat_acc_id,
        //   message: messages[0].text,
        //   sent_by_user: account.firstname + " " + account.surname,
        // });
      })
      .catch((err) => {});
  };

  const renderItem = ({ item }) => {
    return <ChatBubble data={item} />;
  };

  const renderAvatar = (props) => {
    return (
      <>
        <Avatar
          {...props}
          containerStyle={{
            left: {
              backgroundColor: colors.dark_2,
              borderRadius: 100,
            },
          }}
        ></Avatar>
      </>
    );
  };
  const renderSend = (props) => {
    return (
      <>
        <Send
          {...props}
          textStyle={{
            color: colors.secondary,
          }}
        ></Send>
      </>
    );
  };

  const renderInputToolbar = (props) => {
    return (
      <>
        <InputToolbar
          {...props}
          containerStyle={{
            backgroundColor: colors.darkish,
            marginHorizontal: 10,
            borderRadius: 10,
            borderTopWidth: 0,
            borderTopColor: colors.secondary,
            borderColor: colors.secondary,
            borderWidth: 0,
            // marginTop: 10,
            // bottom: 3,
          }}
          primaryStyle={{
            borderColor: "red",
            borderWidth: 0,
            borderRadius: 10,
            alignItems: "center",
          }}
          textInputProps={{
            style: {
              fontSize: 15,
              color: "#fff",
              flex: 1,
              alignItems: "center",
              alignSelf: "center",
              paddingHorizontal: 15,
              paddingVertical: 5,
              //   borderWidth: 1,
              borderColor: "red",
            },
            // multiline: true,
            // onSubmitEditing: () => {
            //   if (props.text && props.onSend) {
            //     let text = props.text;
            //     props.onSend({ text: text.trim() }, true);
            //   }
            // },
          }}
        />
        {/* <Image style={styles.profilepic} /> */}
      </>
    );
  };

  if (chat_id === "id" || chat_id === null || msg_loading || user_loading) {
    return <LoadingChat username={username} />;
  }

  return (
    <>
      <Screen style={styles.container}>
        <Header dating={isDatingChat} account={userData} />
        <GiftedChat
          listViewProps={{
            style: {
              backgroundColor: colors.dark_opacity,
            },
          }}
          scrollToBottom
          renderAvatar={renderAvatar}
          text={textMessage}
          onInputTextChanged={(text) => onInputTextChanged(text)}
          renderUsernameOnMessage
          lightboxProps={{ useNativeDriver: true }}
          bottomOffset={insets.bottom}
          messages={messages_processed}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: chat_acc_id,
          }}
          alwaysShowSend
          // renderBubble={this.renderBubble}
          renderInputToolbar={renderInputToolbar}
          renderSend={renderSend}

          // renderAccessory={() => {
          //   <></>;
          // }}
          //
          // onSend={messages => this.onSend(messages)}
        />
        {/* <MsgInputContainer /> */}

        {Platform.OS === "android" && (
          <KeyboardAvoidingView behavior="padding" />
        )}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  profilepic: {
    height: 30,
    width: 30,
    borderRadius: 100,
    margin: 10,
  },
  inner_container: {
    backgroundColor: colors.dark_opacity,
    flex: 1,
  },
  container: {
    // flexDirection: "column",
  },
});

export default connect(mapStateToProps, null)(ChatPage);
