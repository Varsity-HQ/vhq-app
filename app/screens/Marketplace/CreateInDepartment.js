import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import { MARKETPLACE_CREATE } from "../../navigation/routes";
import Text from "../../components/AppText";
import BarStepperIndicator from "../../components/BarStepperIndicator";
import { CreativeCommonsSaFill } from "react-native-remix-icon/src/icons";
import AdCreateSection from "../../components/Marketplace/AdCreateSection";

function CreateInDepartment({ navigation }) {
  const [step, setStep] = useState(0);
  const route = useRoute();

  const handleBackPress = () => {};

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
        <CE_header tabIndex={step} />
        <BarStepperIndicator
          step={step + 1}
          style={{ marginTop: 20, marginBottom: 7 }}
        />
        <AdCreateSection step={step} />
      </View>
    </Screen>
  );
}

const CE_header = ({ tabIndex }) => {
  if (tabIndex === 3) return <Text style={styles.heading}>Cover Photo</Text>;
  if (tabIndex === 2) return <Text style={styles.heading}>Description</Text>;
  if (tabIndex === 1) return <Text style={styles.heading}>Event Target</Text>;
  if (tabIndex <= 0) return <Text style={styles.heading}>Create Service</Text>;
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
  },
});

export default CreateInDepartment;
