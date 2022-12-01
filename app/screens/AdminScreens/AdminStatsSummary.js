import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import HeaderedHeader from "../../components/headers/HeaderedHeader";
import Screen from "../../components/Screen";
import Text from "../../components/AppText";
import Loader from "../../components/Loaders/HomeUploading";
import colors from "../../config/colors";

function AdminStatsSummary(props) {
  const [data, set_data] = useState({
    loading: true,
  });

  const get_data = async () => {
    try {
      let data = await axios.get("/admin/stats");
      set_data({ ...data.data, loading: false });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    get_data();
  }, []);

  return (
    <Screen style={styles.container}>
      <HeaderedHeader
        headerText="Statistics Summary"
        subText="See the insights about VHQ users"
      />
      <View style={styles.inner_container}>
        {data.loading ? (
          <Loader style={styles.loader} />
        ) : (
          <View>
            <Section title="Total accounts" number={data.total_accounts} />
            <Section title="Active accounts" number={data.active_accounts} />
            <Section
              title="Receiving notifications"
              number={data.accounts_using_phones}
            />
            <Section
              title="Total hashtags"
              number={data.total_hashtags}
              label="hashtags"
            />
            <Section
              title="Images posted"
              number={data.total_images}
              label="images"
            />
            <Section
              title="Total Posts"
              number={data.total_posts}
              label="posts"
            />
          </View>
        )}
      </View>
    </Screen>
  );
}

const Section = ({ title, number, label = "accounts" }) => {
  return (
    <View
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 20,
        borderBottomColor: colors.dark_opacity_2,
        borderBottomWidth: 1,
        paddingBottom: 20,
      }}
    >
      <View>
        <Text
          style={{
            fontWeight: "700",
            color: colors.secondary_2,
            fontSize: 15,
            paddingBottom: 5,
          }}
        >
          {title}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "baseline" }}>
        <Text
          style={{
            color: colors.secondary,
            fontWeight: "700",
            fontSize: 30,
            marginRight: 5,
          }}
        >
          {number}
        </Text>
        <Text>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    alignSelf: "center",
    marginTop: 30,
  },
  inner_container: {
    padding: 12,
  },
});

export default AdminStatsSummary;
