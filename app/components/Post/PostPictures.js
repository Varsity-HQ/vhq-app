import React, { PureComponent } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import colors from "../../config/colors";
import Image from "../Image";

const { width: deviceWidth } = Dimensions.get("window");

class PostPictures extends PureComponent {
  _renderItem = ({ item, index }) => {
    return (
      <Image
        key={index}
        style={{
          marginTop: 15,
          height: deviceWidth,
          width: deviceWidth,
        }}
        uri={item}
      />
    );
  };

  render() {
    if (this.props.images.length === 0) return null;

    if (this.props.images.length === 1)
      return (
        <Image
          style={{
            marginTop: 15,
            height: deviceWidth,
            width: deviceWidth,
          }}
          uri={this.props.images[0]}
        />
      );

    return (
      <SwiperFlatList
        index={2}
        showPagination
        paginationStyle={{
          bottom: 50,
          backgroundColor: colors.dark_opacity,
          paddingHorizontal: 10,
          borderRadius: 100,
          height: 20,
          alignItems: "center",
          borderColor: colors.secondary_2,
          borderWidth: 1,
          //   opacity: 0.5,
        }}
        paginationStyleItem={{
          height: 10,
          width: 10,
        }}
        paginationStyleItemActive={{
          borderColor: colors.primary,
          borderWidth: 2,
          backgroundColor: colors.primary,
        }}
        data={this.props.images}
        renderItem={({ item }) => (
          <Image
            style={{
              marginTop: 15,
              height: deviceWidth,
              width: deviceWidth,
            }}
            uri={item}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export default PostPictures;
