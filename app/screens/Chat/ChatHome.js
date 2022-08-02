import React, { useEffect, useState } from "react";
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
import TabbedScreenComponent from "../../components/TabbedScreenComponent";
import { get_accounts } from "../../store/actions/chatPage";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import AccountCont from "../../components/Search/AccountCont";
import colors from "../../config/colors";
import uuid from "uuid";

const chat_tabs = [
  {
    title: "Chats",
    index: 1,
    icon: <MaterialCommunityIcons color={colors.white} size={18} name="chat" />,
  },
  {
    title: "Strangers",
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
    acc_data: state.core.accData,
    chatPage: state.chatPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_accounts: (paginate) => dispatch(get_accounts(paginate)),
  };
};

function ChatHome({ acc_data, get_accounts, chatPage }) {
  const [userAccountsModal, set_modal_state] = useState(false);
  const [activetab, setactivetab] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const chat_ref = collection(db, "chats");
  const query_ = query(
    chat_ref,
    where("members", "array-contains-any", [
      acc_data.userID,
      acc_data.discover_profile_id,
    ]),
    orderBy("last_update", "desc"),
  );
  const [chats, chats_loading, error] = useCollectionData(query_);
  const [chat_global_loader, set_chat_global_loader] = useState(false);
  //
  const [c_all_loaded, set_c_all_loaded] = useState(false);

  console.log({ error });

  let accounts_in_chat = [];
  let filtered_chats_allowed = [];
  let filtered_chats_requests = [];

  useEffect(() => {
    if (pageIndex === 3) {
      get_accounts();
    }
  }, []);

  if (error) {
    return (
      <Screen>
        <Text>Unexpected error :(</Text>
      </Screen>
    );
  }

  console.log({ chats });

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
      // set_parsed_acc({ n });
    };

    // getAcc()
    //   .then((x) => {
    //     let accounts_parsed_local = [];
    //     x.forEach((p) => {
    //       accounts_parsed_local.push(p.data());
    //     });

    //     set_array_to_state(accounts_parsed_local);

    //     set_accounts_loading(false);
    //   })
    //   .catch((err) => {
    //   });

    let user_following = acc_data.user_following;

    chats.forEach((x) => {
      let index = user_following.findIndex(
        (acc) => acc.following_user === __get_chatAcc_id(x),
      );
      if (index > -1) {
        filtered_chats_allowed.push(x);
      } else {
        if (x.is_dating_chat || x.is_marketplace_chat) {
          filtered_chats_allowed.push(x);
        } else {
          filtered_chats_requests.push(x);
        }
      }
    });
  }

  const refreshHandler = () => {};
  const loadMoreHandler = () => {};

  const handle_chat_finished_load = (uid) => {};

  const listRenderingHandler = ({ item }) => {
    if (!item) return null;

    if (pageIndex === 3) {
      return (
        <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
          <AccountCont removeButton data={item} />
        </View>
      );
    }

    return (
      <ChatSelector
        display={c_all_loaded}
        handle_loading_done={handle_chat_finished_load}
        is_dating={item.is_dating_chat}
        data={item}
      />
    );
  };

  const handleSetTabIndex = (index) => {
    setPageIndex(index);

    if (index === 3) {
      get_accounts();
    }
  };

  const _accountsKeyExtractor = (item) => {
    if (!item) {
      return uuid.v4();
    }

    return item.userID;
  };

  return (
    <Screen>
      <TabbedScreenComponent
        activeTabIndex={pageIndex}
        setTabIndex={handleSetTabIndex}
        tabOptions={chat_tabs}
        TopHeader={<ChatHeader />}
        listRenderingHandler={listRenderingHandler}
        tabsConfig={[
          {
            keyExtractor: (x) => __get_chatAcc_id(x),
            customLoader: <Text>loading</Text>,
            useCustomLoader: false,
            noDataComponent: (
              <ChatRoomFooter onSCPress={() => setPageIndex(3)} />
            ),
            allowRefresh: false,
            refreshHandler: refreshHandler,
          },
          {
            keyExtractor: (x) => __get_chatAcc_id(x),
            noDataComponent: (
              <ChatRoomFooter onSCPress={() => setPageIndex(3)} />
            ),
            allowLoadMore: false,
            loadMoreHandler: loadMoreHandler,
            tabCounter: filtered_chats_requests.length,
          },
          {
            keyExtractor: (item) => _accountsKeyExtractor(item),
            noDataComponent: <ChatRoomFooter accounts />,
            allowLoadMore: false,
            loadMoreHandler: loadMoreHandler,
          },
        ]}
        tabStates={[
          {
            loading: chats_loading,
            loading_more: false,
            data: filtered_chats_allowed,
            refreshing: false,
          },
          {
            loading: chats_loading,
            loading_more: false,
            data: filtered_chats_requests,
            refreshing: false,
          },
          {
            loading: chatPage.loading_accounts,
            loading_more: false,
            data: chatPage.accounts,
            refreshing: false,
          },
        ]}
      />
    </Screen>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatHome);
