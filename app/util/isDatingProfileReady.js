import store from "../store/store";

export default function isDatingProfileReady() {
  let profile = store.getState().datingReducer.profile;
  let ready = true;

  if (!profile.age) {
    ready = false;
  }
  if (profile.age < 18) {
    ready = false;
  }
  if (!profile.gender) {
    ready = false;
  }
  if (!profile.about) {
    ready = false;
  }
  if (!profile.id) {
    ready = false;
  }
  if (!profile.nickname) {
    ready = false;
  }
  if (!profile.parentID) {
    ready = false;
  }
  if (!profile.purpose) {
    ready = false;
  }
  if (profile.report_count >= 5) {
    ready = false;
  }
  if (!profile.sexual_orientation) {
    ready = false;
  }
  if (!profile.university) {
    ready = false;
  }
  if (!profile.yearOfStudy) {
    ready = false;
  }

  return ready;
}
