import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Share,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import Image from "../Image";
import Text from "../AppText";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../../config/colors";
import universityShortName from "../../util/universityShortName";
import { normalizeText } from "../../util/responsivePx";
import { RFValue } from "react-native-responsive-fontsize";
import Input from "../Input";
import Button from "../Button";
import AppButton from "../Button";
import { MARKETPLACE_CAT_PAGE, SEARCH_RESULTS } from "../../navigation/routes";
import IconButton from "../IconButton";

const mapStateToProps = (state) => {
  return {
    profilepic: state.core.accData.profilepic,
    university: state.core.accData.university,
    m_saves: state.core.accData.m_saves,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const height = Dimensions.get("window").height;

function ItemPageHeader({
  data,
  m_saves,
  profilepic,
  university,
  topPart = true,
}) {
  const [saved, setSaved] = useState(false);
  const navigation = useNavigation();

  const handleSaveItem = () => {
    if (saved) {
      setSaved(false);
    } else {
      setSaved(true);
    }
  };

  const handleShareItem = async () => {
    try {
      const result = await Share.share({
        message: "",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      {topPart && (
        <View style={styles.container}>
          <View
            style={[
              styles.row,
              {
                flex: 1,
              },
            ]}
          >
            <Image
              local
              style={styles.profilepic}
              uri={require("../../assets/icon.png")}
            />
            <AppButton
              onPress={() =>
                navigation.navigate(SEARCH_RESULTS, {
                  page: 3,
                })
              }
              type="search"
              title="Search.."
              placeholderTextColor={colors.secondary}
              style={styles.searchbox}
            />
          </View>
          <View style={styles.row}>
            <Image style={styles.profilepic} uri={profilepic} />
            <Button
              style={{
                paddingHorizontal: 15,
              }}
              type={3}
              title="Post"
            />
          </View>
        </View>
      )}
      <View style={styles.bottom_container}>
        <View style={styles.f_container}>
          <TouchableOpacity>
            <FontAwesome
              onPress={() => navigation.goBack()}
              name="chevron-left"
              size={24}
              color={colors.secondary_2}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(MARKETPLACE_CAT_PAGE, {
                category: data.department,
              })
            }
            style={{
              marginLeft: 20,
            }}
          >
            <Text style={styles.headertxt}>Take me back</Text>
            <View style={styles.row}>
              <Text style={styles.header_text}>{data.department}</Text>
              <FontAwesome
                name="chevron-right"
                size={10}
                style={{
                  marginHorizontal: 5,
                  marginTop: 2,
                }}
                color={colors.lighish2}
              />
              <Text style={styles.header_text}>{data.category}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <IconButton
            onPress={handleSaveItem}
            buttonStyle={{
              backgroundColor: colors.dark_opacity_2,
            }}
            icon={
              <FontAwesome
                name={saved ? "heart" : "heart-o"}
                size={20}
                color={saved ? colors.redish_2 : colors.lighish2}
              />
            }
          />
          <IconButton
            onPress={handleShareItem}
            buttonStyle={{
              marginLeft: 10,
              backgroundColor: colors.dark_opacity_2,
            }}
            icon={
              <FontAwesome name="share" size={20} color={colors.lighish2} />
            }
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bottom_container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    borderTopColor: colors.dark_opacity_2,
    borderTopWidth: 0,
    borderBottomColor: colors.dark_opacity_2,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingTop: 6,
    backgroundColor: colors.dark_opacity_2,
  },
  headertxt: {
    color: colors.white,
    fontWeight: "600",
    marginBottom: 2,
    fontSize: RFValue(12),
  },
  header_text: {
    color: colors.secondary,
    fontWeight: "700",
    fontSize: RFValue(12),
    textTransform: "capitalize",
  },
  f_container: {
    // backgroundColor: colors.lighish2,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  subHeader: {
    borderBottomColor: colors.dark_opacity_2,
    borderBottomWidth: 2,
    borderTopColor: colors.dark_opacity_2,
    borderTopWidth: 2,
    padding: 10,
  },
  profilepic: {
    height: height * 0.046,
    width: height * 0.046,
    borderRadius: 100,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  searchbox: {
    borderWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    backgroundColor: colors.dark_opacity_2,
    flex: 1,
    marginRight: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemPageHeader);
