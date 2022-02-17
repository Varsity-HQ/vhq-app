const imageurl_cleaner = (url) => {
  if (url.search("https://varsityhq.imgix.net") > -1) {
    let uri_p = "";
    uri_p = url.split("?")[0];
    uri_p = uri_p.split("&")[0];
    return uri_p;
  }

  if (url) {
    let pre_cleaned_Url = url.replace(
      `https://firebasestorage.googleapis.com/v0/b/varsityhq-bd225.appspot.com/o/`,
      "",
    );
    let cleaned_url = `https://varsityhq.imgix.net/${pre_cleaned_Url.replace(
      "?alt=media",
      "",
    )}`;

    cleaned_url = cleaned_url.split("?")[0];
    cleaned_url = cleaned_url.split("&")[0];
    return cleaned_url;
  } else {
    return "";
  }
};
export default imageurl_cleaner;
