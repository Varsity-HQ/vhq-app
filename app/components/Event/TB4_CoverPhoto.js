import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../AppText";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../config/colors";
import AddImageButton from "../AddImageButton";

function TB4_CoverPhoto(props) {
  return (
    <View style={[styles.tab_container, styles.et_container]}>
      <View style={[styles.exp_container, { borderBottomWidth: 0 }]}>
        <Text style={styles.text_exp}>
          Please add an attractive cover photo for this event.
        </Text>
      </View>
      <View>
        <Text style={[styles.input_title, styles.marginbottom20]}>
          Click the section below to select your cover photo.
        </Text>
        <View style={styles.event_container}>
          <AddImageButton event_picture />
          <View style={[styles.row, styles.det_section]}>
            <Ionicons name="md-calendar" color={colors.white} size={18} />
            <Text style={[styles.smallText, styles.ped_from_text]}>
              STARTS TUE, JAN 25, 2022 12:38 AM
            </Text>
          </View>
          <Text style={styles.event_title}>ojies eosiej</Text>
          <View style={[styles.row, styles.det_section]}>
            <Ionicons name="md-location" color={colors.white} size={18} />
            <Text style={styles.ped_from_text}>Konka</Text>
          </View>
          <Text style={styles.smallText}>Posted by : Harmony Chikari</Text>
        </View>
      </View>
    </View>
  );
}

export default TB4_CoverPhoto;
