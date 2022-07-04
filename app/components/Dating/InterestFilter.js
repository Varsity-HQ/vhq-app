import React from "react";
import { View, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../../config/colors";
import Text from "../AppText";
import ThreeValueSwitcher from "../ThreeValueSwitcher";
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { update_dating_gender_interest } from "../../store/actions/datingActions";

const values = [
  {
    value: "female",
    title: "Girls",
  },
  {
    value: "male",
    title: "Guys",
  },
  {
    value: "everyone",
    title: "Both",
  },
];

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

function InterestFilter({ show_me, update_dating_gender_interest }) {
  const [selectedValue, setSelectedValue] = React.useState("");

  useFocusEffect(
    React.useCallback(() => {
      if (show_me.includes("Female") && show_me.length === 1) {
        return setSelectedValue("female");
      }
      if (show_me.includes("Male") && show_me.length === 1) {
        return setSelectedValue("male");
      }
      if (
        show_me.includes("Male") &&
        show_me.includes("Female") &&
        show_me.length === 2
      ) {
        return setSelectedValue("everyone");
      }
    }, []),
  );

  const handleChange = (i) => {
    setSelectedValue(i);
    update_dating_gender_interest(i);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>I'm interested in</Text>
      <ThreeValueSwitcher
        values={values}
        selectedValue={selectedValue}
        handleSelectedValue={handleChange}
        containerStyle={{
          marginTop: 10,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: colors.secondary,
    fontWeight: "600",
    marginTop: 10,
    // fontSize: RFValue(12),
  },
  container: {
    padding: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(InterestFilter);
