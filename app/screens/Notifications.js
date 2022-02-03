import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import NotificationScreenHeader from "../components/Notifications/NotificationScreenHeader";
import Notification from "../components/Notifications/Notification";
import { connect } from "react-redux";
import { get_notification } from "../store/actions/notifications";

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
        <FlatList
          data={notifications.new}
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
  container: {
    flex: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
