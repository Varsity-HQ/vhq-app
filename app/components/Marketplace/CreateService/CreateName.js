import React from "react";
import { View } from "react-native";
import colors from "../../../config/colors";
import Button from "../../Button";
import Input from "../../Input";
import Text from "../../AppText";
import UserDetBar from "../../UserDetBar";
import styles from "./style";
import DropDown from "../../../components/Forms/DropDown";

function CreateName({ categories = [] }) {
  return (
    <View>
      <UserDetBar style={styles.u_det_container} />
      <View style={styles.tab_container}>
        <View style={styles.input_container}>
          <Text style={styles.input_title}>Event Name</Text>
          <Input
            type={2}
            style={styles.input}
            placeholder="Name of your ad.."
          />
        </View>
        <View style={styles.input_container}>
          <Text style={styles.input_title}>Service Category</Text>
          <DropDown
            searchable
            searchPlaceholder="Search your university or college.."
            style={styles.dropdown}
            // value={l_uni}
            // setValue={(e) => set_uni(e)}
            items={categories}
            placeholder="Select your gender"
          />
        </View>
        <View style={styles.input_container}>
          <Text style={styles.input_title}>Service Price (R)</Text>
          <Input
            type={2}
            keyboardType="numeric"
            style={styles.input}
            placeholder="0"
          />
        </View>
        <Button type={4} title="Next" />
      </View>
    </View>
  );
}

export default CreateName;
