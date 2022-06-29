import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../../config/colors";
import Image from "../Image";
import Text from "../AppText";
import Button from "../Button";
import { Feather } from "@expo/vector-icons";
import FindsMotive from "./FindsMotive";
import FindsMatchPercentage from "./FindsMatchPercentage";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { DATING_PROFILE_PAGE } from "../../navigation/routes";
import OnlineIndicator from "./OnlineIndicator";
import universityShortName from "../../util/universityShortName";

const width = Dimensions.get("window").width;

function DatingCard({ data }) {
  const navigation = useNavigation();

  console.log(data);

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate(DATING_PROFILE_PAGE)}
    >
      <View
        style={{
          padding: 5,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <ImageBackground
          source={{
            uri: data.profilepic,
          }}
          style={styles.container}
        >
          <View
            style={{
              flex: 1,
              padding: 10,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <FindsMotive motive={data.purpose} />
            </View>
          </View>
          <View>
            <View
              style={{
                padding: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <FindsMatchPercentage data={data} />
              </View>
              <Text style={styles.name}>{data.nickname}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.about}>
                  {data.yearOfStudy === "postgraduate"
                    ? "Postgrad"
                    : data.yearOfStudy + " Year"}{" "}
                  , {universityShortName(data.university)}
                </Text>
                <OnlineIndicator online={data.is_online} />
              </View>
            </View>
            <LinearGradient
              style={styles.gradient}
              colors={[colors.dark, colors.transparent]}
              // colors={["red", "white"]}
              start={[0, 1]}
              end={[0, 0]}
            />
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    height: "100%",
    width: "100%",
    borderRadius: 10,
    zIndex: -1,
  },
  name: {
    fontWeight: "700",
  },
  about: {
    fontSize: 13,
    fontWeight: "600",
  },
  image: {
    width: width / 2 - width * 0.05,
    height: width / 2 - width * 0.05,
    borderRadius: 10,
    // aspectRatio: 9 / 3,
  },
  container: {
    width: width / 2 - width * 0.03,
    height: width / 2 - width * 0.03,
    overflow: "hidden",
    padding: 0,
    borderRadius: 8,
  },
});

export default DatingCard;

// return (
//   <TouchableWithoutFeedback
//     onPress={() => navigation.navigate(DATING_PROFILE_PAGE)}
//   >
//     <View
//       style={{
//         padding: 5,
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//         overflow: "hidden",
//       }}
//     >
//       <ImageBackground
//         source={{
//           uri: "https://varsityhq.imgix.net/vhq_img202145455255.jpeg",
//         }}
//         style={styles.container}
//       >
//         <View
//           style={{
//             flex: 1,
//             padding: 10,
//           }}
//         >
//           <View style={{ flexDirection: "row" }}>
//             <FindsMotive motive="to_have_fun" />
//           </View>
//         </View>
//         <View>
//           <View
//             style={{
//               padding: 10,
//             }}
//           >
//             <View
//               style={{
//                 flexDirection: "row",
//               }}
//             >
//               <FindsMatchPercentage />
//             </View>
//             <Text style={styles.name}>Peter</Text>
//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               }}
//             >
//               <Text style={styles.about}>2nd Year, UJ</Text>
//               <OnlineIndicator />
//             </View>
//           </View>
//           <LinearGradient
//             style={styles.gradient}
//             colors={[colors.dark, colors.transparent]}
//             // colors={["red", "white"]}
//             start={[0, 1]}
//             end={[0, 0]}
//           />
//         </View>
//       </ImageBackground>
//     </View>
//   </TouchableWithoutFeedback>
// );
