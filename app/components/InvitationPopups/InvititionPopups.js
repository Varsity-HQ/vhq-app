import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Text from "../AppText";
import ReferIcon from "../../assets/refer_icon340x405.png";
import Image from "../Image";
import LargePopup from "./LargePopup";
import { useNavigation } from "@react-navigation/native";
import { REFER_A_FRIEND } from "../../navigation/routes";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../config/colors";
import db from "../../util/fb_admin";
import { doc, getDoc } from "firebase/firestore";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

function InvititionPopups(props) {
  const [show_ref_icon, set_show_ref_icon] = useState(true);
  const [show_ref_popup, set_show_ref_popup] = useState(false);
  const [refData, setRefData] = useState({ loading: true });
  const navigation = useNavigation();

  useEffect(() => {
    if (!refData.loading) {
      get_cost_for_ref();
    }
  }, []);

  const get_cost_for_ref = async () => {
    try {
      let docRef = doc(db, "configurations", "referrals");
      let data = await getDoc(docRef);

      setRefData({
        cost_per_ref: data.data().cost_per_ref,
        is_refsys_active: data.data().is_refsys_active,
        loading: false,
      });
      set_show_ref_popup(true);
    } catch (error) {}
  };

  return (
    <>
      {!refData.loading && refData.is_refsys_active ? (
        <LargePopup
          data={refData}
          handleModal={() => set_show_ref_popup(false)}
          open_state={show_ref_popup}
        />
      ) : null}
      {show_ref_icon ? (
        <View style={styles.popup_container}>
          <TouchableOpacity
            onPress={() => set_show_ref_icon(false)}
            style={styles.close_btn_container}
          >
            <Ionicons name="close-circle" color={colors.gold} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(REFER_A_FRIEND);
              set_show_ref_icon(false);
            }}
          >
            <Image style={styles.icon} local uri={ReferIcon} />
          </TouchableOpacity>
        </View>
      ) : null}
    </>
    // <View>
    // </View>
  );
}

const styles = StyleSheet.create({
  close_btn_container: {
    alignSelf: "flex-end",
  },
  footer_container: {
    backgroundColor: "red",
    padding: 10,
  },

  icon: {
    height: "100%",
    width: "100%",
  },
  popup_container: {
    position: "absolute",
    // top: height * 0.2,
    // left: 10,
    bottom: 80 + height * 0.09,
    right: 15,
    // transform: "translate(-50%,-50%)",
    zIndex: 99999,
    height: 140,
    width: 100,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    // backgroundColor: "red",
  },
});

export default InvititionPopups;
