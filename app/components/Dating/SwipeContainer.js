import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { Ionicons } from "@expo/vector-icons";
import Screen from "../Screen";
import colors from "../../config/colors";

export const PRIMARY_COLOR = "#7444C0";
export const SECONDARY_COLOR = "#5636B8";
export const WHITE = "#FFFFFF";
export const GRAY = "#757E90";
export const DARK_GRAY = "#363636";
export const BLACK = "#000000";

export const ONLINE_STATUS = "#46A575";
export const OFFLINE_STATUS = "#D04949";

export const STAR_ACTIONS = "#FFA200";
export const LIKE_ACTIONS = "#B644B2";
export const DISLIKE_ACTIONS = "#363636";
export const FLASH_ACTIONS = "#5028D7";

export const DIMENSION_WIDTH = Dimensions.get("window").width;
export const DIMENSION_HEIGHT = Dimensions.get("window").height;

let IMAGE_01 =
  "https://github.com/stevenpersia/tinder-expo/blob/master/assets/images/01.jpg?raw=true";
let IMAGE_02 =
  "https://github.com/stevenpersia/tinder-expo/blob/master/assets/images/02.jpg?raw=true";
let IMAGE_03 =
  "https://github.com/stevenpersia/tinder-expo/blob/master/assets/images/03.jpg?raw=true";
let IMAGE_04 =
  "https://github.com/stevenpersia/tinder-expo/blob/master/assets/images/04.jpg?raw=true";
let IMAGE_05 =
  "https://github.com/stevenpersia/tinder-expo/blob/master/assets/images/05.jpg?raw=true";
let IMAGE_06 =
  "https://github.com/stevenpersia/tinder-expo/blob/master/assets/images/06.jpg?raw=true";
let IMAGE_07 =
  "https://github.com/stevenpersia/tinder-expo/blob/master/assets/images/07.jpg?raw=true";
let IMAGE_08 =
  "https://github.com/stevenpersia/tinder-expo/blob/master/assets/images/08.jpg?raw=true";
let IMAGE_09 =
  "https://github.com/stevenpersia/tinder-expo/blob/master/assets/images/09.jpg?raw=true";
let IMAGE_10 =
  "https://github.com/stevenpersia/tinder-expo/blob/master/assets/images/10.jpg?raw=true";

const data = [
  {
    id: 1,
    name: "Leanne Graham",
    isOnline: true,
    match: "78",
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    message:
      "I will go back to Gotham and I will fight men Iike this but I will not become an executioner.",
    image: IMAGE_01,
  },
  {
    id: 2,
    name: "Clementine Bauch",
    match: "93",
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    isOnline: false,
    message: "Someone like you. Someone who'll rattle the cages.",
    image: IMAGE_02,
  },
  {
    id: 3,
    name: "Ervin Howell",
    match: "45",
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    isOnline: false,
    message:
      "Oh, hee-hee, aha. Ha, ooh, hee, ha-ha, ha-ha. And I thought my jokes were bad.",
    image: IMAGE_03,
  },
  {
    id: 4,
    name: "John Lebsack",
    match: "88",
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    isOnline: true,
    message: "Bats frighten me. It's time my enemies shared my dread.",
    image: IMAGE_04,
  },
  {
    id: 5,
    name: "James Dietrich",
    match: "76",
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    isOnline: false,
    message: "It's not who I am underneath but what I do that defines me.",
    image: IMAGE_05,
  },
  {
    id: 6,
    name: "Patricia Schulist",
    match: "95",
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    isOnline: true,
    message:
      "You have nothing, nothing to threaten me with. Nothing to do with all your strength.",
    image: IMAGE_06,
  },
  {
    id: 7,
    name: "Chelsey Weissnat",
    match: "67",
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    isOnline: true,
    message:
      "Never start with the head. The victim gets all fuzzy. He can't feel the next... See?",
    image: IMAGE_07,
  },
  {
    id: 8,
    name: "Nicky Runol",
    match: "85",
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    age: "27",
    location: "Irvine, CA",
    info1: 'Straight, Single, 5"10',
    info2: "Tea Totaller, Loves Photography & Travel",
    info3: "Beaches, Mountain, Cafe, Movies",
    info4: "Last seen: 23h ago",
    isOnline: true,
    message:
      "And as for the television's so-called plan, Batman has no jurisdiction.",
    image: IMAGE_08,
  },
  {
    id: 9,
    name: "Glenna Reichert",
    match: "74",
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    isOnline: true,
    message:
      "This is what happens when an unstoppable force meets an immovable object.",
    image: IMAGE_09,
  },
  {
    id: 10,
    name: "Kurtis DuBuque",
    match: "98",
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    isOnline: false,
    message:
      "You want order in Gotham. Batman must take off his mask and turn himself in.",
    image: IMAGE_10,
  },
  {
    id: 11,
    name: "Kurtis DuBuque",
    match: "38",
    description:
      "Full-time Traveller. Globe Trotter. Occasional Photographer. Part time Singer/Dancer.",
    isOnline: false,
    message:
      "You want order in Gotham. Batman must take off his mask and turn himself in.",
    image: IMAGE_10,
  },
];

