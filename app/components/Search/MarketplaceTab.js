import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { connectInfiniteHits } from "react-instantsearch-native";
import Text from "../AppText";
import colors from "../../config/colors";
import Searchinindicator from "./Searchinindicator";
import Image from "../Image";
import { useNavigation } from "@react-navigation/native";
import { MARKETPLACE_ITEM_PAGE } from "../../navigation/routes";
const height = Dimensions.get("window").height;

function MarketplaceTab({ hits }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={hits}
        keyExtractor={(item) => item.objectID}
        renderItem={({ item }) => <Item hit={item} />}
        ListFooterComponent={
          hits.length === 0 ? (
            () => (
              <View style={{ padding: 10, marginTop: 10 }}>
                <Text style={{ alignSelf: "center", color: colors.secondary }}>
                  No Results
                </Text>
              </View>
            )
          ) : (
            <Searchinindicator />
          )
        }
      />
    </View>
  );
}

const Item = ({ hit }) => {
  const navigation = useNavigation();
  if (!hit.title || !hit.id) return null;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(MARKETPLACE_ITEM_PAGE, { id: hit.id })}
      style={styles.res_container}
    >
      <Image uri={hit.attachments[0]} style={styles.image} />
      <View
        style={{
          flex: 1,
        }}
      >
        <View>
          <Text numberOfLines={1} style={styles.title}>
            {hit.title}
          </Text>
        </View>
        <View>
          <Text style={styles.sub}>
            {hit.department} - {hit.category}
          </Text>
        </View>
        <View>
          {hit.pricing && <Text style={styles.pricing}>R{hit.pricing}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    height: height * 0.06,
    width: height * 0.06,
    borderRadius: 5,
    backgroundColor: colors.darkish,
    marginRight: 10,
  },
  pricing: {
    fontWeight: "700",
  },
  title: {
    fontWeight: "700",
  },
  sub: {
    color: colors.secondary,
    textTransform: "capitalize",
  },
  res_container: {
    flexDirection: "row",
    padding: 10,
  },
  container: {
    flex: 1,
  },
});

export default connectInfiniteHits(MarketplaceTab);
