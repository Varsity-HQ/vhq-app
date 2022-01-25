import React from "react";
import { Switch, View } from "react-native";
import colors from "../../config/colors";
import Text from "../AppText";
import Button from "../Button";
import styles from "./styles";
import BouncyCheckbox from "react-native-bouncy-checkbox";

function TB2_EventTarget({
  handleTargetCheck,
  target,
  selectEveryone,
  handleNext,
}) {
  return (
    <View style={[styles.tab_container, styles.et_container]}>
      <View style={styles.exp_container}>
        <Text style={styles.text_exp}>
          Choose who must see this event. Only people selected below will be
          able to see this event.
        </Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Switchption
          onPress={() => {
            selectEveryone(
              !target.first &&
                !target.second &&
                !target.third &&
                !target.forth &&
                !target.postgraduates,
            );
          }}
          active={
            target.first &&
            target.second &&
            target.third &&
            target.forth &&
            target.postgraduates
          }
          title="Everyone can see this event"
        />
        <Text style={[styles.input_title, styles.marginbottom20]}>
          Undergraduates
        </Text>
        <Switchption
          onPress={() => {
            handleTargetCheck(!target.first, "first");
          }}
          active={target.first}
          title="First Years"
        />
        <Switchption
          onPress={() => {
            handleTargetCheck(!target.second, "second");
          }}
          active={target.second}
          title="Second Years"
        />
        <Switchption
          onPress={() => {
            handleTargetCheck(!target.third, "third");
          }}
          active={target.third}
          title="Third Years"
        />
        <Switchption
          onPress={() => {
            handleTargetCheck(!target.forth, "forth");
          }}
          active={target.forth}
          title="Forth Years"
        />
        <View style={styles.border} />
        <Text
          style={[
            styles.input_title,
            styles.marginTop20,
            styles.marginbottom20,
          ]}
        >
          Postgraduates
        </Text>
        <Switchption
          onPress={() => {
            handleTargetCheck(!target.postgraduates, "postgraduates");
          }}
          active={target.postgraduates}
          title="All postgraduates"
        />
      </View>
      <Button onPress={handleNext} type={4} title="Next" />
    </View>
  );
}

const Switchption = ({ title, active, onPress }) => {
  return (
    <View style={styles.option}>
      <BouncyCheckbox
        disableBuiltInState={true}
        size={25}
        fillColor={colors.primary}
        unfillColor={colors.dark}
        useNativeDriver={true}
        text={title}
        iconStyle={{ borderColor: colors.primary }}
        textStyle={{ color: colors.white, textDecorationLine: "none" }}
        onPress={onPress}
        isChecked={active}
      />
    </View>
  );
};

export default TB2_EventTarget;
