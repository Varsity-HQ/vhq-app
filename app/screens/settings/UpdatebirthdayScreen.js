import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import Text from "../../components/AppText";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "react-native-elements";

function UpdatebirthdayScreen({ loading, navigation }) {
  const [date, setDate] = useState(new Date());
  return (
    <Screen>
      <Header
        loading={loading}
        backPress={() => navigation.goBack()}
        backBtnText="Done"
        buttonText="Save"
        title="Birthday"
        // rightPress={saveYos}
      />
      <View style={styles.container}>
        <Text>When in your birthday</Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          maximumDate={new Date()}
          mode="date"
          textColor={colors.white}
          is24Hour={true}
          display="default"
          onChange={(e, d) => setDate(d)}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
  },
});

export default UpdatebirthdayScreen;
