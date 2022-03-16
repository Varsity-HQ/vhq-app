import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import RIcon from "react-native-remix-icon";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { SEARCH_RESULTS } from "../navigation/routes";
import { normalizeText } from "../util/responsivePx";
import { Ionicons } from "@expo/vector-icons";
import TabNavigator from "../components/TabNavigator";
import Loading from "../components/Loaders/HomeUploading";
import axios from "axios";
import Trend from "../components/Search/Trend";

const tabs = [
  {
    title: "Trends Today",
    index: 1,
    icon: <Ionicons color={colors.white} size={18} name="trending-up" />,
  },
];

class AllHashtags extends PureComponent {
  state = {
    trends: [],
    loading: true,
  };

  componentDidMount = () => {
    this.get_hashtags();
  };

  get_hashtags = () => {
    axios
      .get("/explore/trendstoday")
      .then((data) => {
        this.setState({
          trends: data.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Screen scroll>
        <View style={styles.container}>
          <View>
            <Text allowFontScaling={false} style={styles.title}>
              Explore <Text style={styles.dim_text}>Trends</Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(SEARCH_RESULTS)}
            style={styles.search_button}
          >
            <RIcon name="search-2-line" size={22} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <View>
          <TabNavigator
            type={2}
            style={{ marginBottom: 10 }}
            active={1}
            actionsDisable={true}
            onPress={() => {}}
            items={tabs}
          />
        </View>
        <View>
          {this.state.loading || true ? (
            <View style={styles.loading_container}>
              <Loading />
            </View>
          ) : (
            <View>
              {this.state.trends.map((x, index) => (
                <Trend x={x} key={index} />
              ))}
            </View>
          )}
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  loading_container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  dim_text: {
    color: colors.darkish2,
  },
  subHeader: {
    flexDirection: "row",
    paddingHorizontal: 10,
    borderTopWidth: 2,
    borderTopColor: colors.secondary_2,
  },
  search_button: {
    backgroundColor: colors.darkish2,
    padding: 10,
    borderRadius: 100,
  },
  container: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.dark,
    // marginBottom: 10,
  },
  title: {
    color: colors.white,
    fontSize: normalizeText(35),
    fontWeight: "800",
    fontFamily: "Lobster-Regular",
  },
});

export default AllHashtags;
