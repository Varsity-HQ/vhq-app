import React from "react";
import { Text } from "react-native";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import colors from "../config/colors";
import { LinearGradient } from "expo-linear-gradient";
import Ricons from "react-native-remix-icon";
import { useNavigation } from "@react-navigation/native";
import { ADD_POST } from "../navigation/routes";
import { connect } from "react-redux";
import HomeUploading from "../components/Loaders/HomeUploading.js";
import { useRoute } from "@react-navigation/native";
import Image from "./Image";
const height = Dimensions.get("window").height;

const mapStateToProps = (state) => {
  return {
    uploading: false,
    // uploading: state.data.new_post.uploading,
  };
};

function FloatingButton({ uploading, dating, marketplace, onPress }) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (dating || marketplace) return onPress();
    navigation.navigate(ADD_POST);
  };

  return (
    <>
      {Platform.OS === "ios" && <View style={styles.shadow} />}
      <TouchableOpacity onPress={handlePress} style={styles.container}>
        <LinearGradient
          style={styles.gradient}
          colors={["#f50057", colors.primary]}
          // colors={["red", "white"]}
          start={[0, 1]}
          end={[1, 0]}
        />
        <View style={styles.inner_container}>
          {dating ? (
            <Image
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 1000,
              }}
              uri={dating.profilepic}
            />
          ) : uploading ? (
            <HomeUploading />
          ) : (
            <Text style={{ color: colors.white, zIndex: 2 }}>
              {!dating && (
                <Ricons size={40} color={colors.white} name="quill-pen-fill" />
              )}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  inner_container: {
    backgroundColor: colors.darkish2,
    width: "90%",
    height: "90%",
    borderRadius: 100,
    borderColor: colors.dark_opacity_2,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: {
    position: "absolute",
    height: "100%",
    // borderRadius: 100,
    width: "100%",
  },
  container: {
    overflow: "hidden",

    height: height * 0.09,
    width: height * 0.09,

    borderRadius: 100,
    position: "absolute",
    bottom: 40,
    right: 20,
    zIndex: 2,
    backgroundColor: colors.darkish2,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    height: height * 0.09,
    width: height * 0.09,
    borderRadius: 100,
    position: "absolute",
    bottom: 40,
    right: 20,
    zIndex: 2,
    backgroundColor: colors.dark,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 9,
    elevation: 14,
  },
});

export default connect(mapStateToProps, null)(FloatingButton);
