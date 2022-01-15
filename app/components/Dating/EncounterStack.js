import React, { useRef } from "react";
import { Image, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import CardsSwipe from "react-native-cards-swipe";

const cardsData = [
  "https://github.com/tarasvakulka/react-native-cards-swipe/blob/main/example/src/assets/images/1.jpg?raw=true",
  "https://github.com/tarasvakulka/react-native-cards-swipe/blob/main/example/src/assets/images/2.jpg?raw=true",
  "https://github.com/tarasvakulka/react-native-cards-swipe/blob/main/example/src/assets/images/3.jpg?raw=true",
  "https://github.com/tarasvakulka/react-native-cards-swipe/blob/main/example/src/assets/images/4.jpg?raw=true",
];

export default function App() {
  const swiper = useRef();

  return (
    <View style={styles.container}>
      <CardsSwipe
        ref={swiper}
        cards={cardsData}
        containerStyle={styles.cardsSwipeContainer}
        cardContainerStyle={styles.cardContainer}
        loop={false}
        renderCard={(card) => (
          <View key={card} style={styles.card}>
            {/* <Text style={{ color: "white" }}>{JSON.stringify(card)}</Text> */}
            <Image key={card} style={styles.cardImg} source={{ uri: card }} />
          </View>
        )}
        renderNoMoreCard={() => (
          <View style={styles.noMoreCard}>
            <Text>{"No more Cards!"}</Text>
          </View>
        )}
        renderYep={() => (
          <View style={styles.like}>
            <Text style={styles.likeLabel}>YEP</Text>
          </View>
        )}
        renderNope={() => (
          <View style={styles.nope}>
            <Text style={styles.nopeLabel}>NOPE</Text>
          </View>
        )}
      />
      <View style={styles.controlRow}>
        <TouchableOpacity
          onPress={() => {
            if (swiper.current) swiper.current.swipeLeft();
          }}
          style={[styles.button, styles.leftBtn]}
        >
          <Image
            source={{
              uri: "https://github.com/tarasvakulka/react-native-cards-swipe/blob/main/example/src/assets/images/dislike.png?raw=true",
            }}
            style={styles.dislikeIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (swiper.current) swiper.current.swipeRight();
          }}
          style={[styles.button, styles.rightBtn]}
        >
          <Image
            source={{
              uri: "https://github.com/tarasvakulka/react-native-cards-swipe/blob/main/example/src/assets/images/like.png?raw=true",
            }}
            style={styles.likeIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardsSwipeContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingTop: 40,
    zIndex: 1,
    elevation: 1,
  },
  cardContainer: {
    width: "80%",
    height: "100%",
  },
  card: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.07,
    shadowRadius: 3.3,
    elevation: 6,
  },
  cardImg: {
    width: "100%",
    height: "100%",
    borderRadius: 13,
  },
  noMoreCard: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  controlRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 22,
    marginBottom: 30,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    padding: 14,
    borderWidth: 3,
    borderRadius: 35,
  },
  rightBtn: {
    borderColor: "#00D400",
  },
  leftBtn: {
    borderColor: "#E60000",
  },
  likeIcon: {
    width: 40,
    height: 40,
    top: -3,
  },
  dislikeIcon: {
    width: 40,
    height: 40,
    top: 3,
  },
  nope: {
    borderWidth: 5,
    borderRadius: 6,
    padding: 8,
    marginRight: 30,
    marginTop: 25,
    borderColor: "red",
    transform: [{ rotateZ: "22deg" }],
  },
  nopeLabel: {
    fontSize: 32,
    color: "red",
    fontWeight: "bold",
  },
  like: {
    borderWidth: 5,
    borderRadius: 6,
    padding: 8,
    marginLeft: 30,
    marginTop: 20,
    borderColor: "lightgreen",
    transform: [{ rotateZ: "-22deg" }],
  },
  likeLabel: {
    fontSize: 32,
    color: "lightgreen",
    fontWeight: "bold",
  },
});
