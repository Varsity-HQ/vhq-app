import React from "react";
import { Image as ImageLocal } from "react-native";
import { Image as CachedImage } from "react-native-expo-image-cache";
import colors from "../config/colors";
import imageurl_cleaner from "../util/image_url_cleaner";

function Image({ style, uri, local }) {
  if (local) return <ImageLocal source={{ uri: uri }} style={style} />;
  if (uri) {
    return (
      <CachedImage
        uri={imageurl_cleaner(uri)}
        style={[style, { backgroundColor: colors.darkish3 }]}
      />
    );
  } else {
    return (
      <ImageLocal source={require("../assets/avatar.png")} style={style} />
    );
  }
}

export default Image;
