import { View, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../components/Screen";
import CommonHeader from "../../components/Marketplace/CommonHeader";
import Text from "../../components/AppText";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../../config/colors";
import FilterByCategory from "../../components/Marketplace/FilterByCategory";
import CategoryPageHeader from "../../components/Marketplace/CategoryPageHeader";
import ListCard from "../../components/Marketplace/ListCard";
import { useRoute } from "@react-navigation/native";
import {
  JOBS_CATEGORY,
  LISTINGS_CATEGORY,
  SERVICES_CATEGORY,
} from "../../navigation/routes";
import { connect } from "react-redux";
import { get_category } from "../../store/actions/marketplaceActions";

const mapStateToProps = (state) => {
  return {
    loading: state.marketplaceReducer.category.loading,
    data: state.marketplaceReducer.category.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    get_category: (category) => dispatch(get_category(category)),
  };
};

function CategoryPage({ get_category, loading, data }) {
  const route = useRoute();
  const [category, setCategory] = useState("");

  useEffect(() => {
    let category = returnCategory(route.params?.category);
    setCategory(category);
    get_category(category);
  }, []);

  function returnCategory(route) {
    switch (route) {
      case JOBS_CATEGORY:
        return "jobs";
      case SERVICES_CATEGORY:
        return "services";
      case LISTINGS_CATEGORY:
        return "listings";
      default:
        return "services";
    }
  }

  const renderItem = ({ item }) => {
    return <ListCard x={item} />;
  };

  if (loading) {
    return (
      <Screen style={styles.container}>
        <CategoryPageHeader skeleton={loading} category={category} />
      </Screen>
    );
  }

  return (
    <Screen style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <CategoryPageHeader data={data} category={category} />
        }
        data={data.items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
