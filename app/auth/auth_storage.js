import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const key = "vhq_auth_token";
const user_key = "vhq_user_obj";

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.error("Error storing auth token", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error("Error getting auth token", error);
    removeToken();
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error("Error removing auth token", error);
  }
};

export default {
  storeToken,
  getToken,
  removeToken,
};
