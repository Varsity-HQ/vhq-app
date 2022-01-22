import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
} from "react-native";
import colors from "../../config/colors";
import { SEARCH, SEARCH_RESULTS } from "../../navigation/routes";
import RIcon from "react-native-remix-icon";
import Button from "../Button";
import { normalizeText } from "../../util/responsivePx";
// import { SafeAreaView } from "react-native-safe-area-context";

function SearchHeader(props) {
  const searchBarFocus = () => {
    switch (props.stackName) {
      case "SearchNavigator":
        if (props.route.name !== SEARCH_RESULTS) {
          console.log(props.navigation);
          props.navigation.navigate("SearchResults");
        }
        break;
    }
  };

  const handleCancel = () => {
    switch (props.stackName) {
      case "SearchNavigator":
        props.navigation.navigate(SEARCH);
        break;
    }
  };

  const handlePress = () => {
    if (props.route.name !== SEARCH_RESULTS) searchBarFocus();
  };

  console.log(props);

  return (
    <>
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={handlePress}>
          <View style={styles.search_container}>
            <View style={styles.input_container}>
              <RIcon name="search-2-line" size={20} color={colors.primary} />
              {props.route.name === SEARCH_RESULTS ? (
                <TextInput
                  autoFocus={props.route.name === SEARCH_RESULTS ? true : false}
                  onPressIn={searchBarFocus}
                  style={styles.input}
                  placeholder="Search VarsityHQ.."
                  placeholderTextColor={colors.secondary}
                />
              ) : (
                <Text style={[styles.input, styles.placeholderText]}>
                  Search VarsityHQ..
                </Text>
              )}
            </View>
            {props.route.name !== SEARCH && (
              <Button
                onPress={handleCancel}
                style={{
                  marginRight: 8,
                  paddingVertical: 1,
                  backgroundColor: "transparent",
                }}
                type={5}
                title="Cancel"
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  search_container: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: colors.darkish2,
    borderColor: colors.darkish3,
    borderBottomWidth: 0,
    // flex: 1,
  },
  placeholderText: {
    color: colors.secondary,
  },
  pressable_container: {
    backgroundColor: "red",
    // padding: "2%",
    zIndex: 2,
    width: "100%",
    // position: "absolute",
    // top: 0,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    height: 23,
    borderLeftColor: colors.primary,
    borderLeftWidth: 2,
    alignItems: "center",
    flexDirection: "row",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    marginLeft: 5,
    height: "100%",
    width: "100%",
    paddingVertical: 12,
    color: "white",
  },
  input_container: {
    backgroundColor: colors.darkish,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    margin: 5,
    paddingHorizontal: 10,
    // width: "95%",
    // height: "100%",
    borderRadius: 100,
    borderWidth: 0,
    borderColor: colors.secondary_2,
    flex: 1,
  },
  container: {
    position: "relative",
    // padding: 10,
    // borderBottomWidth: 3,
    // borderBottomColor: colors.primary,
    width: "98%",
    // flex: 1,
    zIndex: 1,
    // borderColor: "red",
  },
});

export default SearchHeader;
