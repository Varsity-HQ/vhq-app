import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import Text from "../../components/AppText";
import Input from "../../components/Input";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { update_degree } from "../../store/actions/actions";

const mapStateToProps = (state) => {
  return {
    degree: state.core.accData.degree,
    loading: state.core.saving_degree_settings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update_degree: (d) => dispatch(update_degree(d)),
  };
};

function UpdateDegreeScreen({ navigation, update_degree, loading, degree }) {
  const [l_degree, set_degree] = useState(degree);

  return (
    <Screen>
      <Header
        loading={loading}
        backPress={() => navigation.goBack()}
        backBtnText="Done"
        buttonText="Save"
        title="My Course"
        rightPress={() => update_degree(l_degree)}
      />
      <View style={styles.container}>
        <Text>What degree are you currently studying</Text>
        <Input
          type={2}
          value={l_degree}
          onChangeText={(e) => set_degree(e)}
          style={{ marginTop: 10 }}
          placeholder="Your degree or course, e.g Education"
        />
        <Text style={styles.note_txt}>
          <Text
            style={[
              styles.note_txt,
              {
                fontWeight: "700",
              },
            ]}
          >
            NOTE
          </Text>{" "}
          : You can leave field as blank and save if you don't want to show your
          degree
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  note_txt: {
    color: colors.secondary,
    marginTop: 20,
  },
  container: {
    padding: 10,
    marginTop: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDegreeScreen);
