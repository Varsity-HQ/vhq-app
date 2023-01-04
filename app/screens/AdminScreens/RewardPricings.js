import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Text from "../../components/AppText";
import HeaderedHeader from "../../components/headers/HeaderedHeader";
import Screen from "../../components/Screen";
import Input from "../../components/Input";
import colors from "../../config/colors";
import Button from "../../components/Button";
import db from "../../util/fb_admin";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import LoadingC from "../../components/Loaders/HomeUploading";

function RewardPricings(props) {
  const [cost, setCostF] = useState(5);
  const [payoutcost, setPayoutCostF] = useState(5);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    get_ref_config();
  }, []);

  const setCost = (e) => {
    if (e === "") {
      setCostF(0);
    } else {
      setCostF(parseFloat(e));
    }
  };
  const setPayoutCost = (e) => {
    if (e === "") {
      setPayoutCostF(0);
    } else {
      setPayoutCostF(parseFloat(e));
    }
  };

  const get_ref_config = async () => {
    try {
      let docRef = doc(db, "configurations", "referrals");
      let data = await getDoc(docRef);
      let cost_p = data.data().cost_per_ref;
      let minimum_payout_p = data.data().minimum_payout;
      setCost(parseFloat(cost_p));
      setPayoutCostF(parseFloat(minimum_payout_p));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      let docRef = doc(db, "configurations", "referrals");
      await updateDoc(docRef, {
        cost_per_ref: cost.toString(),
        minimum_payout: payoutcost.toString(),
        payout_config_last_updated: new Date().toISOString(),
      });
      setUpdating(false);
    } catch (error) {}
  };

  return (
    <Screen style={styles.container}>
      <HeaderedHeader
        headerText="Reward Prices"
        subText="Set the prices earned in Rand by people during the referral process"
      />
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
        <View style={styles.i_container}>
          <Text style={styles.text_heading}>
            Money earned per succesful referral (R)
          </Text>
          <Input
            onChangeText={(e) => setCost(e)}
            type={2}
            value={cost.toString()}
            keyboardType="numeric"
            placeholder="example R5"
          />
          <Text
            style={[
              styles.text_heading,
              {
                color: colors.secondary,
                marginTop: 10,
              },
            ]}
          >
            5 Successful referrals = R{5 * cost}
          </Text>
          <Text style={[styles.text_heading, { marginTop: 10 }]}>
            Minimum payout (R)
          </Text>
          <Input
            onChangeText={(e) => setPayoutCost(e)}
            type={2}
            value={payoutcost.toString()}
            keyboardType="numeric"
            placeholder="example R150"
          />
          <View style={styles.divider}>
            <Button
              disabled={updating}
              onPress={handleUpdate}
              type={4}
              title={updating ? "Updating.." : "Update"}
            />
          </View>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  text_heading: {
    paddingBottom: 10,
    position: "relative",
  },
  divider: {
    borderTopColor: colors.dark_2,
    borderTopWidth: 1,
    marginTop: 20,
    paddingTop: 20,
  },
  i_container: {
    padding: 12,
  },
});

export default RewardPricings;
