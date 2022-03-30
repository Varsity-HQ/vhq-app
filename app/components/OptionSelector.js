import React from "react";
import { View, StyleSheet } from "react-native";
import Button from "./Button";
import Text from "./AppText";
import colors from "../config/colors";
import { RFValue } from "react-native-responsive-fontsize";
import Image from "./Image";
function OptionSelector({ active, options = [], onChange, type }) {
  const handleChange = (i) => {
    if (active === i) return;
    onChange(i);
  };

  if (type === 3) {
    return (
      <View style={[styles.container]}>
        {options.map((x) => (
          <Button
            key={x.value}
            onPress={() => handleChange(x.value)}
            // type={active === x.value ? 4 : 3}
            // title={x.title}
            content={
              <View style={styles.btn3_container}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <View>
                    <Image local uri={x.icon} style={styles.imageIconSize} />
                  </View>
                  <View
                    style={{
                      paddingHorizontal: 10,
                      flex: 1,
                    }}
                  >
                    <Text style={styles.header}>
                      {x.title}
                      <Text style={styles.title_sub}>{x.sub}</Text>
                    </Text>

                    <Text style={styles.subText}>{x.desc}</Text>
                  </View>
                </View>
                <View>
                  <View
                    style={[
                      styles.radio_box_outer,
                      active === x.value && styles.active,
                    ]}
                  >
                    <View
                      style={[
                        styles.radio_box,
                        active === x.value && styles.active_inner,
                      ]}
                    />
                  </View>
                </View>
              </View>
            }
            type={3}
            style={{
              borderColor:
                active === x.value ? colors.primary : colors.secondary_2,
              backgroundColor:
                active === x.value ? colors.darkish3 : colors.darkish2,
              borderWidth: 2,
              width: "100%",
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
  imageIconSize: {
    height: 50,
    width: 50,
  },
  active: {
    borderColor: colors.primary,
    backgroundColor: colors.dark,
  },
  active_inner: {
    backgroundColor: colors.primary,
  },
  radio_box: {
    borderRadius: 100,
    backgroundColor: colors.secondary_2,
    // backgroundColor: colors.primary,
    // padding: 10,
    height: 18,
    width: 18,
  },
  radio_box_outer: {
    borderRadius: 100,
    backgroundColor: colors.secondary_2,
    // padding: 15,
    height: 30,
    width: 30,
    borderWidth: 2,
    borderColor: colors.secondary_2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: RFValue(15),
    fontWeight: "700",
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  title_sub: {
    fontSize: RFValue(15),
    fontWeight: "700",
    marginBottom: 5,
    color: colors.dark_opacity,
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
