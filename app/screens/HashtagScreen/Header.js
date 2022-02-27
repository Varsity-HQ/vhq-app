import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Text from "../../components/AppText";
import colors from "../../config/colors";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { SEARCH, SEARCH_RESULTS } from "../../navigation/routes";

function Header({ hashtag }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color={colors.white} />
        </TouchableOpacity>
        <Text style={{ marginLeft: 10, fontSize: RFValue(16) }}>
          #{hashtag}
        </Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate(SEARCH_RESULTS)}>
          <Ionicons
            name="search"
            size={24}
            style={{ marginRight: 5 }}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginBottom: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Header;
