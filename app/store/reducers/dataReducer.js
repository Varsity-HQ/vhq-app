const initialData = {
  profilesData: [],
  sidebar_data: {},
  //home
  homePosts: [],
  homePosts_cursor: null,
  homePosts_loading: true,
  home_market_items: [],
  //search
  search_page_data: {},
  search_page_loading: true,
  //profile
  myPosts: [],
  myPosts_loading: true,
  comment_replies: [
    // {
    //   parent_comment_id: "bAaRufZFxLHGQyTs1yfq",
    //   loading : false,
    //   replies: [
    //     {
    //       comment_id: "C8EZS08ZHifujpfJBmlz",
    //       comment_text: "working",
    //     },
    //   ],
    // },
  ],
};

const dataReducer = (state = initialData, actions) => {
  switch (actions.type) {
    default:
      return state;
  }
};

export default dataReducer;
