import React, { PureComponent } from "react";
import { View, StyleSheet, Dimensions, Image as ImageO } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import colors from "../../config/colors";
import Image from "../Image";

const { width: deviceWidth } = Dimensions.get("window");

class PostPictures extends PureComponent {
  state = {
    imgWidth: 0,
    imgHeight: 0,
  };

  componentDidMount = () => {
    if (this.props.images.length === 0) return null;
    ImageO.getSize(this.props.images[0], (width, height) => {
      // calculate image width and height
      const screenWidth = Dimensions.get("window").width;
      const scaleFactor = width / screenWidth;
      const imageHeight = height / scaleFactor;
      try {
        this.setState({ imgWidth: screenWidth, imgHeight: imageHeight });
      } catch (err) {}
    });
  };

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

    const { imgWidth, imgHeight } = this.state;
    const { eventPage } = this.props;

    if (this.props.event && this.props.images.length === 1) {
      return (
        <Image
          style={{
            // height: imgHeight,
            width: "100%",
            height: eventPage ? imgHeight : deviceWidth - 20,
            borderRadius: eventPage ? 0 : 7,
          }}
          uri={this.props.images[0]}
        />
      );
    }
    if (this.props.offer && this.props.images.length === 1) {
      return (
        <Image
          style={{
            width: deviceWidth - 20,
            height: deviceWidth - 20,
            borderRadius: 7,
          }}
          uri={this.props.images[0]}
        />
      );
    }

    if (this.props.images.length === 1) {
      return (
        <Image
          style={{
            marginTop: 15,
            width: "100%",
            height: deviceWidth - 20,
            // height: imgHeight - 3,
            // width: imgWidth - 33,
          }}
          uri={this.props.images[0]}
        />
      );
    }

    return (
      <SwiperFlatList
        index={0}
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
              width: "100%",
              height: deviceWidth - 20,
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
