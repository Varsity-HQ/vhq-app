import React, { useState } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Text from "../AppText";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../config/colors";
import Content from "../Post/content";
const height = Dimensions.get("window").height;

function ItemAbout({ data }) {
  const [readMore, setReadMore] = React.useState(false);
  const handleRead = () => setReadMore(!readMore);
  const readMoreCapHeight = height * 0.13;
  const [readMoreViewSize, setRMViewSize] = useState(0);

  const find_dimesions = (layout) => {
    const { height } = layout;
    setRMViewSize(height);
  };

  if (data.text_length === 0 || !data.descriptionText) return null;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Description</Text>

        <View
          onLayout={(event) => {
            find_dimesions(event.nativeEvent.layout);
          }}
          style={{
            height: readMore ? null : readMoreCapHeight,
            overflow: "hidden",
          }}
        >
          <Content html={data.description} />
        </View>

        {true && (
          <TouchableOpacity onPress={handleRead} style={styles.read_more}>
            <LinearGradient
              style={styles.gradient}
              colors={[colors.darkish, colors.transparent]}
              // colors={["red", "white"]}
              start={[0, 0]}
              end={[0, 10]}
            />
            <View style={styles.read_more_inner}>
              <Text
                style={{
                  color: colors.secondary,
                }}
              >
                {readMore ? "Hide description" : "Continue reading"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  read_more_inner: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  gradient: {
    position: "absolute",
    height: "100%",
    width: "100%",
    borderRadius: 10,
    zIndex: -1,
  },
  heading: {
    fontWeight: "600",
    fontSize: RFValue(13),
    marginBottom: 10,
    color: colors.secondary,
  },
  container: {
    padding: 10,
  },
  read_more: {
    marginTop: 10,
  },
});

export default ItemAbout;
