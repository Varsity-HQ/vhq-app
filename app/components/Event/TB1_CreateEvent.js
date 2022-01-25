import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../AppText";
import Button from "../Button";
import Input from "../Input";
import styles from "./styles";
import Form from "../Forms/Form";

import SubmitButton from "../Forms/SubmitButton";
import AppFormField from "../Forms/FormField";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().min(4).required("Event must have a name"),
  venue: Yup.string().min(4).label("Venue").required("Provide the venue"),
  start_date: Yup.date()
    .required("Please specify when the event will start")
    .label("Start date"),
  end_date: Yup.date()
    .required("Indicate when this even will end")
    .label("End date"),
});

function TB1_CreateEvent({ handleProceed }) {
  const handleSubmit = (e) => {
    handleProceed({
      eventName: e.name,
      eventVenue: e.venue,
      eventStartDateTime: e.start_date,
      eventEndDateTime: e.end_date,
    });
  };
  return (
    <View style={styles.tab_container}>
      <Form
        validationSchema={validationSchema}
        initialValues={{
          name: "",
          venue: "",
          start_date: new Date().toISOString(),
          end_date: new Date().toISOString(),
        }}
        onSubmit={handleSubmit}
      >
        <View style={styles.input_container}>
          <Text style={styles.input_title}>Event Name</Text>
          <AppFormField
            type={2}
            name="name"
            style={styles.input}
            placeholder="Type the name of the event"
          />
        </View>
        <View style={styles.input_container}>
          <Text style={styles.input_title}>Event Venue</Text>
          <AppFormField
            type={2}
            name="venue"
            style={styles.input}
            placeholder="Provide venue for this event"
          />
        </View>
        <View style={styles.input_container}>
          <Text style={styles.input_title}>Start Date and Time</Text>
          <AppFormField
            name="start_date"
            type="datetime"
            style={styles.input}
          />
        </View>
        <View style={styles.input_container}>
          <Text style={styles.input_title}>End Date and Time</Text>
          <AppFormField name="end_date" type="datetime" style={styles.input} />
        </View>
        <SubmitButton style={{ marginVertical: 20 }} type={4} title="Next" />
      </Form>
    </View>
  );
}

export default TB1_CreateEvent;
