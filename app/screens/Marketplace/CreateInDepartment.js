import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import {
  MARKETPLACE_CREATE,
  MARKETPLACE_HOME,
  MY_MARKETPLACE_ADS,
} from "../../navigation/routes";
import Text from "../../components/AppText";
import BarStepperIndicator from "../../components/BarStepperIndicator";
import { CreativeCommonsSaFill } from "react-native-remix-icon/src/icons";
import AdCreateSection from "../../components/Marketplace/AdCreateSection";
import { connect } from "react-redux";
import {
  set_loading,
  set_tab_index,
  tab_back,
  update_department,
  set_ad_data,
} from "../../store/actions/marketplaceActions";
import axios from "axios";
import Loading from "../../components/Loaders/HomeUploading";
import colors from "../../config/colors";

const mapDispatchToProps = (dispatch) => {
  return {
    tab_back: () => dispatch(tab_back()),
    set_tab_index: (i) => dispatch(set_tab_index(i)),
    update_department: (dep) => dispatch(update_department(dep)),
    set_loading: () => dispatch(set_loading()),
    set_ad_data: (data) => dispatch(set_ad_data(data)),
  };
};

const mapStateToProps = (state) => {
  return {
    tabIndex: state.marketplaceReducer.create.tabIndex,
    uploading: state.marketplaceReducer.create.uploading,
  };
};

function CreateInDepartment({
  navigation,
  tabIndex,
  tab_back,
  set_tab_index,
  update_department,
  uploading,
  set_loading,
  set_ad_data,
}) {
  const route = useRoute();
  const [step, setStep] = useState(0);
  const [department, setDepartment] = useState("service");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (uploading) {
      return () => navigation.navigate(MY_MARKETPLACE_ADS);
    }

    let dep = route.params.department
      ? route.params.department.replace(/-/g, " ")
      : null;

    let is_edit = route.params.edit;
    let id = route.params.id;

    if (is_edit && id) {
      set_loading();
      handle_get_ad(id);
    } else {
      update_department(dep);
      setDepartment(dep);
      handle_get_categories(route.params.department);
    }

    set_tab_index(0);
  }, []);

  const handle_get_ad = (id) => {
    axios
      .get(`/marketplace/${id}`)
      .then((data) => {
        set_ad_data({ ...data.data });
        return axios.get(`/marketplace/mystore/cats/${data.data.department}`);
      })
      .then((data) => {
        let cats = [];
        data.data.forEach((x) => {
          cats.push({
            value: x.categorySlug,
            label: x.categoryTitle,
          });
        });

        setCategories(cats);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handle_get_categories = (dep) => {
    axios
      .get(`/marketplace/mystore/cats/${dep}`)
      .then((data) => {
        let cats = [];
        data.data.forEach((x) => {
          cats.push({
            value: x.categorySlug,
            label: x.categoryTitle,
          });
        });

        setCategories(cats);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBackPress = () => {
    if (tabIndex == 0) {
      navigation.goBack();
    } else {
      tab_back();
    }
  };

  if (uploading) {
    return () => navigation.navigate(MY_MARKETPLACE_ADS);
  }

  return (
    <Screen scroll>
      <Header
        style={{ borderBottomWidth: 0 }}
        backIcon={true}
        backPress={handleBackPress}
        title=""
        buttonText={tabIndex === 3 ? "Cancel" : "Cancel"}
        rightPress={() => {
          navigation.navigate(MARKETPLACE_HOME);
        }}
      />
      <View style={styles.container}>
        {loading ? (
          <View>
            <Text style={[styles.heading, { color: colors.secondary_2 }]}>
              Preparing..
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                paddingVertical: 50,
              }}
            >
              <Loading />
            </View>
          </View>
        ) : (
          <>
            <CE_header department={department} tabIndex={tabIndex} />
            <BarStepperIndicator
              step={tabIndex + 1}
              style={{ marginTop: 20, marginBottom: 7 }}
            />
            <AdCreateSection categories={categories} />
          </>
        )}
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
