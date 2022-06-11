import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Service from "./Service";
import Text from "../../components/AppText";
import { RFValue } from "react-native-responsive-fontsize";

const services = [
  {
    title: "Jobs",
    subText: "for students",
    icon: "suitcase",
    link: "jobs",
  },
  {
    title: "Services",
    subText: "by students",
    icon: "list-alt",
    link: "services",
  },
  {
    title: "Listings",
    subText: "by students",
    icon: "vcard-o",
    link: "listings",
  },
];

function CategoryMenu({ skeleton }) {
  return (
    <View style={styles.container}>
      <View
        style={{
          marginBottom: 15,
          paddingHorizontal: 10,
        }}
      >
        {skeleton ? (
          <Text style={styles.header}>Loading...</Text>
        ) : (
          <Text style={styles.header}>Browse Services</Text>
        )}
      </View>
      {skeleton ? (
        <ScrollView
          style={{
            paddingLeft: 10,
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
        >
          <Service skeleton={skeleton} />
          <Service skeleton={skeleton} />
          <Service skeleton={skeleton} />
          <Service skeleton={skeleton} />
        </ScrollView>
      ) : (
        <ScrollView
          style={{
            paddingLeft: 10,
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
        >
          {services.map((x, index) => (
            <Service x={x} key={index} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: RFValue(16),
    fontWeight: "700",
  },
  container: {
    marginTop: 10,
    paddingVertical: 10,
  },
});

export default CategoryMenu;
