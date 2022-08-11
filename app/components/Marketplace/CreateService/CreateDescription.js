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
import DropDown from "../../Forms/DropDown";

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

const types = [
  {
    value: "temporary",
    label: "Temporary Job",
  },
  {
    value: "parttime",
    label: "Part-time Job",
  },
  {
    value: "permanent",
    label: "Permanent Job",
  },
];

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
            placeholder="Service duration"
            maxLength={10}
          />
          <Text
            style={[
              styles.input_sub,
              {
                marginTop: 5,
              },
            ]}
          >
            Specify how long you will take to finish this service. For example
            30 min
          </Text>
        </View>
        <View style={styles.input_container}>
          <Text style={styles.input_title}>Company name (optional)</Text>
          <Input
            type={2}
            defaultValue={data.duration}
            onChangeText={(text) => update_duration(text)}
            style={styles.input}
            placeholder="Company hiring e.g Varsity Headquarters"
          />
        </View>
        <View style={styles.input_container}>
          <Text style={styles.input_title}>Service Category</Text>
          <DropDown
            searchable
            type={2}
            headerText="Job type"
            style={styles.dropdown}
            // value={data.category}
            // setValue={(e) => handleSelect(e)}
            items={types}
            placeholder="Choose type"
          />
        </View>
        <Button type={4} title="Next" />
      </View>
    </View>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateDescription);
