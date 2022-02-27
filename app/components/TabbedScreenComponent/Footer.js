import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import colors from "../../config/colors";
import Loading from "../Loaders/HomeUploading";

const Footer = ({
  loading,
  loading_more,
  useCustomLoader,
  customLoader,
  noDataComponent,
  data,
}) => {
  if (loading) {
    if (useCustomLoader && customLoader) {
      return <>{customLoader}</>;
    }

    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }

  if (noDataComponent && data) {
    if (data && data.length === 0) {
      return <>{noDataComponent}</>;
    }
  }

  if (!loading && loading_more) {
    return (
      <View style={styles.container}>
        <Loading size="small" />
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default Footer;
