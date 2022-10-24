import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

function ProfileTabFollowing(props) {
  const [data, set_data] = useState({
    loading: true,
    accounts: [],
    last_v: null,
  });
  useEffect(() => {
    try {
      console.log("following");
      get_accounts();
    } catch (error) {
      console.log(error);
    }
    return () => {
      set_data({
        loading: true,
        accounts: [],
        last_v: null,
      });
    };
  }, []);

  const get_accounts = async () => {
    try {
      const res = await axios.get("/u/following/get");
      set_data({
        ...data,
        accounts: res.data.accounts,
        last_v: res.data.lastVisible,
        loading: false,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <FlatList data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ProfileTabFollowing;
