import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { connectInfiniteHits } from "react-instantsearch-native";
import HighlightMatch from "./HighlightMatch";
import Searchinindicator from "./Searchinindicator";
import Text from "../AppText";
import colors from "../../config/colors";

function AccountsResultsTab({ hits, hasMore, refineNext }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={hits}
        keyExtractor={(item) => item.objectID}
        renderItem={({ item }) => <HighlightMatch hit={item} />}
        ListFooterComponent={
          hits.length !== 0 ? (
            <Searchinindicator />
          ) : (
            <View style={{ padding: 10, marginTop: 10 }}>
              <Text style={{ alignSelf: "center", color: colors.secondary }}>
                No Results
              </Text>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
});
export default connectInfiniteHits(AccountsResultsTab);
