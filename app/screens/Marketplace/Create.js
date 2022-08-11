import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import Text from "../../components/AppText";
import { RFValue } from "react-native-responsive-fontsize";
import { Entypo } from "@expo/vector-icons";
import colors from "../../config/colors";
import Image from "../../components/Image";
import { useNavigation } from "@react-navigation/native";
import { CREATE_IN_DEP } from "../../navigation/routes";

const width = Dimensions.get("window").width;

function Create(props) {
  return (
    <Screen>
      <Header noBorder backBtnText="Cancel" />
      <View style={[styles.wrapper, styles.first_sec]}>
        <Entypo name="shop" color={colors.primary} size={40} />
        <Text style={styles.heading}>Create AD</Text>
        <Text style={styles.sub_text}>
          Select a department that relates to your ad
        </Text>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: colors.secondary_2,
          marginHorizontal: 30,
          marginTop: 20,
          marginBottom: 10,
        }}
      />
      <View style={styles.categories_container}>
        <Category
          dep="service"
          uri={require("../../assets/service.png")}
          title="Service"
        />
        <Category
          dep="listing"
          uri={require("../../assets/deal.png")}
          title="Listing"
        />
        <Category
          dep="job-listing"
          uri={require("../../assets/jobs.png")}
          title="Job"
        />
      </View>
    </Screen>
  );
}

const Category = ({ title, uri, dep }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.category}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(CREATE_IN_DEP, {
            department: dep,
          })
        }
        style={styles.category_inner}
      >
        <Image style={styles.category_icon} local uri={uri} />
        <Text
          style={{
            color: colors.secondary,
            fontWeight: "700",
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  categories_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  category_icon: {
    height: 50,
    width: 50,
    marginBottom: 10,
  },
  category_inner: {
    backgroundColor: colors.dark_opacity_2,
    padding: 20,
    // borderRadius: 5,
    flexDirection: "column",
    alignItems: "center",
    borderColor: colors.secondary_2,
    borderTopColor: colors.primary,
    borderTopWidth: 3,
    // borderWidth: 2,
  },
  category: {
    padding: 10,
    width: width / 2,
  },
  wrapper: {
    padding: 10,
  },
  heading: {
    fontSize: RFValue(30),
    // fontWeight: "700",/
    fontFamily: "Lobster-Regular",
  },
  first_sec: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingHorizontal: 10,
  },
  sub_text: {
    textAlign: "center",
  },
});

export default Create;
