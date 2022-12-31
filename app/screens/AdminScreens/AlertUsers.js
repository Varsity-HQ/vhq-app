import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import Text from "../../components/AppText";
import colors from "../../config/colors";
import HeaderedHeader from "../../components/headers/HeaderedHeader";
import Button from "../../components/Button";
import RTextEditor from "../../components/RTextEditor";
import Input from "../../components/Input";
import he from "he";
import axios from "axios";

function AlertUsers(props) {
  const [text, setText] = useState("");
  const [textHeader, setTextHeader] = useState("");
  const [loading, setLoading] = useState(false);
  //
  const handleEditorChange = (html) => {
    let receivedTxt = he.decode(html.replace(/<[^>]+>/g, ""));
    setText(receivedTxt);
  };
  const handle_send_notification = () => {
    if (!text) {
      return Alert.alert(
        "@warning",
        "Please write some text for the notification",
      );
    }
    setLoading(true);
    axios
      .post("/account/a/sendnotifications", {
        notificationHeading: textHeader,
        notificationText: text,
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <Screen style={styles.container}>
      <HeaderedHeader
        headerText="Send notifications"
        subText="Send a notification to all users on the app"
      />
      <View style={styles.i_container}>
        <Input
          onChangeText={(e) => setTextHeader(e)}
          type={2}
          placeholder="Notification header"
        />
        <View style={styles.divider}>
          <RTextEditor handleChange={handleEditorChange} />
          <Button
            loading={loading}
            onPress={handle_send_notification}
            type={4}
            disabled={loading}
            title={loading ? "Sending..." : "Send notification"}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  divider: {
    borderTopColor: colors.dark_2,
    borderTopWidth: 1,
    marginTop: 20,
    paddingTop: 20,
  },
  i_container: {
    padding: 12,
  },
});

export default AlertUsers;
