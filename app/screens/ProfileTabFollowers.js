import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Loading from "../components/Loaders/HomeUploading";
import AccountCard from "../components/Search/AccountCont";

function ProfileTabFollowers(props) {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [data, setData] = useState({
    accounts: [],
    lastVisible: "",
  });
  useEffect(() => {
    get_followers();
  }, []);

  const get_followers = async (more) => {
    let lv;
    let stop = false;
    if (more) {
      lv = data.lastVisible;
      if (!lv || lv === "") {
        stop = true;
      } else {
        setLoadingMore(true);
      }
    }

    if (stop) return;

    try {
      let res = await axios.get(`/u/followers/get${lv ? "?l_id=" + lv : ""}`);
      let accounts = data.accounts;

      let newAccounts = !lv
        ? res.data.accounts
        : accounts.concat(res.data.accounts);

      if (res.data.lastVisible === null && lv === null) {
        setData({
          accounts: [...new Set(newAccounts)],
          lastVisible:
            res.data?.lastVisible === "" ? null : res.data?.lastVisible,
        });
      }

      if (res.data.lastVisible !== lv) {
        setData({
          accounts: [...new Set(newAccounts)],
          lastVisible:
            res.data?.lastVisible === "" ? null : res.data?.lastVisible,
        });
      }

      setLoadingMore(false);
      setLoading(false);
    } catch (error) {
      setLoadingMore(false);
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    return <AccountCard data={item} />;
  };

  const handleLoadMore = () => {
    get_followers(true);
  };

  if (loading) {
    return (
      <View style={styles.loading_container}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data.accounts}
        keyExtractor={(key) => key.userID}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        ListFooterComponent={
          <View
            style={[
              styles.loading_container,
              {
                paddingTop: 10,
              },
            ]}
          >
            {loadingMore ? <Loading size="small" /> : null}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loading_container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 50,
  },
  container: {
    padding: 10,
    flex: 1,
  },
});

export default ProfileTabFollowers;
