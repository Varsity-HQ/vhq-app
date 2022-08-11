import React from "react";
import { View } from "react-native";
import Text from "../../AppText";
import Input from "../../Input";
import Button from "../../Button";
import styles from "./style";
import { connect } from "react-redux";
import {
  set_tab_index,
  update_duration,
} from "../../../store/actions/marketplaceActions";

const mapStateToProps = (state) => {
  return {
    data: state.marketplaceReducer.create.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    set_tab_index: (index) => dispatch(set_tab_index(index)),
    update_duration: (duration) => dispatch(update_duration(duration)),
  };
};

function CreateDescription({ data, update_duration }) {
  return (
    <View style={styles.container}>
      <View style={styles.tab_container}>
        <View style={styles.input_container}>
          <Text style={styles.input_title}>Description</Text>
          <Input
            type={2}
            keyboardType="numeric"
            defaultValue={data.duration}
            onChangeText={(text) => update_duration(text)}
            style={styles.input}
            placeholder="0"
            maxLength={10}
          />
          <Text style={styles.input_sub}>
            Specify how long you will take to finish this service. For example
            30 min
          </Text>
        </View>
        <Button type={4} title="Next" />
      </View>
    </View>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDescription);
