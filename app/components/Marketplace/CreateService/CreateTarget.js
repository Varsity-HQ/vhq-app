import React from "react";
import { View } from "react-native";
import Text from "../../AppText";
import Button from "../../Button";
import styles from "./style";
// import styles from "./styles";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { connect } from "react-redux";
import colors from "../../../config/colors";
import {
  select_everyone,
  handle_target_check,
} from "../../../store/actions/marketplaceActions";

const mapStateToProps = (state) => {
  return {
    create: state.marketplaceReducer.create,
    data: state.marketplaceReducer.create.data,
    target: state.marketplaceReducer.create.data.target,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectEveryone: (selected) => dispatch(select_everyone(selected)),
    handleTargetCheck: (isChecked, target) =>
      dispatch(handle_target_check(isChecked, target)),
  };
};

function CreateTarget({ target, selectEveryone, handleTargetCheck }) {
  return (
    <View style={styles.container}>
      <View style={styles.tab_container}>
        <Text
          style={[
            styles.input_sub,
            {
              fontSize: 15,
            },
          ]}
        >
          Choose who must see this service. Only people selected below will be
          able to see this service.
        </Text>
        <View style={styles.underline} />
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
        <Button
          type={4}
          onPress={() => {
            set_tab_index(3);
          }}
          title="Create Ad"
        />
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateTarget);