const Home = () => {
  //   const [swiper, setSwiper] = useState(null);

  const swiper = useRef(null);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.containerHome}>
        {/* <View style={styles.top}> */}
        {/* <City onPress={() => swiper.current.swipeRight()} /> */}
        {/* <Filters /> */}
        {/* </View> */}

        <View
          style={{
            // backgroundColor: "red",
            flex: 1,
            // padding: 10,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* <View
            style={{
              backgroundColor: "red",
              flex: 1,
              borderColor: "red",
              borderWidth: 2,
              padding: 10,
              borderRadius: 10,
            }}
          ></View> */}
          <CardStack
            useNativeDriver={true}
            // horizontalSwipe={false}
            disableRightSwipe={true}
            duration={500}
            cardContainerStyle={{
              height: "100%",
              width: "100%",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              //   flex: 1,
              //   position: "relative",
              //   top: 0,
            }}
            loop
            style={{
              flex: 1,
              zIndex: 99,
              borderWidth: 1,
              //   height: 200,
              overflow: "hidden",
            }}
            // horizontalSwipe={false}
            verticalSwipe={false}
            renderNoMoreCards={() => null}
            ref={swiper}
          >
            {data.map((item) => (
              <Card key={item.id} style={{ flex: 1 }}>
                <CardItem
                  hasActions
                  image={item.image}
                  name={item.name}
                  description={item.description}
                  matches={item.match}
                  handleLeftSwipeUp={() => swiper.current.swipeLeft()}
                />
              </Card>
            ))}
          </CardStack>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  // COMPONENT - CARD ITEM
  containerCardItem: {
    backgroundColor: WHITE,
    borderRadius: 8,
    // alignItems: "center",
    margin: 10,
    // elevation: 1,
    height: DIMENSION_HEIGHT,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
    flex: 1,
  },
  matchesCardItem: {
    marginTop: -35,
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  matchesTextCardItem: {
    color: WHITE,
  },
  descriptionCardItem: {
    color: GRAY,
    textAlign: "center",
  },
  status: {
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    color: GRAY,
    fontSize: 12,
  },
  online: {
    width: 6,
    height: 6,
    backgroundColor: ONLINE_STATUS,
    borderRadius: 3,
    marginRight: 4,
  },
  offline: {
    width: 6,
    height: 6,
    backgroundColor: OFFLINE_STATUS,
    borderRadius: 3,
    marginRight: 4,
  },
  actionsCardItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 30,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: WHITE,
    marginHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowColor: DARK_GRAY,
    shadowOffset: { height: 10, width: 0 },
  },
  miniButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: WHITE,
    marginHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowColor: DARK_GRAY,
    shadowOffset: { height: 10, width: 0 },
  },

  // COMPONENT - CITY
  city: {
    backgroundColor: WHITE,
    padding: 10,
    borderRadius: 20,
    width: 100,
    // elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
  },
  cityText: {
    color: DARK_GRAY,
    fontSize: 13,
    textAlign: "center",
  },

  // COMPONENT - FILTERS
  filters: {
    backgroundColor: WHITE,
    padding: 10,
    borderRadius: 20,
    width: 90,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
  },
  filtersText: {
    color: DARK_GRAY,
    fontSize: 13,
    textAlign: "center",
  },

  // COMPONENT - MESSAGE
  containerMessage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 10,
    width: DIMENSION_WIDTH - 100,
  },
  avatar: {
    borderRadius: 30,
    width: 60,
    height: 60,
    marginRight: 20,
    marginVertical: 15,
  },
  message: {
    color: GRAY,
    fontSize: 12,
    paddingTop: 5,
  },

  // COMPONENT - PROFILE ITEM
  containerProfileItem: {
    backgroundColor: WHITE,
    paddingHorizontal: 10,
    paddingBottom: 25,
    margin: 20,
    borderRadius: 8,
    marginTop: -65,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
  },
  matchesProfileItem: {
    width: 135,
    marginTop: -15,
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "center",
  },
  matchesTextProfileItem: {
    color: WHITE,
    textAlign: "center",
  },
  name: {
    paddingTop: 25,
    paddingBottom: 5,
    color: DARK_GRAY,
    fontSize: 15,
    textAlign: "center",
  },
  descriptionProfileItem: {
    color: GRAY,
    textAlign: "center",
    paddingBottom: 20,
    fontSize: 13,
  },
  info: {
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  iconProfile: {
    fontSize: 12,
    color: DARK_GRAY,
    paddingHorizontal: 10,
  },
  infoContent: {
    color: GRAY,
    fontSize: 13,
  },

  // CONTAINER - GENERAL
  mainContainer: {
    // flex: 1,
    // resizeMode: "cover",
    width: DIMENSION_WIDTH,
    height: "100%",
    minHeight: DIMENSION_HEIGHT,
    backgroundColor: colors.dark,
  },
  top: {
    paddingTop: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { paddingBottom: 10, fontSize: 22, color: DARK_GRAY },

  // CONTAINER - HOME
  containerHome: {
    // marginHorizontal: 10,
    // paddingHorizontal: 10,
    flex: 1,
    height: "100%",
  },

  // CONTAINER - MATCHES
  containerMatches: {
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 10,
  },

  // CONTAINER - MESSAGES
  containerMessages: {
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 10,
  },

  // CONTAINER - PROFILE
  containerProfile: { marginHorizontal: 0 },
  photo: {
    width: DIMENSION_WIDTH,
    height: 450,
  },
  topIconLeft: {
    paddingLeft: 20,
  },
  topIconRight: {
    paddingRight: 20,
  },
  actionsProfile: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  textButton: {
    fontSize: 15,
    color: WHITE,
    paddingLeft: 5,
  },
  circledButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  roundedButton: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    height: 50,
    borderRadius: 25,
    backgroundColor: SECONDARY_COLOR,
    paddingHorizontal: 20,
  },

  // MENU
  tabButtonText: {
    textTransform: "uppercase",
  },
  iconMenu: {
    alignItems: "center",
  },
});

