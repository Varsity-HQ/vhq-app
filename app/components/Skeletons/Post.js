import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import SkeletonComponent from "./SkeletonComponent";

function Post(props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SkeletonComponent style={styles.p_avatar} />
        <View style={{ marginLeft: 10 }}>
          <SkeletonComponent style={styles.u_name} />
          {/* <SkeletonComponent style={styles.u_us} /> */}
        </View>
      </View>
      <View>
        <SkeletonComponent
          style={{
            height: 18,
            width: "100%",
            marginTop: 10,
          }}
        />

        <SkeletonComponent
          style={{
            height: 18,
            width: "75%",
            marginTop: 5,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  u_us: {
    height: 18,
    width: 100,
    marginTop: 6,
  },
  u_name: {
    height: 18,
    width: 150,
  },
  p_avatar: {
    height: 45,
    width: 45,
    borderRadius: 50,
  },
  header: {
    flexDirection: "row",
  },
  con_inner: {
    // margin: 10,
    backgroundColor: colors.darkish2,
    borderColor: "#b0b0b0",
    height: 100,
    width: "100%",
    borderRadius: 100,
    overflow: "hidden",
  },
  container: {
    padding: 10,
    flex: 1,
    marginBottom: 15,
    // borderTopColor: colors.darkish2,
    // borderTopWidth: 2,
    // backgroundColor: "#eff4f7",
  },
});

export default Post;
