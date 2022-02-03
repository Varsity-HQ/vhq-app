import React, { useEffect } from "react";
import { View, StyleSheet, SectionList } from "react-native";
import Screen from "../components/Screen";
import Text from "../components/AppText";
import NotificationScreenHeader from "../components/Notifications/NotificationScreenHeader";
import Notification from "../components/Notifications/Notification";
import { connect } from "react-redux";
import { get_notification } from "../store/actions/notifications";
import colors from "../config/colors";

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_notification: () => dispatch(get_notification()),
  };
};

class Notifications extends React.PureComponent {
  renderItemHandler = ({ item }) => <Notification data={item} />;

  componentDidMount = () => {
    this.props.get_notification();
  };

  render() {
    const notifications = this.props.notifications;
    console.log({ notifications });
    return (
      <Screen style={styles.container}>
        <SectionList
          sections={[
            {
              title: "Newer",
              data: notifications.new,
            },
            {
              title: "Last 15 days",
              data: notifications.last_15days,
            },
            {
              title: "Earlier",
              data: notifications.earlier,
            },
          ]}
          renderSectionHeader={({ section }) => {
            console.log({ section });
            if (section.data.length === 0) {
              return null;
            }
            return (
              <View style={styles.pContainer}>
                <View
                  style={{
                    backgroundColor: colors.darkish,
                    paddingHorizontal: 7,
                    paddingVertical: 5,
                    borderRadius: 5,
                    width: "50%",
                  }}
                >
                  <Text style={{ fontWeight: "700" }}>{section.title}</Text>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <NotificationScreenHeader loading={notifications.loading} />
          }
          renderItem={this.renderItemHandler}
          ListFooterComponent={notifications.loading ? <ListFooter /> : null}
        />
      </Screen>
    );
  }
}

const ListFooter = () => {
  return (
    <View>
      <Notification />
      <Notification />
      <Notification />
    </View>
  );
};

const styles = StyleSheet.create({
  pContainer: {
    padding: 10,
  },
  container: {
    flex: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
