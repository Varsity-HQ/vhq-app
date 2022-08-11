import React from "react";
import { ScrollView, View } from "react-native";
import styles from "./style";
import Text from "../../AppText";
import Button from "../../Button";
import { connect } from "react-redux";
import { set_tab_index } from "../../../store/actions/marketplaceActions";
import MCPhoto from "./MCPhoto";

const mapStateToProps = (state) => {
  return {
    create: state.marketplaceReducer.create,
    data: state.marketplaceReducer.create.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    set_tab_index: (index) => dispatch(set_tab_index(index)),
  };
};

function CreateMPPhotos({ set_tab_index, data }) {
  return (
    <View>
      <View style={styles.tab_container}>
        <Text style={styles.input_title}>Added 1/4 Photos</Text>
        <Text
          style={[
            styles.input_sub,
            {
              marginTop: 5,
            },
          ]}
        >
          Add photos for this service to attract more people to see this
          listing.
        </Text>
      </View>
      <ScrollView
        horizontal
        style={{
          paddingVertical: 20,
        }}
      >
        <MCPhoto />
        <MCPhoto add />
      </ScrollView>
      <View>
        <Button
          type={4}
          onPress={() => {
            set_tab_index(1);
          }}
          title="Next"
        />
      </View>
    </View>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMPPhotos);
