import { useEffect, useRef, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import {
  getDatabase,
  ref,
  onValue,
  push,
  onDisconnect,
  set,
  serverTimestamp,
  get,
  child,
} from "firebase/database";
import { AppState } from "react-native";
import { rdb as db } from "../util/fb_admin";
import store from "../store/store";

const useOnlinePresence = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  let userID = store.getState().core.accData.userID;
  const myConnectionsRef = ref(db, `accounts/${userID}/online`);
  const lastOnlineRef = ref(db, `accounts/${userID}/lastOnline`);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      // console.log("App has come to the foreground!");
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log("AppState", appState.current);

    if (appState.current !== "active") {
      set(myConnectionsRef, false);
      set(lastOnlineRef, serverTimestamp());
    }
    if (appState.current === "active") {
      set(myConnectionsRef, true);
      set(lastOnlineRef, serverTimestamp());
    }
  };

  const saveOnlineStatus = async () => {
    set(myConnectionsRef, true);
    set(lastOnlineRef, serverTimestamp());
    onDisconnect(myConnectionsRef).set(false);
    onDisconnect(lastOnlineRef).set(serverTimestamp());
  };

  useEffect(() => {
    const app_state_subscription = AppState.addEventListener(
      "change",
      _handleAppStateChange,
    );

    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        saveOnlineStatus();
      }
    });

    return () => {
      app_state_subscription;
      unsubscribe;
    };
  }, []);
};

export default useOnlinePresence;
