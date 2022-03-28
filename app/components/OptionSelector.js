import React from "react";
import { View, StyleSheet } from "react-native";
import Button from "./Button";
import Text from "./AppText";
import colors from "../config/colors";
import { RFValue } from "react-native-responsive-fontsize";
function OptionSelector({ active, options = [], onChange, type }) {
  const handleChange = (i) => {
    if (active === i) return;
    onChange(i);
  };

  if (type === 3) {
    return (
      <View style={styles.container2}>
        <Button
          // type={active === x.value ? 4 : 3}
          // title={x.title}
          content={
            <View style={styles.btn3_container}>
              <View
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              >
                <View>
                  <Text>❤️</Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 10,
                  }}
                >
                  <Text style={styles.header}>Looking to date</Text>
                  <Text style={styles.subText}>
                    Here to go on dates, have a goodtime and get into a
                    relationships
                  </Text>
                </View>
              </View>
              <View>
                <View
                  style={{
                    borderRadius: 100,
                    backgroundColor: colors.secondary,
                    padding: 10,
                    height: 10,
                    width: 10,
                  }}
                >
                  <View
                    style={{
                      borderRadius: 100,
                      backgroundColor: colors.secondary,
                      padding: 10,
                      height: 10,
                      width: 10,
                    }}
                  />
                </View>
              </View>
            </View>
          }
          type={3}
          style={{
            borderColor: colors.primary,
            borderWidth: 1,
            width: "100%",
          }}
          textStyle={{
            fontSize: RFValue(16),
            fontWeight: "700",
          }}
        />
      </View>
    );
  }

  if (type === 2) {
    return (
      <View style={styles.container2}>
        {options.map((x) => (
          <Button
            onPress={() => handleChange(x.value)}
            key={x.value}
            type={active === x.value ? 4 : 3}
            title={x.title}
            style={{
              borderColor: colors.primary,
              borderWidth: 1,
              width: "45%",
            }}
            textStyle={{
              fontSize: RFValue(16),
              fontWeight: "700",
            }}
          />
        ))}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {options.map((x) => (
        <Button
          onPress={() => handleChange(x.value)}
          key={x.value}
          type={active === x.value ? 4 : 3}
          title={x.title}
          style={{
            borderColor: colors.primary,
            borderWidth: 1,
          }}
          textStyle={{
            fontSize: RFValue(16),
            fontWeight: "700",
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: RFValue(15),
    fontWeight: "700",
    marginBottom: 5,
  },
  subText: {
    color: colors.secondary,
  },
  container: {},
  container2: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  btn3_container: {
    // backgroundColor: colors.secondary,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default OptionSelector;
