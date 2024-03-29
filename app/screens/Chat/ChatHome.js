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
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import AccountCont from "../../components/Search/AccountCont";
import colors from "../../config/colors";
import uuid from "uuid";
import axios from "axios";

const chat_tabs = [
  {
    title: "Chats",
    index: 1,
    icon: <MaterialCommunityIcons color={colors.white} size={18} name="chat" />,
  },
  {
    title: "Discover chats",
    index: 2,
    icon: <FontAwesome5 color={colors.white} size={16} name="user-astronaut" />,
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

  const [accounts_tab, set_accounts_tab] = useState({
    accounts: [],
    loading: true,
    last_visible: null,
  });

  //
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

  let dating_chats = [];
  let all_chats = [];

  useEffect(() => {
    if (pageIndex === 3) {
      handle_get_accounts();
    }
  }, []);

  const handle_get_accounts = () => {
    axios
      .get("/u/following/get")
      .then((data) => {
        set_accounts_tab({
          ...accounts_tab,
          loading: false,
          accounts: data.data.accounts,
          last_visible: data.data.lastVisible,
        });
      })
      .catch((err) => {
        console.log(err);
        set_accounts_tab({
          ...accounts_tab,
          loading: false,
        });
      });
  };

  if (error) {
    return (
      <Screen>
        <Text>Unexpected error :(</Text>
      </Screen>
    );
  }

  if (!chats_loading) {
    chats.forEach((x) => {
      if (x.lastMessageSent !== "v72wA14Hj4%2SDDR") {
        all_chats.push(x);

        if (x.is_dating_chat) {
          dating_chats.push(x);
        }
      }
    });
  }

  const refreshHandler = () => {};
  const loadMoreHandler = () => {};

  const listRenderingHandler = ({ item }) => {
    if (!item) return null;

    if (pageIndex === 3) {
      return (
        <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
          <AccountCont chat removeButton data={item} />
        </View>
      );
    }

    return <ChatSelector is_dating={item.is_dating_chat} data={item} />;
  };

  const handleSetTabIndex = (index) => {
    setPageIndex(index);

    if (index === 3) {
      handle_get_accounts();
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
            tabCounter: dating_chats.length,
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
            data: all_chats,
            refreshing: false,
          },
          {
            loading: chats_loading,
            loading_more: false,
            data: dating_chats,
            refreshing: false,
          },
          {
            loading: accounts_tab.loading,
            loading_more: false,
            data: accounts_tab.accounts,
            refreshing: false,
          },
        ]}
      />
    </Screen>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatHome);
