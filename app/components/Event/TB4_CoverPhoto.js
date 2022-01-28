import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../AppText";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../config/colors";
import AddImageButton from "../AddImageButton";
import Button from "../Button";
import { connect } from "react-redux";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

const mapStateToProps = (state) => {
  return {
    acc_data: state.core.accData,
  };
};

function TB4_CoverPhoto({ image, onImgChange, data, acc_data, handleSubmit }) {
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
          <AddImageButton
            image={image}
            onImgChange={onImgChange}
            event_picture
          />
          <View style={[styles.row, styles.det_section]}>
            <Ionicons name="md-calendar" color={colors.white} size={18} />
            <Text style={[styles.smallText, styles.ped_from_text]}>
              STARTS {dayjs(data.eventStartDateTime).format("llll")}
            </Text>
          </View>
          <Text style={styles.event_title}>{data.eventName}</Text>
          <View style={[styles.row, styles.det_section]}>
            <Ionicons name="md-location" color={colors.white} size={18} />
            <Text style={styles.ped_from_text}>{data.eventVenue}</Text>
          </View>
          <Text style={styles.smallText}>
            Posted by : {acc_data.firstname}&nbsp;{acc_data.surname}
          </Text>
        </View>
        <View style={{ marginVertical: 20, paddingBottom: 150 }}>
          <Button onPress={handleSubmit} title="Post Event" />
        </View>
      </View>
    </View>
  );
}

export default connect(mapStateToProps, null)(TB4_CoverPhoto);
