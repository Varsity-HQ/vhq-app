function post_vote_counter(choices) {
  let votes = 0;

  choices.forEach((x) => {
    votes = votes + x.vote_count;
  });

  return votes;
}

export default post_vote_counter;
