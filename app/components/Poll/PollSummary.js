import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import colors from "../../config/colors";
import { normalizeText } from "../../util/responsivePx";
import Text from "../AppText";
import { FontAwesome } from "@expo/vector-icons";
import Button from "../Button";
import { connect } from "react-redux";
import moment from "moment";
import { post_vote_counter } from "../../util/poll_utils";

const mapStateToProps = (state) => {
  return {
    poll_details: state.data.poll_details,
  };
};

function PollSummary({ jumpTo, poll_details }) {
  const { poll } = poll_details;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.top_section}>
        <Text style={styles.subHeading}>Total Votes</Text>
        <Text style={styles.subHeading_2}>
          Started : {moment(poll.created_at).format("LT")}&nbsp;•&nbsp;
          {moment(poll.created_at).format("L")}
        </Text>
        <Text style={styles.heading}>
          {post_vote_counter(poll.poll_fields)}
        </Text>
        <Text style={styles.text_head}>
          <FontAwesome
            name="university"
            size={normalizeText(13)}
            color={colors.secondary}
          />
          &nbsp;{poll_details.poll.fromUniversity}
        </Text>
      </View>
      <View style={{ padding: 10, marginTop: 20 }}>
        <Text
          style={{
            fontSize: normalizeText(18),
            fontWeight: "700",
          }}
        >
          Summary
        </Text>
        <View style={styles.divider} />
        <View style={{ paddingVertical: 20 }}>
          <View>
            {poll.poll_fields.map((x, index) => (
              <View
                key={index}
                style={{ flexDirection: "row", marginBottom: 10 }}
              >
                <View style={styles.left_section}>
                  <Text style={styles.counter}>{index + 1}.</Text>
                </View>
                <View style={styles.an_summary_section}>
                  <Text style={styles.an_summ_text_inner}>
                    {x.vote_count > 0 ? (
                      <>Voted by {x.vote_count} people</>
                    ) : (
                      <>No votes for this option</>
                    )}
                  </Text>
                  <Text>{x.choiceName}</Text>
                </View>
              </View>
            ))}
            <Button
              onPress={() => jumpTo("submissions")}
              style={{
                marginTop: 30,
              }}
              type={3}
              title="See all submissions"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  an_summ_text_inner: {
    marginBottom: 10,
    color: colors.secondary_2,
    fontWeight: "700",
    fontSize: normalizeText(16),
  },
  counter: {
    fontSize: normalizeText(30),
    fontWeight: "700",
    color: colors.secondary_2,
  },
  left_section: {
    // borderColor: "red",
    // borderWidth: 1,
    width: 40,
    height: 40,
  },

  an_summary_section: {
    flex: 1,
    width: "100%",
    borderWidth: 1,
    borderColor: colors.secondary_2,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: colors.secondary,
    marginVertical: 10,
  },
  text_head: {
    alignSelf: "center",
    color: colors.secondary,
    marginTop: 10,
    fontSize: normalizeText(13),
  },
  top_section: {
    alignSelf: "center",
    borderColor: colors.secondary_2,
    borderWidth: 1,
    width: "90%",
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: colors.darkish,
  },
  subHeading: {
    alignSelf: "center",
    marginBottom: 10,
    color: colors.white,
    fontWeight: "700",
  },
  subHeading_2: {
    alignSelf: "center",
    marginBottom: 10,
    color: colors.secondary,
  },
  heading: {
    alignSelf: "center",
    fontWeight: "700",
    fontSize: normalizeText(45),
  },
  container: {
    padding: 10,
    marginTop: 20,
  },
});

export default connect(mapStateToProps, null)(PollSummary);
