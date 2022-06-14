import { useEffect } from "react";
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
import { rdb as db } from "../util/fb_admin";

const useOnlinePresence = () => {
  const saveOnlineStatus = async () => {
    const myConnectionsRef = ref(db, "users/joe/online");

    // stores the timestamp of my last disconnect (the last time I was seen online)
    const lastOnlineRef = ref(db, "users/joe/lastOnline");

    set(myConnectionsRef, true);
    onDisconnect(myConnectionsRef).set(false);
    onDisconnect(lastOnlineRef).set(serverTimestamp());

    const childTest = child("users/joe");

    get(myConnectionsRef)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        saveOnlineStatus();
      }
    });

    return unsubscribe;
  }, []);
};

export default useOnlinePresence;
