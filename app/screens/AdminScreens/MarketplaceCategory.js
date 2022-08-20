import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import AdminHeader2 from "../../components/Admin/AdminHeader2";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";

function MarketplaceCategory(props) {
  const route = useRoute();
  const [department, setDepartment] = useState("");

  useEffect(() => {
    let dep = route.params.dep;
    setDepartment(dep);
  }, []);

  return (
    <Screen style={styles.container}>
      <Header backIcon noBorder />
      <AdminHeader2 heading={`${department} Categories`} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default MarketplaceCategory;