const Filters = () => (
  <TouchableOpacity style={styles.filters}>
    <Text style={styles.filtersText}>
      <Icon name="filter" size={13} color={DARK_GRAY} /> Filters
    </Text>
  </TouchableOpacity>
);

const City = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.city}>
    <Text style={styles.cityText}>
      <Icon name="location-sharp" size={13} color={DARK_GRAY} /> New York
    </Text>
  </TouchableOpacity>
);

const Icon = ({ color, name, size, style }) => (
  <Ionicons name={name} size={size} color={color} style={style} />
);

const CardItem = ({
  description,
  hasActions,
  hasVariant,
  image,
  isOnline,
  matches,
  name,
  handleLeftSwipeUp,
}) => {
  const handleLeftSwipe = () => {
    console.log("eses");
    handleLeftSwipeUp();
  };

  useEffect(() => {
    console.log("got here", name);
  }, []);

  // Custom styling
  const fullWidth = Dimensions.get("window").width;

  const imageStyle = [
    {
      borderRadius: 8,
      width: hasVariant ? fullWidth / 2 - 30 : fullWidth - 80,
      height: hasVariant ? 170 : 350,
      margin: hasVariant ? 0 : 20,
    },
  ];

  const nameStyle = [
    {
      paddingTop: hasVariant ? 10 : 15,
      paddingBottom: hasVariant ? 5 : 7,
      color: "#363636",
      fontSize: hasVariant ? 15 : 30,
    },
  ];

  return (
    <View
      style={{
        zIndex: 9,
        height: "100%",
        position: "relative",
      }}
    >
      <View style={styles.containerCardItem}>
        <View
          style={{
            flex: 1,
            zIndex: 9,
            height: "100%",
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "column",
              flex: 1,
              zIndex: 9,
            }}
          >
            {/* IMAGE */}
            <Image source={{ uri: image }} style={imageStyle} />

            {/* MATCHES */}
            {matches && (
              <View style={styles.matchesCardItem}>
                <Text style={styles.matchesTextCardItem}>
                  <Icon name="heart" color={WHITE} size={13} /> {matches}% Match
                  !
                </Text>
              </View>
            )}

            {/* NAME */}
            <Text style={nameStyle}>{name}</Text>

            {/* DESCRIPTION */}
            {description && (
              <Text style={styles.descriptionCardItem}>{description}</Text>
            )}

            {/* STATUS */}
            {!description && (
              <View style={styles.status}>
                <View style={isOnline ? styles.online : styles.offline} />
                <Text style={styles.statusText}>
                  {isOnline ? "Online" : "Offline"}
                </Text>
              </View>
            )}

            {/* ACTIONS */}
            {hasActions && (
              <View style={styles.actionsCardItem}>
                <TouchableOpacity style={styles.miniButton}>
                  <Icon name="star" color={STAR_ACTIONS} size={14} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                  <Icon name="heart" color={LIKE_ACTIONS} size={25} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleLeftSwipe}
                  style={styles.button}
                >
                  <Icon name="close" color={DISLIKE_ACTIONS} size={25} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.miniButton}>
                  <Icon name="flash" color={FLASH_ACTIONS} size={14} />
                </TouchableOpacity>
              </View>
            )}

            {/* <Image source={{ uri: image }} style={imageStyle} /> */}
          </View>
        </View>
      </View>
    </View>
  );
};
