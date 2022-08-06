import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../AppText";
import Button from "../Button";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../../config/colors";
import { RFValue } from "react-native-responsive-fontsize";
import ReportMenu from "../ReportMenus/ReportMenu";
import { useNavigation } from "@react-navigation/native";

function CommunityProtection({ data }) {
  const navigation = useNavigation();
  const [isReportModalVisible, setIsReportModalVisible] = React.useState(false);
  const handleReportModal = () =>
    setIsReportModalVisible(() => !isReportModalVisible);

  const handleReportAd = () => {
    setTimeout(() => setIsReportModalVisible(true), 0);
  };

  const onReportSubmitted = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ReportMenu
        key={"report-modal"}
        type="marketplace_ad"
        node_id={data.id}
        isReportModalVisible={isReportModalVisible}
        handleReportModal={handleReportModal}
        onReportSubmitted={onReportSubmitted}
      />

      <View style={styles.row}>
        <FontAwesome size={18} name="flag" color={colors.secondary} />
        <Text style={styles.heading}>Help keep the community safer</Text>
      </View>
      <View
        style={{
          marginVertical: 10,
        }}
      >
        <Text style={styles.text}>
          Report any suspicious or fraudulent listings to make sure VarsityHQ
          remains safe
        </Text>
      </View>
      <View>
        <Button type={6} onPress={handleReportAd} title="REPORT AD" />
        {/* <Button type={5} title="TERMS OF USE" /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: colors.secondary,
    marginLeft: 10,
    fontSize: RFValue(14),
    fontWeight: "700",
  },
  container: {
    padding: 10,
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CommunityProtection;
