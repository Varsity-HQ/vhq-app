import React from "react";
import { FlatList } from "react-native";

export default function VirtualizedView(props) {
  return (
    <FlatList
      data={[]}
      ListEmptyComponent={null}
      keyExtractor={() => "chidren"}
      renderItem={null}
      ListHeaderComponent={() => (
        <React.Fragment>{props.children}</React.Fragment>
      )}
    />
  );
}
