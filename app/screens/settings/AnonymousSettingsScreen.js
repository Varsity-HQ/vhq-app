import React, { useState } from "react";
import { Alert } from "react-native";
import { Image, ScrollView } from "react-native";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import AppText from "../../components/AppText";
import Text from "../../components/AppText";
import AppButton from "../../components/Button";
import Header3 from "../../components/headers/header3";
import AppTextInput from "../../components/Input";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import emoji from "../../util/emojis";

function AnonymousSettingsScreen({ navigation }) {
  const [name, setName] = useState("");
  const [show_notes, setShowNotes] = useState(false);
  const [saving, savingAnon] = useState(false);

  const saveAnynSettings = () => {
    savingAnon(true);
  };

  const handleSave = () => {
    Alert.alert(
      "Before we continue",
      "Saving will turn on anonymous posting and commenting, do you want to continue ? ",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes continue",
          onPress: saveAnynSettings,
        },
      ],
    );
  };

  return (
    <Screen scroll={true}>
      <KeyboardAvoidingView behavior="position">
        <Header3
          loading={saving}
          backPress={() => navigation.goBack()}
          rightPress={handleSave}
          title="Anonymous"
          buttonText="Save"
        />
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <>
              <View style={styles.dp_container}>
                <Image style={styles.emojidp} source={{ uri: emoji[20] }} />
              </View>
              <AppText
                style={{
                  paddingHorizontal: 20,
                  fontWeight: "700",
                  fontSize: 18,
                  alignSelf: "center",
                }}
              >
                Pick your mood
              </AppText>
              <ScrollView style={styles.emojiscroll} horizontal>
                {emoji.map((x, index) => (
                  <Image
                    style={styles.emojitosl}
                    key={index}
                    source={{ uri: x }}
                  />
                ))}
              </ScrollView>
            </>
          </TouchableWithoutFeedback>
        </View>

        <View
          style={{
            paddingHorizontal: 10,
          }}
        >
          <View>
            <Text style={{ fontWeight: "700" }}>Anonymous Name</Text>
            <Text style={{ color: colors.secondary, fontSize: 14 }}>
              Name to be shown on your posts, for example Overseas
            </Text>
            <AppTextInput
              onChangeText={(e) => setName(e)}
              placeholder="Anonymous"
              style={{ marginTop: 15 }}
              type={2}
            />

            <TouchableOpacity onPress={() => setShowNotes(!show_notes)}>
              <Text style={{ fontWeight: "700", marginTop: 25 }}>
                How does this work ?
              </Text>
            </TouchableOpacity>
            <View>
              {show_notes && (
                <Text
                  style={{
                    color: colors.secondary,
                    fontSize: 14,
                    marginTop: 5,
                  }}
                >
                  This setting will only applies when you create new posts and
                  comment on peoples posts. People will still be able to visit
                  your normal profile page but they won't be able to trace your
                  anonymous activity back to your normal profile and your old
                  posts will remain public.
                </Text>
              )}
            </View>
            <View
              style={{
                alignItems: "center",
                marginTop: 20,
                paddingVertical: 20,
                borderTopWidth: 1,
                borderTopColor: colors.darkish2,
              }}
            >
              <Text>Currently turned off</Text>
              <AppButton
                style={{ borderRadius: 100, paddingHorizontal: 20 }}
                type={6}
                title="Turn off"
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  emojiscroll: {
    borderTopColor: colors.dark_opacity_2,
    // borderTopWidth: 2,
    borderBottomColor: colors.dark_opacity_2,
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    backgroundColor: colors.darkish,
  },
  emojitosl: {
    height: 50,
    width: 50,
    marginRight: 20,
  },
  dp_container: {
    alignSelf: "center",
    borderColor: colors.secondary,
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: colors.dark_opacity_2,
    marginBottom: 20,
  },
  emojidp: {
    height: 60,
    width: 60,
  },
  container: {
    paddingVertical: 20,
  },
});

export default AnonymousSettingsScreen;
