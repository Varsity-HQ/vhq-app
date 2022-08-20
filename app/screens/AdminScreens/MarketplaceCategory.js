import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { View, StyleSheet, FlatList } from "react-native";
import AdminHeader2 from "../../components/Admin/AdminHeader2";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import { v4 } from "uuid";

function MarketplaceCategory(props) {
  const route = useRoute();
  const [department, setDepartment] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let dep = route.params.dep;
    setDepartment(dep);
  }, []);

  const renderItem = ({ item }) => {
    return null;
  };

  return (
    <Screen style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <AdminHeader2
            heading={`${department} categories`}
            text1="Add or delete categories for this department. Categories will be used to create and filter ads in marketplace "
            btn1Text="Add category"
            btn2Text="Delete all"
            text3="Active categories"
          />
        }
        data={categories}
        keyExtractor={(item) => item.categorySlug + v4()}
        renderItem={renderItem}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default MarketplaceCategory;
