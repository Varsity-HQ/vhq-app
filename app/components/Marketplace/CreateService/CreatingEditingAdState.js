import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import colors from "../../../config/colors";
import Text from "../../AppText";
import Image from "../../Image";
import { connect } from "react-redux";

const width = Dimensions.get("window").width;

const mapStateToProps = (state) => {
  return {
    create: state.marketplaceReducer.create,
  };
};

function CreatingEditingAdState({ create }) {
  if (!create.uploading) return null;
  return (
    <View style={styles.container}>
      <Image local uri={{ uri: create.local_images[0] }} style={styles.image} />
      <View>
        <Text style={{ fontWeight: "700" }}>Job in progress</Text>
        <Text style={{ fontWeight: "500", color: colors.secondary }}>
          Creating your service...
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width * 0.1,
    height: width * 0.1,
    marginRight: 10,
  },
  container: {
    borderWidth: 1,
    borderColor: colors.primary_opacity,
    borderRadius: 10,
    padding: 14,
    paddingVertical: 10,
    backgroundColor: colors.dark_opacity_2,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default connect(mapStateToProps, null)(CreatingEditingAdState);
