import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Screen from "../../components/Screen";
import CommonHeader from "../../components/Marketplace/CommonHeader";
import Text from "../../components/AppText";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../../config/colors";
import FilterByCategory from "../../components/Marketplace/FilterByCategory";
import CategoryPageHeader from "../../components/Marketplace/CategoryPageHeader";
import ListCard from "../../components/Marketplace/ListCard";

function CategoryPage(props) {
  const renderItem = ({ item }) => {
    return <ListCard />;
  };

  return (
    <Screen style={styles.container}>
      <FlatList
        ListHeaderComponent={<CategoryPageHeader />}
        data={[1, 2, 3]}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default CategoryPage;
