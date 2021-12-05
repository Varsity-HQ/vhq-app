import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import colors from "../config/colors";
import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";

function PostCard(props) {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            style={styles.p_avatar}
            source={{
              uri: "https://varsityhq.imgix.net/vhq_img202122286166.jpeg",
            }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.u_name}>
              Paballo M{" "}
              <Text style={styles.date_posted}>&nbsp;11 days ago</Text>
            </Text>
            <Text style={styles.username}>
              @pabie - <FontAwesome name="university" size={12} />
            </Text>
          </View>
        </View>
        <View style={{ marginRight: 10 }}>
          <Ionicons
            color={colors.white}
            name="ios-ellipsis-horizontal-outline"
            size={30}
          />
        </View>
      </View>
      <View style={styles.content_container}>
        <Text style={{ fontSize: 16, color: colors.light }}>
          Ever fell in love with someone that doesn't below to you ? Its
          actuaally really say but im testing this
        </Text>
      </View>
      <View
        style={{
          marginTop: 15,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Text style={{ fontSize: 14, color: colors.secondary }}>
          3 interactions
        </Text>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{
                height: 18,
                width: 18,
                marginRight: 5,
              }}
              source={require("../assets/vhqcat-small.png")}
            />
            <Text style={{ fontSize: 13, color: "#4f708a" }}>
              VarsityHQ - Iphone
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          marginTop: 10,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View style={styles.button}>
            <Ionicons name="heart" size={26} color={colors.white} />
            <Text style={styles.button_text}>2</Text>
          </View>
          <View style={styles.button}>
            <Ionicons
              name="ios-chatbubbles-outline"
              size={25}
              color={colors.white}
            />
            <Text style={styles.button_text}>2</Text>
          </View>
          <View style={styles.button}>
            <Ionicons
              name="ios-chatbox-ellipses-outline"
              size={26}
              color={colors.white}
            />
          </View>
        </View>
        <View style={styles.button}>
          <Feather name="bookmark" size={26} color={colors.white} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button_text: {
    color: colors.white,
    fontSize: 16,
    paddingLeft: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  content_container: {
    paddingTop: 20,
  },
  date_posted: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.secondary,
    alignSelf: "center",
    marginBottom: 2,
  },
  username: {
    fontSize: 17,
    color: colors.secondary,
  },
  u_name: {
    fontWeight: "700",
    fontSize: 18,
    color: colors.white,
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
  },
  p_avatar: {
    height: 45,
    width: 45,
    borderRadius: 50,
  },
  container: {
    padding: 10,
    borderBottomColor: colors.black,
    borderBottomWidth: 2,
  },
});

export default PostCard;
