import { createDrawerNavigator } from "@react-navigation/drawer";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import FloatingButton from "../components/FloatingButton";
import About from "../screens/About";
import AdminHome from "../screens/AdminScreens/AdminHome";
import MarketplaceCategories from "../screens/AdminScreens/MarketplaceCategories";
import MarketplaceCategory from "../screens/AdminScreens/MarketplaceCategory";
import DiscoverPage from "../screens/DiscoverPage";
import HashtagScreen from "../screens/HashtagScreen/index";
import Home from "../screens/Home";
import Create from "../screens/Marketplace/Create";
import CreateInDepartment from "../screens/Marketplace/CreateInDepartment";
import ItemPage from "../screens/Marketplace/ItemPage";
import MyMarketplaceAds from "../screens/Marketplace/MyMarketplaceAds";
import Notifications from "../screens/Notifications";
import PollDetails from "../screens/PollDetails";
import Profile from "../screens/Profile";
import ProfileFollowing from "../screens/ProfileFollowing";
import QcoinsOffersPage from "../screens/QcoinsOffersPage";
import ReferAFriend from "../screens/ReferAFriend";
import SearchResults from "../screens/SearchResults";
import AnonymousSettingsScreen from "../screens/settings/AnonymousSettingsScreen";
import PreferencesScreen from "../screens/settings/PreferencesScreen";
import ProfileSettingsScreen from "../screens/settings/ProfileSettingsScreen";
import UpdateAbout from "../screens/settings/UpdateAbout";
import UpdatebirthdayScreen from "../screens/settings/UpdatebirthdayScreen";
import UpdateDegreeScreen from "../screens/settings/UpdateDegreeScreen";
import UpdateFirstnameScreen from "../screens/settings/UpdateFirstnameScreen";
import UpdateGenderScreen from "../screens/settings/UpdateGenderScreen";
import UpdateProfile from "../screens/settings/UpdateProfile";
import UpdateRelationshipStatusScreen from "../screens/settings/UpdateRelationshipStatusScreen";
import UpdateSexTargetScreen from "../screens/settings/UpdateSexTargetScreen";
import UpdateSexualOrientaionScreen from "../screens/settings/UpdateSexualOrientaionScreen";
import UpdateSurnameScreen from "../screens/settings/UpdateSurnameScreen";
import UpdateUniversityScreen from "../screens/settings/UpdateUniversityScreen";
import UpdateUsernameScreen from "../screens/settings/UpdateUsernameScreen";
import YearOfStudyScreen from "../screens/settings/YearOfStudyScreen";
import DrawerContent from "./DrawerContent";
import {
  ABOUT_PAGE,
  ADMIN_HOME,
  ADMIN_MARKETPLACE_CATEGORIES,
  ADMIN_MARKETPLACE_CATEGORY,
  ANONYMOUS_SETTINGS,
  CREATE_IN_DEP,
  DISCOVER_PAGE,
  HASHTAG_SCREEN,
  HOME,
  MARKETPLACE_CREATE,
  MARKETPLACE_ITEM_PAGE,
  MY_MARKETPLACE_ADS,
  NOTIFICATIONS,
  POLL_DETAILS,
  PREFERENCES,
  PROFILE,
  PROFILE_FOLLOWING,
  PROFILE_SETTINGS,
  QCOINS_OFFERS,
  REFER_A_FRIEND,
  SEARCH_RESULTS,
  UPDATE_ABOUT,
  UPDATE_BIRTHDAY,
  UPDATE_DEGREE,
  UPDATE_FIRSTNAME,
  UPDATE_GENDER,
  UPDATE_PROFILE_PAGE,
  UPDATE_RELATIONSHIP_STATUS,
  UPDATE_SO_STATUS,
  UPDATE_SURNAME,
  UPDATE_S_TARGET,
  UPDATE_UNIVERSITY,
  UPDATE_USERNAME,
  YEAR_OF_STUDY,
} from "./routes";

const Stack = createNativeStackNavigator();
// import PostPage from "../screens/PostPage";
const Drawer = createDrawerNavigator();
//
const HomeDrawerNavigator = () => {
  return (
    <>
      <FloatingButton />
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
        }}
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen name="HomeScreen" component={Home} />
      </Drawer.Navigator>
    </>
  );
};

const FeedNavigator = () => (
  <>
    <Stack.Navigator
      defaultScreenOptions={{
        headerShown: false,
        animation: "none",
      }}
      initialRouteName={HOME}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={HOME}
        component={HomeDrawerNavigator}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          // gestureEnabled: false,
          animation: "fade",
        }}
        name={SEARCH_RESULTS}
        component={SearchResults}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={HASHTAG_SCREEN}
        component={HashtagScreen}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={DISCOVER_PAGE}
        component={DiscoverPage}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={MY_MARKETPLACE_ADS}
        component={MyMarketplaceAds}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={CREATE_IN_DEP}
        component={CreateInDepartment}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={MARKETPLACE_ITEM_PAGE}
        component={ItemPage}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={MARKETPLACE_CREATE}
        component={Create}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "none",
        }}
        name={NOTIFICATIONS}
        component={Notifications}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={POLL_DETAILS}
        component={PollDetails}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={PROFILE}
        component={Profile}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={PROFILE_FOLLOWING}
        component={ProfileFollowing}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={QCOINS_OFFERS}
        component={QcoinsOffersPage}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={REFER_A_FRIEND}
        component={ReferAFriend}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
        }}
        name={ANONYMOUS_SETTINGS}
        component={AnonymousSettingsScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={PROFILE_SETTINGS}
        component={ProfileSettingsScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={ABOUT_PAGE}
        component={About}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={PREFERENCES}
        component={PreferencesScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={YEAR_OF_STUDY}
        component={YearOfStudyScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={UPDATE_DEGREE}
        component={UpdateDegreeScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={UPDATE_BIRTHDAY}
        component={UpdatebirthdayScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={UPDATE_GENDER}
        component={UpdateGenderScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={UPDATE_UNIVERSITY}
        component={UpdateUniversityScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={UPDATE_RELATIONSHIP_STATUS}
        component={UpdateRelationshipStatusScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={UPDATE_SO_STATUS}
        component={UpdateSexualOrientaionScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={UPDATE_S_TARGET}
        component={UpdateSexTargetScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={UPDATE_PROFILE_PAGE}
        component={UpdateProfile}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={UPDATE_USERNAME}
        component={UpdateUsernameScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={UPDATE_FIRSTNAME}
        component={UpdateFirstnameScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={UPDATE_SURNAME}
        component={UpdateSurnameScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={UPDATE_ABOUT}
        component={UpdateAbout}
      />
      {/* // Admin pages */}
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={ADMIN_HOME}
        component={AdminHome}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={ADMIN_MARKETPLACE_CATEGORIES}
        component={MarketplaceCategories}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={ADMIN_MARKETPLACE_CATEGORY}
        component={MarketplaceCategory}
      />

      {/* <Stack.Screen 
      options={{
        headerShown: false,
      }}
      name="PostPage"
      component={PostPage}
    /> */}
    </Stack.Navigator>
  </>
);

export default FeedNavigator;
