import React from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { View, StyleSheet } from "react-native";
import Text from "../../components/AppText";
import Screen from "../../components/Screen";
import db from "../../util/fb_admin";

function ChatHome(props) {
  //   const coll_ref = collection(db, "accounts");
  //   const qry = query(
  //     coll_ref,
  //     where("username", "==", "chikx_12"),
  //     where("age", "==", 24),
  //   );

  //   getDocs(qry).then((snap) => {
  //     snap.forEach((x) => {
  //       console.log({
  //         x: x.id,
  //         x_username: x.data().username,
  //       });
  //     });
  //   });

  return (
    <Screen>
      <View style={styles.container}>
        <Text>Chat</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ChatHome;
