import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const key = "vhq_auth_token";

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log("Error storing auth token", error);
  }
};

const getToken = async () => {
  try {
    // console.log(jwtDecode(SecureStore.getItemAsync(key)));
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting auth token", error);
    removeToken();
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing auth token", error);
  }
};

export default {
  storeToken,
  getToken,
  removeToken,
};
