import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import HeaderedHeader from "../../components/headers/HeaderedHeader";
import Screen from "../../components/Screen";
import Account from "../../components/Search/AccountCont";
import LoadingC from "../../components/Loaders/HomeUploading";
import { collection, doc, query, updateDoc, where } from "firebase/firestore";
import db from "../../util/fb_admin";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Text from "../../components/AppText";

function PayoutRequests(props) {
  const accCol = collection(db, "accounts");
  const accQuery = query(accCol, where("payout_requested", "==", true));
  const [data, loading, err] = useCollectionData(accQuery);

  const handle_close_request = async (id) => {
    try {
      let docRef = doc(db, "accounts", id);
      await updateDoc(docRef, {
        payout_requested: false,
        payout_request_close_date: new Date().toISOString(),
      });
    } catch (error) {}
  };

  const renderItem = ({ item }) => {
    return (
      <Account
        request
        close_request={handle_close_request}
        removeButton
        chat
        style={styles.account}
        data={item}
      />
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
