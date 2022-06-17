import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import Header from "../../../components/headers/header3";
import Text from "../../../components/AppText";
import Button from "../../../components/Button";
import OptionSelector from "../../../components/OptionSelector";
import Screen from "../../../components/Screen";
import colors from "../../../config/colors";
import { CS_NAME, CS_PHOTOS } from "../../../navigation/routes";
import styles from "./styles";
import { FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { update_dating_gender_interest } from "../../../store/actions/datingActions";

const mapStateToProps = (state) => {
  return {
    show_me: state.datingReducer.profile.show_me,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    update_dating_gender_interest: (i) =>
      dispatch(update_dating_gender_interest(i)),
  };
};

function CSInterestedIn({
  navigation,
  show_me,
  update_dating_gender_interest,
}) {
  const [active, setActive] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      if (show_me.includes("Female") && show_me.length === 1) {
        return setActive("female");
      }
      if (show_me.includes("Male") && show_me.length === 1) {
        return setActive("male");
      }
      if (
        show_me.includes("Male") &&
        show_me.includes("Female") &&
        show_me.length === 2
      ) {
        return setActive("everyone");
      }
    }, []),
  );

  const options = [
    {
      title: "Males",
      value: "male",
      icon: (
        <FontAwesome
          name="male"
          size={24}
          color={active === "male" ? colors.white : colors.secondary}
        />
      ),
    },
    {
      title: "Females",
      value: "female",
      icon: (
        <FontAwesome
          name="female"
          size={24}
          color={active === "female" ? colors.white : colors.secondary}
        />
      ),
    },
    {
      title: "Show me everyone",
      value: "everyone",
    },
    // {
    //   title: "Both",
    //   value: "both",
    // },
  ];

  const handleChange = (i) => {
    setActive(i);
    update_dating_gender_interest(i);
  };

  return (
    <Screen>
      <Header title="Filter gender" backIcon />
      <View style={[{ marginTop: "0%" }, styles.container]}>
        <View>
          <Text style={[styles.text_center, styles.header]}>
            Gender to show
          </Text>
          <Text style={[styles.text_center, styles.subText]}>
            Which gender are you mostly interested in. You can always change
            this setting anytime
          </Text>
        </View>
        <View style={styles.form_container}>
          <View>
            <OptionSelector
              onChange={handleChange}
              active={active}
              options={options}
              type={4}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CSInterestedIn);
