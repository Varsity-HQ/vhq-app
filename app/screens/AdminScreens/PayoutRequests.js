import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import HeaderedHeader from "../../components/headers/HeaderedHeader";
import Screen from "../../components/Screen";
import LoadingC from "../../components/Loaders/HomeUploading";

function PayoutRequests(props) {
  const [loading, setLoading] = useState(false);
  return (
    <Screen style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <HeaderedHeader
            headerText="Payout Requests"
            subText="Easily close requests and message users"
          />
        }
        ListFooterComponent={
          <>
            {loading ? (
              <View>
                <LoadingC
                  style={{
                    alignSelf: "center",
                    marginTop: 10,
                  }}
                />
              </View>
            ) : (
              <></>
            )}
          </>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default PayoutRequests;
