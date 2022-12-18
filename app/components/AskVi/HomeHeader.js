import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Text from "../AppText";
import Input from "../Input";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../config/colors";
import Button from "../Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { MARKETPLACE_CREATE, SEARCH_RESULTS } from "../../navigation/routes";
import AppButton from "../Button";

function HomeHeader(props) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <View
      style={{
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: "hidden",
        position: "relative",
        // marginBottom: 10,
      }}
    >
      <StatusBar
        animated={true}
        backgroundColor={colors.dark_opacity_2}
        barStyle="light-content"
        showHideTransition="fade"
        hidden={false}
      />
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top + 15,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.header}>ASKVI..</Text>
          <View>
            <Button
              onPress={() => navigation.navigate(MARKETPLACE_CREATE)}
              style={{
                borderRadius: 100,
                paddingVertical: 10,
              }}
              type={5}
              title="Ask something +"
            />
          </View>
        </View>
        <Text>
          Browse and ask the VarsityHQ community a question and seek information
        </Text>
        {/* <Button
          onPress={() =>
            navigation.navigate(SEARCH_RESULTS, {
              page: 3,
            })
          }
          type="search"
          title="Search services or items..."
          placeholderTextColor={colors.secondary}
          style={styles.searchbox}
        />
        <Button type={3} title="Search market.." /> */}
      </View>
      <LinearGradient
        style={styles.gradient}
        colors={["#1acfff", "#1c83f3"]}
        start={[0, 1]}
        end={[1, 0]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: -1,
  },
  header: {
    fontSize: RFValue(30),
    fontFamily: "Lobster-Regular",
    marginBottom: 7,
  },
  searchbox: {
    marginTop: 14,
    borderWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    backgroundColor: colors.grayer,
  },
  container: {
    padding: 15,
    backgroundColor: colors.dark_opacity_2,
  },
});

export default HomeHeader;
