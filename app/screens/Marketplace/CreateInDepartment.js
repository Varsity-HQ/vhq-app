import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import { MARKETPLACE_CREATE } from "../../navigation/routes";
import Text from "../../components/AppText";
import BarStepperIndicator from "../../components/BarStepperIndicator";
import { CreativeCommonsSaFill } from "react-native-remix-icon/src/icons";
import AdCreateSection from "../../components/Marketplace/AdCreateSection";
import { connect } from "react-redux";
import {
  set_tab_index,
  tab_back,
  update_department,
} from "../../store/actions/marketplaceActions";

const mapDispatchToProps = (dispatch) => {
  return {
    tab_back: () => dispatch(tab_back()),
    set_tab_index: (i) => dispatch(set_tab_index(i)),
    update_department: (dep) => dispatch(update_department(dep)),
  };
};

const mapStateToProps = (state) => {
  return {
    tabIndex: state.marketplaceReducer.create.tabIndex,
  };
};

function CreateInDepartment({
  navigation,
  tabIndex,
  tab_back,
  set_tab_index,
  update_department,
}) {
  const route = useRoute();
  const [step, setStep] = useState(0);
  const [department, setDepartment] = useState("service");

  useEffect(() => {
    let department = route.params.department;
    update_department(department.replace(/-/g, " "));
    setDepartment(department.replace(/-/g, " "));
    set_tab_index(0);
  }, []);

  const handleBackPress = () => {
    if (tabIndex == 0) {
      navigation.goBack();
    } else {
      tab_back();
    }
  };

  return (
    <Screen scroll>
      <Header
        style={{ borderBottomWidth: 0 }}
        backIcon={true}
        backPress={handleBackPress}
        title=""
        buttonText={step === 2 ? "Save & Continue" : "Cancel"}
        rightPress={() => {
          if (step === 2) return setStep(3);
          if (step !== 2) navigation.navigate(MARKETPLACE_CREATE);
        }}
      />
      <View style={styles.container}>
        <CE_header department={department} tabIndex={step} />
        <BarStepperIndicator
          step={tabIndex + 1}
          style={{ marginTop: 20, marginBottom: 7 }}
        />
        <AdCreateSection step={step} />
      </View>
    </Screen>
  );
}

const CE_header = ({ tabIndex, department }) => {
  if (tabIndex === 3)
    return <Text style={styles.heading}>{department} Target</Text>;
  if (tabIndex === 2)
    return <Text style={styles.heading}>{department} Photos</Text>;
  if (tabIndex === 1) return <Text style={styles.heading}>Description</Text>;
  if (tabIndex <= 0)
    return <Text style={styles.heading}>Create {department}</Text>;
  return null;
};

const styles = StyleSheet.create({
  header_text: {
    fontWeight: "700",
    fontSize: 30,
    textAlign: "center",
  },
  container: {
    padding: 10,
    paddingHorizontal: 12,
  },
  heading: {
    fontSize: 30,
    fontWeight: "700",
    textTransform: "capitalize",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateInDepartment);
