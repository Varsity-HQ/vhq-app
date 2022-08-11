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
  update_company,
  update_job_type,
  update_description,
} from "../../../store/actions/marketplaceActions";
import DropDown from "../../Forms/DropDown";
import RTextEditor from "../../RTextEditor";
import he from "he";
import colors from "../../../config/colors";

const mapStateToProps = (state) => {
  return {
    data: state.marketplaceReducer.create.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    set_tab_index: (index) => dispatch(set_tab_index(index)),
    update_duration: (duration) => dispatch(update_duration(duration)),
    update_company: (company) => dispatch(update_company(company)),
    update_job_type: (type) => dispatch(update_job_type(type)),
    update_description: (html, text) =>
      dispatch(update_description(html, text)),
  };
};

const types = [
  {
    value: "temporary",
    label: "Temporary Job",
  },
  {
    value: "part-time",
    label: "Part-time Job",
  },
  {
    value: "permanent",
    label: "Permanent Job",
  },
];

function CreateDescription({
  data,
  update_duration,
  update_company,
  update_job_type,
  update_description,
  set_tab_index,
}) {
  const handleEditorChange = (html) => {
    let receivedTxt = he.decode(html.replace(/<[^>]+>/g, ""));
    update_description(html, receivedTxt);
  };
  return (
    <View style={styles.container}>
      <View style={styles.tab_container}>
        {data.department === "service" && (
          <View style={styles.input_container}>
            <Text style={styles.input_title}>Service duration</Text>
            <Input
              type={2}
              defaultValue={data.duration}
              onChangeText={(text) => update_duration(text)}
              style={styles.input}
              placeholder="Service duration e.g 30 minutes"
              maxLength={15}
            />
            <Text
              style={[
                styles.input_sub,
                {
                  marginTop: 5,
                },
              ]}
            >
              (*Optional*) Specify how long you will take to finish this
              service. For example 30 min
            </Text>
          </View>
        )}

        {data.department === "job listing" && (
          <View style={styles.input_container}>
            <Text style={styles.input_title}>Company name </Text>
            <Input
              type={2}
              defaultValue={data.company}
              onChangeText={(text) => update_company(text)}
              style={styles.input}
              placeholder="Company hiring (optional)"
            />
          </View>
        )}
        {data.department === "job listing" && (
          <View style={styles.input_container}>
            <Text style={styles.input_title}>Job type*</Text>
            <DropDown
              searchable
              type={2}
              headerText="Job type"
              style={styles.dropdown}
              value={data.job_type}
              setValue={(e) => update_job_type(e)}
              items={types}
              placeholder="Choose type (required)"
            />
          </View>
        )}
        <View style={styles.input_container}>
          <Text style={styles.input_title}>Description</Text>
          <Text
            style={[
              styles.input_sub,
              {
                marginBottom: 10,
              },
            ]}
          >
            Make people understand this {data.department}
          </Text>
          <RTextEditor
            initialInput={data.description}
            placeholder={`About this ${data.department}`}
            stylePreset={2}
            handleChange={handleEditorChange}
          />
        </View>

        <Button
          onPress={() => {
            set_tab_index(2);
          }}
          disabled={data.department === "job listing" && !data.job_type}
          type={4}
          title="Next"
        />
        <Text
          style={[
            styles.input_sub,
            {
              marginBottom: 10,
              color: colors.secondary_2,
            },
          ]}
        >
          Make sure you fill in all required fields
        </Text>
      </View>
    </View>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateDescription);
