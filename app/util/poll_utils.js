import React from "react";
import moment from "moment";
import { date_after_24hr, msToTime } from "./utilFunctions";

function post_vote_counter(choices) {
  let votes = 0;

  choices.forEach((x) => {
    votes = votes + x.vote_count;
  });

  return votes;
}

function poll_life_time_left(created) {
  let endDate = moment(new Date(date_after_24hr(created)));
  let current = moment(new Date());

  let milliseconds = endDate.diff(current);

  // let test = moment(endDate, "YYYYMMDD").fromNow();

  if (milliseconds > 0) {
    return msToTime(milliseconds, "Votes closed");
  } else {
    return "Votes closed";
  }
}

export { post_vote_counter, poll_life_time_left };
