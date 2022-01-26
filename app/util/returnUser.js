const returnUser = (data) => {
  return {
    userID: data.userID,
    firstname: data.firstname,
    surname: data.surname,
    profilepic: data.profilepic,

    following: data.following,
    followers: data.followers,

    university: data.university,
    yearOfStudy: data.yearOfStudy,
    relationshipStatus: data.relationshipStatus,

    degree: data.degree,
    about: data.about,
    age: data.age,
    gender: data.gender,

    username: data.username,
    email: data.email,
    phoneNumber: data.phoneNumber,
    accountStatus: data.accountStatus,
  };
};

export default returnUser;
