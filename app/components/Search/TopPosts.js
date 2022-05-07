import React from "react";
import { ScrollView } from "react-native";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import Text from "../AppText";
import TopPost from "./TopPost";
import { connect } from "react-redux";
import universityShortName from "../../util/universityShortName";

const mapStateToPropsToProps = (state) => {
  return {
    university: state.core.accData.university,
  };
};

function TopPosts({ university, posts }) {
  if (posts.length === 0) return null;
  return (
    <View style={styles.container}>
      <View
        style={{
          borderBottomColor: colors.black,
          borderBottomWidth: 1,
        }}
      >
        <Text style={styles.header}>
          Top at {universityShortName(university)}
        </Text>
      </View>
      <View>
        <ScrollView horizontal>
          {posts.map((x) => (
            <TopPost x={x} key={x.id} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkish,
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    padding: 10,
  },
});

export default connect(mapStateToPropsToProps, null)(TopPosts);
