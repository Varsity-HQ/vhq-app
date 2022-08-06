import store from "../store/store";

const check_if_marketplace_saved = (id) => {
  let saved = false;
  let m_saved = store.getState().core.accData.m_saves;

  if (m_saved && Array.isArray(m_saved)) {
    saved = m_saved.includes(id);
  } else {
    saved = false;
  }

  return saved;
};

export default check_if_marketplace_saved;
