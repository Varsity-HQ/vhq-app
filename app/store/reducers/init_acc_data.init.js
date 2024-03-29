const init_accdata = {
  userID: null,
  firstname: "",
  surname: "",
  profilepic: "",
  sub_profilepic: "",
  friends: 0,

  notificationToken: "",
  discover_profile_id: "",

  user_following: [],
  user_followers: [],

  following: 0,
  followers: 0,

  bookmarks: [],
  liked_posts: [],
  poll_votes: [],
  liked_comments: [],
  m_saves: [],

  anonymous_name: "",
  anonymous_emoji_index: 20,
  anonymous_profile: false,

  university: "",
  yearOfStudy: "",
  relationshipStatus: "",

  postAudience: "",
  degree: "",
  about: "",
  age: "",
  gender: "",
  verified: false,
  hobbies: [],
  private: "",
  country: "",
  language: "",
  dob: "",
  whereufrom: "",
  s_orientation: "",
  show_sorientation: "",
  s_target: "",
  show_s_target: "",
  username: "user",
  email: "",
  phoneNumber: "",
  accountStatus: "",
  number_of_posts: 0,
  createdAt: new Date().toISOString(),
  read_update_notes: true,
  credits: 0,

  //settings
  isShowingUnfilteredPosts: true,
};

export default init_accdata;
