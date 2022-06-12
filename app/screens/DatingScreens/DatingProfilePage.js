import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";

function DatingProfilePage(props) {
  return (
    <ScrollView scroll style={styles.container}>
      <View>
        <Header noBorder backIcon />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default DatingProfilePage;
