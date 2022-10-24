import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

function ProfileTabFollowers(props) {
  useEffect(() => {
    console.log("followers");
  }, []);
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {},
});

export default ProfileTabFollowers;
