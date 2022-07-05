import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";

function TabNavigator({
  active = 1,
  style,
  items = [],
  onPress,
  type,
  actionsDisable,
}) {
  const navigation = useNavigation();

  const handlePress = (x) => {
    if (actionsDisable) return;

    if (x.navTo === null) return;

    if (x.navTo) {
      return navigation.navigate(x.navTo);
    }

    onPress(x.index);
  };
  if (type === 2) {
    return (
      <ScrollView horizontal={true} style={[styles.container_2, style]}>
        {items.map((x, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => handlePress(x)}
            >
              <View style={styles.tab}>
                <View
                  style={[
                    styles.tab_indicator_2_2,
                    {
                      backgroundColor:
                        active === x.index ? colors.primary : colors.dark,
                    },
                  ]}
                />

                <View style={styles.tab_Container}>
                  {x.icon && x.icon}
                  <Text
                    style={[
                      styles.text,
                      x.textColor && {
                        color: x.textColor,
                      },
                    ]}
                  >
                    {x.title}
                  </Text>
                  {x.attention && <View style={styles.attention} />}
                </View>
                <View
                  style={[
                    styles.tab_indicator_1_2,
                    {
                      backgroundColor:
                        active === x.index ? colors.primary : colors.dark,
                    },
                  ]}
                />
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    );
  }

  return (
    <ScrollView horizontal={true} style={[styles.container, style]}>
      {items.map((x, index) => {
        return (
          <TouchableWithoutFeedback key={index} onPress={() => handlePress(x)}>
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
                {x.attention && <View style={styles.attention} />}
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
  attention: {
    height: 8,
    width: 8,
    backgroundColor: colors.v_st_bg_2,
    marginLeft: 5,
    borderRadius: 100,
  },
  container_2: {
    paddingVertical: 0,
    borderBottomColor: colors.primary,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderRadius: 0,
    // paddingBottom: 5,
  },
  container: {
    paddingVertical: 0,
    borderTopColor: colors.primary,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderRadius: 0,
    // paddingBottom: 5,
  },
  tab_Container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  tab_indicator_2_2: {
    alignSelf: "center",
    width: 7,
    height: 7,
    backgroundColor: colors.primary,
    borderRadius: 10,
    top: 5,
  },
  tab_indicator_2: {
    alignSelf: "center",
    width: 7,
    height: 7,
    backgroundColor: colors.primary,
    borderRadius: 10,
    bottom: 7,
  },
  tab_indicator_1_2: {
    width: "100%",
    height: 6,
    backgroundColor: colors.primary,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
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
