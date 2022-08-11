import initial_marketplace_ad_data from "./initial_marketplace_ad_data";

const initialState = {
  home: {
    loading: true,
    error: null,
    data: null,
  },
  category: {
    loading: true,
    error: null,
    data: null,
  },
  create: {
    data: initial_marketplace_ad_data,
    local_images: [],
    tabIndex: 0,
    uploading: false,
    loading_categories: true,
  },
};

const marketplaceReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "MPC_REMOVE_LOCAL_IMAGE":
      let lr_attachments = [];

      state.create.local_images.forEach((x, index) => {
        if (index !== actions.payload) {
          lr_attachments.push(x);
        }
      });

      return {
        ...state,
        create: {
          ...state.create,
          local_images: lr_attachments,
        },
      };
    case "MPC_ADD_LOCAL_IMAGE":
      let l_attachments = state.create.local_images;
      l_attachments.push(actions.payload);
      return {
        ...state,
        create: {
          ...state.create,
          local_images: l_attachments,
        },
      };
    case "MPC_UPDATE_DURATION":
      return {
        ...state,
        create: {
          ...state.create,
          data: {
            ...state.create.data,
            duration: actions.payload,
          },
        },
      };
    case "MPC_UPDATE_DESCRIPTION":
      return {
        ...state,
        create: {
          ...state.create,
          data: {
            ...state.create.data,
            description: actions.payload.html,
            descriptionText: actions.payload.text,
          },
        },
      };
    case "MPC_UPDATE_JOB_TYPE":
      return {
        ...state,
        create: {
          ...state.create,
          data: {
            ...state.create.data,
            job_type: actions.payload,
          },
        },
      };
    case "MPC_UPDATE_COMPANY":
      return {
        ...state,
        create: {
          ...state.create,
          data: {
            ...state.create.data,
            company: actions.payload,
          },
        },
      };
    case "MPC_UPDATE_DEPARTMENT":
      return {
        ...state,
        create: {
          ...state.create,
          data: {
            ...state.create.data,
            department: actions.payload,
          },
        },
      };

    case "MPC_UPDATE_TAB_INDEX":
      return {
        ...state,
        create: {
          ...state.create,
          tabIndex: actions.payload,
        },
      };
    case "MPC_UPDATE_PRICING":
      return {
        ...state,
        create: {
          ...state.create,
          data: {
            ...state.create.data,
            pricing: parseFloat(actions.payload),
          },
        },
      };
    case "MPC_UPDATE_CATEGORY":
      return {
        ...state,
        create: {
          ...state.create,
          data: {
            ...state.create.data,
            category: actions.payload,
          },
        },
      };
    case "MPC_UPDATE_NAME":
      return {
        ...state,
        create: {
          ...state.create,
          data: {
            ...state.create.data,
            title: actions.payload,
          },
        },
      };
    case "MP_SET_CATEGORY_LOADING":
      return {
        ...state,
        category: {
          ...state.category,
          loading: true,
        },
      };
    case "MP_SET_CATEGORY_DATA":
      return {
        ...state,
        category: {
          ...state.category,
          data: actions.payload,
          loading: false,
        },
      };
    case "MP_SET_HOME_DATA":
      return {
        ...state,
        home: {
          ...state.home,
          data: actions.payload,
          loading: false,
        },
      };

    case "MP_HOME_CLEAR_ERROR":
      return {
        ...state,
        home: {
          ...state.home,
          error: null,
        },
      };

    default:
      return state;
  }
};

export default marketplaceReducer;
