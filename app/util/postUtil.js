import store from "../store/store";

function post_liked(post_id) {
  let liked = false;
  let liked_posts = store.getState().core.accData.liked_posts;

  liked_posts.forEach((x) => {
    if (x.post_id === post_id) {
      liked = true;
    }
  });

  return liked;
}

function post_bookmarked(post_id) {
  let bookmarked = false;
  let bookmarked_posts = store.getState().core.accData.bookmarks;

  bookmarked_posts.forEach((x) => {
    if (x.post_id === post_id) {
      this.setState({
        bookmarked: true,
      });
    }
  });

  return bookmarked;
}

export { post_liked, post_bookmarked };
