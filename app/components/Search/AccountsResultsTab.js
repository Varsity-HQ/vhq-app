import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { connectInfiniteHits } from "react-instantsearch-native";
import HighlightMatch from "./HighlightMatch";

function AccountsResultsTab({ hits, hasMore, refineNext }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={hits}
        keyExtractor={(item) => item.objectID}
        // onEndReached={() => hasMore && refineNext()}
        renderItem={({ item }) => <HighlightMatch hit={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontWeight: "bold",
  },
});
export default connectInfiniteHits(AccountsResultsTab);
