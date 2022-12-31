import React from "react";
import { View, StyleSheet } from "react-native";
import CommonHeader from "./CommonHeader";
import FilterByCategory from "./FilterByCategory";
import Text from "../AppText";
import colors from "../../config/colors";
import { RFValue } from "react-native-responsive-fontsize";
import Loading from "../Loaders/HomeUploading";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    university: state.core.accData.university,
  };
};

function CategoryPageHeader({ category, skeleton, data, university }) {
  if (skeleton) {
    return (
      <View style={styles.container}>
        <CommonHeader />
        <View style={styles.subHeader_container}>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 15,
            }}
          >
            MARKETPLACE
          </Text>
          <Text style={styles.header}>{category}</Text>
          <Text style={styles.sub_text}>
            Loading {category}, Please wait...
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingVertical: 50,
          }}
        >
          <Loading />
        </View>
      </View>
    );
  }
  // console.log(data);
  return (
    <View style={styles.container}>
      <CommonHeader />
      <View style={styles.subHeader_container}>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 15,
            color: colors.secondary_2,
          }}
        >
          MARKETPLACE
        </Text>
        <Text style={styles.header}>{category}</Text>
        <Text style={styles.sub_text}>Browse and discover {category}.</Text>
      </View>
      <View style={styles.second_sec}>
        <Text
          style={{
            fontSize: 14,
          }}
        >
          Found {data.total_count} {category} at the {university}
        </Text>
        {/* {data.categories.length > 0 ? (
          <FilterByCategory category={category} data={data.categories} />
        ) : null} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  second_sec: {
    borderTopColor: colors.dark_opacity_2,
    borderTopWidth: 2,
    padding: 10,
  },
  sub_text: {
    color: colors.secondary,
  },
  header: {
    fontSize: RFValue(40),
    fontWeight: "800",
    color: colors.white,
    fontFamily: "Lobster-Regular",
    textTransform: "capitalize",
  },
  subHeader_container: {
    padding: 10,
    marginTop: 10,
  },
});

export default connect(mapStateToProps, null)(CategoryPageHeader);
