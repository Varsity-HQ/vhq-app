import React, { useState } from "react";
import { View, StyleSheet, Switch } from "react-native";
import colors from "../../config/colors";
import { FontAwesome } from "@expo/vector-icons";
import Text from "../../components/AppText";

function DatingVisibility(props) {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FontAwesome
          name="question-circle-o"
          style={{ paddingRight: 10 }}
          size={24}
          color={colors.white}
        />
        <Text>Show my Discover profile</Text>
      </View>
      <View>
        <Switch
          style={styles.switcher}
          trackColor={{ false: colors.secondary, true: colors.primary }}
          ios_backgroundColor={colors.dark_opacity_2}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
    backgroundColor: colors.dark_opacity_2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default DatingVisibility;
