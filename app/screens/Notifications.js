import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import NotificationScreenHeader from "../components/Notifications/NotificationScreenHeader";
import Notification from "../components/Notifications/Notification";

function Notifications(props) {
  useEffect(() => {
    console.log("here");
  });

  const renderItemHandler = ({ item }) => <Notification dasta={item} />;

  return (
    <Screen style={styles.container}>
      <FlatList
        data={[1, 2, 4]}
        keyExtractor={(item) => item}
        ListHeaderComponent={<NotificationScreenHeader loading={true} />}
        renderItem={renderItemHandler}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Notifications;
