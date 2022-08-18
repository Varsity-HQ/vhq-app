import React from "react";
import { ScrollView, View } from "react-native";
import styles from "./style";
import Text from "../../AppText";
import Button from "../../Button";
import { connect } from "react-redux";
import {
  set_tab_index,
  add_mc_image,
  remove_local_image,
  remove_uploaded_image,
} from "../../../store/actions/marketplaceActions";
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
    add_mc_image: (image) => dispatch(add_mc_image(image)),
    remove_local_image: (index) => dispatch(remove_local_image(index)),
    remove_uploaded_image: (index) => dispatch(remove_uploaded_image(index)),
  };
};

function CreateMPPhotos({
  set_tab_index,
  data,
  create,
  add_mc_image,
  remove_local_image,
  remove_uploaded_image,
}) {
  const handle_add_image = (data) => {
    add_mc_image(data);
    console.log({ data });
  };

  const handle_remove = (index, isUploaded) => {
    if (isUploaded) {
      remove_uploaded_image(index);
    } else {
      remove_local_image(index);
    }
  };

  return (
    <View>
      <View style={styles.tab_container}>
        <Text style={styles.input_title}>
          Added {data.attachments.length + create.local_images.length}/4 Photos
        </Text>
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
        {data.attachments.map((x, index) => (
          <MCPhoto
            removePress={() => handle_remove(index, true)}
            image={x}
            key={x + index}
          />
        ))}

        {create.local_images.map((x, index) => (
          <MCPhoto
            removePress={() =>
              handle_remove(data.attachments.length - 1 + index)
            }
            image={x}
            key={x + index}
          />
        ))}

        {data.attachments.length + create.local_images.length < 4 && (
          <MCPhoto onImgChange={handle_add_image} add />
        )}
      </ScrollView>
      <View>
        <Button
          disabled={data.attachments.length + create.local_images.length < 1}
          type={4}
          onPress={() => {
            set_tab_index(3);
          }}
          title="Next"
        />
      </View>
    </View>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMPPhotos);
