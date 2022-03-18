import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import colors from "../../config/colors";
import Image from "../Image";
import Text from "../AppText";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    account: state.core.accData,
  };
};

function MsgInputContainer({ account }) {
  return (
    <View style={styles.c_container}>
      <View style={styles.container}>
        <View
        //   style={[styles.row, { justifyContent: "space-between", flex: 1 }]}
        >
          <View style={styles.row}>
            <Image uri={account.profilepic} style={styles.profilepic} />
            <TextInput
              multiline
              placeholder="Type your messsage"
              placeholderTextColor={colors.secondary_2}
              selectionColor={colors.primary}
              style={styles.textinput}
            />
          </View>
          <View>{/* <Text>es</Text> */}</View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  textinput: {
    width: "100%",
    // height: "100%",
    flex: 1,
    marginLeft: 5,
    color: colors.white,
    // borderColor: "red",
    // borderWidth: 1,
    alignSelf: "center",
    fontSize: 15,
    padding: 6,
  },
  profilepic: {
    height: 35,
    width: 35,
    borderRadius: 100,
    alignSelf: "flex-end",
  },
  c_container: {
    padding: 10,
    paddingHorizontal: 7,
    backgroundColor: colors.dark,
  },
  container: {
    borderColor: colors.secondary,
    borderWidth: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 5,
    paddingBottom: 1,
  },
});

export default connect(mapStateToProps, null)(MsgInputContainer);
