import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Button from "../Button";
import { Ionicons } from "@expo/vector-icons";
import Text from "../AppText";
import colors from "../../config/colors";
import Input from "../Input";

function PollCreate({
  poll_fields,
  removePollField,
  updatePollName,
  addPollField,
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      {poll_fields.map((x, index) => (
        <View key={"poll_field_" + x.choiceIndex} style={styles.v_choice}>
          <View style={styles.header}>
            <Text style={{ fontWeight: "700", fontSize: 17 }}>
              Choice {index + 1}
            </Text>
            <Text style={{ color: colors.secondary }}>
              {x.choiceName.length}/25
            </Text>
          </View>
          <View>
            <Input
              value={x.choiceName}
              onChangeText={(text) => updatePollName(x.choiceIndex, text)}
              type={2}
              style={styles.input}
              placeholder={"Choice " + (index + 1)}
            />
          </View>
          {poll_fields.length > 2 && (
            <View style={styles.field_footer}>
              <View></View>
              <Button
                style={{ paddingVertical: 8, marginTop: 0 }}
                textStyle={{ color: colors.secondary, fontWeight: "500" }}
                onPress={() => removePollField(x.choiceIndex)}
                type={3}
                title="Remove field"
              />
            </View>
          )}
        </View>
      ))}
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity onPress={addPollField}>
          <View style={styles.add_button}>
            <Ionicons name="add" color={colors.secondary} size={20} />
            <Text style={styles.buttonText}>Add field</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field_footer: {
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    borderLeftWidth: 1,
    borderLeftColor: "#2f6286",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  v_choice: {
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRightWidth: 5,
    borderLeftWidth: 5,
    padding: 10,
    paddingBottom: 0,
    marginBottom: 15,
    borderRadius: 6,
  },
  container: {
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.secondary,
  },
  add_button: {
    backgroundColor: colors.darkish3,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
});

export default PollCreate;
