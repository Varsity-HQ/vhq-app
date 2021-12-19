import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { color } from "react-native-elements/dist/helpers";
import colors from "../config/colors";

function TabNavigator({ active = 1, style, items = [], onPress }) {
  return (
    <ScrollView horizontal={true} style={[styles.container, style]}>
      {items.map((x, index) => {
        return (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => onPress(x.index)}
          >
            <View style={styles.tab}>
              <View
                style={[
                  styles.tab_indicator_1,
                  {
                    backgroundColor:
                      active === x.index ? colors.primary : colors.dark,
                  },
                ]}
              ></View>
              <View style={styles.tab_Container}>
                {x.icon && x.icon}
                <Text style={styles.text}>{x.title}</Text>
              </View>
              <View
                style={[
                  styles.tab_indicator_2,
                  {
                    backgroundColor:
                      active === x.index ? colors.primary : colors.dark,
                  },
                ]}
              ></View>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    borderTopColor: colors.primary,
    borderWidth: 3,
    borderRadius: 0,
    // paddingBottom: 5,
  },
  tab_Container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  tab_indicator_2: {
    alignSelf: "center",
    width: 7,
    height: 7,
    backgroundColor: colors.primary,
    borderRadius: 10,
    bottom: 5,
  },
  tab_indicator_1: {
    width: "100%",
    height: 6,
    backgroundColor: colors.primary,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    // fontWeight: "600",
    marginLeft: 7,
  },
  tab: {
    marginLeft: 10,
    height: "100%",
  },
  tabbar_container: {
    borderTopWidth: 3,
    borderTopColor: colors.primary,
  },
});

export default TabNavigator;
