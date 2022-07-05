import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  ImageBackground,
  Dimensions,
  Alert,
} from "react-native";
import Header from "../../components/headers/header3";
import Text from "../../components/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "../../config/colors";
import Image from "../../components/Image";
import Button from "../../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import IconButton from "../../components/IconButton";
import FindsMatchPercentage from "../../components/Dating/FindsMatchPercentage";
import FindsMotive from "../../components/Dating/FindsMotive";
import InfoTextArea from "../../components/Dating/InfoText";
import InforBox from "../../components/Dating/InforBox";
import { connect } from "react-redux";
import universityShortName from "../../util/universityShortName";
import OnlineIndicator from "../../components/Dating/OnlineIndicator";
import DistanceIndicator from "../../components/Dating/DistanceIndicator";
import Loading from "../../components/Loaders/HomeUploading";
import { useRoute } from "@react-navigation/native";
import {
  collection,
  startAt,
  endAt,
  getDocs,
  query,
  orderBy,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  CollectionHook,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import db from "../../util/fb_admin";
import { async } from "@firebase/util";
import {
  poke_profile,
  register_visit,
} from "../../store/actions/datingActions";

const height = Dimensions.get("window").height;

const mapStateToProps = (state) => {
  return {
    saved_profile: state.datingReducer.saved_profile,
    poked_users: state.datingReducer.profile.poked_users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    poke_profile: (i) => dispatch(poke_profile(i)),
    register_visit: (i) => dispatch(register_visit(i)),
  };
};

function DatingProfilePage({
  saved_profile,
  poke_profile,
  register_visit,
  poked_users,
}) {
  const profileID = useRoute().params.id;
  const inserts = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(saved_profile);
  const [poked, setPoke] = useState(false);

  const getProfile = async () => {
    const profileDocRef = doc(db, "discover_profiles", profileID);
    await getDoc(profileDocRef)
      .then((data) => {
        setProfile(data.data());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePokePress = () => {
    setPoke(true);
    if (poked) {
      Alert.alert(
        "Seeking more attention ? 👀",
        "You can only poke someone once in a day. Try again tomorrow.",
        [{ text: "Okay, cool" }],
      );
    } else {
      poke_profile(profileID);
    }
  };

  const handle_register_visit = () => {
    register_visit(profileID);
  };

  useEffect(() => {
    setPoke(poked_users.includes(profileID));

    if (saved_profile?.nickname) {
      setLoading(false);
    }

    if (!saved_profile?.nickname) {
      getProfile();
    }

    handle_register_visit();
  }, []);

  if (loading) {
    return (
      <ScrollView scroll style={[styles.container]}>
        <ImageBackground
          source={require("../../assets/background-pattern.png")}
          style={[
            styles.top_section,
            {
              paddingTop: inserts.top,
            },
          ]}
        >
          <Header
            noBorder
            backIcon
            noBg
            // buttonText="ellipsis"
            rightPress={() => console.log("pressed")}
          />
        </ImageBackground>
        <View style={styles.container}>
          <View style={styles.inner_container}>
            <View style={styles.profilepic_container}>
              <View style={styles.loader_container}>
                <Loading />
              </View>
            </View>
            <View style={styles.meta_container}>
              <Text style={styles.name}>Loading..</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView scroll style={[styles.container]}>
      <ImageBackground
        source={require("../../assets/background-pattern.png")}
        style={[
          styles.top_section,
          {
            paddingTop: inserts.top,
          },
        ]}
      >
        <Header
          noBorder
          backIcon
          noBg
          // buttonText="ellipsis"
          rightPress={() => console.log("pressed")}
        />
      </ImageBackground>
      <View style={styles.container}>
        <View style={styles.inner_container}>
          <View style={styles.profilepic_container}>
            <Image uri={profile.profilepic} style={styles.profilepic} />
          </View>
          <View style={styles.meta_container}>
            <Text style={styles.name}>{profile.nickname}</Text>

            <View>
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: RFValue(12),
                  },
                ]}
              >
                Seen {profile.seen_count}
              </Text>
            </View>
            <Text
              style={[
                styles.text,
                {
                  marginTop: 5,
                },
              ]}
            >
              2nd Year Student,{" "}
              <Text
                style={{
                  fontWeight: "700",
                }}
              >
                UJ
              </Text>
            </Text>
            <View
              style={{
                paddingVertical: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <IconButton
                onPress={handlePokePress}
                icon={
                  <MaterialCommunityIcons
                    name="laser-pointer"
                    size={30}
                    color={poked ? colors.dark : colors.secondary}
                  />
                }
                buttonStyle={
                  poked
                    ? {
                        backgroundColor: colors.primary,
                        borderWidth: 2,
                      }
                    : null
                }
                text={poked ? "Poked" : "Poke"}
                textStyle={[styles.btnText]}
              />
              <IconButton
                icon={
                  <MaterialCommunityIcons
                    name="chat"
                    size={30}
                    color={colors.secondary}
                  />
                }
                style={{
                  marginHorizontal: 30,
                }}
                text="Message"
                textStyle={styles.btnText}
              />
              <IconButton
                icon={
                  <MaterialCommunityIcons
                    name="flag"
                    size={30}
                    color={colors.secondary}
                  />
                }
                text="Report"
                textStyle={styles.btnText}
              />
            </View>
          </View>
          <View
            style={{
              borderTopColor: colors.dark_opacity_2,
              borderTopWidth: 1,
              marginHorizontal: 15,
              marginTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <FindsMotive motive={profile.purpose} />
              <DistanceIndicator data={profile} />
              <View style={{ paddingHorizontal: 5 }} />
              <FindsMatchPercentage data={profile} />
              <OnlineIndicator
                online={profile.is_online}
                style={{ marginLeft: 10 }}
              />
              {/* <Text style={{ marginLeft: 10 }}>Great match !</Text> */}
            </View>
            <InfoTextArea html={true} header="About" text={profile.about} />
            <InforBox
              data={[
                {
                  title: "gender",
                  text: profile.gender,
                  hide: !profile.gender,
                },
                {
                  title: "star_sign",
                  text: profile.star_sign,
                  hide: !profile.star_sign,
                },
                {
                  title: "age",
                  text: profile.age,
                  hide: !profile.age,
                },
                {
                  title: "s_orientation",
                  text: profile.sexual_orientation,
                  hide: !profile.sexual_orientation,
                },
                {
                  title: "yearOfStudy",
                  text:
                    profile.yearOfStudy !== "postgraduates"
                      ? profile.yearOfStudy + " year"
                      : "Postgraduate",
                  hide: !profile.yearOfStudy,
                },
                {
                  title: "university",
                  text: universityShortName(profile.university),
                  hide: !profile.university,
                },
              ]}
              header="Main information"
            />
            <InfoTextArea
              header="University/College"
              text={profile.university}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loader_container: {
    borderRadius: 1000,
    height: height * 0.17,
    // width: height * 0.17,
    borderWidth: 3,
    borderColor: colors.secondary,
    backgroundColor: colors.dark,
  },
  btnText: {
    color: colors.secondary,
    fontSize: 14,
  },
  meta_container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.secondary,
  },
  name: {
    fontWeight: "700",
    fontSize: RFValue(18),
    marginTop: 14,
    marginBottom: 8,
  },
  profilepic_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  profilepic: {
    borderRadius: 1000,
    height: height * 0.17,
    width: height * 0.17,
    borderWidth: 4,
    borderColor: colors.secondary,
  },
  inner_container: {
    top: -(height * 0.08),
  },
  container: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // backgroundColor: colors.dark,
  },
  top_section: {
    backgroundColor: colors.secondary_2,
    height: height * 0.25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DatingProfilePage);
