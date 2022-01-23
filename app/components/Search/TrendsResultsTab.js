import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { connectInfiniteHits } from "react-instantsearch-native";
import Text from "../AppText";
import colors from "../../config/colors";
import Searchinindicator from "./Searchinindicator";

function TrendsResultsTab({ hits }) {
  console.log({ hits });
  return (
    <View style={styles.container}>
      <FlatList
        data={hits}
        keyExtractor={(item) => item.objectID}
        renderItem={({ item }) => <Hashtag hit={item} />}
        ListFooterComponent={
          hits.length === 0 ? (
            () => (
              <View style={{ padding: 10, marginTop: 10 }}>
                <Text style={{ alignSelf: "center", color: colors.secondary }}>
                  Not Results
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

const Hashtag = ({ hit }) => {
  if (!hit.hashtag_name || !hit.hashtag_count) return null;
  return (
    <View style={styles.res_container}>
      <View>
        <View>
          <Text style={styles.hashname}>{hit.hashtag_name}</Text>
        </View>
        <View>
          <Text style={styles.sub}>{hit.hashtag_count} Posts</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hashname: {
    fontWeight: "700",
  },
  sub: {
    color: colors.secondary,
  },
  res_container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  container: {
    flex: 1,
  },
});

export default connectInfiniteHits(TrendsResultsTab);
