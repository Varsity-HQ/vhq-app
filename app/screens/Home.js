import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Screen from "../components/Screen";

function Home(props) {
  return (
    <Screen>
      <View style={styles.container}>
        <Text>Home page</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Home;
