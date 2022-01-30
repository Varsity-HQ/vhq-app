import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../../components/AppText";

function EventsScreen(props) {
  return (
    <View style={styles.container}>
      <AppText>eEvents</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default EventsScreen;
