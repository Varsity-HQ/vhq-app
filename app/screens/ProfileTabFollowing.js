import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

function ProfileTabFollowing(props) {
  const [data, set_data] = useState([]);
  const [loading, set_loading] = useState(true);
  useEffect(() => {
    try {
      get_accounts();
    } catch (error) {
      console.log(error);
    }
    return () => {
      set_loading(true);
    };
  }, []);

  const get_accounts = async () => {
    try {
      const res = await axios.get("/u/following/get");
      console.log(res.data);
      set_loading(false);
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
