import React from "react";
import { View } from "react-native";
import colors from "../../../config/colors";
import Button from "../../Button";
import Input from "../../Input";
import Text from "../../AppText";
import UserDetBar from "../../UserDetBar";
import styles from "./style";
import DropDown from "../../../components/Forms/DropDown";
import { connect } from "react-redux";
import {
  update_name,
  update_category,
  update_pricing,
  set_tab_index,
} from "../../../store/actions/marketplaceActions";

const mapStateToProps = (state) => {
  return {
    create: state.marketplaceReducer.create,
    data: state.marketplaceReducer.create.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update_name: (name) => dispatch(update_name(name)),
    update_category: (category) => dispatch(update_category(category)),
    update_pricing: (pricing) => dispatch(update_pricing(pricing)),
    set_tab_index: (index) => dispatch(set_tab_index(index)),
  };
};

function CreateName({
  categories = [
    {
      value: "any",
      label: "Any",
    },
    {
      value: "other",
      label: "Other",
    },
  ],
  update_name,
  update_category,
  update_pricing,
  set_tab_index,
  data,
}) {
  const handleSelect = (v) => {
    update_category(v);
  };

  return (
    <View>
      <UserDetBar style={styles.u_det_container} />
      <View style={styles.tab_container}>
        <View style={styles.input_container}>
          <View style={styles.row_between}>
            <Text style={styles.input_title}>Event Name</Text>
            <Text
              style={[
                styles.smallText,
                {
                  color: colors.redish_2,
                },
              ]}
            >
              {data.title.length < 3
                ? `Add at least ${3 - data.title.length} more letters`
                : ""}
            </Text>
          </View>
          <Input
            defaultValue={data.title}
            type={2}
            style={styles.input}
            placeholder="Name of your ad"
            onChangeText={(text) => update_name(text)}
          />
          <Text style={styles.input_sub}>
            You can write a mini description of this service. Min 3 letters.
          </Text>
        </View>
        <View style={styles.input_container}>
          <Text style={styles.input_title}>Service Category</Text>
          <DropDown
            searchable
            type={2}
            headerText="Select category"
            style={styles.dropdown}
            value={data.category}
            setValue={(e) => handleSelect(e)}
            items={categories}
            placeholder="Select category"
          />
        </View>
        <View style={styles.input_container}>
          <Text style={styles.input_title}>Service Price (R)</Text>
          <Input
            type={2}
            keyboardType="numeric"
            defaultValue={data.pricing.toString()}
            onChangeText={(text) => update_pricing(text)}
            style={styles.input}
            placeholder="0"
            maxLength={10}
          />
        </View>
        <Button
          type={4}
          disabled={!data.title || !data.category || data.title.length <= 3}
          onPress={() => {
            set_tab_index(1);
          }}
          title="Next"
        />
      </View>
    </View>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateName);
