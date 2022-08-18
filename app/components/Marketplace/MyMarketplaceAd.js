import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import colors from "../../config/colors";
import Image from "../Image";
import Button from "../Button";
import Text from "../AppText";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CREATE_IN_DEP, MARKETPLACE_ITEM_PAGE } from "../../navigation/routes";
import { useNavigation } from "@react-navigation/native";
dayjs.extend(relativeTime);

const width = Dimensions.get("window").width;

function MyMarketplaceAd({ data }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <Image uri={data.attachments[0]} style={styles.image} />
      </View>
      <View style={styles.center_section}>
        <Text numberOfLines={1} ellipsizeMode={"tail"} style={styles.title}>
          {data.title}
        </Text>
        <Text
          style={{
            marginTop: 5,
            color: colors.white,
            fontSize: 14,
            marginBottom: 4,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: 14,
              marginRight: 4,
            }}
          >
            {data.department}{" "}
          </Text>
          | {data.seen_by} Views
        </Text>

        <Text style={{ marginTop: 5, color: colors.secondary, fontSize: 13 }}>
          Created {dayjs(data.created_at).fromNow()}
        </Text>
        <View style={styles.row}>
          <Button
            onPress={() =>
              navigation.push(CREATE_IN_DEP, {
                id: data.id,
                edit: true,
              })
            }
            type={3}
            style={{ marginRight: 10, flex: 1 }}
            title="Edit Ad"
          />
          {/* <Button type={3} title="Delete" /> */}
          <Button
            onPress={() =>
              navigation.push(MARKETPLACE_ITEM_PAGE, {
                id: data.id,
              })
            }
            type={5}
            style={{ marginRight: 0, flex: 1 }}
            title="Open ad"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontWeight: "700",
  },
  image: {
    height: width * 0.2,
    width: width * 0.2,
  },
  center_section: {
    marginLeft: 10,
    flex: 1,
  },
  container: {
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.secondary_2,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: "row",
  },
});

export default MyMarketplaceAd;
