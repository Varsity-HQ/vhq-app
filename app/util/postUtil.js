import store from "../store/store";

export function check_post_liked(post_id) {
  let liked = false;
  let liked_posts = store.getState().core.accData.liked_posts;

  liked_posts.forEach((x) => {
    if (x.post_id === post_id) {
      liked = true;
    }
  });

  return liked;
}

export function check_post_bookmarked(post_id) {
  let bookmarked = false;
  let bookmarked_posts = store.getState().core.accData.bookmarks;

  bookmarked_posts.forEach((x) => {
    if (x.post_id === post_id) {
      bookmarked = true;
    }
  });

  return bookmarked;
}
