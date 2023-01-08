import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import HeaderedHeader from "../../components/headers/HeaderedHeader";
import Screen from "../../components/Screen";
import Account from "../../components/Search/AccountCont";
import LoadingC from "../../components/Loaders/HomeUploading";
import { collection, query, where } from "firebase/firestore";
import db from "../../util/fb_admin";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Text from "../../components/AppText";

function PayoutRequests(props) {
  const accCol = collection(db, "accounts");
  const accQuery = query(accCol, where("payout_requested", "==", true));
  const [data, loading, err] = useCollectionData(accQuery);

  const renderItem = ({ item }) => {
    return (
      <Account request removeButton chat style={styles.account} data={item} />
    );
  };

  return (
    <Screen style={styles.container}>
      <FlatList
        keyExtractor={(key) => key.userID}
        data={data ? data : []}
        renderItem={renderItem}
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
              <>
                {data.length === 0 ? (
                  <View>
                    <Text
                      style={{
                        alignSelf: "center",
                        marginTop: 50,
                      }}
                    >
                      No requests yet
                    </Text>
                  </View>
                ) : null}
              </>
            )}
          </>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  account: {
    paddingHorizontal: 10,
  },
});

export default PayoutRequests;
