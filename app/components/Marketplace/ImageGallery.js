import React, { PureComponent } from "react";
import { StyleSheet, Dimensions, Image as ImageO, View } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import colors from "../../config/colors";
import Image from "../Image";
import { FontAwesome } from "@expo/vector-icons";
import Button from "../Button";

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
      this.setState({ imgWidth: screenWidth, imgHeight: imageHeight });
    });
  };

  _renderItem = ({ item, index }) => {
    return (
      <Image
        key={index}
        style={{
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

    if (this.props.images.length === 1) {
      return (
        <View
          style={{
            zIndex: 1,
            position: "relative",
            // padding: 10,
          }}
        >
          <Image
            style={{
              height: deviceWidth,
              width: deviceWidth,
            }}
            uri={this.props.images[0]}
          />
          <View
            style={{
              paddingTop: this.props.inserts.top,
              position: "absolute",
              paddingHorizontal: 10,
            }}
          >
            <Button
              onPress={() => this.props.navigation.goBack()}
              style={styles.button}
              type={3}
              content={
                <FontAwesome name="close" size={20} color={colors.white} />
              }
            />
          </View>
        </View>
      );
    }

    return (
      <View
        style={{
          zIndex: 1,
          position: "relative",
          // padding: 10,
        }}
      >
        <SwiperFlatList
          index={0}
          showPagination
          paginationStyle={{
            bottom: 20,
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
                height: deviceWidth,
                width: deviceWidth,
              }}
              uri={item}
            />
          )}
        />
        <View
          style={{
            paddingTop: this.props.inserts.top,
            position: "absolute",
            paddingHorizontal: 10,
          }}
        >
          <Button
            onPress={() => this.props.navigation.goBack()}
            style={styles.button}
            type={3}
            content={
              <FontAwesome name="close" size={20} color={colors.white} />
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: deviceWidth * 0.11,
    width: deviceWidth * 0.11,
    borderRadius: 100,
    padding: 0,
    borderColor: colors.secondary,
    backgroundColor: colors.dark,
    borderWidth: 2,
  },
  image: {
    width: deviceWidth - 0,
    height: deviceWidth - 0,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
});

export default PostPictures;
